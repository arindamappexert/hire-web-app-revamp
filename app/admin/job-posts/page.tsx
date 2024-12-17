'use client'

import { useState } from "react"
import SearchBar from "@/components/search-bar"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { JobTable } from "@/components/job-posts-table"
import { useJobPosts } from "@/hooks/api/useJobPosts"



export default function JobPostsPage() {
    const [activeTab, setActiveTab] = useState<string>('1');
    const [sortColumn, setSortColumn] = useState<string>()
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>()
    const [searchQuery, setSearchQuery] = useState('')

    const {
        useJobPostStatuses,
        useGetAll
    } = useJobPosts();

    const { data: jobPostStatuses } = useJobPostStatuses()

    const handleSort = (column: string) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
        } else {
            setSortColumn(column)
            setSortDirection('asc')
        }
    }

    const handleSearch = (query: string) => {
        setSearchQuery(query)
    }

    const handleCreateJob = () => {
        // Implement job creation logic
        console.log('Create new job')
    }

    return (
        <div className="container py-6 space-y-6">


            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="flex h-10 items-center justify-start p-1 bg-background border-b">
                    {jobPostStatuses?.sort((a, b) => a.order - b.order)
                        .map(({ label, jobPostsCount, order }, index) => (
                            <TabsTrigger
                                key={index}
                                value={String(order)}
                                className={`flex-1 px-3 py-1.5 text-sm font-medium transition-all
                data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary
                focus:z-10 focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:outline-none
                ${String(order) === activeTab ? 'text-primary' : 'text-muted-foreground'}`}
                            >

                                <span className="ml-2 text-xs">{label}</span>
                            </TabsTrigger>
                        ))}
                </TabsList>

            </Tabs>
        </div>
    )
}

