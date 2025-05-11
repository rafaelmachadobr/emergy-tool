import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="h-svh">
      <div className="m-auto flex h-full w-full flex-col items-center justify-center gap-2">
        <h1 className="text-[7rem] leading-tight font-bold">404</h1>
        <span className="font-medium">Ops! Página não encontrada!</span>
        <p className="text-muted-foreground text-center">
          Parece que a página que você está procurando <br />
          não existe ou pode ter sido removida.
        </p>
        <div className="mt-6 flex gap-4">
          <Button variant="outline" onClick={() => navigate(-1)}>
            Voltar
          </Button>
          <Button onClick={() => navigate("/")}>
            Ir para a Página Inicial
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
