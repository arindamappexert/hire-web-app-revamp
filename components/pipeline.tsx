import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "@/components/ui/collapsible"
  import { ChevronRight } from 'lucide-react'
  import { KanbanColumn } from "./kanban-column"
  import type { Column, Pipeline } from "../types/kanban"
  
  interface PipelineProps {
    pipeline: Pipeline
    columns: Column[]
  }
  
  export function Pipeline({ pipeline, columns }: PipelineProps) {
    return (
      <Collapsible>
        <CollapsibleTrigger className="flex w-full items-center gap-2 p-2 hover:bg-accent rounded-lg group">
          <ChevronRight className="h-4 w-4 shrink-0 transition-transform duration-200 text-muted-foreground group-data-[state=open]:rotate-90" />
          <span className="font-medium">{pipeline.title}</span>
          <span className="text-sm text-muted-foreground">
            {pipeline.count} {pipeline.count === 1 ? 'candidate' : 'candidates'}
          </span>
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-2">
          <div className="flex gap-4 overflow-x-auto">
            {columns.map((column) => (
              <KanbanColumn
                key={`${pipeline.id}-${column.id}`}
                id={`${pipeline.id}-${column.id}`}
                pipelineId={pipeline.id}
                columnId={column.id}
                items={pipeline.items[column.id] || []}
              />
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    )
  }
  
  