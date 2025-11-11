import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
	getAllCalendars, 
	syncCalendars, 
	createCalendar,
	deleteCalendar 
} from '@/actions/calendar';
import { IGetCalendarsResponse } from '@global-types/responses/calendar.response';

export function useCalendars(enterpriseId: string) {
	return useQuery({
		queryKey: ['calendars', enterpriseId],
		queryFn: async () => {
			const response = await getAllCalendars({ enterpriseId });
			return response;
		},
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		refetchInterval: false,
	});
}

export function useSyncCalendars() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({ enterpriseId }: { enterpriseId: string }) => {
			return await syncCalendars(enterpriseId, {});
		},
		onSuccess: (data, variables) => {
			queryClient.invalidateQueries({ 
				queryKey: ['calendars', variables.enterpriseId] 
			});
		},
	});
}

export function useCreateCalendar() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({ 
			enterpriseId, 
			data 
		}: { 
			enterpriseId: string; 
			data: { name: string; description?: string; color?: string } 
		}) => {
			return await createCalendar(enterpriseId, data);
		},
		onSuccess: (data, variables) => {
			queryClient.invalidateQueries({ 
				queryKey: ['calendars', variables.enterpriseId] 
			});
		},
	});
}

export function useDeleteCalendar() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({ id }: { id: string }) => {
			return await deleteCalendar(id);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['calendars'] });
		},
	});
}

