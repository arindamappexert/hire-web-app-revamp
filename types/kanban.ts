export interface Item {
    id: string
    title: string
    subtitle?: string
    content: Record<string, string>
    avatar?: string // Add this line
  }
  
  export interface Column {
    id: string
    title: string
  }
  
  export interface Pipeline {
    id: string
    title: string
    count: number
    items: {
      [columnId: string]: Item[]
    }
  }
  
  export interface KanbanBoardProps {
    pipelines: Pipeline[]
    columns: Column[]
  }
  
  