
import { QueryParams } from "@/lib/api/types";
import { PaginatedResponse } from "./apiResponse";

export interface Developer {
  id: number;
  userId: number;
  tagline: null;
  location: string;
  country: null;
  city: null;
  meetingUrl: null;
  experienceInYears: number;
  professionalSummary: null;
  isProfileCompleted: boolean;
  step: number;
  jobRoleId: number;
  availabilityId: number;
  employmentTypeId: null;
  statusId: null;
  screeningStatusId: number;
  timezoneId: null;
  preferredWorkingHoursId: null;
  rateId: number;
  feedbackId: null;
  skipStep: boolean;
  audit: Audit;
  user: User;
  status: null;
  jobRole: JobRole;
  availability: Availability;
  skills: SkillElement[];
  rate: Rate;
  isCurrentCompanyShortlist: boolean;
}

export interface Audit {
  createdAt: Date;
  updatedAt: Date;
  createdBy: number;
  updatedBy: null;
  deletedAt: null;
}

export interface Availability {
  id: number;
  name: string;
  days: null;
  isCustom: boolean;
  isApproved: boolean;
}

export interface JobRole {
  id: number;
  name: string;
  label: string;
  description: null;
  profileCount: number;
}

export interface Rate {
  developerRateId: number;
  rateTypeId: null;
  rateCurrencyId: null;
  publicVisibility: boolean;
  rate: null;
  minSalary: number;
  maxSalary: number;
  rateType: null;
  rateCurrency: null;
}

export interface SkillElement {
  developerSkillId: number;
  developerId: number;
  skillId: number;
  years: number;
  isTop: boolean;
  skill: ExternalLinkTypeClass;
}

export interface ExternalLinkTypeClass {
  id: number;
  label: string;
  icon: null;
  name?: string;
}

export interface User {
  id: number;
  uniqueId: string;
  email: string;
  firstName: string;
  lastName: null;
  phone: null;
  image: null;
  meetings: any[];
  externalLinks: ExternalLink[];
}

export interface ExternalLink {
  id: number;
  url: string;
  externalLinkTypeId: number;
  userId: number;
  isActive: boolean;
  extras: null;
  externalLinkType: ExternalLinkTypeClass;
}

export interface DeveloperApiResponse extends PaginatedResponse<Developer> {}

export interface DeveloperQueryParams extends QueryParams {
  status?: string;
  availability?: string;
  jobRole?: string;
  minRate?: number;
  maxRate?: number;
  skills?: string[];
}
