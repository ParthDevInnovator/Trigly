import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"
import InfoBar from "@/components/global/inforbar/page";
import Sidebar from "@/components/global/sidebar"
import { InstagramSimulator } from "@/components/global/simulator"
import { PrefetchUserAutnomations, PrefetchUserProfile } from "@/react-query/prefetch";

type Props = {
  children: React.ReactNode;
  params: { slug: string };
};


const Layout = async ({ children, params }: Props) => {
  const slug = await Promise.resolve(params.slug)
  const query = new QueryClient()
  await PrefetchUserProfile(query)
  await PrefetchUserAutnomations(query)
  return (
    <HydrationBoundary state={dehydrate(query)}>
      <div className="flex h-full">
        <Sidebar slug={params.slug} />
        <div
          className="
          lg:ml-[250px] 
    lg:pl-10 
    lg:py-5 
    flex 
    flex-col 
    overflow-auto
    h-[calc(100vh-4rem)]
    w-full
          "
        >

          <InfoBar slug={params.slug} />
          {children}
        </div>
        <InstagramSimulator />
      </div>
    </HydrationBoundary>
  );
};

export default Layout;