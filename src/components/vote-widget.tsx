'use client';

import { useState } from 'react';
import { ArrowBigUp, ArrowBigDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function VoteWidget({ initialScore }: { initialScore: number }) {
  const [score, setScore] = useState(initialScore);
  const [vote, setVote] = useState<'up' | 'down' | null>(null);

  const handleUpvote = () => {
    if (vote === 'up') {
      setScore(score - 1);
      setVote(null);
    } else if (vote === 'down') {
      setScore(score + 2);
      setVote('up');
    } else {
      setScore(score + 1);
      setVote('up');
    }
  };

  const handleDownvote = () => {
    if (vote === 'down') {
      setScore(score + 1);
      setVote(null);
    } else if (vote === 'up') {
      setScore(score - 2);
      setVote('down');
    } else {
      setScore(score - 1);
      setVote('down');
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="icon" onClick={handleUpvote}>
        <ArrowBigUp className={cn('h-6 w-6', vote === 'up' && 'fill-accent text-accent')} />
      </Button>
      <span className="text-xl font-bold min-w-[40px] text-center">{score}</span>
      <Button variant="ghost" size="icon" onClick={handleDownvote}>
        <ArrowBigDown className={cn('h-6 w-6', vote === 'down' && 'fill-blue-500 text-blue-500')} />
      </Button>
    </div>
  );
}
