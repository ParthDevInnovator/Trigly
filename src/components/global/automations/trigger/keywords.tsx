import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useKeywords } from '@/hooks/use-automations'
import { useMutationDataState, useMutationData } from '@/hooks/use-mutation-data'
import { useQueryAutomation } from '@/hooks/user-queries'
import { X } from 'lucide-react'
import React from 'react'
import { saveKeyword } from '@/actions/automations'

type Props = {
  id: string
}

export const Keywords = ({ id }: Props) => {
  const { onValueChange, keyword, onKeyPress, deleteMutation, reply, onReplyChange } = useKeywords(id)
  const { mutate } = useMutationData(
    ['add-keyword'],
    (data: { keyword: string; reply?: string }) => saveKeyword(id, data.keyword, data.reply),
    'automation-info',
    () => { } // keyword and reply states are reset inside useKeywords
  )
  const { latestVariable } = useMutationDataState(['add-keyword'])
  const { data } = useQueryAutomation(id)

  return (
    <div className="bg-background-80 flex flex-col gap-y-3 p-3 rounded-xl">
      <p className="text-sm text-text-secondary">
        Add words that trigger automations
      </p>
      <div className="flex flex-wrap justify-start gap-2 items-center">
        {data?.data?.keywords &&
          data?.data?.keywords.length > 0 &&
          data?.data?.keywords.map(
            (word: any) =>
              word.id !== latestVariable?.variables?.id && (
                <div
                  className="bg-background-90 flex flex-col gap-y-1 capitalize text-text-secondary py-1 px-4 rounded-xl"
                  key={word.id}
                >
                  <p>{word.word}</p>
                  {word.reply && <p className="text-xs text-text-secondary/70 truncate">{word.reply}</p>}
                </div>
              )
          )}
        {latestVariable && latestVariable.status === 'pending' && (
          <div className="bg-background-90 flex flex-col gap-y-1 capitalize text-text-secondary py-1 px-4 rounded-xl">
            <p>{latestVariable.variables.keyword}</p>
            {latestVariable.variables.reply && <p className="text-xs text-text-secondary/70 truncate">{latestVariable.variables.reply}</p>}
          </div>
        )}
        <div className="bg-background-90 flex flex-col gap-y-4 text-text-secondary py-3 px-4 rounded-xl w-full">
          <Input
            placeholder="Add keyword... (Press Enter to save)"
            value={keyword}
            className="p-0 bg-transparent ring-0 border-none outline-none w-full"
            onChange={onValueChange}
            onKeyUp={onKeyPress}
          />
          <Textarea
            placeholder="Add a text reply for this keyword... (Shift+Enter for new line)"
            value={reply}
            className="p-0 bg-transparent ring-0 border-none outline-none w-full text-sm text-text-secondary/70 resize-none min-h-[50px]"
            rows={5}
            onChange={(e) => onReplyChange(e as any)}
            onKeyUp={onKeyPress}
          />
        </div>
      </div>
    </div>
  )
}
export default Keywords
