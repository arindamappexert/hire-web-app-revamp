export interface Stat {
  label: string;
  value: number | string;
  change?: {
    value: number;
    trend: string;
  };
}

export interface PipelineStage {
  label: string;
  value: number;
}

export interface CountItem {
  label: string;
  value: number;
}
