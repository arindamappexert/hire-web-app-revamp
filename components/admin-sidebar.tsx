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

import { NavAdmin } from "@/components/nav-admin";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { useUserStore } from "@/stores/useUserStore";
import { User } from "@/types/auth";
import { useAuth } from "@/hooks/useAuth";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: SquareTerminal,
    },
    {
      title: "Pipeline",
      url: "/admin/pipeline",
      icon: Bot,
    },
    {
      title: "Developers",
      url: "/admin/developers",
      icon: BookOpen,
    },
    {
      title: "Companies",
      url: "/admin/companies",
      icon: SquareMenuIcon,
    },
    {
      title: "Job Posts",
      url: "/admin/job-posts",
      icon: Briefcase,
    },
    {
      title: "Collections",
      url: "/admin/collections",
      icon: Settings2,
    },
    {
      title: "Skills",
      url: "/admin/skills",
      icon: Settings2,
    },
    {
      title: "Settings",
      url: "/admin/settings",
      icon: Settings2Icon,
    },
  ],
};

export function AdminSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { user } = useUserStore();
  const { logout } = useAuth();
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
        <NavAdmin projects={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        {user && <NavUser user={user as User} onLogout={() => logout()} />}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
