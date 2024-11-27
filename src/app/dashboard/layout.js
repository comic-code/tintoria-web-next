'use client'
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import ThemeToggle from "@/components/ThemeToggle";

export default function DashboardLayout({ children }) {
  const { logout, user } = useAuth();

  return (
    <div className="flex h-screen bg-[var(--background)] dark:bg-[var(--background)] ">
      {/* Menu Lateral */}
      <aside className="w-64 bg-[var(--foreground)] dark:bg-[var(--foreground-dark)] text-white">
        <div className="flex justify-between items-center p-4">
          <Link className="text-2xl font-bold text-black dark:text-white cursor-pointer" href="/dashboard">Tintoria</Link>
          <button
            onClick={logout}
            className="bg-gray-700 p-2 rounded-md text-white hover:bg-gray-600"
          >
            Sair
          </button>
        </div>
        <nav className="mt-8">
          <ul>
            <li>
              <Link href="/dashboard/pedidos" className="block px-4 py-2 text-black dark:text-white border-l-2 border-[var(--primary)] ml-1 mb-1">
                Pedidos
              </Link>
            </li>
            <li>
              <Link href="/dashboard/clientes" className="block px-4 py-2 text-black dark:text-white border-l-2 border-[var(--primary)] ml-1 mb-1">
                Clientes
              </Link>
            </li>
            <li>
              <Link href="/dashboard/funcionarios" className="block px-4 py-2 text-black dark:text-white  border-l-2 border-[var(--primary)] ml-1 mb-1">
                Funcionários
              </Link>
            </li>
            <li>
              <Link href="/dashboard/relatorios" className="block px-4 py-2 text-black dark:text-white border-l-2 border-[var(--primary)] ml-1 mb-1">
                Relatórios
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Conteúdo Principal */}
      <main className="flex-1 p-8 overflow-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black dark:text-white">
            {user?.email ? `Bem-vindo, ${user.email}` : "Bem-vindo ao Dashboard"}
          </h1>
        </div>
        {children}
      </main>
      <ThemeToggle />

    </div>
  );
}
