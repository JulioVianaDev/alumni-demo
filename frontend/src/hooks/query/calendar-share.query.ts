import { useQuery } from 'react-query';
import {
  IGetCalendarSharesParams,
  IGetMemberCalendarSharesParams,
} from '@global-types/params/calendar-share.params';
import {
  getAllCalendarShares,
  getCalendarShareById,
  getMemberCalendarShares,
} from '@/hooks/action/calendar-share/calendar-share.action';
import { API_ROUTES } from '@/api';

export const useGetAllCalendarShares = (params: IGetCalendarSharesParams) => {
  return useQuery(
    [API_ROUTES.CALENDAR_SHARE.GET_ALL, params],
    async () => await getAllCalendarShares(params),
    {
      refetchOnMount: false,
      refetchInterval: false,
      refetchOnWindowFocus: false,
      enabled: !!params.calendarId,
    },
  );
};

export const useGetMemberCalendarShares = (
  params: IGetMemberCalendarSharesParams,
) => {
  return useQuery(
    [API_ROUTES.CALENDAR_SHARE.GET_MEMBER_SHARES, params],
    async () => await getMemberCalendarShares(params),
    {
      refetchOnMount: false,
      refetchInterval: false,
      refetchOnWindowFocus: false,
      enabled: !!params.memberId,
    },
  );
};

export const useGetCalendarShareById = (id: string) => {
  return useQuery(
    [API_ROUTES.CALENDAR_SHARE.GET_BY_ID, id],
    async () => await getCalendarShareById(id),
    {
      refetchOnMount: false,
      refetchInterval: false,
      refetchOnWindowFocus: false,
      enabled: !!id,
    },
  );
};

