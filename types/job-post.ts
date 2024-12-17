import { PaginatedResponse } from "@/types/apiResponse";

export interface JobPostStatus {
    id: number;
    label: string;
    order: number;
    audit: Audit;
    jobPostsCount: number;
}

export interface Audit {
    createdAt: Date;
    updatedAt: Date;
    createdBy: null;
    updatedBy: null;
    deletedAt: null;
}


export interface JobPost {
    id: string;
    title: string;
    slug: string;
    description: string;
    seniorityLevelId: number;
    employmentTypeId: number;
    workModeId: number;
    salaryRangeId: number;
    statusId: number;
    locationId: number;
    companyId: number;
    pipelineId: number;
    audit: Audit;
    company: Company;
    status: Pick<JobPostStatus, 'id' | 'label'>;
    applications: any[];
    applicationsCount: number;
}

export interface Company {
    id: number;
    name: string;
    location: string;
    country: null;
    city: null;
    description: null;
    representer: null;
    phone: null;
    foundedIn: null;
    logo: null;
    url: null;
    meetingLink: null;
    isActive: boolean;
    isProfileCompleted: boolean;
    skipStep: boolean;
    step: number;
    companySizeId: null;
    timezoneId: null;
    hiringProcessId: null;
    benefits: any[];
    industries: any[];
    companySize: null;
}




export type JobPostStatusListResponse = JobPostStatus[];

export interface JobPostListResponse extends PaginatedResponse<JobPost[]> { }