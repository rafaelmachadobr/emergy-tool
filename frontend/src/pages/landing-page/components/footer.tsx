import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="py-16 px-6 md:px-12 lg:px-24 bg-card border-t">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Emergy Tool</h3>
            <p className="text-muted-foreground mb-4">
              Plataforma de análise de dados para empresas que buscam
              eficiência, inovação e crescimento sustentável.
            </p>
          </div>

          <div>
            <h4 className="text-base font-medium mb-4">Produto</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/features"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Soluções
                </Link>
              </li>
              <li>
                <Link
                  to="/pricing"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Planos e Preços
                </Link>
              </li>
              <li>
                <Link
                  to="/integrations"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Integrações
                </Link>
              </li>
              <li>
                <Link
                  to="/case-studies"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Casos de Sucesso
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-base font-medium mb-4">Recursos</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/help"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Suporte
                </Link>
              </li>
              <li>
                <Link
                  to="/documentation"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Documentação
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-base font-medium mb-4">Empresa</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Sobre a Emergy
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Fale Conosco
                </Link>
              </li>
              <li>
                <Link
                  to="/legal"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Legalidade
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Emergy Tool. Todos os direitos
            reservados.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-muted-foreground hover:text-foreground">
              Termos de Uso
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground">
              Política de Privacidade
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground">
              Política de Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
