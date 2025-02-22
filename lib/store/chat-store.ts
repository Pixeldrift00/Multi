'use client';

import { create } from 'zustand';
import { supabase } from '@/lib/supabase/client';

interface Message {
  id: string;
  threadId: string;
  senderId: string;
  content: string;
  mentions: string[];
  createdAt: string;
}

interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  addMessage: (message: Message) => void;
  fetchMessages: (threadId: string) => Promise<void>;
  sendMessage: (content: string, threadId: string, senderId: string) => Promise<void>;
}

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [],
  isLoading: false,
  error: null,

  addMessage: (message) => {
    set((state) => ({
      messages: [...state.messages, message],
    }));
  },

  fetchMessages: async (threadId) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('thread_id', threadId)
        .order('created_at', { ascending: true });

      if (error) throw error;

      set({ messages: data as Message[], isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  sendMessage: async (content, threadId, senderId) => {
    set({ isLoading: true, error: null });
    try {
      // Extract mentions using regex
      const mentions = content.match(/@(\w+)/g)?.map(m => m.slice(1)) || [];
      
      // Get mentioned agent IDs
      const { data: mentionedAgents } = await supabase
        .from('agents')
        .select('id')
        .in('name', mentions);

      const mentionedIds = mentionedAgents?.map(agent => agent.id) || [];

      const { data, error } = await supabase
        .from('messages')
        .insert({
          content,
          thread_id: threadId,
          sender_id: senderId,
          mentions: mentionedIds,
        })
        .select()
        .single();

      if (error) throw error;

      set((state) => ({
        messages: [...state.messages, data as Message],
        isLoading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },
}));