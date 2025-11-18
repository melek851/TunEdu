
'use client';

import { useState, FormEvent, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Send, Loader2 } from 'lucide-react';
import { useUser } from '@/firebase/auth/use-user';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '@/firebase/config';
import type { Comment as CommentType } from '@/lib/types';
import { getCommentsByLesson } from '@/lib/firestore-data';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

function formatRelativeTime(dateString: string) {
    if (!dateString) return '';
    try {
        return formatDistanceToNow(new Date(dateString), { addSuffix: true, locale: fr });
    } catch (error) {
        return dateString;
    }
}


export function Comments({ lessonId }: { lessonId: string }) {
  const { user, loading: userLoading } = useUser();
  const [comments, setComments] = useState<CommentType[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingComments, setIsLoadingComments] = useState(true);

  useEffect(() => {
    async function fetchComments() {
      setIsLoadingComments(true);
      const fetchedComments = await getCommentsByLesson(lessonId);
      setComments(fetchedComments);
      setIsLoadingComments(false);
    }
    fetchComments();
  }, [lessonId]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (newComment.trim() && user) {
      setIsSubmitting(true);
      try {
        const newCommentObject = {
          lessonId,
          user: {
            id: user.uid,
            firstName: user.displayName?.split(' ')[0] || 'Utilisateur',
            lastName: user.displayName?.split(' ')[1] || 'Anonyme',
            avatarUrl: user.photoURL,
            email: user.email,
          },
          body: newComment,
          createdAt: serverTimestamp(),
        };
        const docRef = await addDoc(collection(db, 'comments'), newCommentObject);

        // Optimistically update UI
        setComments([{
             id: docRef.id,
             lessonId,
             user: newCommentObject.user,
             body: newComment,
             createdAt: new Date().toISOString(), // This will be replaced by server timestamp on next fetch
        }, ...comments]);

        setNewComment('');
      } catch (error) {
        console.error("Error adding comment: ", error);
        // Optionally show an error toast
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Textarea
          placeholder={user ? "Ajouter un commentaire..." : "Vous devez être connecté pour commenter."}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          rows={3}
          disabled={!user || isSubmitting}
        />
        <div className="flex justify-end">
          <Button type="submit" disabled={!newComment.trim() || isSubmitting || !user}>
            {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
            {isSubmitting ? 'Envoi...' : 'Commenter'}
          </Button>
        </div>
      </form>
      <div className="space-y-6">
        {isLoadingComments ? (
            <div className="flex justify-center items-center h-24">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        ) : comments.map((comment) => (
          <div key={comment.id} className="flex gap-4">
            <Avatar>
              <AvatarImage src={comment.user.avatarUrl} />
              <AvatarFallback>{comment.user.firstName?.[0]}{comment.user.lastName?.[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-baseline gap-2">
                <p className="font-semibold">{comment.user.firstName} {comment.user.lastName}</p>
                <p className="text-xs text-muted-foreground">{formatRelativeTime(comment.createdAt as string)}</p>
              </div>
              <p className="text-sm">{comment.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
