'use client';
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { ErrorAlert } from "@/components/Alerts";
import { getCRClients, getDebit } from "@/services/api";
import { useAuth } from "@/context/AuthContext";
import Loading from "@/components/Loading";
import { triggerBase64Download  } from "common-base64-downloader-react"; // Importando o utilitário

export default function ContasReceber({ params }) {
  const { user } = useAuth();
  const [type, setType] = useState(null);
  const [clients, setClients] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const handleSort = () => {
    const sortedClients = [...clients].sort((a, b) => {
      const valueA = parseFloat(a.TOTAL_DEVEDOR);
      const valueB = parseFloat(b.TOTAL_DEVEDOR);

      return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
    });

    setClients(sortedClients);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleSelectClient = (client) => {
    Swal.fire({
      title: `O que deseja fazer?`,
      html: `
        <p><strong>Cliente:</strong> ${client.NOME}</p>
        <p><strong>Débito:</strong> ${parseFloat(client.TOTAL_DEVEDOR).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}</p>
      `,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Visualizar",
      cancelButtonText: "Fechar",
      customClass: {
        confirmButton: "bg-[var(--primary)] text-white rounded-lg px-4 py-2 hover:brightness-110",
        cancelButton: "bg-gray-300 dark:bg-gray-700 text-black dark:text-white rounded-lg px-4 py-2 hover:bg-gray-400 dark:hover:bg-gray-600",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        handleGetDebit(client);
      }
    });
  };

  const handleGetDebit = async (client) => {
    if (client) {
      try {
        const ed1 = '';
        const ed2 = '';
        const ed3 = '';
        const ed4 = '';

        const response = await getDebit(user.gdb, user.dbp, client.CODIGO, ed1, ed2, ed3, ed4);

        if (response.error) {
          ErrorAlert("Falha ao resgatar demonstrativo de débito!", response.message);
        } else {
          const { file_name, base64_string } = response.data;
          triggerBase64Download(base64_string, file_name.replace('.pdf', ''));
        }
      } catch (error) {
        console.error("Erro ao obter débito:", error);
        ErrorAlert("Erro inesperado!", "Não foi possível recuperar o débito.");
      }
    } else {
      ErrorAlert("Selecione um cliente!");
    }
  };

  useEffect(() => {
    if (!user || !type) return;
    const fetchData = async () => {
      try {
        const response = await getCRClients(user.gdb, user.dbp, type === "inativos" ? '1' : '0');
        if (response.error) {
          ErrorAlert("Falha ao recuperar dados!", response.message);
        } else {
          setClients(response.data.arrClientes);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [user, type]);

  useEffect(() => {
    async function resolveParams() {
      const resolvedParams = await params;
      setType(resolvedParams.type);
    }

    resolveParams();
  }, [params]);

  if (!user) {
    return <Loading />;
  }

  return (
    <section className="bg-[var(--foreground)] dark:bg-[var(--foreground)] rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4 text-black dark:text-white">
        Contas a receber: {type === 'ativos' ? 'Ativos' : 'Inativos'}
      </h2>
      {clients ? (
        <div className="overflow-y-auto max-h-[700px] rounded-md">
          <table className="w-full border-collapse table-auto">
            <thead className="sticky top-0 bg-[var(--primary)] text-white">
              <tr>
                <th className="p-3 text-left">Nome</th>
                <th
                  className="p-3 text-right cursor-pointer"
                  onClick={handleSort}
                >
                  Total Devedor
                  <span className="ml-2">{sortOrder === "asc" ? "▲" : "▼"}</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client, index) => (
                <tr
                  onClick={() => handleSelectClient(client)}
                  key={client.CODIGO}
                  className={`${
                    index % 2 === 0
                      ? "bg-white dark:bg-gray-800"
                      : "bg-gray-100 dark:bg-gray-700"
                  } hover:border-2 cursor-pointer`}
                >
                  <td className="p-3 text-black dark:text-white">{client.NOME}</td>
                  <td className="p-3 text-black text-right dark:text-white">
                    {parseFloat(client.TOTAL_DEVEDOR).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500">Carregando dados...</p>
      )}
    </section>
  );
}
