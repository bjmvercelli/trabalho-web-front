import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { UserRegisterForm } from "@/components/user-register-form"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { UserLoginForm } from "./user-login-form";
import logo from '@/assets/logo.svg'
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";

export default function AuthenticationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isRegisterPage = location.pathname === "/register";

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user])

  return (
    <>
      <div className="container relative hidden h-full flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          to={isRegisterPage ? "/login" : "/register"}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8"
          )}
        >
          {isRegisterPage ? "Login" : "Registrar"}
        </Link>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <img src={logo} alt="Logo" className="w-32 h-32 mr-2" />
            MyMix
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                Seu lugar para encontrar as letras de músicas favoritas
              </p>
            
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                {isRegisterPage ? "Crie sua conta" : "Acesse sua conta"}
              </h1>
              <p className="text-sm text-muted-foreground">
                {isRegisterPage ? "Insira seu nome, e-mail e senha para criar uma conta." : "Insira seu e-mail e senha para acessar sua conta."}
              </p>
            </div>
            {
              isRegisterPage ? (
                <UserRegisterForm />
              ) : (
                <UserLoginForm />
              )
            }
          </div>
        </div>
      </div>
    </>
  )
}