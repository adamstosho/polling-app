'use client';
import { useState } from 'react';
import { useVote } from '@/lib/queries';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Vote } from 'lucide-react';
import { motion } from 'framer-motion';

interface VoteOptionsProps {
  pollId: string;
  options: Array<{
    _id: string;
    text: string;
    votes: number;
  }>;
}

export default function VoteOptions({ pollId, options }: VoteOptionsProps) {
  const [selectedOption, setSelectedOption] = useState('');
  const [hasVoted, setHasVoted] = useState(false);
  const vote = useVote();

  const handleVote = async () => {
    if (!selectedOption) return;
    
    try {
      await vote.mutateAsync({
        pollId,
        option: selectedOption
      });
      setHasVoted(true);
    } catch (error) {
      // Error is handled by the mutation
    }
  };

  if (hasVoted) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center text-gray-600">
            <Vote className="w-8 h-8 mx-auto mb-2" />
            <p>You have already voted on this poll</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <h3 className="font-semibold">Cast Your Vote</h3>
          <RadioGroup value={selectedOption} onValueChange={setSelectedOption}>
            {options.map((option, index) => (
              <motion.div
                key={option._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-gray-50 transition-colors"
              >
                <RadioGroupItem value={option.text} id={option._id} />
                <Label 
                  htmlFor={option._id} 
                  className="flex-1 cursor-pointer font-medium"
                >
                  {option.text}
                </Label>
              </motion.div>
            ))}
          </RadioGroup>

          <Button 
            onClick={handleVote} 
            disabled={!selectedOption || vote.isPending}
            className="w-full"
          >
            {vote.isPending ? 'Voting...' : 'Submit Vote'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}