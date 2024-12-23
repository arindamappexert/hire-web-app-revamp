'use client'

import { Search } from 'lucide-react'
import { Input } from "@/components/ui/input"

interface SearchBarProps {
    onSearch: (query: string) => void
}

export default function SearchBar({ onSearch }: SearchBarProps) {
    return (
        <div className="flex items-center justify-between w-full gap-4">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    placeholder="Search by Company, Job, Role"
                    className="pl-9"
                    onChange={(e) => onSearch(e.target.value)}
                />
            </div>
        </div>
    )
}

