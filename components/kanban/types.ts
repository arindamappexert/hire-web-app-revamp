export interface Card {
    id: string;
    title: string;
    description?: string;
  }
  
  export interface Column {
    id: string;
    title: string;
    cards: Card[];
  }
  
  export interface Pipeline {
    id: string;
    title: string;
    columns: Column[];
  }