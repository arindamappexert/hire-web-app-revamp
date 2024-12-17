// components/header-contents/developers-header.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";

export function DevelopersHeaderContent() {
  return (
    <div className="flex w-full items-center justify-end gap-4 max-w-3xl">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search developers..."
          className="pl-9"
        />
      </div>
      <Button>
        <Plus className="mr-2 h-4 w-4" />
        Add Developer
      </Button>
    </div>
  );
}