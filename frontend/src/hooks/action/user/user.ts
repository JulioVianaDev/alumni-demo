import api from "@/axios/axios.v1";
import {
    GetUserByIdResponse,
    GetUsersResponse,
    UpdateOrCreateUserResponse,
} from "@global-types/responses/user.response";
import { GetUsersParams } from "@global-types/params/user.params";
import { Exact } from "@global-types/exact";
import { API_ROUTES } from "@/api";
import {
    CreateUserBodyRequest,
    UpdateUserBodyRequest,
} from "@global-types/body-requests/user.body-request";
export const getUsers = async (
    params?: Exact<GetUsersParams, GetUsersParams>,
) => {
    const response: GetUsersResponse = await api.get(
        API_ROUTES.USERS.GET,
        { params },
    );
    return response;
};
export const getUserById = async (userId: number) => {
    const response: GetUserByIdResponse = await api.get(
        API_ROUTES.USERS.GET_BY_ID(userId),
    );
    console.log("response", response);
    return response;
};
export const createUsers = async ({
    data,
}: {
    data: CreateUserBodyRequest;
}) => {
    const response: UpdateOrCreateUserResponse = await api.post(
        API_ROUTES.USERS.CREATE,
        data,
    );
    return response;
};
export const deleteUsers = async (userId: number) => {
    const response: boolean = await api.delete(
        API_ROUTES.USERS.DELETE(userId),
    );
    return response;
};
export const updateUsers = async ({
    data,
    userId,
}: {
    data: UpdateUserBodyRequest;
    userId: number;
}) => {
    const response: UpdateOrCreateUserResponse = await api.put(
        API_ROUTES.USERS.EDIT(userId),
        data,
    );
    return response;
};

export const createUsersByFile = async (file: File) => {
    try {
        const formData = new FormData();
        formData.append("file", file);

        await api.postForm(API_ROUTES.USERS.IMPORT_FILE, formData);

        return true;
    } catch (error) {
        return false;
    }
};

export const resetPassword = async (userId: number) => {
    const response: UpdateOrCreateUserResponse = await api.patch(
        API_ROUTES.USERS.RESET_PASSWORD(userId),
    );
    return response;
};
