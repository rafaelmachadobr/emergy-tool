import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  ChevronDown,
  ExternalLink,
  HelpCircle,
  Mail,
  Search,
} from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

interface FAQ {
  id: number;
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    id: 1,
    question: "Como importar dados para o SCALE?",
    answer:
      "Para importar dados, acesse a página Importar Dados no menu lateral. Você pode enviar arquivos CSV, Excel ou XML clicando no botão 'Enviar Arquivos'. Siga o assistente de mapeamento de dados para associar seus dados aos campos do sistema.",
  },
  {
    id: 2,
    question: "Quais métodos de cálculo são suportados?",
    answer:
      "O SCALE suporta vários métodos de cálculo, incluindo cálculo de pegada de carbono, análise de consumo de energia e cálculos de fatores de emissão. Escolha o método de cálculo apropriado na página Calcular conforme a necessidade dos seus dados.",
  },
  {
    id: 3,
    question: "Como gerar relatórios?",
    answer:
      "Os relatórios podem ser gerados na página Relatórios. Selecione a fonte de dados, escolha o tipo de relatório, personalize os parâmetros e clique em 'Gerar Relatório'. Você pode baixar os relatórios em PDF, Excel ou CSV para seus registros.",
  },
  {
    id: 4,
    question: "Posso automatizar meus cálculos?",
    answer:
      "Sim, o SCALE suporta cálculos agendados. Vá até a página Calcular e configure um cálculo recorrente clicando em 'Agendar' e selecionando a frequência e os parâmetros desejados.",
  },
  {
    id: 5,
    question: "Como interpretar os dados de análise?",
    answer:
      "A página de Análises fornece visualizações dos seus dados. Passe o mouse sobre os gráficos para ver valores detalhados, use as opções de filtro para focar em períodos ou conjuntos de dados específicos e confira o painel de insights para análises de tendências e padrões com IA.",
  },
  {
    id: 6,
    question: "Quais formatos de arquivo são suportados para importação de dados?",
    answer:
      "O SCALE suporta arquivos CSV, Excel (XLSX, XLS), XML e JSON para importação de dados. Certifique-se de que seus arquivos estejam formatados corretamente, com cabeçalhos que possam ser mapeados para os campos do sistema.",
  },
];

const HelpPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaqId, setOpenFaqId] = useState<number | null>(null);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFaq = (id: number) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Your message has been sent successfully!");
    setContactForm({ name: "", email: "", message: "" });
  };

  return (
    <main className="container mx-auto py-6 space-y-8">
      <div className="flex items-center gap-2 mb-4">
        <HelpCircle className="h-6 w-6 text-primary" />
        <h1 className="text-3xl font-bold">Ajuda & Suporte</h1>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        <Input
          className="pl-10"
          placeholder="Buscar tópicos de ajuda..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Links Rápidos</CardTitle>
            <CardDescription>Recursos de ajuda mais acessados</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              variant="outline"
              className="w-full justify-between"
              asChild
            >
              <a href="#" target="_blank" rel="noopener noreferrer">
                Guia de Introdução
                <ExternalLink className="h-4 w-4 ml-2" />
              </a>
            </Button>
            <Button
              variant="outline"
              className="w-full justify-between"
              asChild
            >
              <a href="#" target="_blank" rel="noopener noreferrer">
                Vídeo Tutoriais
                <ExternalLink className="h-4 w-4 ml-2" />
              </a>
            </Button>
            <Button
              variant="outline"
              className="w-full justify-between"
              asChild
            >
              <a href="#" target="_blank" rel="noopener noreferrer">
                Manual do Usuário
                <ExternalLink className="h-4 w-4 ml-2" />
              </a>
            </Button>
            <Button
              variant="outline"
              className="w-full justify-between"
              asChild
            >
              <a href="#" target="_blank" rel="noopener noreferrer">
                Metodologia de Cálculo
                <ExternalLink className="h-4 w-4 ml-2" />
              </a>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contato com o Suporte</CardTitle>
            <CardDescription>
              Precisa de mais ajuda? Fale com nossa equipe de suporte
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div className="space-y-2">
                <Input
                  placeholder="Seu nome"
                  value={contactForm.name}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, name: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Input
                  type="email"
                  placeholder="Seu e-mail"
                  value={contactForm.email}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, email: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Textarea
                  placeholder="Como podemos ajudar?"
                  className="min-h-[100px]"
                  value={contactForm.message}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, message: e.target.value })
                  }
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                <Mail className="mr-2 h-4 w-4" />
                Enviar Solicitação
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Perguntas Frequentes</CardTitle>
          <CardDescription>
            Encontre respostas para dúvidas comuns sobre o SCALE
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => (
              <Collapsible
                key={faq.id}
                open={openFaqId === faq.id}
                onOpenChange={() => toggleFaq(faq.id)}
                className="border rounded-md"
              >
                <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left hover:bg-muted cursor-pointer">
                  <h3 className="font-medium">{faq.question}</h3>
                  <ChevronDown
                    className={`h-5 w-5 transform duration-300 ${
                      openFaqId === faq.id ? "rotate-180" : ""
                    }`}
                  />
                </CollapsibleTrigger>
                <CollapsibleContent className="p-4 pt-0 border-t">
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CollapsibleContent>
              </Collapsible>
            ))
          ) : (
            <div className="text-center py-4">
              <p className="text-muted-foreground">
                Nenhuma FAQ corresponde à sua busca. Tente outro termo ou entre em contato com o suporte.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
};

export default HelpPage;
