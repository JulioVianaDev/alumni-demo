import { API_ROUTES } from "@/api";
import {
    createSchool,
    createSchoolByFile,
    deleteSchool,
    getSchools,
    updateSchool,
} from "@/hooks/action/school/school";
import { useQuery } from "@tanstack/react-query";
import { Exact } from "@global-types/exact";
import { GetSchoolParams } from "@global-types/params/school.params";
import { GetSchoolResponse } from "@global-types/responses/school.response";
import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";
import {
    CreateSchoolBodyRequest,
    UpdateSchoolBodyRequest,
} from "@global-types/body-requests/school.body-request";
import useQueryParams from "@/hooks/useQueryparams";

export const useSchoolsQuery = (
    params: Exact<GetSchoolParams, GetSchoolParams>,
) => {
    const { page = 0, search = "" } = params;
    return useQuery<GetSchoolResponse>({
        queryKey: [
            API_ROUTES.SCHOOLS.GET,
            { page, search },
        ],
        queryFn: async () => {
            return await getSchools({
                page,
                search,
            });
        },
        initialData: {
            data: [],
            metadata: {
                page,
                lastPage: 0,
                hasNextPage: false,
                total: 0,
                hasPreviousPage: false,
            },
        },
    });
};

export const useDeleteSchool = () => {
    const queryClient = useQueryClient();
    const { search: searchQuery } = useQueryParams();
    const page = Number(searchQuery.get("page") ?? 1);
    const search = searchQuery.get("search") ?? "";
    return useMutation({
        mutationFn: async (SchoolId: number) => {
            await deleteSchool(SchoolId);
            return SchoolId;
        },
        onSuccess: (SchoolId) => {
            queryClient.setQueryData(
                [API_ROUTES.SCHOOLS.GET, { page, search }],
                (
                    oldData: GetSchoolResponse | undefined,
                ) => {
                    if (!oldData) return oldData;
                    return {
                        ...oldData,
                        data: oldData.data.filter(
                            (School) =>
                                School.id !== SchoolId,
                        ),
                    };
                },
            );
        },
    });
};

export const useUpdateSchool = () => {
    const queryClient = useQueryClient();
    const { search: searchQuery } = useQueryParams();
    const page = Number(searchQuery.get("page") ?? 1);
    const search = searchQuery.get("search") ?? "";
    return useMutation({
        mutationFn: async (payload: {
            data: UpdateSchoolBodyRequest;
            SchoolId: number;
        }) => {
            return await updateSchool(payload);
        },
        onSuccess: (response) => {
            queryClient.setQueryData(
                [API_ROUTES.SCHOOLS.GET, { page, search }],
                (
                    oldData: GetSchoolResponse | undefined,
                ) => {
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
export const useCreateSchool = () => {
    const queryClient = useQueryClient();
    const { search: searchQuery } = useQueryParams();
    const page = Number(searchQuery.get("page") ?? 1);
    const search = searchQuery.get("search") ?? "";
    return useMutation({
        mutationFn: async (payload: {
            data: CreateSchoolBodyRequest;
        }) => {
            return await createSchool(payload);
        },
        onSuccess: (response) => {
            queryClient.setQueryData(
                [API_ROUTES.SCHOOLS.GET, { page, search }],
                (
                    oldData: GetSchoolResponse | undefined,
                ) => {
                    if (!oldData) return undefined;
                    return {
                        ...oldData,
                        data: [response, ...oldData.data],
                    };
                },
            );
        },
    });
};
export const useSubmitCreateSchoolsByFile = () => {
    const queryClient = useQueryClient();
    const { search: searchQuery } = useQueryParams();
    const page = searchQuery.get("page") ?? "";
    const search = searchQuery.get("search") ?? "";

    return useMutation({
        mutationFn: async (payload: { file: File }) => {
            return await createSchoolByFile(payload.file);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [
                    API_ROUTES.SCHOOLS.GET,
                    {
                        page,
                        search,
                    },
                ],
            });
        },
    });
};
