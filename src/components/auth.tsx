import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { UserRegisterForm } from "@/components/user-register-form"
import { Link, useLocation } from "react-router-dom"
import { UserLoginForm } from "./user-login-form";


export default function AuthenticationPage() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <>
      <div className="container relative hidden h-full flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          to={isLoginPage ? "/register" : "/login"}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8"
          )}
        >
          {isLoginPage ? "Registrar" : "Login"}
        </Link>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            Acme Inc
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;This library has saved me countless hours of work and
                helped me deliver stunning designs to my clients faster than
                ever before.&rdquo;
              </p>
              <footer className="text-sm">Sofia Davis</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                {isLoginPage ? "Acesse sua conta" : "Crie sua conta"}
              </h1>
              <p className="text-sm text-muted-foreground">
                {isLoginPage ? "Insira seu e-mail e senha para acessar sua conta." : "Insira seu nome, e-mail e senha para criar uma conta."}
              </p>
            </div>
            {
              isLoginPage ? (
                <UserLoginForm />
              ) : (
                <UserRegisterForm />
              )
            }
          </div>
        </div>
      </div>
    </>
  )
}