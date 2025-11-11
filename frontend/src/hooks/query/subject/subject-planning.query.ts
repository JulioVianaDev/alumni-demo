import { API_ROUTES } from "@/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getSubjectPlanning, saveSubjectPlanning } from "@/hooks/action/subject/subject-planning.action";


// Hook to get subject planning
export const useSubjectPlanning = (subjectId: number) => {
    return useQuery({
        queryKey: [API_ROUTES.SUBJECT.PLANNING.GET, subjectId],
        queryFn: () => getSubjectPlanning(subjectId),
        enabled: !!subjectId,
    });
};

// Hook to save subject planning
export const useSaveSubjectPlanning = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: saveSubjectPlanning,
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: [API_ROUTES.SUBJECT.PLANNING.GET, data.subjectId],
            });
            toast.success("Subject planning saved successfully");
        },
        onError: (error) => {
            console.error("Error saving subject planning:", error);
            toast.error("Failed to save subject planning");
        },
    });
}; 