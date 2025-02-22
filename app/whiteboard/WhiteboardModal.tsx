'use client';

import { useAgentStore } from '@/lib/store/agent-store';
import { useChatStore } from '@/lib/store/chat-store';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ThreadDetails } from '@/components/ThreadDetails';

export function WhiteboardModal() {
  const { selectedAgent, selectAgent } = useAgentStore();
  const { messages } = useChatStore();

  const agentMessages = messages.filter(
    (message) =>
      message.senderId === selectedAgent?.id ||
      message.mentions.includes(selectedAgent?.id || '')
  );

  return (
    <Dialog
      open={!!selectedAgent}
      onOpenChange={(open) => !open && selectAgent(null)}
    >
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            Agent: {selectedAgent?.name}
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <ThreadDetails messages={agentMessages} />
        </div>
      </DialogContent>
    </Dialog>
  );
}