'use client';
import { usePoll, usePollResults } from '@/lib/queries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, Trophy, Medal, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { BarChartComponent, PieChartComponent } from '@/components/Charts';

export default function PollResultsPage() {
  const params = useParams();
  const pollId = params.id as string;
  const { data: poll, isLoading: pollLoading } = usePoll(pollId);
  const { data: results, isLoading: resultsLoading } = usePollResults(pollId);

  if (pollLoading || resultsLoading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
        </Card>
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardContent className="pt-6">
              <Skeleton className="h-64 w-full" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <Skeleton className="h-64 w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!poll || !results) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Results Not Available</h2>
        <p className="text-gray-600 mb-6">Unable to load poll results.</p>
        <Button asChild>
          <Link href="/">Browse Polls</Link>
        </Button>
      </div>
    );
  }

  const totalVotes = results.reduce((sum: number, result: any) => sum + result.votes, 0);
  const chartData = results.map((result: any) => ({
    name: result.text,
    votes: result.votes,
    percentage: totalVotes > 0 ? ((result.votes / totalVotes) * 100).toFixed(1) : 0
  }));

  const sortedResults = [...results].sort((a, b) => b.votes - a.votes);

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0: return <Trophy className="w-5 h-5 text-yellow-500" />;
      case 1: return <Medal className="w-5 h-5 text-gray-400" />;
      case 2: return <Award className="w-5 h-5 text-amber-600" />;
      default: return <div className="w-5 h-5 flex items-center justify-center bg-gray-100 rounded-full text-xs font-medium">{index + 1}</div>;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto space-y-6"
    >
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/polls/${pollId}`}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Poll
              </Link>
            </Button>
          </div>
          <CardTitle className="text-2xl lg:text-3xl">{poll.question}</CardTitle>
          <p className="text-lg text-gray-600">{totalVotes} total votes</p>
        </CardHeader>
      </Card>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 ">
        {/* Bar Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="min-w-0"
        >
          <Card>
            <CardHeader>
              <CardTitle>Vote Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <BarChartComponent chartData={chartData} />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Pie Chart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="min-w-0"
        >
          <Card>
            <CardHeader>
              <CardTitle>Vote Percentage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <PieChartComponent chartData={chartData} />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Detailed Results */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Detailed Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sortedResults.map((result: any, index: number) => {
                const percentage = totalVotes > 0 ? ((result.votes / totalVotes) * 100).toFixed(1) : 0;
                return (
                  <motion.div
                    key={result._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
                  >
                    {getRankIcon(index)}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">{result.text}</h3>
                        <div className="text-sm text-gray-600">
                          {result.votes} votes ({percentage}%)
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ delay: 0.5 + (0.1 * index), duration: 0.5 }}
                          className="h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                        />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}