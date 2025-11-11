import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
	getAllCalendarEvents,
	createCalendarEvent,
	updateCalendarEvent,
	deleteCalendarEvent,
	syncCalendarEvents,
} from '@/actions/calendar-event';

export function useCalendarEvents(calendarId: string, params?: {
	startDate?: string;
	endDate?: string;
	page?: number;
	pageSize?: number;
}) {
	return useQuery({
		queryKey: ['calendar-events', calendarId, params],
		queryFn: async () => {
			return await getAllCalendarEvents({
				calendarId,
				...params,
			});
		},
		enabled: !!calendarId,
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		refetchInterval: false,
	});
}

export function useCreateCalendarEvent() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({
			calendarId,
			data,
		}: {
			calendarId: string;
			data: {
				title: string;
				description?: string;
				location?: string;
				startTime: Date;
				endTime: Date;
				isAllDay: boolean;
				color?: string;
				attendees?: string[];
				recurrenceRule?: string;
			};
		}) => {
			return await createCalendarEvent(calendarId, data);
		},
		onSuccess: (data, variables) => {
			queryClient.invalidateQueries({
				queryKey: ['calendar-events', variables.calendarId],
			});
		},
	});
}

export function useUpdateCalendarEvent() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({
			id,
			data,
		}: {
			id: string;
			data: Partial<{
				title: string;
				description?: string;
				location?: string;
				startTime: Date;
				endTime: Date;
				isAllDay: boolean;
				color?: string;
				attendees?: string[];
				recurrenceRule?: string;
			}>;
		}) => {
			return await updateCalendarEvent(id, data);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['calendar-events'] });
		},
	});
}

export function useDeleteCalendarEvent() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({ id }: { id: string }) => {
			return await deleteCalendarEvent(id);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['calendar-events'] });
		},
	});
}

export function useSyncCalendarEvents() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({
			calendarId,
			startDate,
			endDate,
		}: {
			calendarId: string;
			startDate?: string;
			endDate?: string;
		}) => {
			return await syncCalendarEvents(calendarId, { startDate, endDate });
		},
		onSuccess: (data, variables) => {
			queryClient.invalidateQueries({
				queryKey: ['calendar-events', variables.calendarId],
			});
		},
	});
}

