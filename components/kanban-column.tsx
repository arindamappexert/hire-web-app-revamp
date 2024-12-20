import { useDroppable } from "@dnd-kit/core"
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import type { Item } from "../types/kanban"
import { ItemCard } from "./item-card"

interface KanbanColumnProps {
  id: string
  pipelineId: string
  columnId: string
  items: Item[]
}

export function KanbanColumn({ id, pipelineId, columnId, items }: KanbanColumnProps) {
  const { setNodeRef } = useDroppable({ 
    id,
    data: {
      type: 'column',
      pipelineId,
      columnId,
    }
  })

  return (
    <div className="min-w-[280px] px-2 bg-white">
      <div 
        ref={setNodeRef} 
        className="space-y-2 min-h-[200px] rounded-lg bg-background/50 p-2"
      >
        <SortableContext
          items={items}
          strategy={verticalListSortingStrategy}
        >
          {items.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              pipelineId={pipelineId}
              columnId={columnId}
            />
          ))}
        </SortableContext>
      </div>
    </div>
  )
}

