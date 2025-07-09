"use client";
import PollForm from '@/components/PollForm';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function CreatePollPage() {
  return (
    <div className="max-w-xl mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Create a New Poll</CardTitle>
        </CardHeader>
        <CardContent>
          <PollForm />
        </CardContent>
      </Card>
    </div>
  );
} 