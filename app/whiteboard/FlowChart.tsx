'use client';

import { useCallback } from 'react';
import {
  ReactFlow,
  Node,
  Edge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useAgentStore } from '@/lib/store/agent-store';
import { AgentNode } from '@/components/AgentNode';
import { WhiteboardModal } from './WhiteboardModal';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { ErrorMessage } from '@/components/ui/error-message';

const nodeTypes = {
  agent: AgentNode,
};

export function FlowChart() {
  const { agents, isLoading, error } = useAgentStore();
  
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  // Convert agents to nodes
  const initialNodes: Node[] = agents.map((agent, index) => ({
    id: agent.id,
    type: 'agent',
    data: { agent },
    position: {
      x: Math.cos(index * (2 * Math.PI / agents.length)) * 200 + 400,
      y: Math.sin(index * (2 * Math.PI / agents.length)) * 200 + 300,
    },
  }));

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onConnect = useCallback((params: any) => {
    setEdges((eds) => addEdge(params, eds));
  }, [setEdges]);

  return (
    <div className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
      <WhiteboardModal />
    </div>
  );
}