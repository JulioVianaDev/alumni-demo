import {
  ICreateCalendarShareBodyRequest,
  IUpdateCalendarShareBodyRequest,
} from '@global-types/body-requests/calendar-share.body-request';
import {
  IGetCalendarSharesParams,
  IGetMemberCalendarSharesParams,
} from '@global-types/params/calendar-share.params';
import {
  IGetCalendarSharesResponse,
  IGetMemberCalendarSharesResponse,
  IGetCalendarShareByIdResponse,
  ICreateCalendarShareResponse,
  IUpdateCalendarShareResponse,
  IDeleteCalendarShareResponse,
} from '@global-types/responses/calendar-share.response';
import { API_ROUTES } from '@/api';
import api from '@/axios/axios.v1';
import { AxiosRequestConfig } from 'axios';

export const createCalendarShare = async (
  calendarId: string,
  payload: ICreateCalendarShareBodyRequest,
): Promise<ICreateCalendarShareResponse> => {
  const data = await api.post(
    API_ROUTES.CALENDAR_SHARE.CREATE(calendarId),
    payload,
  );
  return data;
};

export const getAllCalendarShares = async (
  params: IGetCalendarSharesParams,
  config?: AxiosRequestConfig,
): Promise<IGetCalendarSharesResponse> => {
  const response = await api.get<IGetCalendarSharesResponse>(
    API_ROUTES.CALENDAR_SHARE.GET_ALL,
    {
      params: {
        ...params,
        page: params.page ? Number(params.page) : 1,
      },
      ...(config || {}),
    },
  );
  return response;
};

export const getMemberCalendarShares = async (
  params: IGetMemberCalendarSharesParams,
  config?: AxiosRequestConfig,
): Promise<IGetMemberCalendarSharesResponse> => {
  const response = await api.get<IGetMemberCalendarSharesResponse>(
    API_ROUTES.CALENDAR_SHARE.GET_MEMBER_SHARES,
    {
      params: {
        ...params,
        page: params.page ? Number(params.page) : 1,
      },
      ...(config || {}),
    },
  );
  return response;
};

export const getCalendarShareById = async (
  id: string,
): Promise<IGetCalendarShareByIdResponse> => {
  const data = await api.get(
    API_ROUTES.CALENDAR_SHARE.GET_BY_ID(id),
  );
  return data;
};

export const updateCalendarShare = async (
  id: string,
  payload: IUpdateCalendarShareBodyRequest,
): Promise<IUpdateCalendarShareResponse> => {
  const data = await api.patch(
    API_ROUTES.CALENDAR_SHARE.UPDATE(id),
    payload,
  );
  return data;
};

export const deleteCalendarShare = async (
  id: string,
): Promise<IDeleteCalendarShareResponse> => {
  const data = await api.delete(
    API_ROUTES.CALENDAR_SHARE.DELETE(id),
  );
  return data;
};

