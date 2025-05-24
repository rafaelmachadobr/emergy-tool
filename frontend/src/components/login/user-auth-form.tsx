import { PasswordInput } from "@/components/shared/password-input";
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
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { HTMLAttributes, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

type UserAuthFormProps = HTMLAttributes<HTMLFormElement>;

const formSchema = z.object({
  username: z
    .string()
    .min(1, { message: "Por favor, insira seu nome de usuário" }),
  password: z.string().min(1, {
    message: "Por favor, insira sua senha",
  }),
});

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const navigate = useNavigate();
  const { isAuthenticated, signIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true);

    await signIn(data);

    setIsLoading(false);

    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("grid gap-3", className)}
        {...props}
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome de usuário</FormLabel>
              <FormControl>
                <Input placeholder="Digite seu nome de usuário" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <PasswordInput placeholder="Digite sua senha" {...field} />
              </FormControl>
              <FormMessage />
              <Link
                to="/forgot-password"
                className="text-muted-foreground absolute -top-0.5 right-0 text-sm font-medium hover:opacity-75"
              >
                Esqueceu a senha?
              </Link>
            </FormItem>
          )}
        />
        <Button className="mt-2" disabled={isLoading}>
          Entrar
        </Button>
      </form>
    </Form>
  );
}
