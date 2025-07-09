'use client';
import { useAuth } from '@/contexts/AuthContext';
import { useMyPolls, useDeletePoll } from '@/lib/queries';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { User, Vote, Calendar, Trash2, BarChart3, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProfilePage() {
  const { user, isLoading: authLoading } = useAuth();
  const { data: polls, isLoading: pollsLoading, error } = useMyPolls();
  const deletePoll = useDeletePoll();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/signin');
    }
  }, [user, authLoading, router]);

  if (authLoading || !user) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-1/3" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
        </Card>
      </div>
    );
  }

  const handleDeletePoll = async (pollId: string) => {
    await deletePoll.mutateAsync(pollId);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto space-y-6"
    >
      {/* Profile Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl">{user.name}</CardTitle>
              <CardDescription className="text-lg">{user.email}</CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* My Polls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Vote className="w-5 h-5" />
            My Polls
          </CardTitle>
          <CardDescription>
            Polls you've created and their performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          {pollsLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-3 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-600">Failed to load your polls</p>
            </div>
          ) : !polls?.length ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Vote className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No polls yet</h3>
              <p className="text-gray-600 mb-6">
                You haven't created any polls yet. Start by creating your first poll!
              </p>
              <Button asChild>
                <Link href="/">Create Your First Poll</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {polls.map((poll, index) => {
                const totalVotes = poll.options.reduce((sum, opt) => sum + opt.votes, 0);
                const isExpired = poll.expiresAt && new Date(poll.expiresAt) < new Date();
                
                return (
                  <motion.div
                    key={poll._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="hover:shadow-md transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-lg line-clamp-2">
                              {poll.question}
                            </CardTitle>
                            <CardDescription className="flex items-center gap-4 mt-2">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {formatDistanceToNow(new Date(poll.createdAt), { addSuffix: true })}
                              </div>
                              <div className="flex items-center gap-1">
                                <BarChart3 className="w-4 h-4" />
                                {totalVotes} votes
                              </div>
                              {isExpired && (
                                <span className="text-red-600 text-sm">Expired</span>
                              )}
                            </CardDescription>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/polls/${poll._id}`}>
                                <ExternalLink className="w-4 h-4 mr-2" />
                                View
                              </Link>
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete your poll
                                    and all associated votes.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDeletePoll(poll._id)}
                                    className="bg-red-600 hover:bg-red-700"
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {poll.options.slice(0, 3).map((option, i) => (
                            <div key={i} className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">• {option.text}</span>
                              <span className="text-gray-500">{option.votes} votes</span>
                            </div>
                          ))}
                          {poll.options.length > 3 && (
                            <div className="text-sm text-gray-500">
                              +{poll.options.length - 3} more options
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}