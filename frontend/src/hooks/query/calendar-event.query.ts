import { useQuery } from 'react-query';
import { IGetCalendarEventsParams, IGetMyEventsParams } from '@global-types/params/calendar-event.params';
import {
  getAllCalendarEvents,
  getCalendarEventById,
  getMyEvents,
} from '@/hooks/action/calendar-event/calendar-event.action';
import { API_ROUTES } from '@/api';

export const useGetAllCalendarEvents = (params: IGetCalendarEventsParams) => {
  return useQuery(
    [API_ROUTES.CALENDAR_EVENT.GET_ALL, params],
    async () => await getAllCalendarEvents(params),
    {
      refetchOnMount: false,
      refetchInterval: false,
      refetchOnWindowFocus: false,
      enabled: !!params.calendarId,
    },
  );
};

export const useGetMyEvents = (params: IGetMyEventsParams) => {
  return useQuery(
    [API_ROUTES.CALENDAR_EVENT.GET_MY_EVENTS, params],
    async () => await getMyEvents(params),
    {
      refetchOnMount: false,
      refetchInterval: false,
      refetchOnWindowFocus: false,
      enabled: !!params.enterpriseId && !!params.memberId,
    },
  );
};

export const useGetCalendarEventById = (id: string) => {
  return useQuery(
    [API_ROUTES.CALENDAR_EVENT.GET_BY_ID, id],
    async () => await getCalendarEventById(id),
    {
      refetchOnMount: false,
      refetchInterval: false,
      refetchOnWindowFocus: false,
      enabled: !!id,
    },
  );
};

