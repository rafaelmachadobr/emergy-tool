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
            Transforme seus dados em <br className="hidden md:block" />
            <span className="text-[#E5F9E0] font-extrabold">
              Insights acionáveis
            </span>
          </h1>
          <p className="text-white/90 text-lg md:text-xl max-w-3xl mt-6 leading-relaxed">
            Uma plataforma de análise poderosa projetada para ajudar empresas a
            tomar decisões baseadas em dados, com visualização intuitiva e
            análises avançadas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Button asChild size="lg">
              <Link to="/register">
                Comece grátis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/login">Entrar</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
