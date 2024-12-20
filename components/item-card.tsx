import { Card, CardContent } from "@/components/ui/card"
import { CSS } from "@dnd-kit/utilities"
import { useSortable } from "@dnd-kit/sortable"
import type { Item } from "../types/kanban"

interface ItemCardProps {
  item: Item
  pipelineId: string
  columnId: string
}

export function ItemCard({ item, pipelineId, columnId }: ItemCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: item.id,
    data: {
      type: 'item',
      item,
      pipelineId,
      columnId,
    },
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    touchAction: 'none',
  }

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className="mb-3 cursor-move touch-none border border shadow-sm hover:shadow-md transition-shadow"
      {...attributes}
      {...listeners}
    >
      <CardContent className="p-4 space-y-1">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h4 className="font-medium text-base">{item.title}</h4>
            {item.subtitle && (
              <p className="text-sm text-muted-foreground">{item.subtitle}</p>
            )}
          </div>
          {item.avatar && (
            <img
              src={item.avatar}
              alt=""
              className="h-8 w-8 rounded-full"
            />
          )}
        </div>
        <div className="space-y-2 text-sm">
          {Object.entries(item.content).map(([key, value]) => (
            <div key={key} className="space-y-0.5">
              <span className="text-xs text-muted-foreground uppercase tracking-wider">
                {key}
              </span>
              <p className={value === 'unavailable' ? 'text-muted-foreground' : ''}>
                {value}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

