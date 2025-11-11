import { API_ROUTES } from "@/api";
import {
    useQuery,
    UseQueryResult,
} from "@tanstack/react-query";
import { Exact } from "@global-types/exact";

import {
    getFormById,
    getForms,
} from "@/hooks/action/form/form.action";
import {
    GetFormsData,
} from "@global-types/responses/form.response";
import { GetFormsParams } from "@global-types/params/forms.params";
import { IFormEntity } from "@global-types/form-elements";
import { getAnswerById, getAnswers } from "@/hooks/action/answer/answer.action";
import { GetAnswersParams } from "@global-types/params/answers.params";
import { GetAnswersResponse, IGetAnwerResponseEntity } from "@global-types/responses/answer.response";
import { IFormAnswerEntity } from "@global-types/answer";
export const useAnswerQuery =
    (
        params: Exact<
            GetAnswersParams,
            GetAnswersParams
        >,
    ) => {
        const {
            page = 0,
            search = "",
            order,
        } = params;
        return useQuery<GetAnswersResponse>(
            {
                queryKey:
                    [
                        API_ROUTES
                            .FORMS
                            .GET,
                        {
                            page,
                            search,
                            order,
                        },
                    ],
                queryFn:
                    async () => {
                        return await getAnswers(
                            params,
                        );
                    },
                initialData:
                {
                    data: [],
                    metadata:
                    {
                        page,
                        lastPage: 0,
                        hasNextPage:
                            false,
                        total: 0,
                        hasPreviousPage:
                            false,
                    },
                },
            },
        );
    };
export const useAnswerById =
    (
        id?: string,
    ): UseQueryResult<IGetAnwerResponseEntity | null> | null => {
        if (!id)
            return null;
        return useQuery<IGetAnwerResponseEntity | null>(
            {
                queryKey:
                    [
                        API_ROUTES.FORMS.GET_BY_ID(
                            id,
                        ),
                    ],
                queryFn:
                    async () => {
                        return await getAnswerById(
                            id,
                        );
                    },
                initialData:
                    null,
                enabled:
                    !!id,
            },
        );
    };

// export const useDeleteUser = () => {
//     const queryClient = useQueryClient();
//     const { search: searchQuery } = useQueryParams();
//     const page = Number(searchQuery.get("page") ?? 1);
//     const search = searchQuery.get("search") ?? "";
//     const role =
//         (searchQuery.get("role") as RoleType) ?? "ALL";
//     return useMutation({
//         mutationFn: async (userId: number) => {
//             await deleteUsers(userId);
//             return userId;
//         },
//         onSuccess: (userId) => {
//             queryClient.setQueryData(
//                 [
//                     API_ROUTES.USERS.GET,
//                     { page, search, role },
//                 ],
//                 (oldData: GetUsersResponse | undefined) => {
//                     if (!oldData) return oldData;
//                     return {
//                         ...oldData,
//                         data: oldData.data.filter(
//                             (user) => user.id !== userId,
//                         ),
//                     };
//                 },
//             );
//         },
//     });
// };

// export const useUpdateUser = () => {
//     const queryClient = useQueryClient();
//     const { search: searchQuery } = useQueryParams();
//     const page = Number(searchQuery.get("page") ?? 1);
//     const search = searchQuery.get("search") ?? "";
//     const role =
//         (searchQuery.get("role") as RoleType) ?? "ALL";
//     return useMutation({
//         mutationFn: async (payload: {
//             data: UpdateUserBodyRequest;
//             userId: number;
//         }) => {
//             return await updateUsers(payload);
//         },
//         onSuccess: (response) => {
//             queryClient.setQueryData(
//                 [
//                     API_ROUTES.USERS.GET,
//                     { page, search, role },
//                 ],
//                 (oldData: GetUsersResponse | undefined) => {
//                     if (!oldData) return undefined;
//                     return {
//                         ...oldData,
//                         data: oldData.data.map((d) => {
//                             if (d.id === response.id) {
//                                 return response;
//                             }
//                             return d;
//                         }),
//                     };
//                 },
//             );
//         },
//     });
// };
// export const useCreateUser = () => {
//     const queryClient = useQueryClient();
//     const { search: searchQuery } = useQueryParams();
//     const page = Number(searchQuery.get("page") ?? 1);
//     const search = searchQuery.get("search") ?? "";
//     const role =
//         (searchQuery.get("role") as RoleType) ?? "ALL";
//     return useMutation({
//         mutationFn: async (payload: {
//             data: CreateUserBodyRequest;
//         }) => {
//             return await createUsers(payload);
//         },
//         onSuccess: (response) => {
//             queryClient.setQueryData(
//                 [
//                     API_ROUTES.USERS.GET,
//                     { page, search, role },
//                 ],
//                 (oldData: GetUsersResponse | undefined) => {
//                     if (!oldData) return undefined;
//                     return {
//                         ...oldData,
//                         data: [response, ...oldData.data],
//                     };
//                 },
//             );
//         },
//     });
// };
// export const useSubmitCreateUsersByFile = () => {
//     const queryClient = useQueryClient();
//     const { search: searchQuery } = useQueryParams();
//     const page = searchQuery.get("page") ?? "";
//     const search = searchQuery.get("search") ?? "";
//     const role =
//         (searchQuery.get("role") as RoleType) ?? "ALL";

//     return useMutation({
//         mutationFn: async (payload: { file: File }) => {
//             return await createUsersByFile(payload.file);
//         },
//         onSuccess: () => {
//             queryClient.invalidateQueries({
//                 queryKey: [
//                     API_ROUTES.USERS.GET,
//                     { page, search, role },
//                 ],
//             });
//         },
//     });
// };
