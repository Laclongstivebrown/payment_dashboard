
// src/components/nav-main.tsx
"use client";

import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";

type NavItem = {
  title: string;
  url: string;
  icon?: React.ReactNode;
  items?: { title: string; url: string }[];
};

// The most specific matching link wins: /dashboard/payments/new highlights
// "New Payment" (not "Payments"), and a detail page highlights "Payments".
function getActiveUrl(pathname: string, items: NavItem[]) {
  return items
    .filter((item) => item.url !== "#" && (pathname === item.url || pathname.startsWith(`${item.url}/`)))
    .map((item) => item.url)
    .sort((a, b) => b.length - a.length)[0];
}

export function NavMain({ items }: { items: NavItem[] }) {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();
  const activeUrl = getActiveUrl(pathname, items);
  const closeOnMobile = () => setOpenMobile(false);

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) =>
          item.items?.length ? (
            // Items WITH sub-links keep the collapsible dropdown
            <Collapsible key={item.title} className="group/collapsible" render={<SidebarMenuItem />}>
              <CollapsibleTrigger render={<SidebarMenuButton tooltip={item.title} />}>
                {item.icon}
                <span>{item.title}</span>
                <ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-open/collapsible:rotate-90" />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items.map((sub) => (
                    <SidebarMenuSubItem key={sub.title}>
                      <SidebarMenuSubButton
                        render={<Link href={sub.url} onClick={closeOnMobile} />}
                        isActive={pathname === sub.url}
                      >
                        <span>{sub.title}</span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </Collapsible>
          ) : (
            // Items WITHOUT sub-links are plain navigation links
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                render={<Link href={item.url} onClick={closeOnMobile} />}
                isActive={item.url === activeUrl}
                tooltip={item.title}
              >
                {item.icon}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
}






























// "use client"

// import {
//   Collapsible,
//   CollapsibleContent,
//   CollapsibleTrigger,
// } from "@/components/ui/collapsible"
// import {
//   SidebarGroup,
//   SidebarGroupLabel,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarMenuSub,
//   SidebarMenuSubButton,
//   SidebarMenuSubItem,
// } from "@/components/ui/sidebar"
// import { ChevronRightIcon } from "lucide-react"

// export function NavMain({
//   items,
// }: {
//   items: {
//     title: string
//     url: string
//     icon?: React.ReactNode
//     isActive?: boolean
//     items?: {
//       title: string
//       url: string
//     }[]
//   }[]
// }) {
//   return (
//     <SidebarGroup>
//       <SidebarGroupLabel>Platform</SidebarGroupLabel>
//       <SidebarMenu>
//         {items.map((item) => (
//           <Collapsible
//             key={item.title}
//             defaultOpen={item.isActive}
//             className="group/collapsible"
//             render={<SidebarMenuItem />}
//           >
//             <CollapsibleTrigger
//               render={<SidebarMenuButton tooltip={item.title} />}
//             >
//               {item.icon}
//               <span>{item.title}</span>
//               <ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-open/collapsible:rotate-90" />
//             </CollapsibleTrigger>
//             <CollapsibleContent>
//               <SidebarMenuSub>
//                 {item.items?.map((subItem) => (
//                   <SidebarMenuSubItem key={subItem.title}>
//                     <SidebarMenuSubButton render={<a href={subItem.url} />}>
//                       <span>{subItem.title}</span>
//                     </SidebarMenuSubButton>
//                   </SidebarMenuSubItem>
//                 ))}
//               </SidebarMenuSub>
//             </CollapsibleContent>
//           </Collapsible>
//         ))}
//       </SidebarMenu>
//     </SidebarGroup>
//   )
// }

