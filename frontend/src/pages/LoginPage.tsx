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
    <main className="bg-background container grid h-svh max-w-none items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-2 py-8 sm:w-[480px] sm:p-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">EMERGY TOOL</h1>
          <p className="mt-2 text-muted-foreground">
            Plataforma de Cálculo Emergia
          </p>
        </div>
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
      </div>
    </main>
  );
};

export default LoginPage;
