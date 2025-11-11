import { API_ROUTES } from "@/api";
import {
    createUsers,
    createUsersByFile,
    deleteUsers,
    getUsers,
    updateUsers,
} from "@/hooks/action/user/user";
import { useQuery } from "@tanstack/react-query";
import { Exact } from "@global-types/exact";
import { GetUsersParams } from "@global-types/params/user.params";
import {
    GetUsersResponse,
    GetUserByIdResponse,
} from "@global-types/responses/user.response";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
    CreateUserBodyRequest,
    UpdateUserBodyRequest,
} from "@global-types/body-requests/user.body-request";
import useQueryParams from "@/hooks/useQueryparams";
import { RoleType } from "@global-types/user";
import { getUserById } from "../../action/user/user";
import { useUserStore } from "../../../zustand/user.store";
import { useToast } from "@/components/ui/use-toast";
import { resetPassword } from "@/hooks/action/user/user";

export const useUsersQuery = (
    params: Exact<GetUsersParams, GetUsersParams>,
) => {
    const { page = 0, search = "", role } = params;
    return useQuery<GetUsersResponse>({
        queryKey: [API_ROUTES.USERS.GET, page, search, role],
        queryFn: async () => {
            return await getUsers({ page, search, role });
        },
        refetchOnWindowFocus: false,
        initialData: {
            data: [],
            metadata: {
                page,
                search,
                hasNextPage: false,
                total: 0,
                hasPreviousPage: false,
            },
        },
    });
};
export const useGetUserById = (userId: number | undefined) => {
    const { setUser } = useUserStore();

    const userData = localStorage.getItem("user-data");
    const userExists = !!userData;
    return useQuery<GetUserByIdResponse>({
        queryKey: [API_ROUTES.USERS.GET_BY_ID, userId],
        queryFn: async () => {
            if (!userId) {
                return null;
            }
            const user = await getUserById(userId);
            setUser(user);
            return user;
        },
        enabled: !!userId && !userExists,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });
};

export const useDeleteUser = () => {
    const queryClient = useQueryClient();
    const { search: searchQuery } = useQueryParams();
    const page = Number(searchQuery.get("page") ?? 1);
    const search = searchQuery.get("search") ?? "";
    const role = (searchQuery.get("role") as RoleType) ?? "ALL";
    return useMutation({
        mutationFn: async (userId: number) => {
            await deleteUsers(userId);
            return userId;
        },
        onSuccess: (userId) => {
            queryClient.setQueryData(
                [API_ROUTES.USERS.GET, page, search, role],
                (oldData: GetUsersResponse | undefined) => {
                    if (!oldData) return oldData;
                    return {
                        ...oldData,
                        data: oldData.data.filter(
                            (user) => user.id !== userId,
                        ),
                    };
                },
            );
        },
    });
};

export const useUpdateUser = () => {
    const queryClient = useQueryClient();
    const { search: searchQuery } = useQueryParams();
    const page = Number(searchQuery.get("page") ?? 1);
    const search = searchQuery.get("search") ?? "";
    return useMutation({
        mutationFn: async (payload: {
            data: UpdateUserBodyRequest;
            userId: number;
        }) => {
            return await updateUsers(payload);
        },
        onSuccess: (response) => {
            queryClient.setQueryData(
                [API_ROUTES.USERS.GET, page, search, response.role],
                (oldData: GetUsersResponse | undefined) => {
                    if (!oldData) return undefined;
                    return {
                        ...oldData,
                        data: oldData.data.map((d) => {
                            if (d.id === response.id) {
                                return response;
                            }
                            return d;
                        }),
                    };
                },
            );
        },
    });
};
export const useCreateUser = () => {
    const queryClient = useQueryClient();
    const { search: searchQuery } = useQueryParams();
    const page = Number(searchQuery.get("page") ?? 1);
    const search = searchQuery.get("search") ?? "";
    return useMutation({
        mutationFn: async (payload: {
            data: CreateUserBodyRequest;
        }) => {
            return await createUsers(payload);
        },
        onSuccess: (response) => {
            queryClient.setQueryData(
                [API_ROUTES.USERS.GET, page, search, response.role],
                (oldData: GetUsersResponse | undefined) => {
                    if (!oldData) return undefined;
                    return {
                        ...oldData,
                        data: [response, ...oldData.data],
                        metadata: {
                            ...oldData.metadata,
                            total: oldData.metadata.total + 1,
                        },
                    };
                },
            );
        },
    });
};
export const useSubmitCreateUsersByFile = () => {
    const queryClient = useQueryClient();
    const { search: searchQuery } = useQueryParams();
    const page = searchQuery.get("page") ?? "";
    const search = searchQuery.get("search") ?? "";
    const role = (searchQuery.get("role") as RoleType) ?? "ALL";

    return useMutation({
        mutationFn: async (payload: { file: File }) => {
            return await createUsersByFile(payload.file);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [
                    API_ROUTES.USERS.GET,
                    { page, search, role },
                ],
            });
        },
    });
};

export const useResetPassword = () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
        mutationFn: async (userId: number) => {
            return await resetPassword(userId);
        },
        onSuccess: () => {
            toast({
                title: "Senha redefinida com sucesso!",
                description: "A senha foi alterada para 'mynds'",
            });
        },
        onError: () => {
            toast({
                title: "Erro ao redefinir senha!",
                description:
                    "Ocorreu um erro ao tentar redefinir a senha",
                variant: "destructive",
            });
        },
    });
};
