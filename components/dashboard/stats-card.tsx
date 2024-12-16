import { Card, CardContent } from "@/components/ui/card"
import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Stat } from "@/types/dashboard"

interface StatsCardProps {
  stat: Stat
}

export function StatsCard({ stat }: StatsCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">
            {stat.label}
          </p>
          {stat.change && (
            <div
              className={cn(
                "flex items-center text-xs font-medium",
                stat.change.trend === "up" ? "text-green-600" : "text-red-600"
              )}
            >
              {stat.change.trend === "up" ? (
                <ArrowUpIcon className="mr-1 h-3 w-3" />
              ) : (
                <ArrowDownIcon className="mr-1 h-3 w-3" />
              )}
              {Math.abs(stat.change.value)}%
            </div>
          )}
        </div>
        <div className="mt-2">
          <h2 className="text-3xl font-bold">{stat.value}</h2>
        </div>
      </CardContent>
    </Card>
  )
}

