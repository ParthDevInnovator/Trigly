import * as React from 'react';
import AutomationsBreadCrumb from '../../../../../../components/global/bread-crumbs/automations/index'
import { Warning } from '../../../../../../icons/warning';
import Trigger from '../../../../../../components/global/automations/trigger/index';
import { getAutomationInfo } from '@/actions/automations';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { PrefetchUserAutomation } from '@/react-query/prefetch';
import ThenNode from '@/components/global/automations/then/node';

type Props = {
  params: { id: string }
}
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const info = await getAutomationInfo(resolvedParams.id)
  return {
    title: info.data?.name,
  }
}
const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const query = new QueryClient();
  const resolvedParams = await params;
  await PrefetchUserAutomation(query, resolvedParams.id);

  return (
    <HydrationBoundary state={dehydrate(query)}>
      <div className='flex flex-col items-center gap-y-20'>
        <AutomationsBreadCrumb id={resolvedParams.id} />
        <div className="w-full lg:w-10/12 xl:w-6/12 p-5 rounded-xl flex flex-col bg-[#1D1D1D] gap-y-3">
          <div className="flex gap-x-2">
            <Warning />
            when...
          </div>
          <Trigger id={resolvedParams.id} />
        </div>
        <ThenNode id={resolvedParams.id} />

      </div>
    </HydrationBoundary>
  );
}
export default page