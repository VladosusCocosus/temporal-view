export interface WorkflowEntry {
  workflowId: string;
  namespace: string;
  element: HTMLElement;
}

export type PanelSide = 'right' | 'left';

export interface TemporalDevtoolsProps {
  baseUrl: string;
  namespace?: string;
  position?: 'bottom-right' | 'bottom-left';
  defaultSide?: PanelSide;
}
