'use client';

import { Message } from '@/lib/types';
import { format } from 'date-fns';
import { useAgentStore } from '@/lib/store/agent-store';

interface ThreadDetailsProps {
  messages: Message[];
}

export function ThreadDetails({ messages }: ThreadDetailsProps) {
  const { agents } = useAgentStore();

  const getAgentName = (id: string) => {
    return agents.find(agent => agent.id === id)?.name || 'Unknown Agent';
  };

  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className="bg-accent/50 rounded-lg p-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="font-semibold text-primary">
              {getAgentName(message.senderId)}
            </span>
            <span className="text-sm text-muted-foreground">
              {format(new Date(message.createdAt), 'PPpp')}
            </span>
          </div>
          <p className="whitespace-pre-wrap">{message.content}</p>
          {message.mentions.length > 0 && (
            <div className="mt-2 flex gap-2">
              {message.mentions.map((mentionId) => (
                <span
                  key={mentionId}
                  className="text-sm bg-primary/10 px-2 py-1 rounded-full"
                >
                  @{getAgentName(mentionId)}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}