import {
  IAddEmployeeGoogleEmailBodyRequest,
  IUpdateEmployeeGoogleEmailBodyRequest,
} from '@global-types/body-requests/employee-google-email.body-request';
import { IGetEmployeeGoogleEmailsParams } from '@global-types/params/employee-google-email.params';
import {
  IGetEmployeeGoogleEmailsResponse,
  IGetEmployeeGoogleEmailByIdResponse,
  IAddEmployeeGoogleEmailResponse,
  IUpdateEmployeeGoogleEmailResponse,
  IDeleteEmployeeGoogleEmailResponse,
  IAuthorizeEmployeeEmailResponse,
} from '@global-types/responses/employee-google-email.response';
import { API_ROUTES } from '@/api';
import api from '@/axios/axios.v1';
import { AxiosRequestConfig } from 'axios';

export const addEmployeeGoogleEmail = async (
  memberId: string,
  payload: IAddEmployeeGoogleEmailBodyRequest,
): Promise<IAddEmployeeGoogleEmailResponse> => {
  const data = await api.post(
    API_ROUTES.EMPLOYEE_GOOGLE_EMAIL.ADD(memberId),
    payload,
  );
  return data;
};

export const getAllEmployeeGoogleEmails = async (
  params: IGetEmployeeGoogleEmailsParams,
  config?: AxiosRequestConfig,
): Promise<IGetEmployeeGoogleEmailsResponse> => {
  const response = await api.get<IGetEmployeeGoogleEmailsResponse>(
    API_ROUTES.EMPLOYEE_GOOGLE_EMAIL.GET_ALL,
    {
      params,
      ...(config || {}),
    },
  );
  return response;
};

export const getEmployeeGoogleEmailById = async (
  id: string,
): Promise<IGetEmployeeGoogleEmailByIdResponse> => {
  const data = await api.get(
    API_ROUTES.EMPLOYEE_GOOGLE_EMAIL.GET_BY_ID(id),
  );
  return data;
};

export const authorizeEmployeeEmail = async (
  id: string,
): Promise<IAuthorizeEmployeeEmailResponse> => {
  const data = await api.get(
    API_ROUTES.EMPLOYEE_GOOGLE_EMAIL.AUTHORIZE(id),
  );
  return data;
};

export const updateEmployeeGoogleEmail = async (
  id: string,
  payload: IUpdateEmployeeGoogleEmailBodyRequest,
): Promise<IUpdateEmployeeGoogleEmailResponse> => {
  const data = await api.patch(
    API_ROUTES.EMPLOYEE_GOOGLE_EMAIL.UPDATE(id),
    payload,
  );
  return data;
};

export const deleteEmployeeGoogleEmail = async (
  id: string,
): Promise<IDeleteEmployeeGoogleEmailResponse> => {
  const data = await api.delete(
    API_ROUTES.EMPLOYEE_GOOGLE_EMAIL.DELETE(id),
  );
  return data;
};

