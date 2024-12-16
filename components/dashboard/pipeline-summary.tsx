import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  import { PipelineStage } from "@/types/dashboard"
  
  interface PipelineSummaryProps {
    stages: PipelineStage[]
  }
  
  export function PipelineSummary({ stages }: PipelineSummaryProps) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Pipeline summary</CardTitle>
          <Select defaultValue="ATT">
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Select view" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ATT">ATT</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between gap-4">
            {stages.map((stage) => (
              <div
                key={stage.label}
                className="flex flex-col items-center space-y-2 flex-1"
              >
                <span className="text-sm font-medium text-muted-foreground">
                  {stage.label}
                </span>
                <span className="text-2xl font-bold">{stage.value}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }
  
  