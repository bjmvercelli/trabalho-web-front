"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FormProvider, useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { useAuth } from "@/hooks/useAuth"
import { useNavigate } from "react-router-dom"
import { LoginRequest } from "@/services/api"
import { useToast } from "./ui/use-toast"

interface UserLoginFormProps extends React.HTMLAttributes<HTMLDivElement> { }

const schema = z.object({
  email: z.string({ required_error: "Insira um email válido" }).email("Insira um email válido"),
  password: z.string({ required_error: "Insira uma senha" }).min(6, "A senha deve ter no mínimo 6 caracteres"),
})
type UserLoginFormValues = z.infer<typeof schema>

export function UserLoginForm({ className, ...props }: UserLoginFormProps) {
  const form = useForm<UserLoginFormValues>({
    resolver: zodResolver(schema),
  })
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const { login } = useAuth();
  const { toast } = useToast()

  const { handleSubmit } = form

  async function onSubmit(data: UserLoginFormValues) {
    setIsLoading(true)

    try {
      const { data: responseData, status } = await LoginRequest(data);
      setIsLoading(false)

      if (status === 201) {
        login(data)
        navigate("/home")
        return
      }

    } catch (error) {
      console.error(error)
      toast({
        title: "Erro ao fazer login",
        description: "Verifique se o email e senha estão corretos",
        variant: "destructive",
        className: "top-0 left-1/2 transform -translate-x-1/2 flex fixed md:max-w-[420px] md:top-4 md:right-4 text-left"
      });
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="name@example.com"
                      type="email"
                      autoCapitalize="none"
                      autoComplete="email"
                      autoCorrect="off"
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
            <Button type="submit" disabled={isLoading}>
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Login
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