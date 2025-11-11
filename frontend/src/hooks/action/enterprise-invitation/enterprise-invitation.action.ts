import { ICreateEnterpriseInvitationBodyRequest } from "@global-types/body-requests/enterprise-invitation.body-request";
import { IGetEnterpriseInvitationsParams } from "@global-types/params/enterprise-invitation.params";
import { API_ROUTES } from "@/api";
import api from "@/axios/axios.v1";
import {
    IGetEnterpriseInvitationsResponse,
    IGetInvitationByTokenResponse,
    ICreateEnterpriseInvitationResponse,
    IAcceptInvitationResponse,
    IDeclineInvitationResponse,
    ICancelInvitationResponse,
    IGetMyPendingInvitationsResponse,
} from "@global-types/responses/enterprise-invitation.response";
import { AxiosRequestConfig } from "axios";

export const createInvitation = async (
    enterpriseId: string,
    payload: ICreateEnterpriseInvitationBodyRequest,
): Promise<ICreateEnterpriseInvitationResponse> => {
    const data = await api.post<ICreateEnterpriseInvitationResponse>(
        API_ROUTES.ENTERPRISE_INVITATION.CREATE(enterpriseId),
        payload,
    );
    return data;
};

export const getAllInvitations = async (
    params: IGetEnterpriseInvitationsParams,
    config?: AxiosRequestConfig,
): Promise<IGetEnterpriseInvitationsResponse> => {
    const response = await api.get<IGetEnterpriseInvitationsResponse>(
        API_ROUTES.ENTERPRISE_INVITATION.GET_ALL,
        {
            params,
            ...(config || {}),
        },
    );
    return response;
};

export const getMyPendingInvitations = async (): Promise<IGetMyPendingInvitationsResponse> => {
    const data = await api.get<IGetMyPendingInvitationsResponse>(
        API_ROUTES.ENTERPRISE_INVITATION.GET_MY,
    );
    return data;
};

export const getInvitationByToken = async (
    token: string,
): Promise<IGetInvitationByTokenResponse> => {
    const data = await api.get<IGetInvitationByTokenResponse>(
        API_ROUTES.ENTERPRISE_INVITATION.GET_BY_TOKEN(token),
    );
    return data;
};

export const acceptInvitation = async (
    token: string,
): Promise<IAcceptInvitationResponse> => {
    const data = await api.post<IAcceptInvitationResponse>(
        API_ROUTES.ENTERPRISE_INVITATION.ACCEPT(token),
    );
    return data;
};

export const declineInvitation = async (
    token: string,
): Promise<IDeclineInvitationResponse> => {
    const data = await api.post<IDeclineInvitationResponse>(
        API_ROUTES.ENTERPRISE_INVITATION.DECLINE(token),
    );
    return data;
};

export const cancelInvitation = async (
    token: string,
): Promise<ICancelInvitationResponse> => {
    const data = await api.delete<ICancelInvitationResponse>(
        API_ROUTES.ENTERPRISE_INVITATION.CANCEL(token),
    );
    return data;
};

