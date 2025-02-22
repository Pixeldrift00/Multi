/*
  # Multi-Agent LLM System Schema

  1. New Tables
    - `agents`: Stores agent information and capabilities
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `capabilities` (jsonb)
      - `state` (jsonb)
      - `created_at` (timestamp)
      
    - `messages`: Stores all communication between agents
      - `id` (uuid, primary key)
      - `thread_id` (uuid)
      - `sender_id` (uuid, references agents)
      - `content` (text)
      - `mentions` (uuid[], references agents)
      - `created_at` (timestamp)
      
    - `tasks`: Stores tasks and their current status
      - `id` (uuid, primary key)
      - `thread_id` (uuid)
      - `originator_id` (uuid, references agents)
      - `assigned_to` (uuid[], references agents)
      - `status` (text)
      - `iteration_count` (int)
      - `max_iterations` (int)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create agents table
CREATE TABLE IF NOT EXISTS agents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  capabilities jsonb NOT NULL DEFAULT '{}',
  state jsonb NOT NULL DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  thread_id uuid NOT NULL,
  sender_id uuid REFERENCES agents(id) NOT NULL,
  content text NOT NULL,
  mentions uuid[] DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Create tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  thread_id uuid NOT NULL,
  originator_id uuid REFERENCES agents(id) NOT NULL,
  assigned_to uuid[] NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  iteration_count int NOT NULL DEFAULT 0,
  max_iterations int NOT NULL DEFAULT 5,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow read access to agents"
  ON agents FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow read access to messages"
  ON messages FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow insert access to messages"
  ON messages FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow read access to tasks"
  ON tasks FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow insert and update access to tasks"
  ON tasks FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_messages_thread_id ON messages(thread_id);
CREATE INDEX IF NOT EXISTS idx_tasks_thread_id ON tasks(thread_id);
CREATE INDEX IF NOT EXISTS idx_messages_mentions ON messages USING gin(mentions);