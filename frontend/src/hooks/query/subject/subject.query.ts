import { API_ROUTES } from "@/api";
import {
    createSubject,
    createSubjectByFile,
    deleteSubject,
    getSubjects,
    getSubjectById,
    updateSubject,
} from "@/hooks/action/subject/subject";
import { useQuery } from "@tanstack/react-query";
import { Exact } from "@global-types/exact";
import { GetSubjectParams } from "@global-types/params/subject.params";
import { GetSubjectResponse } from "@global-types/responses/subject.response";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
    CreateSubjectBodyRequest,
    UpdateSubjectBodyRequest,
} from "@global-types/body-requests/subject.body-request";
import useQueryParams from "@/hooks/useQueryparams";

export const useSubjectsQuery = (
    params: Exact<GetSubjectParams, GetSubjectParams>,
) => {
    const { page = 0, search = "" } = params;
    return useQuery<GetSubjectResponse>({
        queryKey: [API_ROUTES.SUBJECT.GET, { page, search }],
        queryFn: async () => {
            return await getSubjects({ page, search });
        },
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

export const useSubjectById = (subjectId: number | null) => {
    return useQuery({
        queryKey: [
            API_ROUTES.SUBJECT.GET_BY_ID(subjectId || 0),
            subjectId,
        ],
        queryFn: async () => {
            if (!subjectId) return null;
            return await getSubjectById(subjectId);
        },
        enabled: !!subjectId,
    });
};

export const useDeleteSubject = () => {
    const queryClient = useQueryClient();
    const { search: searchQuery } = useQueryParams();
    const page = Number(searchQuery.get("page") ?? 1);
    const search = searchQuery.get("search") ?? "";
    return useMutation({
        mutationFn: async (subjectId: number) => {
            await deleteSubject(subjectId);
            return subjectId;
        },
        onSuccess: (subjectId) => {
            queryClient.setQueryData(
                [API_ROUTES.SUBJECT.GET, { page, search }],
                (oldData: GetSubjectResponse | undefined) => {
                    if (!oldData) return oldData;
                    return {
                        ...oldData,
                        data: oldData.data.filter(
                            (subject) => subject.id !== subjectId,
                        ),
                    };
                },
            );
        },
    });
};

export const useUpdateSubject = () => {
    const queryClient = useQueryClient();
    const { search: searchQuery } = useQueryParams();
    const page = Number(searchQuery.get("page") ?? 1);
    const search = searchQuery.get("search") ?? "";
    return useMutation({
        mutationFn: async (payload: {
            data: UpdateSubjectBodyRequest;
            subjectId: number;
        }) => {
            return await updateSubject(payload);
        },
        onSuccess: (response) => {
            queryClient.setQueryData(
                [API_ROUTES.SUBJECT.GET, { page, search }],
                (oldData: GetSubjectResponse | undefined) => {
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
export const useCreateSubject = () => {
    const queryClient = useQueryClient();
    const { search: searchQuery } = useQueryParams();
    const page = Number(searchQuery.get("page") ?? 1);
    const search = searchQuery.get("search") ?? "";
    return useMutation({
        mutationFn: async (payload: {
            data: CreateSubjectBodyRequest;
        }) => {
            return await createSubject(payload);
        },
        onSuccess: (response) => {
            queryClient.setQueryData(
                [API_ROUTES.SUBJECT.GET, { page, search }],
                (oldData: GetSubjectResponse | undefined) => {
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
export const useSubmitCreateSubjectsByFile = () => {
    const queryClient = useQueryClient();
    const { search: searchQuery } = useQueryParams();
    const page = searchQuery.get("page") ?? "";
    const search = searchQuery.get("search") ?? "";

    return useMutation({
        mutationFn: async (payload: { file: File }) => {
            return await createSubjectByFile(payload.file);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [API_ROUTES.SUBJECT.GET, { page, search }],
            });
        },
    });
};
