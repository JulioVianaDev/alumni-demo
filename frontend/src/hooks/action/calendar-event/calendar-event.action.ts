import {
  ICreateCalendarEventBodyRequest,
  IUpdateCalendarEventBodyRequest,
  ISyncCalendarEventsBodyRequest,
} from '@global-types/body-requests/calendar-event.body-request';
import { IGetCalendarEventsParams, IGetMyEventsParams } from '@global-types/params/calendar-event.params';
import {
  IGetCalendarEventsResponse,
  IGetEventByIdResponse,
  IGetMyEventsResponse,
  ICreateCalendarEventResponse,
  IUpdateCalendarEventResponse,
  IDeleteCalendarEventResponse,
  ISyncCalendarEventsResponse,
} from '@global-types/responses/calendar-event.response';
import { API_ROUTES } from '@/api';
import api from '@/axios/axios.v1';
import { AxiosRequestConfig } from 'axios';

export const createCalendarEvent = async (
  calendarId: string,
  payload: ICreateCalendarEventBodyRequest,
): Promise<ICreateCalendarEventResponse> => {
  const data = await api.post(
    API_ROUTES.CALENDAR_EVENT.CREATE(calendarId),
    payload,
  );
  return data;
};

export const getAllCalendarEvents = async (
  params: IGetCalendarEventsParams,
  config?: AxiosRequestConfig,
): Promise<IGetCalendarEventsResponse> => {
  const response = await api.get<IGetCalendarEventsResponse>(
    API_ROUTES.CALENDAR_EVENT.GET_ALL,
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

export const getMyEvents = async (
  params: IGetMyEventsParams,
  config?: AxiosRequestConfig,
): Promise<IGetMyEventsResponse> => {
  const response = await api.get<IGetMyEventsResponse>(
    API_ROUTES.CALENDAR_EVENT.GET_MY_EVENTS,
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

export const getCalendarEventById = async (
  id: string,
): Promise<IGetEventByIdResponse> => {
  const data = await api.get(
    API_ROUTES.CALENDAR_EVENT.GET_BY_ID(id),
  );
  return data;
};

export const updateCalendarEvent = async (
  id: string,
  payload: IUpdateCalendarEventBodyRequest,
): Promise<IUpdateCalendarEventResponse> => {
  const data = await api.patch(
    API_ROUTES.CALENDAR_EVENT.UPDATE(id),
    payload,
  );
  return data;
};

export const deleteCalendarEvent = async (
  id: string,
): Promise<IDeleteCalendarEventResponse> => {
  const data = await api.delete(
    API_ROUTES.CALENDAR_EVENT.DELETE(id),
  );
  return data;
};

export const syncCalendarEvents = async (
  calendarId: string,
  payload?: ISyncCalendarEventsBodyRequest,
): Promise<ISyncCalendarEventsResponse> => {
  const data = await api.post(
    API_ROUTES.CALENDAR_EVENT.SYNC(calendarId),
    payload || {},
  );
  return data;
};

