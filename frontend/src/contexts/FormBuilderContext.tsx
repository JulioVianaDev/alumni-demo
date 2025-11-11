import React, { createContext, useContext, useState } from "react";
import {
    FormElement,
    FormElementType,
    FormSubmissionData,
} from "@global-types/form-elements";
import { v4 as uuidv4 } from "uuid";
import { useToast } from "@/hooks/use-toast";
import { useParams } from "@tanstack/react-router";

interface FormBuilderContextProps {
    formElements: FormElement[];
    selectedElementId: string | null;
    addFormElement: (type: FormElementType) => void;
    updateFormElement: (
        id: string,
        data: Partial<FormElement>,
    ) => void;
    removeFormElement: (id: string) => void;
    setupElements: (elements: FormElement[]) => void;
    reorderFormElements: (
        startIndex: number,
        endIndex: number,
    ) => void;
    moveFormElementUp: (index: number) => void;
    moveFormElementDown: (index: number) => void;
    selectElement: (id: string | null) => void;
    duplicateElement: (id: string) => void;
    submitForm: () => void;
    previewForm: (isAnswer?: boolean) => void;
    isPreviewMode: boolean;
    formResponses: Record<string, any>;
    updateFormResponse: (id: string, value: any) => void;
    isAnswerValidation: boolean;
    setIsAnswerValidation: (state: boolean) => void;
}

const FormBuilderContext = createContext<
    FormBuilderContextProps | undefined
>(undefined);

export const useFormBuilder = () => {
    const context = useContext(FormBuilderContext);
    if (context === undefined) {
        throw new Error(
            "useFormBuilder must be used within a FormBuilderProvider",
        );
    }
    return context;
};

