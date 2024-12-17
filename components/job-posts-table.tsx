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
import type { Job } from "../types/job"

interface JobTableProps {
    jobs: Job[]
    onSort: (column: string) => void
    sortColumn?: string
    sortDirection?: 'asc' | 'desc'
}

export function JobTable({ jobs, onSort, sortColumn, sortDirection }: JobTableProps) {
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
                {jobs.map((job) => (
                    <TableRow key={job.id}>
                        <TableCell className="font-mono text-sm">{job.id}</TableCell>
                        <TableCell>{job.jobTitle}</TableCell>
                        <TableCell>{job.companyName}</TableCell>
                        <TableCell>
                            <div className="flex -space-x-2">
                                {job.applicants.slice(0, 3).map((applicant, i) => (
                                    <Avatar key={applicant.id} className="border-2 border-background">
                                        <AvatarImage src={applicant.avatar} alt={applicant.name} />
                                        <AvatarFallback>{applicant.name[0]}</AvatarFallback>
                                    </Avatar>
                                ))}
                                {job.applicants.length > 3 && (
                                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-sm">
                                        +{job.applicants.length - 3}
                                    </div>
                                )}
                            </div>
                        </TableCell>
                        <TableCell>{new Date(job.created).toLocaleDateString()}</TableCell>
                        <TableCell>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                        <MoreVertical className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => handleAction('view', job.id)}>
                                        View Job Description
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleAction('shortlist', job.id)}>
                                        Shortlist Profiles
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleAction('close', job.id)}>
                                        Close Hiring
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleAction('pause', job.id)}>
                                        Pause Hiring
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleAction('edit', job.id)}>
                                        Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() => handleAction('delete', job.id)}
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

