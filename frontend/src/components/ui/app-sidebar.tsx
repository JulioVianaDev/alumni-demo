"use client";

import * as React from "react";
import {
    AudioWaveform,
    BookOpen,
    Command,
    Frame,
    GalleryVerticalEnd,
    LayoutDashboardIcon,
    Map,
    PieChart,
    School2,
    User2Icon,
    Anchor,
    GraduationCapIcon,
    Calendar,
    Settings,
    Database,
    BarChart,
    Brain,
} from "lucide-react";
import { useLocation } from "@tanstack/react-router";
import { useUserStore } from "@/zustand/user.store";
import { RoleType } from "@global-types/user";

import { NavProjects } from "@/components/nav-projects";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { NavMain } from "../nav-main";

// Add role permissions to navigation items
const data = {
    
    navMain: [
        // {
        //     title: "Escolas",
        //     url: "schools",
        //     icon: School2,
        //     isActive: true,
        //     allowedRoles: ["ADMIN", "SECRETARY"] as RoleType[],
        //     items: [
        //         {
        //             title: "Escolas",
        //             url: "/schools",
        //             allowedRoles: [
        //                 "ADMIN",
        //                 "SECRETARY",
        //             ] as RoleType[],
        //         },
        //         {
        //             title: "Turmas",
        //             url: "/classrooms",
        //             allowedRoles: [
        //                 "ADMIN",
        //                 "SECRETARY",
        //                 "TEACHER",
        //             ] as RoleType[],
        //         },
        //     ],
        // },
        {
            title: "Agendamento",
            url: "#",
            icon: Calendar,
            allowedRoles: ["ADMIN", "USER"] as RoleType[],
            items: [
                {
                    title: "Calendário",
                    url: "/calendar",
                    allowedRoles: [
                        "ADMIN",
                        "USER",
                    ] as RoleType[],
                },
                {
                    title: "Chat",
                        url: "/chat",
                    allowedRoles: [
                            "ADMIN",
                            "USER",
                        ] as RoleType[],
                },

            ],
        },
        {
            title:"Relatórios",
            url: "/reports",
            icon: BarChart,
            allowedRoles: ["ADMIN", "USER"] as RoleType[],
            items: [
                {
                    title: "Agendamentos",
                    url: "/reports/appointments",
                    allowedRoles: ["ADMIN", "USER"] as RoleType[],
                },
                {
                    title: "Mensagens",
                    url: "/reports/messages",
                    allowedRoles: ["ADMIN", "USER"] as RoleType[],
                }
            ]
        },
        {
            title: "Área do Vendedor",
            url: "/seller",
            icon: User2Icon,
            allowedRoles: ["ADMIN", "USER"] as RoleType[],
            items: [
                {
                    title: "Vendas",
                    url: "/seller/sales",
                    allowedRoles: ["ADMIN", "USER"] as RoleType[],
                },
                {
                    title: "Criação de cupom",
                    url: "/seller/create-coupons",
                    allowedRoles: ["ADMIN", "USER"] as RoleType[],
                },
                {
title: "Pagamentos",
url: "/seller/payments",
allowedRoles: ["ADMIN", "USER"] as RoleType[],
                }
            ]
        },
         {
        title: "Inteligência Artificial",
        url: "/ai",
        icon: Brain,
        allowedRoles: ["ADMIN", "USER"] as RoleType[],
        items: [
            {
                title: "Assistentes",
                url: "/ai/assistants",
                allowedRoles: ["ADMIN", "USER"] as RoleType[],
            },
            {
                title: "Integrações",
                url: "/ai/integrations",
                allowedRoles: ["ADMIN", "USER"] as RoleType[],
            }
        ]
    },
   
      {
        title: "Configurações",
        url: "/settings",
        icon: Settings,
        allowedRoles: ["ADMIN", "USER"] as RoleType[],
        items: [
         {
            title: "E-mails",
            url: "/settings/emails",
            allowedRoles: ["ADMIN", "USER"] as RoleType[],
         },
         {
            title: "Whatsapp",
            url: "/settings/whatsapp",
            allowedRoles: ["ADMIN", "USER"] as RoleType[],
         },
         {
            title: "Meus pagamentos",
            url: "/settings/my-payments",
            allowedRoles: ["ADMIN", "USER"] as RoleType[],
         }
        ]
    },
    {
        title: "Administrativo",
        url: "/administrative",
        icon: Database,
        allowedRoles: ["ADMIN", "USER"] as RoleType[],
        items: [
         {
            title: "Logs",
            url: "/logs",
            allowedRoles: ["ADMIN", "USER"] as RoleType[],
         },
         {
            title: "Pagamentos",
            url: "/payments",
            allowedRoles: ["ADMIN", "USER"] as RoleType[],
         },
         {
            title: "Dashboard",
            url: "/adm/dashboard",
            allowedRoles: ["ADMIN", "USER"] as RoleType[],
         }
        ]
    },
    ],
    projects: [
        // {
        //     name: "Design Engineering",
        //     url: "#",
        //     icon: Frame,
        //     allowedRoles: ["ADMIN"] as RoleType[],
        // },
    ],
};

