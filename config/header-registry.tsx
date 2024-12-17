import { DevelopersHeaderContent } from "@/components/header-contents/developers-header";
import { JobPostsHeaderContent } from "@/components/header-contents/job-posts-header";

export const headerRegistry: Record<string, React.ComponentType> = {
  "/admin/developers": DevelopersHeaderContent,
  "/admin/job-posts": JobPostsHeaderContent,
};
