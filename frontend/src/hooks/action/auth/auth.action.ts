import { API_ROUTES } from "@/api";
import api from "@/axios/axios.v1";
import { IAuthLoginResponse } from "@global-types/responses/auth.response";

export const googleLoginAction = async (
    code: string,
): Promise<IAuthLoginResponse> => {
    const { data } = await api.post<IAuthLoginResponse>(
        API_ROUTES.AUTH.GOOGLE,
        { code },
    );
    return data;
};