const hasAccess = (
    allowedRoles: RoleType[] | undefined,
    userRole: RoleType | undefined,
): boolean => {
    if (!allowedRoles || allowedRoles.length === 0) return true;
    if (!userRole) return false;
    return allowedRoles.includes(userRole);
};

const filterNavItems = (
    items: any[],
    userRole: RoleType | undefined,
) => {
    return items.filter((item) => {
        const hasItemAccess = hasAccess(item.allowedRoles, userRole);
        if (!hasItemAccess) return false;

        if (item.items) {
            item.items = item.items.filter((subItem: any) =>
                hasAccess(subItem.allowedRoles, userRole),
            );
        }

        return true;
    });
};

export function AppSidebar({
    ...props
}: React.ComponentProps<typeof Sidebar>) {
   
    const { pathname } = useLocation();
    const user = useUserStore((state) => state.userAuth);

    const isCalendarPage = pathname === "/calendar";

    const filteredNavMain = React.useMemo(() => {
        return filterNavItems(data.navMain, user?.role);
    }, [user?.role]);

    const filteredProjects = React.useMemo(() => {
        return filterNavItems(data.projects, user?.role);
    }, [user?.role]);

    return (
        <div className="relative">
            <Sidebar
                collapsible="icon"
                {...props}
            >
                <div className="w-full flex justify-start items-center border-b">
                    <SidebarTrigger />
                </div>
                {/*
                 <SidebarHeader>
                    <TeamSwitcher teams={data.teams} />
                </SidebarHeader>
                */}
                <SidebarContent>
                    <NavMain items={filteredNavMain} />
                    {/* <NavProjects projects={filteredProjects} /> */}
                    {/* <SidebarGroup className="px-1">
                        {isCalendarPage ? <SidebarCalendar /> : null}
                    </SidebarGroup>
                    {isCalendarPage && (
                        <SidebarGroup className="px-1 mt-3 pt-4 border-t">
                            <SidebarGroupLabel className="uppercase text-muted-foreground/65">
                                Calendars
                            </SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {etiquettes.map((item) => (
                                        <SidebarMenuItem
                                            key={item.id}
                                        >
                                            <SidebarMenuButton
                                                asChild
                                                className="relative rounded-md [&>svg]:size-auto justify-between has-focus-visible:border-ring has-focus-visible:ring-ring/50 has-focus-visible:ring-[3px]"
                                            >
                                                <span>
                                                    <span className="font-medium flex items-center justify-between gap-3">
                                                        <Checkbox
                                                            id={
                                                                item.id
                                                            }
                                                            className="sr-only peer"
                                                            checked={isColorVisible(
                                                                item.color,
                                                            )}
                                                            onCheckedChange={() =>
                                                                toggleColorVisibility(
                                                                    item.color,
                                                                )
                                                            }
                                                        />
                                                        <RiCheckLine
                                                            className="peer-not-data-[state=checked]:invisible"
                                                            size={16}
                                                            aria-hidden="true"
                                                        />
                                                        <label
                                                            htmlFor={
                                                                item.id
                                                            }
                                                            className="peer-not-data-[state=checked]:line-through peer-not-data-[state=checked]:text-muted-foreground/65 after:absolute after:inset-0"
                                                        >
                                                            {
                                                                item.name
                                                            }
                                                        </label>
                                                    </span>
                                                    <span
                                                        className="size-1.5 rounded-full bg-(--event-color)"
                                                        style={
                                                            {
                                                                "--event-color": `var(--color-${item.color}-400)`,
                                                            } as React.CSSProperties
                                                        }
                                                    ></span>
                                                </span>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    )} */}
                </SidebarContent>
            </Sidebar>
        </div>
    );
}
