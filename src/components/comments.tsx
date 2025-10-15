'use client';

import { useState, FormEvent } from 'react';
import { comments as initialComments, mockUser } from '@/lib/data';
import type { Comment } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';

export function Comments() {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      setIsSubmitting(true);
      setTimeout(() => {
        const newCommentObject: Comment = {
          id: `comment-${Date.now()}`,
          user: mockUser,
          body: newComment,
          createdAt: 'À l\'instant',
        };
        setComments([newCommentObject, ...comments]);
        setNewComment('');
        setIsSubmitting(false);
      }, 500);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Textarea
          placeholder="Ajouter un commentaire..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          rows={3}
        />
        <div className="flex justify-end">
          <Button type="submit" disabled={!newComment.trim() || isSubmitting}>
            <Send className="mr-2 h-4 w-4" />
            {isSubmitting ? 'Envoi...' : 'Commenter'}
          </Button>
        </div>
      </form>
      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-4">
            <Avatar>
              <AvatarImage src={comment.user.avatarUrl} />
              <AvatarFallback>{comment.user.firstName[0]}{comment.user.lastName[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-baseline gap-2">
                <p className="font-semibold">{comment.user.firstName} {comment.user.lastName}</p>
                <p className="text-xs text-muted-foreground">{comment.createdAt}</p>
              </div>
              <p className="text-sm">{comment.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
