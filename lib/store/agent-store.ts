'use client';

import { create } from 'zustand';
import { supabase } from '@/lib/supabase/client';

interface Agent {
  id: string;
  name: string;
  capabilities: Record<string, any>;
  state: Record<string, any>;
}

interface AgentState {
  agents: Agent[];
  selectedAgent: Agent | null;
  isLoading: boolean;
  error: string | null;
  fetchAgents: () => Promise<void>;
  selectAgent: (agent: Agent) => void;
  updateAgentState: (agentId: string, newState: Record<string, any>) => Promise<void>;
}

export const useAgentStore = create<AgentState>((set, get) => ({
  agents: [],
  selectedAgent: null,
  isLoading: false,
  error: null,

  fetchAgents: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('agents')
        .select('*')
        .order('name');

      if (error) throw error;

      set({ agents: data as Agent[], isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  selectAgent: (agent) => {
    set({ selectedAgent: agent });
  },

  updateAgentState: async (agentId, newState) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('agents')
        .update({ state: newState })
        .eq('id', agentId)
        .select()
        .single();

      if (error) throw error;

      set((state) => ({
        agents: state.agents.map(agent => 
          agent.id === agentId ? { ...agent, state: newState } : agent
        ),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },
}));