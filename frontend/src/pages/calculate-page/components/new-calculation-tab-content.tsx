import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAddConfig } from "@/hooks/data/use-add-config";
import {
  CalculationPayload,
  useAddEmergyCalculate,
} from "@/hooks/data/use-add-emergy-calculate";
import { useGetConfigs } from "@/hooks/data/use-get-configs";
import { useGetMatrices } from "@/hooks/data/use-get-matrices";
import { ConfigInput } from "@/types/config";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const calculationSchema = z.object({
  matrix: z.number({ required_error: "A matriz é obrigatória" }),
  config: z.number({ required_error: "A configuração é obrigatória" }),
  usefulProduct: z
    .number({ required_error: "O produto útil é obrigatório" })
    .min(0, "O produto útil deve ser um número positivo"),
});

const configSchema = z.object({
  name: z
    .string({ required_error: "O nome é obrigatório" })
    .min(1, "O nome deve ter pelo menos 1 caractere"),
  unit: z
    .string({ required_error: "A unidade é obrigatória" })
    .min(1, "A unidade é obrigatória"),
  transformities: z
    .array(
      z.object({
        resource: z
          .string({ required_error: "O nome do insumo é obrigatório" })
          .min(1, "Informe o nome do insumo"),
        type: z.enum(["R", "F", "N"], {
          required_error: "O tipo é obrigatório",
        }),
        transformity: z
          .number({ required_error: "A transformidade é obrigatória" })
          .min(0, "Deve ser positivo"),
      })
    )
    .min(1, "Adicione pelo menos um insumo"),
});

export const NewCalculationTabContent: React.FC = () => {
  const { data: matrices, isLoading: isLoadingMatrices } = useGetMatrices();
  const { data: configs, isLoading: isLoadingConfigs } = useGetConfigs();
  const { mutateAsync: addEmergyCalculate } = useAddEmergyCalculate();
  const { mutateAsync: addConfig } = useAddConfig();

  const emergyCalculateForm = useForm<z.infer<typeof calculationSchema>>({
    resolver: zodResolver(calculationSchema),
  });

  const configForm = useForm<z.infer<typeof configSchema>>({
    resolver: zodResolver(configSchema),
    defaultValues: {
      transformities: [{ resource: "", type: "R", transformity: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: configForm.control,
    name: "transformities",
  });

  async function onEmergyCalculateSubmit(
    values: z.infer<typeof calculationSchema>
  ) {
    const payload: CalculationPayload = {
      matrix_id: values.matrix,
      scale_config_id: values.config,
      useful_product: values.usefulProduct,
    };

    await addEmergyCalculate(payload)
      .then(() => {
        toast.success(
          "Cálculo de emergia iniciado com sucesso! Você será pode ver os resultados na aba de cálculos."
        );
        emergyCalculateForm.reset();
      })
      .catch((error) => {
        toast.error(
          error.response?.data?.detail ||
            "Ocorreu um erro ao iniciar o cálculo de emergia."
        );
      });
  }

  async function onConfigSubmit(values: z.infer<typeof configSchema>) {
    const payload: ConfigInput = {
      name: values.name,
      config: {
        unit: values.unit,
        transformities: Object.fromEntries(
          values.transformities.map((t) => [
            t.resource,
            { type: t.type, transformity: t.transformity },
          ])
        ),
      },
    };
    await addConfig(payload)
      .then(() => {
        toast.success("Configuração criada com sucesso!");
        configForm.reset();
      })
      .catch((error) => {
        toast.error(
          error.response?.data?.detail ||
            "Ocorreu um erro ao criar a configuração."
        );
      });
  }

  if (isLoadingMatrices || isLoadingConfigs) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Carregando dados...</p>
      </div>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Criar Novo Cálculo</CardTitle>
          <CardDescription>
            Insira os detalhes para seu novo cálculo de emergia.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Form {...emergyCalculateForm}>
            <form
              onSubmit={emergyCalculateForm.handleSubmit(
                onEmergyCalculateSubmit
              )}
              className="grid gap-4"
            >
              <FormField
                control={emergyCalculateForm.control}
                name="matrix"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Matriz</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => field.onChange(Number(value))}
                        value={field.value ? String(field.value) : ""}
                        disabled={!matrices}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecione a matriz" />
                        </SelectTrigger>
                        <SelectContent>
                          {matrices &&
                            matrices.map(
                              (matrix: { id: number; name: string }) => (
                                <SelectItem
                                  key={matrix.id}
                                  value={String(matrix.id)}
                                >
                                  {matrix.name}
                                </SelectItem>
                              )
                            )}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={emergyCalculateForm.control}
                name="config"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Configuração</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => field.onChange(Number(value))}
                        value={field.value ? String(field.value) : ""}
                        disabled={!configs}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecione a configuração" />
                        </SelectTrigger>
                        <SelectContent>
                          {configs &&
                            configs.map(
                              (config: { id: number; name: string }) => (
                                <SelectItem
                                  key={config.id}
                                  value={String(config.id)}
                                >
                                  {config.name}
                                </SelectItem>
                              )
                            )}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={emergyCalculateForm.control}
                name="usefulProduct"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Produto Útil</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Informe o valor do produto útil"
                        {...field}
                        value={field.value ?? ""}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value === ""
                              ? undefined
                              : Number(e.target.value)
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-between pt-2">
                <Button variant="outline" type="button">
                  Cancelar
                </Button>
                <Button
                  className="bg-primary hover:bg-primary/90"
                  type="submit"
                >
                  Iniciar Cálculo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Configurações do Cálculo</CardTitle>
          <CardDescription>
            Configure parâmetros avançados para seu cálculo.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Form {...configForm}>
            <form
              onSubmit={configForm.handleSubmit(onConfigSubmit)}
              className="grid gap-4"
            >
              <FormField
                control={configForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome da Configuração</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Informe o nome da configuração"
                        {...field}
                        value={field.value ?? ""}
                        onChange={(e) => field.onChange(e.target.value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={configForm.control}
                name="unit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unidade</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex: seJ/kg"
                        {...field}
                        value={field.value ?? ""}
                        onChange={(e) => field.onChange(e.target.value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="space-y-2">
                <FormLabel>Transformities</FormLabel>
                <div className="space-y-2">
                  {fields.map((item, index) => (
                    <div key={item.id} className="flex gap-2 items-end">
                      <FormField
                        control={configForm.control}
                        name={`transformities.${index}.resource`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input placeholder="Nome do insumo" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={configForm.control}
                        name={`transformities.${index}.type`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Select
                                value={field.value}
                                onValueChange={field.onChange}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Tipo" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="R">R</SelectItem>
                                  <SelectItem value="F">F</SelectItem>
                                  <SelectItem value="N">N</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={configForm.control}
                        name={`transformities.${index}.transformity`}
                        render={({ field }) => (
                          <FormItem className="w-20">
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Transformidade"
                                {...field}
                                value={field.value ?? ""}
                                onChange={(e) =>
                                  field.onChange(
                                    e.target.value === ""
                                      ? undefined
                                      : Number(e.target.value)
                                  )
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        onClick={() => remove(index)}
                        className="h-9"
                      >
                        Remover
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      append({ resource: "", type: "R", transformity: 0 })
                    }
                  >
                    Adicionar Insumo
                  </Button>
                </div>
              </div>
              <div className="flex justify-between pt-2">
                <Button variant="outline" type="button">
                  Cancelar
                </Button>
                <Button
                  className="bg-primary hover:bg-primary/90"
                  type="submit"
                >
                  Criar Configuração
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
};
