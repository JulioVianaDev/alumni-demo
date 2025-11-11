import { useQuery } from 'react-query';
import { IGetEmployeeGoogleEmailsParams } from '@global-types/params/employee-google-email.params';
import {
  getAllEmployeeGoogleEmails,
  getEmployeeGoogleEmailById,
} from '@/hooks/action/employee-google-email/employee-google-email.action';
import { API_ROUTES } from '@/api';

export const useGetAllEmployeeGoogleEmails = (
  params: IGetEmployeeGoogleEmailsParams,
) => {
  return useQuery(
    [API_ROUTES.EMPLOYEE_GOOGLE_EMAIL.GET_ALL, params],
    async () => await getAllEmployeeGoogleEmails(params),
    {
      refetchOnMount: false,
      refetchInterval: false,
      refetchOnWindowFocus: false,
      enabled: !!params.memberId,
    },
  );
};

export const useGetEmployeeGoogleEmailById = (id: string) => {
  return useQuery(
    [API_ROUTES.EMPLOYEE_GOOGLE_EMAIL.GET_BY_ID, id],
    async () => await getEmployeeGoogleEmailById(id),
    {
      refetchOnMount: false,
      refetchInterval: false,
      refetchOnWindowFocus: false,
      enabled: !!id,
    },
  );
};

