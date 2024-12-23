"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Card as CardType } from "@/components/kanban/types";

interface KanbanCardProps {
  card: CardType;
}

export function KanbanCard({ card }: KanbanCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: card.id,
    data: {
      type: "card",
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Card className="mb-2 cursor-move hover:border-primary/50">
        <CardHeader className="p-3">
          <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
        </CardHeader>
        {card.description && (
          <CardContent className="p-3 pt-0 text-sm text-muted-foreground">
            {card.description}
          </CardContent>
        )}
      </Card>
    </div>
  );
}