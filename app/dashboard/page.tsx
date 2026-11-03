import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge"


export default function Page() {
  return (
    
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="bg-black/90 flex h-full w-full flex-col overflow-hidden text-white m
        px-4">
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-vertical:h-4 data-vertical:self-auto"
              />
              {/* <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Build Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb> */}
              <h1 className="text-lg font-semibold">Overview</h1>
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0 text-white">
            <h1 className="text-lg font-semibold ">Overview</h1>
            <div className="grid gap-2 md:grid-cols-4 text-white">
              <Card className="text-white p-4 flex justify-center rounded-xl bg-gray-500/10 border border-gray-200/40 h-[8rem] w-68">
                <h4 className="">Total this month</h4>
                <p className="text-2xl font-bold">45,231.89 XAF</p>
              </Card>
              <Card className="text-white p-4 flex justify-center rounded-xl bg-gray-500/10 border border-gray-200/40 h-[8rem] w-68">
                <h4 className="">Waiting for approval</h4>
                <p className="text-2xl font-bold">1</p>
              </Card>
              <Card className="text-white p-4 flex justify-center rounded-xl bg-gray-500/10 border border-gray-200/40 h-[8rem] w-68">
                <h4 className="">Rejected</h4>
                <p className="text-2xl font-bold">1</p>
              </Card>
            </div>
            <h3 className="">Recent payments</h3>
            <section className="max-h-[38vh] flex-1 rounded-xl bg-muted/10 md:min-h-min divide-y divide-gray-300">
              <div className="h-20 flex flex-col p-4 gap-2">
                <div className="flex flex-row justify-between items-center">
                  <h3 className="">Kamga Logistics</h3>
                  <span className="">456,131 XAF</span>
                </div>
                <div className="flex flex-row justify-between items-center">
                  <span className="">01-10-26</span>
                  <Badge className="bg-orange-400/20 text-orange-200">Pending</Badge>
                </div>
              </div>
              <div className="h-20 flex flex-col p-4 gap-2">
                <div className="flex flex-row justify-between items-center">
                  <h3 className="">Another Company</h3>
                  <span className="">123,456 XAF</span>
                </div>
                <div className="flex flex-row justify-between items-center">
                  <span className="">02-10-26</span>
                  <Badge className="green-400/20 text-green-200">Completed</Badge>
                </div>
              </div>
              <div className="h-20 flex flex-col p-4 gap-2">
                <div className="flex flex-row justify-between items-center">
                  <h3 className="">Yet Another Company</h3>
                  <span className="">789,012 XAF</span>
                </div>
                <div className="flex flex-row justify-between items-center">
                  <span className="">03-10-26</span>
                  <Badge className="bg-red-400/20 text-red-200">Rejected</Badge>
                </div>
              </div>
            </section>
          </div>
          
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
