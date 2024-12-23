import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function DashboardLoading() {
  return (
    <div className="p-6 space-y-6">
      <div className="grid gap-6 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <Skeleton className="h-4 w-[120px]" />
              <Skeleton className="h-8 w-[80px] mt-2" />
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <Skeleton className="h-5 w-[140px]" />
          <Skeleton className="h-10 w-[120px]" />
        </CardHeader>
        <CardContent>
          <div className="flex justify-between gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center space-y-2 flex-1">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-8 w-12" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <div className="grid gap-6 md:grid-cols-2">
        {Array.from({ length: 2 }).map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-5 w-[200px]" />
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {Array.from({ length: 5 }).map((_, j) => (
                  <div key={j} className="flex items-center justify-between p-4">
                    <Skeleton className="h-4 w-[140px]" />
                    <Skeleton className="h-4 w-[60px]" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

