"use client"

import { useState } from "react"
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { Pipeline } from "./pipeline"
import type { KanbanBoardProps, Pipeline as PipelineType } from "../types/kanban"

export function KanbanBoard({ pipelines: initialPipelines, columns }: KanbanBoardProps) {
  const [pipelines, setPipelines] = useState(initialPipelines)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  )

  // Calculate total items per column across all pipelines
  const columnTotals = columns.reduce((acc, column) => {
    acc[column.id] = pipelines.reduce((sum, pipeline) => 
      sum + (pipeline.items[column.id]?.length || 0), 0
    )
    return acc
  }, {} as Record<string, number>)

  function handleDragStart(event: DragStartEvent) {
    const { active } = event
    const [pipelineId] = active.data.current?.sortable.containerId.split("-") || []
    document.body.style.cursor = 'grabbing'
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event
    if (!over || !active) return

    const activeId = active.id
    const overId = over.id

    if (activeId === overId) return

    const activeData = active.data.current
    const overData = over.data.current

    if (!activeData) return

    const activePipelineId = activeData.pipelineId
    const activeColumnId = activeData.columnId

    // Handle dropping on a column
    if (typeof overId === 'string' && overId.includes('-')) {
      const [overPipelineId, overColumnId] = overId.split('-')

      // Prevent dragging between different pipelines
      if (activePipelineId !== overPipelineId) return

      setPipelines((prevPipelines) => {
        const updatedPipelines = [...prevPipelines]
        const activePipeline = updatedPipelines.find((p) => p.id === activePipelineId)
        if (!activePipeline) return prevPipelines

        const activeItems = [...(activePipeline.items[activeColumnId] || [])]
        const overItems = [...(activePipeline.items[overColumnId] || [])]

        const activeIndex = activeItems.findIndex((item) => item.id === activeId)
        
        if (activeIndex !== -1) {
          const [movedItem] = activeItems.splice(activeIndex, 1)
          activePipeline.items[activeColumnId] = activeItems
          activePipeline.items[overColumnId] = [...overItems, movedItem]
        }

        return updatedPipelines
      })
    } else {
      // Handle dropping on another item
      const overPipelineId = overData?.pipelineId
      const overColumnId = overData?.columnId

      if (!overPipelineId || !overColumnId || activePipelineId !== overPipelineId) return

      setPipelines((prevPipelines) => {
        const updatedPipelines = [...prevPipelines]
        const activePipeline = updatedPipelines.find((p) => p.id === activePipelineId)
        if (!activePipeline) return prevPipelines

        const activeItems = [...(activePipeline.items[activeColumnId] || [])]
        const overItems = [...(activePipeline.items[overColumnId] || [])]

        const activeIndex = activeItems.findIndex((item) => item.id === activeId)
        const overIndex = overItems.findIndex((item) => item.id === overId)

        if (activeColumnId === overColumnId) {
          // Reordering within the same column
          if (activeIndex !== -1) {
            activePipeline.items[activeColumnId] = arrayMove(activeItems, activeIndex, overIndex)
          }
        } else {
          // Moving to a different column
          if (activeIndex !== -1) {
            const [movedItem] = activeItems.splice(activeIndex, 1)
            overItems.splice(overIndex + 1, 0, movedItem)
            activePipeline.items[activeColumnId] = activeItems
            activePipeline.items[overColumnId] = overItems
          }
        }

        return updatedPipelines
      })
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    document.body.style.cursor = ''
    handleDragOver(event as DragOverEvent)
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="space-y-6">
        {/* Column headers */}
        <div className="flex gap-4">
          {columns.map((column) => (
            <div key={column.id} className="min-w-[280px] px-2 bg-white py-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">{column.title}</h3>
                <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium">
                  {columnTotals[column.id]}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Pipelines */}
        <div className="space-y-1">
          {pipelines.map((pipeline) => (
            <Pipeline key={pipeline.id} pipeline={pipeline} columns={columns} />
          ))}
        </div>
      </div>
    </DndContext>
  )
}

