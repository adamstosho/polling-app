"use client";
import { usePoll } from "@/lib/queries";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import VoteOptions from "@/components/VoteOptions";
import LiveChart from "@/components/LiveChart";
import ShareButtons from "@/components/ShareButtons";
import { Clock, Calendar, User, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function PollPage() {
  const params = useParams();
  const pollId = params.id as string;
  const { user } = useAuth();
  const { data: poll, isLoading, error } = usePoll(pollId);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-3/4" />
            <div className="flex items-center gap-4">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-24" />
            </div>
          </CardHeader>
        </Card>
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <Skeleton className="h-4 w-24" />
                <div className="space-y-2">
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-64 w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (error || !poll) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <BarChart3 className="w-8 h-8 text-red-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Poll Not Found
        </h2>
        <p className="text-gray-600 mb-6">
          {"The poll you're looking for doesn't exist or has been removed."}
        </p>
        <Button asChild>
          <Link href="/">Browse Polls</Link>
        </Button>
      </div>
    );
  }

  const isExpired = poll.expiresAt && new Date(poll.expiresAt) < new Date();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto space-y-6"
    >
      {/* Poll Header */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl lg:text-3xl">
            {poll.question}
          </CardTitle>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {formatDistanceToNow(new Date(poll.createdAt), {
                addSuffix: true,
              })}
            </div>
            {poll.expiresAt && (
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {isExpired
                  ? "Expired"
                  : `Expires ${formatDistanceToNow(new Date(poll.expiresAt), {
                      addSuffix: true,
                    })}`}
              </div>
            )}
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              {poll.options.reduce((sum, opt) => sum + opt.votes, 0)} votes
            </div>
          </div>
          <div className="flex flex-wrap justify-start items-center gap-2 pt-2">
            <ShareButtons pollId={poll._id} question={poll.question} />
            <Button variant="outline" size="sm" asChild>
              <Link href={`/polls/${poll._id}/results`}>
                <BarChart3 className="w-4 h-4 mr-2" />
                View Results
              </Link>
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Voting and Results */}
      <div className="grid gap-6 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 ">
        {/* Voting Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="min-w-0"
        >
          {user && !isExpired ? (
            <VoteOptions pollId={poll._id} options={poll.options} />
          ) : (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center text-gray-600">
                  {isExpired ? (
                    <>
                      <Calendar className="w-8 h-8 mx-auto mb-2" />
                      <p>This poll has expired</p>
                    </>
                  ) : (
                    <>
                      <User className="w-8 h-8 mx-auto mb-2" />
                      <p>Sign in to vote on this poll</p>
                      <div className="mt-4 space-x-2">
                        <Button asChild size="sm">
                          <Link href="/signin">Sign In</Link>
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                          <Link href="/signup">Sign Up</Link>
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </motion.div>

        {/* Live Results Chart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="min-w-0"
        >
          <LiveChart pollId={poll._id} options={poll.options} />
        </motion.div>
      </div>
    </motion.div>
  );
}
