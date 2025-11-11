import {
    ICreateCalendarBodyRequest,
    IUpdateCalendarBodyRequest,
    ISyncCalendarsBodyRequest,
} from "@global-types/body-requests/calendar.body-request";
import { IGetCalendarsParams, IGetMyCalendarsParams } from "@global-types/params/calendar.params";
import { API_ROUTES } from "@/api";
import api from "@/axios/axios.v1";
import {
    IGetCalendarsResponse,
    IGetCalendarByIdResponse,
    IGetMyCalendarsResponse,
    ICreateCalendarResponse,
    IUpdateCalendarResponse,
    IDeleteCalendarResponse,
    ISyncCalendarsResponse,
} from "@global-types/responses/calendar.response";
import { AxiosRequestConfig } from "axios";

export const createCalendar = async (
    enterpriseId: string,
    payload: ICreateCalendarBodyRequest,
): Promise<ICreateCalendarResponse> => {
    const data = await api.post<ICreateCalendarResponse>(
        API_ROUTES.CALENDAR.CREATE(enterpriseId),
        payload,
    );
    return data;
};

export const getAllCalendars = async (
    params: IGetCalendarsParams,
    config?: AxiosRequestConfig,
): Promise<IGetCalendarsResponse> => {
    const response = await api.get<IGetCalendarsResponse>(
        API_ROUTES.CALENDAR.GET_ALL,
        {
            params,
            ...(config || {}),
        },
    );
    return response;
};

export const getMyCalendars = async (
    params: IGetMyCalendarsParams,
    config?: AxiosRequestConfig,
): Promise<IGetMyCalendarsResponse> => {
    const response = await api.get<IGetMyCalendarsResponse>(
        API_ROUTES.CALENDAR.GET_MY,
        {
            params,
            ...(config || {}),
        },
    );
    return response;
};

export const getCalendarById = async (
    id: string,
): Promise<IGetCalendarByIdResponse> => {
    const data = await api.get<IGetCalendarByIdResponse>(
        API_ROUTES.CALENDAR.GET_BY_ID(id),
    );
    return data;
};

export const updateCalendar = async (
    id: string,
    payload: IUpdateCalendarBodyRequest,
): Promise<IUpdateCalendarResponse> => {
    const data = await api.patch<IUpdateCalendarResponse>(
        API_ROUTES.CALENDAR.UPDATE(id),
        payload,
    );
    return data;
};

export const deleteCalendar = async (
    id: string,
): Promise<IDeleteCalendarResponse> => {
    const data = await api.delete<IDeleteCalendarResponse>(
        API_ROUTES.CALENDAR.DELETE(id),
    );
    return data;
};

export const syncCalendars = async (
    enterpriseId: string,
    payload?: ISyncCalendarsBodyRequest,
): Promise<ISyncCalendarsResponse> => {
    const data = await api.post<ISyncCalendarsResponse>(
        API_ROUTES.CALENDAR.SYNC(enterpriseId),
        payload || {},
    );
    return data;
};

