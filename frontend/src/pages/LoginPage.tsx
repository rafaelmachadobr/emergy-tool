import AuthLayout from "@/components/login/auth-layout";
import { UserAuthForm } from "@/components/login/user-auth-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const LoginPage = () => {
  return (
    <AuthLayout>
      <Card className="gap-4">
        <CardHeader>
          <CardTitle className="text-lg tracking-tight">Login</CardTitle>
          <CardDescription>
            Insira seu e-mail e senha abaixo para acessar sua conta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UserAuthForm />
        </CardContent>
        <CardFooter>
          <p className="text-muted-foreground px-8 text-center text-sm">
            Ao clicar em entrar, você concorda com nossos{" "}
            <a
              href="/terms"
              className="hover:text-primary underline underline-offset-4"
            >
              Termos de Serviço
            </a>{" "}
            e{" "}
            <a
              href="/privacy"
              className="hover:text-primary underline underline-offset-4"
            >
              Política de Privacidade
            </a>
            .
          </p>
        </CardFooter>
      </Card>
    </AuthLayout>
  );
};

export default LoginPage;
