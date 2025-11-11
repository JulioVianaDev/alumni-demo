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
import { Separator } from "@/components/ui/separator";
import api from "@/axios/axios.v1";
import { API_ROUTES } from "@/api";
import { useNavigate } from "@tanstack/react-router";
const loginSchema = z.object({
    email: z.string().email("Por favor, insira um e-mail válido."),
    password: z
        .string()
        .min(3, "A senha deve ter pelo menos 3 caracteres."),
});

export function LoginForm() {
    const { setUserAuth } = useUserStore();
    const navigate = useNavigate();
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: ILoginBodyRequest) => {
        const response: IAuthLoginResponse = await api.post(
            API_ROUTES.AUTH.LOGIN,
            data,
        );
        localStorage.setItem("user", JSON.stringify(response));
        setUserAuth(response);
        navigate({ to: "/inicio" });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>
                <CardDescription>
                    Insira seu e-mail abaixo para acessar sua conta
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>E-mail</FormLabel>
                                    <FormControl>
                                        <Input
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
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Senha</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="Sua senha"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            type="submit"
                            className="w-full"
                        >
                            Entrar
                        </Button>
                    </form>
                </Form>
                
                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <Separator className="w-full" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">
                                Ou continue com
                            </span>
                        </div>
                    </div>
                    
                    <div className="mt-4">
                        {/* <GoogleLoginButton /> */}
                    </div>
                </div>
                
                <div className="mt-6 text-center text-sm">
                    Não tem uma conta?{" "}
                    <button
                        type="button"
                        onClick={() => navigate({ to: "/register" })}
                        className="text-blue-600 hover:text-blue-800 underline underline-offset-4"
                    >
                        Criar conta aqui
                    </button>
                </div>
            </CardContent>
        </Card>
    );
}
