import { useQuery, useMutation, useQueryClient } from "react-query";
import {
    IGetEnterprisesParams,
    IGetMyEnterprisesParams,
} from "@global-types/params/enterprise.params";
import {
    createEnterprise,
    getAllEnterprises,
    getMyEnterprises,
    getEnterpriseById,
    getEnterpriseBySlug,
    updateEnterprise,
    deleteEnterprise,
    transferOwnership,
} from "@/hooks/action/enterprise/enterprise.action";
import { API_ROUTES } from "@/api";
import {
    ICreateEnterpriseBodyRequest,
    IUpdateEnterpriseBodyRequest,
    ITransferEnterpriseOwnershipBodyRequest,
} from "@global-types/body-requests/enterprise.body-request";

export const useGetAllEnterprises = (params: IGetEnterprisesParams) => {
    return useQuery(
        [API_ROUTES.ENTERPRISE.GET_ALL, params],
        async () => await getAllEnterprises(params),
        {
            refetchOnMount: false,
            refetchInterval: false,
            refetchOnWindowFocus: false,
        },
    );
};

export const useGetMyEnterprises = (params: IGetMyEnterprisesParams) => {
    return useQuery(
        [API_ROUTES.ENTERPRISE.GET_MY, params],
        async () => await getMyEnterprises(params),
        {
            refetchOnMount: false,
            refetchInterval: false,
            refetchOnWindowFocus: false,
        },
    );
};

export const useGetEnterpriseById = (id: string) => {
    return useQuery(
        [API_ROUTES.ENTERPRISE.GET_BY_ID(id)],
        async () => await getEnterpriseById(id),
        {
            enabled: !!id,
            refetchOnMount: false,
            refetchInterval: false,
            refetchOnWindowFocus: false,
        },
    );
};

export const useGetEnterpriseBySlug = (slug: string) => {
    return useQuery(
        [API_ROUTES.ENTERPRISE.GET_BY_SLUG(slug)],
        async () => await getEnterpriseBySlug(slug),
        {
            enabled: !!slug,
            refetchOnMount: false,
            refetchInterval: false,
            refetchOnWindowFocus: false,
        },
    );
};

export const useCreateEnterprise = () => {
    const queryClient = useQueryClient();

    return useMutation(
        (payload: ICreateEnterpriseBodyRequest) => createEnterprise(payload),
        {
            onSuccess: () => {
                queryClient.invalidateQueries([API_ROUTES.ENTERPRISE.GET_MY]);
            },
        },
    );
};

export const useUpdateEnterprise = () => {
    const queryClient = useQueryClient();

    return useMutation(
        ({ id, payload }: { id: string; payload: IUpdateEnterpriseBodyRequest }) =>
            updateEnterprise(id, payload),
        {
            onSuccess: (_, variables) => {
                queryClient.invalidateQueries([
                    API_ROUTES.ENTERPRISE.GET_BY_ID(variables.id),
                ]);
                queryClient.invalidateQueries([API_ROUTES.ENTERPRISE.GET_MY]);
            },
        },
    );
};

export const useDeleteEnterprise = () => {
    const queryClient = useQueryClient();

    return useMutation((id: string) => deleteEnterprise(id), {
        onSuccess: () => {
            queryClient.invalidateQueries([API_ROUTES.ENTERPRISE.GET_MY]);
        },
    });
};

export const useTransferOwnership = () => {
    const queryClient = useQueryClient();

    return useMutation(
        ({
            id,
            payload,
        }: {
            id: string;
            payload: ITransferEnterpriseOwnershipBodyRequest;
        }) => transferOwnership(id, payload),
        {
            onSuccess: (_, variables) => {
                queryClient.invalidateQueries([
                    API_ROUTES.ENTERPRISE.GET_BY_ID(variables.id),
                ]);
            },
        },
    );
};

