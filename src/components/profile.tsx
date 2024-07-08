import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { updatePassword } from "@/services/user";
import { Icons } from "./icons";
import { useState } from "react";

const schema = z.object({
  // currentPassword: z.string({ required_error: "Insira a senha atual" }).min(6, "A senha deve ter no mínimo 6 caracteres"),
  newPassword: z.string({ required_error: "Insira a nova senha" }).min(6, "A senha deve ter no mínimo 6 caracteres"),
  confirmNewPassword: z.string({ required_error: "Confirme a nova senha" }).min(6, "A senha deve ter no mínimo 6 caracteres"),
}).refine(data => data.newPassword === data.confirmNewPassword, {
  message: "As senhas não coincidem",
  path: ["confirmNewPassword"],
})

type ProfileFormValues = z.infer<typeof schema>

export function Profile() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(schema),
  })

  const { handleSubmit } = form;

  const onSubmit = async (data: ProfileFormValues) => {
    if (!user) return;

    setIsLoading(true);
    try {
      const response = await updatePassword({
        newPassword: data.newPassword,
        userId: user.id,
        name: user.name,
        email: user.email,
      })

      if (response.status === 200) {
        toast({
          title: "Senha atualizada",
          description: "Sua senha foi atualizada com sucesso",
        })
      }
      setIsLoading(false);
    } catch (error) {
      toast({
        title: "Erro ao atualizar a senha",
        description: "Ocorreu um erro ao atualizar a senha, tente novamente mais tarde",
        variant: 'destructive'
      });
      setIsLoading(false);
    }
  };

  return (
    <section>
      <div className="flex flex-col items-center justify-center mb-16">
        <Avatar className="h-32 w-32">
          <AvatarImage src="" alt="Avatar" />
          <AvatarFallback>BR</AvatarFallback>
        </Avatar>
        <p className="text-white text-lg font-semibold mt-4 capitalize">{user?.name}</p>
      </div>

      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-6 mt-6">
            {/* <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Senha atual</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      autoComplete="current-password"
                      autoCorrect="off"
                      autoCapitalize="none"
                      placeholder="Senha atual"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Nova senha</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      autoComplete="new-password"
                      autoCorrect="off"
                      autoCapitalize="none"
                      placeholder="Nova senha"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmNewPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Confirme a nova senha</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      autoComplete="new-password"
                      autoCorrect="off"
                      autoCapitalize="none"
                      placeholder="Confirme a nova senha"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">
              {
                isLoading
                  ? <Icons.spinner className="animate-spin" />
                  : "Atualizar senha"
              }
            </Button>
          </div>
        </form>
      </FormProvider>


    </section>
  )
}