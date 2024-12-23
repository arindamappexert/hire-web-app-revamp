"use client";

import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { KanbanCard } from "./card";
import type { Column as ColumnType } from "@/components/kanban/types";

interface ColumnProps {
  column: ColumnType;
}

export function Column({ column }: ColumnProps) {
  const { setNodeRef } = useDroppable({
    id: column.id,
    data: {
      type: "column",
    },
  });

  return (
    <div
      ref={setNodeRef}
      className="flex-1 rounded-lg border bg-muted/50 p-2"
    >
      <SortableContext
        items={column.cards.map((card) => card.id)}
        strategy={verticalListSortingStrategy}
      >
        {column.cards.map((card) => (
          <KanbanCard key={card.id} card={card} />
        ))}
      </SortableContext>
    </div>
  );
}