export const FormBuilderProvider: React.FC<{
    children: React.ReactNode;
}> = ({ children }) => {
    const [formElements, setFormElements] = useState<FormElement[]>(
        [],
    );
    const [selectedElementId, setSelectedElementId] = useState<
        string | null
    >(null);
    const [isPreviewMode, setIsPreviewMode] = useState(false);
    const [formResponses, setFormResponses] = useState<
        Record<string, any>
    >({});
    const { toast } = useToast();
    const [isAnswerValidation, setIsAnswerValidation] =
        useState(false);
    const createDefaultElement = (
        type: FormElementType,
    ): FormElement => {
        const baseElement = {
            id: uuidv4(),
            type,
            label: getDefaultLabel(type),
            required: false,
        };

        switch (type) {
            case "text-input":
                return {
                    ...baseElement,
                    placeholder: "Enter text...",
                };
            case "number-input":
                return {
                    ...baseElement,
                    placeholder: "Enter a number...",
                };
            case "date-input":
                return {
                    ...baseElement,
                };
            case "multiple-choice":
                return {
                    ...baseElement,
                    options: [
                        {
                            id: uuidv4(),
                            label: "Option 1",
                            value: "option_1",
                            isCorrect: true,
                        },
                        {
                            id: uuidv4(),
                            label: "Option 2",
                            value: "option_2",
                            isCorrect: false,
                        },
                        {
                            id: uuidv4(),
                            label: "Option 3",
                            value: "option_3",
                            isCorrect: false,
                        },
                    ],
                };
            case "checkbox-group":
                return {
                    ...baseElement,
                    options: [
                        {
                            id: uuidv4(),
                            label: "Option 1",
                            value: "option_1",
                            isCorrect: true,
                        },
                        {
                            id: uuidv4(),
                            label: "Option 2",
                            value: "option_2",
                            isCorrect: true,
                        },
                        {
                            id: uuidv4(),
                            label: "Option 3",
                            value: "option_3",
                            isCorrect: false,
                        },
                    ],
                };
            case "image-input":
                return {
                    ...baseElement,
                };
            case "image-display":
                return {
                    ...baseElement,
                    imageUrl:
                        "https://images.unsplash.com/photo-1598128558393-70ff21433be0?q=80&w=2089&auto=format&fit=crop",
                };
            case "header":
                return {
                    ...baseElement,
                    label: "Section Header",
                };
            case "columns-2":
            case "columns-3":
            case "columns-4":
                return {
                    ...baseElement,
                    columns: [],
                };
            default:
                return baseElement;
        }
    };

    const getDefaultLabel = (type: FormElementType): string => {
        switch (type) {
            case "header":
                return "Section Header";
            case "text-input":
                return "Text Input";
            case "number-input":
                return "Number Input";
            case "date-input":
                return "Date";
            case "multiple-choice":
                return "Multiple Choice Question";
            case "checkbox-group":
                return "Checkbox Group";
            case "image-input":
                return "Image Upload";
            case "image-display":
                return "Image";
            case "columns-2":
                return "Two Columns";
            case "columns-3":
                return "Three Columns";
            case "columns-4":
                return "Four Columns";
            default:
                return "New Element";
        }
    };

    const addFormElement = (type: FormElementType) => {
        const newElement = createDefaultElement(type);
        setFormElements((prev) => [...prev, newElement]);
        setSelectedElementId(newElement.id);
    };

    const updateFormElement = (
        id: string,
        data: Partial<FormElement>,
    ) => {
        setFormElements((prev) => {
            return prev.map((element) => {
                if (element.id === id) {
                    return {
                        ...element,
                        ...data,
                    };
                }

                if (element.columns) {
                    const updatedColumns = element.columns.map(
                        (column) =>
                            column.id === id
                                ? {
                                      ...column,
                                      ...data,
                                  }
                                : column,
                    );

                    return {
                        ...element,
                        columns: updatedColumns,
                    };
                }

                return element;
            });
        });
    };

    const removeFormElement = (id: string) => {
        const isTopLevel = formElements.some(
            (element) => element.id === id,
        );

        if (isTopLevel) {
            setFormElements((prev) =>
                prev.filter((element) => element.id !== id),
            );
        } else {
            setFormElements((prev) => {
                return prev.map((element) => {
                    if (element.columns) {
                        const updatedColumns = element.columns.filter(
                            (column) => column.id !== id,
                        );
                        if (
                            updatedColumns.length !==
                            element.columns.length
                        ) {
                            return {
                                ...element,
                                columns: updatedColumns,
                            };
                        }
                    }
                    return element;
                });
            });
        }

        if (selectedElementId === id) {
            setSelectedElementId(null);
        }
    };

    const reorderFormElements = (
        startIndex: number,
        endIndex: number,
    ) => {
        const result = Array.from(formElements);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        setFormElements(result);
    };

    const moveFormElementUp = (index: number) => {
        if (index <= 0) return; // Can't move up if already at the top
        reorderFormElements(index, index - 1);

        toast({
            description: "Element moved up",
        });
    };
    const setupElements = (elements: FormElement[]) => {
        setFormElements(elements);
    };

    const moveFormElementDown = (index: number) => {
        if (index >= formElements.length - 1) return; // Can't move down if already at the bottom
        reorderFormElements(index, index + 1);

        toast({
            description: "Element moved down",
        });
    };

    const selectElement = (id: string | null) => {
        setSelectedElementId(id);
    };

    const duplicateElement = (id: string) => {
        let elementToDuplicate: FormElement | undefined;
        let parentColumnId: string | null = null;

        elementToDuplicate = formElements.find((el) => el.id === id);

        if (!elementToDuplicate) {
            for (const element of formElements) {
                if (element.columns) {
                    const column = element.columns.find(
                        (col) => col.id === id,
                    );
                    if (column) {
                        elementToDuplicate = column;
                        parentColumnId = element.id;
                        break;
                    }
                }
            }
        }

        if (elementToDuplicate) {
            const duplicated = {
                ...elementToDuplicate,
                id: uuidv4(),
                label: `${elementToDuplicate.label} (Copy)`,
                options: elementToDuplicate.options
                    ? elementToDuplicate.options.map((opt) => ({
                          ...opt,
                          id: uuidv4(),
                      }))
                    : undefined,
                columns: elementToDuplicate.columns
                    ? elementToDuplicate.columns.map((col) => ({
                          ...col,
                          id: uuidv4(),
                          options: col.options
                              ? col.options.map((opt) => ({
                                    ...opt,
                                    id: uuidv4(),
                                }))
                              : undefined,
                      }))
                    : undefined,
            };

            if (parentColumnId) {
                setFormElements((prev) => {
                    return prev.map((element) => {
                        if (
                            element.id === parentColumnId &&
                            element.columns
                        ) {
                            const columnIndex =
                                element.columns.findIndex(
                                    (col) => col.id === id,
                                );
                            if (columnIndex !== -1) {
                                const newColumns = [
                                    ...element.columns,
                                ];
                                newColumns.splice(
                                    columnIndex + 1,
                                    0,
                                    duplicated,
                                );
                                return {
                                    ...element,
                                    columns: newColumns,
                                };
                            }
                        }
                        return element;
                    });
                });
            } else {
                const index = formElements.findIndex(
                    (el) => el.id === id,
                );
                const newElements = [...formElements];
                newElements.splice(index + 1, 0, duplicated);
                setFormElements(newElements);
            }

            setSelectedElementId(duplicated.id);
        }
    };

    const updateFormResponse = (id: string, value: any) => {
        setFormResponses((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const previewForm = (isAnswer?: boolean) => {
        setIsPreviewMode((prev) => !prev);
        setSelectedElementId(null);

        if (!isPreviewMode) {
            setFormResponses({});
        }
        if (isAnswer) {
            setIsAnswerValidation(true);
        }

        toast({
            description: isPreviewMode
                ? "Exited preview mode"
                : "Entered preview mode. Fill the form to test it.",
        });
    };

    const { id } = useParams({ strict: false });
    const submitForm = () => {
        const submissionData: FormSubmissionData = {
            elements: formElements,
            responses: formResponses,
        };

        const dataStr = JSON.stringify(submissionData, null, 2);
        const dataUri =
            "data:application/json;charset=utf-8," +
            encodeURIComponent(dataStr);

        const exportFileDefaultName = `form-submission-${new Date().toISOString().slice(0, 10)}.json`;
        const linkElement = document.createElement("a");
        linkElement.setAttribute("href", dataUri);
        linkElement.setAttribute("download", exportFileDefaultName);
        linkElement.click();

        toast({
            description: "Form data downloaded successfully",
        });
    };

    const value = {
        formElements,
        selectedElementId,
        addFormElement,
        updateFormElement,
        removeFormElement,
        reorderFormElements,
        moveFormElementUp,
        moveFormElementDown,
        selectElement,
        duplicateElement,
        submitForm,
        previewForm,
        isPreviewMode,
        formResponses,
        updateFormResponse,
        setupElements,
        isAnswerValidation,
        setIsAnswerValidation,
    };

    return (
        <FormBuilderContext.Provider value={value}>
            {children}
        </FormBuilderContext.Provider>
    );
};

export default FormBuilderProvider;
