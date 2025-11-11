import {
    IAddEnterpriseMemberBodyRequest,
    IUpdateEnterpriseMemberBodyRequest,
} from "@global-types/body-requests/enterprise-member.body-request";
import { IGetEnterpriseMembersParams } from "@global-types/params/enterprise-member.params";
import { API_ROUTES } from "@/api";
import api from "@/axios/axios.v1";
import {
    IGetEnterpriseMembersResponse,
    IGetEnterpriseMemberByIdResponse,
    IAddEnterpriseMemberResponse,
    IUpdateEnterpriseMemberResponse,
    IDeleteEnterpriseMemberResponse,
} from "@global-types/responses/enterprise-member.response";
import { AxiosRequestConfig } from "axios";

export const getAllMembers = async (
    params: IGetEnterpriseMembersParams,
    config?: AxiosRequestConfig,
): Promise<IGetEnterpriseMembersResponse> => {
    const response = await api.get<IGetEnterpriseMembersResponse>(
        API_ROUTES.ENTERPRISE_MEMBER.GET_ALL,
        {
            params,
            ...(config || {}),
        },
    );
    return response;
};

export const getMemberById = async (
    id: string,
): Promise<IGetEnterpriseMemberByIdResponse> => {
    const data = await api.get<IGetEnterpriseMemberByIdResponse>(
        API_ROUTES.ENTERPRISE_MEMBER.GET_BY_ID(id),
    );
    return data;
};

export const addMember = async (
    enterpriseId: string,
    payload: IAddEnterpriseMemberBodyRequest,
): Promise<IAddEnterpriseMemberResponse> => {
    const data = await api.post<IAddEnterpriseMemberResponse>(
        API_ROUTES.ENTERPRISE_MEMBER.ADD(enterpriseId),
        payload,
    );
    return data;
};

export const updateMember = async (
    id: string,
    payload: IUpdateEnterpriseMemberBodyRequest,
): Promise<IUpdateEnterpriseMemberResponse> => {
    const data = await api.patch<IUpdateEnterpriseMemberResponse>(
        API_ROUTES.ENTERPRISE_MEMBER.UPDATE(id),
        payload,
    );
    return data;
};

export const removeMember = async (
    id: string,
): Promise<IDeleteEnterpriseMemberResponse> => {
    const data = await api.delete<IDeleteEnterpriseMemberResponse>(
        API_ROUTES.ENTERPRISE_MEMBER.REMOVE(id),
    );
    return data;
};

