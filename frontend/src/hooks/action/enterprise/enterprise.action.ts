import {
    ICreateEnterpriseBodyRequest,
    IUpdateEnterpriseBodyRequest,
    ITransferEnterpriseOwnershipBodyRequest,
} from "@global-types/body-requests/enterprise.body-request";
import {
    IGetEnterprisesParams,
    IGetMyEnterprisesParams,
} from "@global-types/params/enterprise.params";
import { API_ROUTES } from "@/api";
import api from "@/axios/axios.v1";
import {
    IGetEnterprisesResponse,
    IGetEnterpriseByIdResponse,
    IGetMyEnterprisesResponse,
    ICreateEnterpriseResponse,
    IUpdateEnterpriseResponse,
    IDeleteEnterpriseResponse,
    ITransferOwnershipResponse,
} from "@global-types/responses/enterprise.response";
import { AxiosRequestConfig } from "axios";

export const createEnterprise = async (
    payload: ICreateEnterpriseBodyRequest,
): Promise<ICreateEnterpriseResponse> => {
    const data = await api.post<ICreateEnterpriseResponse>(
        API_ROUTES.ENTERPRISE.CREATE,
        payload,
    );
    return data;
};

export const getAllEnterprises = async (
    params: IGetEnterprisesParams,
    config?: AxiosRequestConfig,
): Promise<IGetEnterprisesResponse> => {
    const response = await api.get<IGetEnterprisesResponse>(
        API_ROUTES.ENTERPRISE.GET_ALL,
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

export const getMyEnterprises = async (
    params: IGetMyEnterprisesParams,
    config?: AxiosRequestConfig,
): Promise<IGetMyEnterprisesResponse> => {
    const response = await api.get<IGetMyEnterprisesResponse>(
        API_ROUTES.ENTERPRISE.GET_MY,
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

export const getEnterpriseById = async (
    id: string,
): Promise<IGetEnterpriseByIdResponse> => {
    const data = await api.get<IGetEnterpriseByIdResponse>(
        API_ROUTES.ENTERPRISE.GET_BY_ID(id),
    );
    return data;
};

export const getEnterpriseBySlug = async (
    slug: string,
): Promise<IGetEnterpriseByIdResponse> => {
    const data = await api.get<IGetEnterpriseByIdResponse>(
        API_ROUTES.ENTERPRISE.GET_BY_SLUG(slug),
    );
    return data;
};

export const updateEnterprise = async (
    id: string,
    payload: IUpdateEnterpriseBodyRequest,
): Promise<IUpdateEnterpriseResponse> => {
    const data = await api.patch<IUpdateEnterpriseResponse>(
        API_ROUTES.ENTERPRISE.UPDATE(id),
        payload,
    );
    return data;
};

export const deleteEnterprise = async (
    id: string,
): Promise<IDeleteEnterpriseResponse> => {
    const data = await api.delete<IDeleteEnterpriseResponse>(
        API_ROUTES.ENTERPRISE.DELETE(id),
    );
    return data;
};

export const transferOwnership = async (
    id: string,
    payload: ITransferEnterpriseOwnershipBodyRequest,
): Promise<ITransferOwnershipResponse> => {
    const data = await api.post<ITransferOwnershipResponse>(
        API_ROUTES.ENTERPRISE.TRANSFER_OWNERSHIP(id),
        payload,
    );
    return data;
};

