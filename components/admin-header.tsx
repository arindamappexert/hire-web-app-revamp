// components/admin-header.tsx
"use client";

import { usePathname } from "next/navigation";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { headerRegistry } from "@/config/header-registry";

interface AdminHeaderProps {
  className?: string;
}

export default function AdminHeader({ className }: AdminHeaderProps) {
  const pathname = usePathname();
  const HeaderContent = headerRegistry[pathname];

  return (
    <header 
      className={cn(
        "sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 shadow-sm",
        className
      )}
    >
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <h1 className="text-lg font-semibold">Admin Dashboard</h1>
      </div>

      <div className="flex flex-1 items-center justify-end gap-4">
        <Suspense fallback={<Skeleton className="h-10 w-full max-w-sm" />}>
          {HeaderContent && <HeaderContent />}
        </Suspense>
      </div>
    </header>
  );
}