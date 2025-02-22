import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="flex items-center gap-2 rounded-md bg-destructive/10 p-4 text-destructive">
      <AlertCircle className="h-5 w-5" />
      <p>{message}</p>
    </div>
  );
}