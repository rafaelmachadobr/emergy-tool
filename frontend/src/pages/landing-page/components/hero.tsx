import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export const HeroSection = () => {
  return (
    <section className="w-full bg-gradient-to-br from-primary to-secondary py-20 px-6 md:px-12 lg:px-24">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col items-center text-center space-y-6 py-12">
          <Badge className="mb-2 text-lg px-6 py-1.5 bg-white/20 text-white border-none backdrop-blur-sm">
            Emergy Tool
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-md">
            Dados que impulsionam <br className="hidden md:block" />
            <span className="text-[#E5F9E0] font-extrabold">
              decisões inteligentes
            </span>
          </h1>
          <p className="text-white/90 text-lg md:text-xl max-w-3xl mt-6 leading-relaxed">
            Solução completa para análise, visualização e gestão de dados
            corporativos. Otimize processos, reduza custos e aumente a
            eficiência com insights em tempo real.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Button asChild size="lg">
              <Link to="/register">
                Teste gratuitamente
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/login">Acessar conta</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
