"use client";

import { Pipeline } from "@/components/kanban/pipeline";
import { useMounted } from "@/lib/hooks/use-mounted";
import type { Pipeline as PipelineType } from "@/components/kanban/types";

interface KanbanBoardProps {
  pipelines: PipelineType[];
  onUpdate: (pipelines: PipelineType[]) => void;
}

export function KanbanBoard({ pipelines, onUpdate }: KanbanBoardProps) {
  const mounted = useMounted();

  function handleCardsUpdate(
    pipelineId: string,
    columns: PipelineType["columns"]
  ) {
    const newPipelines = pipelines.map((pipeline) => {
      if (pipeline.id === pipelineId) {
        return { ...pipeline, columns };
      }
      return pipeline;
    });
    onUpdate(newPipelines);
  }

  const columnTitles = pipelines[0]?.columns.map(column => ({
    title: column.title,
    count: pipelines.reduce((total, pipeline) => {
      const matchingColumn = pipeline.columns.find(col => col.title === column.title);
      return total + (matchingColumn?.cards.length || 0);
    }, 0)
  })) || [];

  if (!mounted) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4 lg:grid-flow-col lg:auto-cols-fr px-4 py-4 bg-background sticky top-16 border-b">
        {columnTitles.map(({ title, count }) => (
          <div key={title} className="flex items-center justify-between">
            <span className="font-medium">{title}</span>
            <span className="rounded-full bg-secondary px-2 py-1 text-xs">
              {count}
            </span>
          </div>
        ))}
      </div>
      <div className="space-y-4 p-4">
        {pipelines.map((pipeline) => (
          <Pipeline
            key={pipeline.id}
            pipeline={pipeline}
            onCardsUpdate={handleCardsUpdate}
          />
        ))}
      </div>
    </div>
  );
}