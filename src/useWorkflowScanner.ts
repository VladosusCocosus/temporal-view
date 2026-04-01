import { useEffect, useState, useCallback } from 'react';
import type { WorkflowEntry } from './types';

const ATTR_WORKFLOW_ID = 'temporal-workflow-id';
const ATTR_NAMESPACE = 'temporal-namespace';

export function useWorkflowScanner(defaultNamespace: string): WorkflowEntry[] {
  const [entries, setEntries] = useState<WorkflowEntry[]>([]);

  const scan = useCallback(() => {
    const elements = document.querySelectorAll<HTMLElement>(`[${ATTR_WORKFLOW_ID}]`);
    const next: WorkflowEntry[] = [];
    elements.forEach((element) => {
      const workflowId = element.getAttribute(ATTR_WORKFLOW_ID);
      if (!workflowId) return;
      const namespace = element.getAttribute(ATTR_NAMESPACE) || defaultNamespace;
      next.push({ workflowId, namespace, element });
    });
    setEntries(next);
  }, [defaultNamespace]);

  useEffect(() => {
    scan();

    const observer = new MutationObserver(scan);
    observer.observe(document.body, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: [ATTR_WORKFLOW_ID, ATTR_NAMESPACE],
    });

    return () => observer.disconnect();
  }, [scan]);

  return entries;
}
