// components/header-contents/job-posts-header.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function JobPostsHeaderContent() {
  return (
    <div className="flex items-center gap-4">

      {/* search jobs */}
      <Input
        type="text"
        placeholder="Search by company, job, role"
        className="border border-gray-200 rounded-md p-2 w-80"
      />
      
      <Button>Create New Job</Button>
    </div>
  );
}