export interface Message {
  id: string;
  threadId: string;
  senderId: string;
  content: string;
  mentions: string[];
  createdAt: string;
}

export interface Agent {
  id: string;
  name: string;
  capabilities: Record<string, any>;
  state: Record<string, any>;
}

export interface Task {
  id: string;
  threadId: string;
  originatorId: string;
  assignedTo: string[];
  status: string;
  iterationCount: number;
  maxIterations: number;
  createdAt: string;
  updatedAt: string;
}