import { useQuery, useMutation, useQueryClient } from "react-query";
import { IGetCalendarsParams, IGetMyCalendarsParams } from "@global-types/params/calendar.params";
import {
    createCalendar,
    getAllCalendars,
    getMyCalendars,
    getCalendarById,
    updateCalendar,
    deleteCalendar,
    syncCalendars,
} from "@/hooks/action/calendar/calendar.action";
import { API_ROUTES } from "@/api";
import {
    ICreateCalendarBodyRequest,
    IUpdateCalendarBodyRequest,
    ISyncCalendarsBodyRequest,
} from "@global-types/body-requests/calendar.body-request";

export const useGetAllCalendars = (params: IGetCalendarsParams) => {
    return useQuery(
        [API_ROUTES.CALENDAR.GET_ALL, params],
        async () => await getAllCalendars(params),
        {
            refetchOnMount: false,
            refetchInterval: false,
            refetchOnWindowFocus: false,
        },
    );
};

export const useGetMyCalendars = (params: IGetMyCalendarsParams) => {
    return useQuery(
        [API_ROUTES.CALENDAR.GET_MY, params],
        async () => await getMyCalendars(params),
        {
            refetchOnMount: false,
            refetchInterval: false,
            refetchOnWindowFocus: false,
        },
    );
};

export const useGetCalendarById = (id: string) => {
    return useQuery(
        [API_ROUTES.CALENDAR.GET_BY_ID(id)],
        async () => await getCalendarById(id),
        {
            enabled: !!id,
            refetchOnMount: false,
            refetchInterval: false,
            refetchOnWindowFocus: false,
        },
    );
};

export const useCreateCalendar = () => {
    const queryClient = useQueryClient();

    return useMutation(
        ({
            enterpriseId,
            payload,
        }: {
            enterpriseId: string;
            payload: ICreateCalendarBodyRequest;
        }) => createCalendar(enterpriseId, payload),
        {
            onSuccess: () => {
                queryClient.invalidateQueries([API_ROUTES.CALENDAR.GET_ALL]);
                queryClient.invalidateQueries([API_ROUTES.CALENDAR.GET_MY]);
            },
        },
    );
};

export const useUpdateCalendar = () => {
    const queryClient = useQueryClient();

    return useMutation(
        ({ id, payload }: { id: string; payload: IUpdateCalendarBodyRequest }) =>
            updateCalendar(id, payload),
        {
            onSuccess: (_, variables) => {
                queryClient.invalidateQueries([
                    API_ROUTES.CALENDAR.GET_BY_ID(variables.id),
                ]);
                queryClient.invalidateQueries([API_ROUTES.CALENDAR.GET_ALL]);
            },
        },
    );
};

export const useDeleteCalendar = () => {
    const queryClient = useQueryClient();

    return useMutation((id: string) => deleteCalendar(id), {
        onSuccess: () => {
            queryClient.invalidateQueries([API_ROUTES.CALENDAR.GET_ALL]);
        },
    });
};

export const useSyncCalendars = () => {
    const queryClient = useQueryClient();

    return useMutation(
        ({
            enterpriseId,
            payload,
        }: {
            enterpriseId: string;
            payload?: ISyncCalendarsBodyRequest;
        }) => syncCalendars(enterpriseId, payload),
        {
            onSuccess: () => {
                queryClient.invalidateQueries([API_ROUTES.CALENDAR.GET_ALL]);
                queryClient.invalidateQueries([API_ROUTES.CALENDAR.GET_MY]);
            },
        },
    );
};

