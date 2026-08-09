import { Zap } from 'lucide-react'

export const LogoSmall = () => {
  return (
    <span className="flex items-center gap-2">
      <div className="bg-gradient-to-br from-indigo-500 to-purple-500 p-2 rounded-lg">
        <Zap className="text-white w-6 h-6" />
      </div>
      <span className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 tracking-tight">
        Trigly
      </span>
    </span>
  )
}