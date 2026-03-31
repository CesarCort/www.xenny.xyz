import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { eventsService } from '../services/events.service';
import { useAuthStore } from '@/modules/auth/store/useAuthStore';

export function useEvents() {
  return useQuery({
    queryKey: ['events'],
    queryFn: eventsService.getAllEvents,
  });
}

export function useMyEventRegistrations() {
  const user = useAuthStore((state) => state.user);
  return useQuery({
    queryKey: ['my-registrations', user?.id],
    queryFn: () => user ? eventsService.getMyEventRegistrations(user.id) : [],
    enabled: !!user,
  });
}

export function useRegisterToEvent() {
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);
  return useMutation({
    mutationFn: (event_id: string) => {
      if (!user) throw new Error('No user logged in');
      return eventsService.registerToEvent(user.id, event_id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-registrations'] });
    },
  });
}

export function useUnregisterFromEvent() {
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);
  return useMutation({
    mutationFn: (event_id: string) => {
      if (!user) throw new Error('No user logged in');
      return eventsService.unregisterFromEvent(user.id, event_id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-registrations'] });
    },
  });
}
