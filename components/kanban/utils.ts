import type { Pipeline, Card } from "./types";

export function findCardById(pipeline: Pipeline, cardId: string): Card | null {
  for (const column of pipeline.columns) {
    const card = column.cards.find((c) => c.id === cardId);
    if (card) return card;
  }
  return null;
}

export function findColumnByCardId(pipeline: Pipeline, cardId: string) {
  return pipeline.columns.find((column) =>
    column.cards.some((card) => card.id === cardId)
  );
}