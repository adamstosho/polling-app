'use client';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { BarChart3, PieChart as PieChartIcon, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import SocketClient from '@/lib/socket';
import { BarChartComponent, PieChartComponent } from './Charts';

interface LiveChartProps {
  pollId: string;
  options: Array<{
    _id: string;
    text: string;
    votes: number;
  }>;
}

const COLORS = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function LiveChart({ pollId, options: initialOptions }: LiveChartProps) {
  const [options, setOptions] = useState(initialOptions);
  const [chartType, setChartType] = useState<'bar' | 'pie'>('bar');

  useEffect(() => {
    const socket = SocketClient.getInstance();
    
    // Join poll room
    socket.joinPoll(pollId);

    // Listen for real-time updates
    const handleUpdate = (updatedOptions: any) => {
      console.log('Received real-time update:', updatedOptions);
      setOptions(updatedOptions);
    };

    socket.onPollUpdate(pollId, handleUpdate);

    return () => {
      socket.offPollUpdate(pollId, handleUpdate);
      socket.leavePoll(pollId);
    };
  }, [pollId]);

  const totalVotes = options.reduce((sum, opt) => sum + opt.votes, 0);
  
  const chartData = options.map(option => ({
    name: option.text,
    votes: option.votes,
    percentage: totalVotes > 0 ? ((option.votes / totalVotes) * 100).toFixed(1) : '0'
  }));

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Live Results
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-2 h-2 bg-green-500 rounded-full"
            />
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant={chartType === 'bar' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setChartType('bar')}
            >
              <BarChart3 className="w-4 h-4" />
            </Button>
            <Button
              variant={chartType === 'pie' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setChartType('pie')}
            >
              <PieChartIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <p className="text-sm text-gray-600">{totalVotes} total votes</p>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          {chartType === 'bar' ? (
            <BarChartComponent chartData={chartData} />
          ) : (
            <PieChartComponent chartData={chartData} />
          )}
        </div>
      </CardContent>
    </Card>
  );
}