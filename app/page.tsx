'use client';

import { ChatBox } from './chat/ChatBox';
import { FlowChart } from './whiteboard/FlowChart';

export default function Home() {
  return (
    <div className="flex h-screen">
      <div className="w-1/2 border-r border-border">
        <ChatBox />
      </div>
      <div className="w-1/2">
        <FlowChart />
      </div>
    </div>
  );
}