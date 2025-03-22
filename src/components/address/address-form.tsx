"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type Address, PlanetType } from "@/lib/types";
import { useAddressStore } from "@/lib/store";
import { CountrySelect } from "@/components/country-select";

const earthSchema = z.object({
  id: z.string().optional(),
  planetType: z.literal(PlanetType.EARTH),
  addressType: z.enum(["shipping", "billing"]),
  label: z
    .string()
    .min(1, "Rótulo é obrigatório")
    .max(50, "Máximo de 50 caracteres"),
  name: z
    .string()
    .min(3, "Nome deve ter pelo menos 3 caracteres")
    .max(100, "Máximo de 100 caracteres"),
  phone: z
    .string()
    .min(8, "Telefone deve ter pelo menos 8 dígitos")
    .max(15, "Máximo de 15 dígitos")
    .regex(/^\d+$/, "Apenas números são permitidos"),
  addressLine: z
    .string()
    .min(5, "Endereço deve ter pelo menos 5 caracteres")
    .max(200, "Máximo de 200 caracteres"),
  country: z.string().min(1, "País é obrigatório"),
  state: z
    .string()
    .min(2, "Estado deve ter pelo menos 2 caracteres")
    .max(100, "Máximo de 100 caracteres"),
  city: z
    .string()
    .min(2, "Cidade deve ter pelo menos 2 caracteres")
    .max(100, "Máximo de 100 caracteres"),
  zipCode: z
    .string()
    .min(5, "CEP deve ter pelo menos 5 caracteres")
    .max(10, "Máximo de 10 caracteres"),
  marsLot: z.string().optional(),
});

const marsSchema = z.object({
  id: z.string().optional(),
  planetType: z.literal(PlanetType.MARS),
  addressType: z.enum(["shipping", "billing"]),
  label: z
    .string()
    .min(1, "Rótulo é obrigatório")
    .max(50, "Máximo de 50 caracteres"),
  name: z
    .string()
    .min(3, "Nome deve ter pelo menos 3 caracteres")
    .max(100, "Máximo de 100 caracteres"),
  phone: z
    .string()
    .min(8, "Telefone deve ter pelo menos 8 dígitos")
    .max(15, "Máximo de 15 dígitos")
    .regex(/^\d+$/, "Apenas números são permitidos"),
  addressLine: z.string().optional(),
  country: z.string().optional(),
  state: z.string().optional(),
  city: z.string().optional(),
  zipCode: z.string().optional(),
  marsLot: z
    .string()
    .length(4, "Lote de Marte deve ter exatamente 4 dígitos")
    .regex(/^\d{4}$/, "Lote de Marte deve ser um número de 4 dígitos"),
});

const formSchema = z.discriminatedUnion("planetType", [
  earthSchema,
  marsSchema,
]);

interface AddressFormProps {
  initialData?: Address | null;
  onSave: () => void;
  onCancel: () => void;
}

export default function AddressForm({
  initialData,
  onSave,
  onCancel,
}: AddressFormProps) {
  const { addAddress, updateAddress } = useAddressStore();
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetType>(
    initialData?.planetType || PlanetType.EARTH
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      id: "",
      planetType: PlanetType.EARTH,
      addressType: "shipping",
      label: "Casa",
      name: "",
      phone: "",
      addressLine: "",
      country: "Brazil",
      state: "",
      city: "",
      zipCode: "",
      marsLot: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (initialData?.id) {
      updateAddress({ ...values, id: initialData.id });
    } else {
      addAddress({ ...values, id: Date.now().toString() });
    }
    onSave();
  }

  const handlePlanetChange = (value: PlanetType) => {
    setSelectedPlanet(value);
    form.setValue("planetType", value);

    if (value === PlanetType.MARS) {
      form.setValue("addressLine", "");
      form.setValue("country", "");
      form.setValue("state", "");
      form.setValue("city", "");
      form.setValue("zipCode", "");
    } else {
      form.setValue("marsLot", "");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">
        {initialData ? "Editar Endereço" : "Adicionar Novo Endereço"}
      </h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="planetType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Planeta</FormLabel>
                  <Select
                    onValueChange={(value: PlanetType) =>
                      handlePlanetChange(value)
                    }
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione o planeta" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={PlanetType.EARTH}>Terra</SelectItem>
                      <SelectItem value={PlanetType.MARS}>Marte</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="addressType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Endereço</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="shipping">Entrega</SelectItem>
                      <SelectItem value="billing">Cobrança</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="label"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rótulo do Endereço</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione o rótulo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Casa">Casa</SelectItem>
                    <SelectItem value="Trabalho">Trabalho</SelectItem>
                    <SelectItem value="Fábrica">Fábrica</SelectItem>
                    <SelectItem value="Armazém">Armazém</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="bg-purple-50 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center">
              <MapPin className="h-5 w-5 text-purple-500 mr-2" />
              <span className="text-sm text-purple-700">
                Ponto de localização
              </span>
            </div>
            <Button
              type="button"
              variant="link"
              className="text-purple-800 p-0"
            >
              Definir localização
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome Completo</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="João Silva"
                      {...field}
                      maxLength={100}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone (apenas números)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="11987654321"
                      {...field}
                      maxLength={15}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "");
                        field.onChange(value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {selectedPlanet === PlanetType.EARTH ? (
            <>
              <FormField
                control={form.control}
                name="addressLine"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Endereço</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Rua das Flores, 123, Apto 42"
                        {...field}
                        maxLength={200}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>País</FormLabel>
                      <FormControl>
                        <CountrySelect
                          value={field.value as string}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estado/Província</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="São Paulo"
                          {...field}
                          maxLength={100}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cidade</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="São Paulo"
                          {...field}
                          maxLength={100}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="zipCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CEP</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="12345678"
                          {...field}
                          maxLength={10}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, "");
                            field.onChange(value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </>
          ) : (
            <FormField
              control={form.control}
              name="marsLot"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número do Lote em Marte (4 dígitos)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="1234"
                      maxLength={4}
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "");
                        field.onChange(value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <div className="flex justify-end gap-3 pt-4 border-t border-zinc-200">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-purple-800 hover:bg-purple-900">
              {initialData ? "Atualizar Endereço" : "Salvar Endereço"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
