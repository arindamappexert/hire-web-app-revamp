"use client";

import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronRight } from "lucide-react";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  pointerWithin,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
} from "@dnd-kit/core";
import type { Pipeline as PipelineType } from "@/components/kanban/types";
import { Column } from "@/components/kanban/column";
import { KanbanCard } from "@/components/kanban/card";
import { findCardById, findColumnByCardId } from "@/components/kanban/utils";

interface PipelineProps {
  pipeline: PipelineType;
  onCardsUpdate: (pipelineId: string, columns: PipelineType["columns"]) => void;
}

export function Pipeline({ pipeline, onCardsUpdate }: PipelineProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [activeCard, setActiveCard] = useState<any>(null);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );

  const totalCards = pipeline.columns.reduce(
    (sum, column) => sum + column.cards.length,
    0
  );

  function handleDragStart(event: any) {
    const { active } = event;
    const card = findCardById(pipeline, active.id);
    setActiveCard(card);
  }

  function handleDragOver(event: any) {
    const { active, over } = event;
    if (!over) return;

    const activeColumn = findColumnByCardId(pipeline, active.id);
    const overColumn = pipeline.columns.find((col) => col.id === over.id);

    if (!activeColumn || !overColumn || activeColumn === overColumn) return;

    const activeCards = [...activeColumn.cards];
    const overCards = [...overColumn.cards];
    const activeCardIndex = activeCards.findIndex((card) => card.id === active.id);
    const activeCard = activeCards[activeCardIndex];

    activeCards.splice(activeCardIndex, 1);
    overCards.push(activeCard);

    const newColumns = pipeline.columns.map((col) => {
      if (col.id === activeColumn.id) {
        return { ...col, cards: activeCards };
      }
      if (col.id === overColumn.id) {
        return { ...col, cards: overCards };
      }
      return col;
    });

    onCardsUpdate(pipeline.id, newColumns);
  }

  function handleDragEnd(event: any) {
    setActiveCard(null);
    const { active, over } = event;
    if (!over) return;

    const activeColumn = findColumnByCardId(pipeline, active.id);
    if (!activeColumn) return;

    const activeCards = [...activeColumn.cards];
    const activeCardIndex = activeCards.findIndex((card) => card.id === active.id);
    const overCardIndex = activeCards.findIndex((card) => card.id === over.id);

    if (activeCardIndex !== overCardIndex) {
      const [movedCard] = activeCards.splice(activeCardIndex, 1);
      activeCards.splice(overCardIndex, 0, movedCard);

      const newColumns = pipeline.columns.map((col) => {
        if (col.id === activeColumn.id) {
          return { ...col, cards: activeCards };
        }
        return col;
      });

      onCardsUpdate(pipeline.id, newColumns);
    }
  }

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="mb-4">
      <CollapsibleTrigger className="flex w-full items-center gap-2 rounded-lg border bg-card p-4 font-medium hover:bg-accent">
        <ChevronRight
          className={`h-4 w-4 transition-transform ${
            isOpen ? "rotate-90" : ""
          }`}
        />
        <span className="flex-1 text-left">{pipeline.title}</span>
        <span className="rounded-full bg-primary/10 px-2 py-1 text-xs">
          {totalCards} cards
        </span>
      </CollapsibleTrigger>
      <CollapsibleContent className="pt-4">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:auto-cols-fr lg:lg:grid-flow-col">
            {pipeline.columns.map((column) => (
              <Column key={column.id} column={column} />
            ))}
          </div>
          <DragOverlay>
            {activeCard ? <KanbanCard card={activeCard} /> : null}
          </DragOverlay>
        </DndContext>
      </CollapsibleContent>
    </Collapsible>
  );
}