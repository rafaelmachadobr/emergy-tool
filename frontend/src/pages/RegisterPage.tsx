import AuthLayout from "@/components/layout/auth-layout";
import { RegisterForm } from "@/components/register/register-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const RegisterPage = () => {
  return (
    <AuthLayout>
      <Card className="gap-4">
        <CardHeader>
          <CardTitle className="text-lg tracking-tight">
            Criar uma conta
          </CardTitle>
          <CardDescription>
            Informe seu usuário, e-mail e senha para criar uma conta.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <p className="text-muted-foreground px-8 text-center text-sm">
            Ao criar uma conta, você concorda com nossos{" "}
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
          <p className="text-center text-sm mt-2">
            Já possui uma conta?{" "}
            <a
              href="/login"
              className="hover:text-primary underline underline-offset-4 font-medium"
            >
              Entrar
            </a>
          </p>
        </CardFooter>
      </Card>
    </AuthLayout>
  );
};

export default RegisterPage;
