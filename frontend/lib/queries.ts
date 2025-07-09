import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from './api';
import { toast } from 'sonner';

export interface Poll {
  _id: string;
  question: string;
  options: Array<{
    _id: string;
    text: string;
    votes: number;
  }>;
  createdAt: string;
  expiresAt?: string;
  createdBy: string;
}

export interface PollsResponse {
  polls: Poll[];
  total: number;
  page: number;
  pages: number;
}

// Poll queries
export const usePolls = (page: number = 1, limit: number = 10) => {
  return useQuery({
    queryKey: ['polls', page, limit],
    queryFn: async (): Promise<PollsResponse> => {
      const response = await api.get(`/polls?page=${page}&limit=${limit}`);
      return response.data;
    },
  });
};

export const usePoll = (id: string) => {
  return useQuery({
    queryKey: ['poll', id],
    queryFn: async (): Promise<Poll> => {
      const response = await api.get(`/polls/${id}`);
      return response.data.poll;
    },
  });
};

export const usePollResults = (id: string) => {
  return useQuery({
    queryKey: ['poll-results', id],
    queryFn: async () => {
      const response = await api.get(`/polls/${id}/results`);
      return response.data.results;
    },
  });
};

export const useMyPolls = () => {
  return useQuery({
    queryKey: ['my-polls'],
    queryFn: async (): Promise<Poll[]> => {
      const response = await api.get('/users/me/polls');
      return response.data.polls;
    },
  });
};

// Poll mutations
export const useCreatePoll = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (pollData: {
      question: string;
      options: string[];
      expiresAt?: string;
    }) => {
      const response = await api.post('/polls', pollData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['polls'] });
      queryClient.invalidateQueries({ queryKey: ['my-polls'] });
      toast.success('Poll created successfully!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to create poll');
    },
  });
};

export const useVote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ pollId, option }: { pollId: string; option: string }) => {
      const response = await api.post(`/polls/${pollId}/vote`, { option });
      return response.data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['poll', variables.pollId] });
      queryClient.invalidateQueries({ queryKey: ['poll-results', variables.pollId] });
      toast.success('Vote recorded!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to vote');
    },
  });
};

export const useDeletePoll = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (pollId: string) => {
      const response = await api.delete(`/polls/${pollId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['polls'] });
      queryClient.invalidateQueries({ queryKey: ['my-polls'] });
      toast.success('Poll deleted successfully!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete poll');
    },
  });
};