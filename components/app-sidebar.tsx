"use client";

import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  TerminalSquareIcon,
  CircleDollarSignIcon,
  CreditCardPlus,
} from "lucide-react";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

// This is sample data.
const data = {
  user: {
    name: "Laclong Stive",
    email: "softruk@gmail.com",
    avatar: "/my_picture.jpg",
  },
  teams: [
    { 
    name: "Softruk Payments",
    logo: <CircleDollarSignIcon />,
    plan: "Demo"
   },
  ],
  navMain: [
    {
      title: "Overview",
      url: "/dashboard",
      icon: <TerminalSquareIcon />,
    },
    {
      title: "Payments",
      url: "/dashboard/payments",
      icon: <CircleDollarSignIcon />,
    },
    {
      title: "New Payment",
      url: "/dashboard/payments/new",
      icon: <CreditCardPlus />,
    },
  ],
};

function NavMainSkeleton() {
  return (
    <SidebarGroup>
      <SidebarMenu>
        {[0, 1, 2].map((i) => (
          <SidebarMenuItem key={i}>
            <div className="flex h-8 items-center gap-2 px-2">
              <Skeleton className="size-4 rounded-md" />
              <Skeleton className="h-4 flex-1" />
            </div>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <Suspense fallback={<NavMainSkeleton />}>
          <NavMain items={data.navMain} />
        </Suspense>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
