"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { registerRequest } from "@/services/auth"
import { useToast } from "./ui/use-toast"

interface UserRegisterFormProps extends React.HTMLAttributes<HTMLDivElement> { }

const schema = z.object({
  name: z.string({ required_error: "Insira seu nome"}),
  email: z.string({ required_error: "Insira um email válido" }).email("Insira um email válido"),
  password: z.string({ required_error: "Insira uma senha" }).min(6, "A senha deve ter no mínimo 6 caracteres"),
  confirmPassword: z.string({ required_error: "Confirme sua senha"})
}).refine(data => data.password === data.confirmPassword, {
  message: "As senhas não conferem",
  path: ["confirmPassword"]
})

type UserRegisterFormValues = z.infer<typeof schema>

export function UserRegisterForm({ className, ...props }: UserRegisterFormProps) {
  const form = useForm<UserRegisterFormValues>({
    resolver: zodResolver(schema),
  })
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const { toast } = useToast()

  const { handleSubmit, formState } = form

  async function onSubmit(data: UserRegisterFormValues) {
    setIsLoading(true)

    try {
      const response = await registerRequest(data)

      if (response.status === 200) {
        toast({
          title: "Conta criada com sucesso",
          description: "Faça login para acessar sua conta",
          className: "top-0 left-1/2 transform -translate-x-1/2 flex fixed md:max-w-[420px] md:top-4 md:right-4 text-left"
        })
        setIsLoading(false)
        return
      }

      toast({
        title: "Erro ao criar conta",
        description: "Verifique se os dados estão corretos",
        variant: "destructive",
        className: "top-0 left-1/2 transform -translate-x-1/2 flex fixed md:max-w-[420px] md:top-4 md:right-4 text-left"
      })
      setIsLoading(false)
    } catch (error) {
      toast({
        title: "Erro ao criar conta",
        description: "Verifique se os dados estão corretos",
        variant: "destructive",
        className: "top-0 left-1/2 transform -translate-x-1/2 flex fixed md:max-w-[420px] md:top-4 md:right-4 text-left"
      })
      setIsLoading(false)
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Nome</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nome"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="name@example.com"
                      type="email"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Senha"
                      type="password"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Confirmar senha</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Confirmar senha"
                      type="password"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Criar
            </Button>
          </div>
        </form>
      </FormProvider>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Ou continue com
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}{" "}
        GitHub
      </Button>
    </div>
  )
}