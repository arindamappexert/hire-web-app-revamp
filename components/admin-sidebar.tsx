"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Briefcase,
  Command,
  GalleryVerticalEnd,
  Settings2,
  Settings2Icon,
  SquareMenuIcon,
  SquareTerminal,
} from "lucide-react";

import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import Image from "next/image";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: SquareTerminal,
    },
    {
      title: "Pipeline",
      url: "#",
      icon: Bot,
    },
    {
      title: "Developers",
      url: "#",
      icon: BookOpen,
    },
    {
      title: "Companies",
      url: "#",
      icon: SquareMenuIcon,
    },
    {
      title: "Job Posts",
      url: "#",
      icon: Briefcase,
    },
    {
      title: "Collections",
      url: "#",
      icon: Settings2,
    },
    {
      title: "Skills",
      url: "#",
      icon: Settings2,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2Icon,
    },
  ],
};

export function AdminSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <div className="p-4">
        <Image
          src="/images/appexert-logo.svg"
          alt="logo"
          width={100}
          height={50}
        />
      </div>
      <SidebarHeader></SidebarHeader>
      <SidebarContent>
        <NavProjects projects={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
