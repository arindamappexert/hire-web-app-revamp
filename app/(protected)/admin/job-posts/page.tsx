'use client'

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { JobPostsTable } from "@/components/job-posts-table"
import { useJobPosts } from "@/hooks/api/useJobPosts"
import { cn } from "@/lib/utils"



export default function JobPostsPage() {
    const [activeTab, setActiveTab] = useState<string>('1');
    const [sortColumn, setSortColumn] = useState<string>()
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>()

    const {
        useJobPostStatuses,
        useGetAll
    } = useJobPosts();

    const { data: jobPostStatuses } = useJobPostStatuses();

    const { data: jobPosts } = useGetAll({

        expand: ['company', 'status', 'applications'],
        filters: {
            statusId: activeTab,
        },
        sortBy: sortColumn ? `${sortColumn}:${sortDirection}` : undefined,
        page: 1,
        limit: 20,
        order: 'desc'
    });

    const handleSort = (column: string) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
        } else {
            setSortColumn(column)
            setSortDirection('asc')
        }
    }

    return (
        <div className="container py-6 space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="flex items-center justify-start bg-background border-b">
                    {jobPostStatuses?.sort((a, b) => a.order - b.order)
                        .map(({ label, order }, index) => (
                            <TabsTrigger
                                key={index}
                                value={String(order)}
                                className={cn('')}
                            >
                                <span className="ml-2 text-xs">{label}</span>
                            </TabsTrigger>
                        ))}
                </TabsList>

                <TabsContent value={activeTab}>

                    <JobPostsTable
                        jobPosts={jobPosts?.data || []}
                        onSort={handleSort}
                    />

                </TabsContent>

            </Tabs>
        </div>
    )
}

