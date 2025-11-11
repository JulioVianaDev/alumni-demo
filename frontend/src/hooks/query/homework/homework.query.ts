import { useQuery } from "@tanstack/react-query";
import { API_ROUTES } from "@/api";
import { getHomeworkStatusByClassroomAndSubject } from "@/hooks/action/homework/homework.action";
import { HomeworkStatusByClassroom } from "@global-types/responses/homework.response";

export const useHomeworkStatusByClassroomAndSubject = (
    classroomId: number,
    subjectId: number,
    enabled: boolean = true,
) => {
    return useQuery<HomeworkStatusByClassroom[]>({
        queryKey: [
            API_ROUTES.HOMEWORK.GET_STATUS_BY_CLASSROOM_AND_SUBJECT(
                classroomId,
                subjectId,
            ),
            { classroomId, subjectId },
        ],
        queryFn: async () => {
            return await getHomeworkStatusByClassroomAndSubject(
                classroomId,
                subjectId,
            );
        },
        enabled: enabled && classroomId > 0 && subjectId > 0,
        staleTime: 1000 * 60 * 5, // 5 minutes
        gcTime: 1000 * 60 * 10, // 10 minutes (was cacheTime in older versions)
    });
};
