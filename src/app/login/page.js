'use client';
import ThemeToggle from "@/components/ThemeToggle";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { getConnection } from "@/services/api";
import Loading from "@/components/Loading";
import { useGlobal } from "@/context/Global";

export default function Login() {
  const { login } = useAuth();
  const { setIsLoading, isLoading } = useGlobal();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    // if (email === "bitotajima@hotmail.com" && password === "123") {
    //   login({ email });
    //   router.push("/dashboard");
    // } else {
    //   setError("Credenciais inválidas");
    // }
    setIsLoading(true);
    getConnection('2403beb8662d008c').then(json => {
      setIsLoading(false);
      if(json.error) {
        setError('Credenciais inválidas');
      } else {
        console.log(json);
        login({ email, ...json.data });
        router.push("/dashboard");
      }
    })
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background dark:bg-[var(--background)]">
      <div className="bg-[var(--foreground)] dark:bg-[var(--foreground)] shadow-lg rounded-lg p-8 max-w-sm w-full">
        <h1 className="text-2xl font-bold text-center text-black dark:text-white mb-4">
          Tintoria
        </h1>
        <p className="text-sm text-black dark:text-white text-center mb-6">
          Faça login para continuar.
        </p>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white"
            >
              E-mail
            </label>
            <input
              id="email"
              type="email"
              placeholder="exemplo@dominio.com"
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-[var(--primary)] focus:border-[var(--primary)] border-gray-300"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white"
            >
              Senha
            </label>
            <input
              id="password"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              required
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-[var(--primary)] focus:border-[var(--primary)] border-gray-300"
            />
          </div>
          <button

            type="submit"
            className="font-bold w-full py-2 px-4 bg-[var(--primary)] text-white rounded-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          >
            {isLoading ? <Loading alt/> : 'Entrar'}
            
          </button>
        </form>
      </div>
      <ThemeToggle />
    </div>
  );
}
