'use client'

import { useState } from "react"
import { MoreVertical } from 'lucide-react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { JobPost } from "@/types/job-post"


interface JobTableProps {
    jobPosts: JobPost[]
    onSort: (column: string) => void
    sortColumn?: string
    sortDirection?: 'asc' | 'desc'
}

export function JobPostsTable({ jobPosts, onSort, sortColumn, sortDirection }: JobTableProps) {
    const [selectedJob, setSelectedJob] = useState<string | null>(null)

    const handleAction = (action: string, jobId: string) => {
        console.log(`${action} for job ${jobId}`)
        // Implement action handlers
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>
                        <button
                            className="flex items-center space-x-2"
                            onClick={() => onSort('jobTitle')}
                        >
                            Job Title
                            {sortColumn === 'jobTitle' && (
                                <span className="ml-2">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                            )}
                        </button>
                    </TableHead>
                    <TableHead>
                        <button
                            className="flex items-center space-x-2"
                            onClick={() => onSort('companyName')}
                        >
                            Company Name
                            {sortColumn === 'companyName' && (
                                <span className="ml-2">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                            )}
                        </button>
                    </TableHead>
                    <TableHead>Applicants</TableHead>
                    <TableHead>
                        <button
                            className="flex items-center space-x-2"
                            onClick={() => onSort('created')}
                        >
                            Created
                            {sortColumn === 'created' && (
                                <span className="ml-2">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                            )}
                        </button>
                    </TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {jobPosts.map((jobPost) => (
                    <TableRow key={jobPost.id}>
                        <TableCell className="font-mono text-sm">{jobPost.id}</TableCell>
                        <TableCell>{jobPost.title}</TableCell>
                        <TableCell>{jobPost.company?.name}</TableCell>
                        <TableCell>
                            <div className="flex -space-x-2">
                                {jobPost?.applications?.slice(0, 3).map((applicant, i) => (
                                    <Avatar key={applicant.developerId} className="border-2 border-background">
                                        <AvatarImage src={applicant?.developer?.user?.image || ''} alt={applicant?.developer?.user.firstName} />
                                        <AvatarFallback>{applicant?.developer?.user.firstName} {applicant?.developer?.user?.lastName}</AvatarFallback>
                                    </Avatar>
                                ))}
                                {jobPost.applicationsCount > 1 && (
                                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-sm">
                                        +{jobPost.applicationsCount - 1}
                                    </div>
                                )}
                            </div>
                        </TableCell>
                        <TableCell>{new Date(jobPost.workModeId).toLocaleDateString()}</TableCell>
                        <TableCell>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                        <MoreVertical className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => handleAction('view', jobPost.id)}>
                                        View Job Description
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleAction('shortlist', jobPost.id)}>
                                        Shortlist Profiles
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleAction('close', jobPost.id)}>
                                        Close Hiring
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleAction('pause', jobPost.id)}>
                                        Pause Hiring
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleAction('edit', jobPost.id)}>
                                        Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() => handleAction('delete', jobPost.id)}
                                        className="text-destructive"
                                    >
                                        Delete
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

