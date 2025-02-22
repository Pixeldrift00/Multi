export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      agents: {
        Row: {
          id: string
          name: string
          capabilities: Json
          state: Json
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          capabilities?: Json
          state?: Json
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          capabilities?: Json
          state?: Json
          created_at?: string
        }
      }
      messages: {
        Row: {
          id: string
          thread_id: string
          sender_id: string
          content: string
          mentions: string[]
          created_at: string
        }
        Insert: {
          id?: string
          thread_id: string
          sender_id: string
          content: string
          mentions?: string[]
          created_at?: string
        }
        Update: {
          id?: string
          thread_id?: string
          sender_id?: string
          content?: string
          mentions?: string[]
          created_at?: string
        }
      }
      tasks: {
        Row: {
          id: string
          thread_id: string
          originator_id: string
          assigned_to: string[]
          status: string
          iteration_count: number
          max_iterations: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          thread_id: string
          originator_id: string
          assigned_to: string[]
          status?: string
          iteration_count?: number
          max_iterations?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          thread_id?: string
          originator_id?: string
          assigned_to?: string[]
          status?: string
          iteration_count?: number
          max_iterations?: number
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}