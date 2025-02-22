'use client';

import { useState, useEffect, useRef } from 'react';
import { useChatStore } from '@/lib/store/chat-store';
import { useAgentStore } from '@/lib/store/agent-store';
import { MessageList } from './MessageList';
import { InputArea } from './InputArea';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { ErrorMessage } from '@/components/ui/error-message';

export function ChatBox() {
  const [threadId] = useState(() => crypto.randomUUID());
  const { messages, fetchMessages, isLoading, error } = useChatStore();
  const { agents, fetchAgents, isLoading: isLoadingAgents, error: agentError } = useAgentStore();
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchMessages(threadId);
    fetchAgents();
  }, [threadId, fetchMessages, fetchAgents]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (isLoading || isLoadingAgents) {
    return <LoadingSpinner />;
  }

  if (error || agentError) {
    return <ErrorMessage message={error || agentError || 'An error occurred'} />;
  }

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="flex-1 overflow-y-auto p-4">
        <MessageList messages={messages} agents={agents} />
        <div ref={chatEndRef} />
      </div>
      <div className="border-t border-border p-4">
        <InputArea threadId={threadId} agents={agents} />
      </div>
    </div>
  );
}