'use client';

import { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { useAgentStore } from '@/lib/store/agent-store';
import { Agent } from '@/lib/types';
import { Bot } from 'lucide-react';

interface AgentNodeProps {
  data: {
    agent: Agent;
  };
}

export const AgentNode = memo(({ data }: AgentNodeProps) => {
  const { selectAgent } = useAgentStore();
  const { agent } = data;

  return (
    <div
      className="bg-card border border-border rounded-lg p-4 shadow-lg cursor-pointer"
      onClick={() => selectAgent(agent)}
    >
      <Handle type="target" position={Position.Top} />
      <div className="flex items-center gap-2">
        <Bot className="h-5 w-5 text-primary" />
        <span className="font-semibold">{agent.name}</span>
      </div>
      <div className="mt-2 text-sm text-muted-foreground">
        {Object.keys(agent.capabilities).length} capabilities
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
});

AgentNode.displayName = 'AgentNode';