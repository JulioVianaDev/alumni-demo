import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import api from "@/axios/axios.v1";
import { API_ROUTES } from "@/api";
import { CreateUserBodyRequest } from "@global-types/body-requests/user.body-request";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

const registerSchema = z.object({
    name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres."),
    email: z.string().email("Por favor, insira um e-mail válido."),
    password: z
        .string()
        .min(6, "A senha deve ter pelo menos 6 caracteres."),
    confirmPassword: z.string(),
    cpf: z.string().optional(),
    age: z.number().optional(),
    role: z.enum(["USER", "ADMIN"], {
        required_error: "Por favor, selecione um tipo de usuário.",
    }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem.",
    path: ["confirmPassword"],
});

export function RegisterForm() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    
    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            cpf: "",
            age: undefined,
            role: "USER",
        },
    });

    const onSubmit = async (data: z.infer<typeof registerSchema>) => {
        setIsLoading(true);
        try {
            const { confirmPassword, ...userData } = data;
            const registerData: CreateUserBodyRequest = {
                ...userData,
                age: data.age || undefined,
            };

            await api.post(API_ROUTES.AUTH.REGISTER, registerData);
            
            toast.success("Conta criada com sucesso! Você pode fazer login agora.");
            navigate({ to: "/login" });
        } catch (error: any) {
            toast.error(
                error.response?.data?.message || 
                "Erro ao criar conta. Tente novamente."
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl">Criar Conta</CardTitle>
                <CardDescription>
                    Preencha os dados abaixo para criar sua conta
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nome Completo</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Seu nome completo"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>E-mail</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="seuemail@exemplo.com"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="role"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tipo de Usuário</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione o tipo" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="USER">Usuário</SelectItem>
                                            <SelectItem value="ADMIN">Administrador</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Senha</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="Mínimo 6 caracteres"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirmar Senha</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="Digite a senha novamente"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="cpf"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>CPF (Opcional)</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="000.000.000-00"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="age"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Idade (Opcional)</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="Sua idade"
                                            {...field}
                                            onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isLoading}
                        >
                            {isLoading ? "Criando conta..." : "Criar Conta"}
                        </Button>
                    </form>
                </Form>
                <div className="mt-4 text-center text-sm">
                    Já tem uma conta?{" "}
                    <button
                        type="button"
                        onClick={() => navigate({ to: "/login" })}
                        className="text-blue-600 hover:text-blue-800 underline underline-offset-4"
                    >
                        Faça login aqui
                    </button>
                </div>
            </CardContent>
        </Card>
    );
}
