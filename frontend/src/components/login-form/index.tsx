import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGoogleLogin } from "@react-oauth/google";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { googleLoginAction } from "@/hooks/action/auth/auth.action";
import { useNavigate } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

export function LoginForm() {
    const navigate = useNavigate({ from: "/login" });
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const { mutate: handleGoogleLogin, isLoading } = useMutation({
        mutationFn: googleLoginAction,
        onSuccess: (data) => {
            localStorage.setItem("user", JSON.stringify(data));
            navigate({ to: "/" });
        },
        onError: (error) => {
            console.error("Login failed:", error);
        },
    });

    const onGoogleLogin = useGoogleLogin({
        onSuccess: (codeResponse) => {
            handleGoogleLogin(codeResponse.code);
        },
        flow: 'auth-code',
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="shadcn" {...field} />
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
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="******" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
            <Button onClick={() => onGoogleLogin()} disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login with Google"}
            </Button>
        </Form>
    );
}
