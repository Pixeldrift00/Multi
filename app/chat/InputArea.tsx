'use client';

import { useState } from 'react';
import { useChatStore } from '@/lib/store/chat-store';
import { Agent } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send } from 'lucide-react';

interface InputAreaProps {
  threadId: string;
  agents: Agent[];
}

export function InputArea({ threadId, agents }: InputAreaProps) {
  const [content, setContent] = useState('');
  const { sendMessage, isLoading } = useChatStore();
  const managerAgent = agents.find(agent => agent.name === 'manager');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !managerAgent) return;

    await sendMessage(content, threadId, managerAgent.id);
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Type your message... Use @botName to mention agents"
        className="flex-1 min-h-[80px]"
      />
      <Button 
        type="submit" 
        disabled={isLoading || !content.trim()}
        className="self-end"
      >
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
}