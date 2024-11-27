'use client';
import { useEffect, useState } from "react";
import { ErrorAlert, InfoAlert } from "@/components/Alerts";
import DashboardCard from "@/components/DashboardCard";
import { useAuth } from "@/context/AuthContext";
import { useGlobal } from "@/context/Global";
import { getCRTotal, getAnnualInvoice } from "@/services/api";

export default function DashboardHome() {
  const { user } = useAuth();
  const { isLoading, setIsLoading, setAnnualCharts } = useGlobal();
  const [initialInfos, setInitialInfos] = useState({
    lastUpdate: '',
    actives: '',
    inactives: '',
  });
  const [annualRevenue, setAnnualRevenue] = useState(null);



  useEffect(() => {
    if (user?.dbp) {
      setIsLoading(true);

      Promise.all([
        getCRTotal(user.gdb, user.dbp),
        getAnnualInvoice(user.gdb, user.dbp),
      ])
        .then(([crTotalResponse, annualRevenueResponse]) => {
          setIsLoading(false);
          console.log(annualRevenueResponse);

          if (crTotalResponse.error) {
            ErrorAlert("Falha ao carregar dados de Contas a Receber!");
          } else {
            setInitialInfos({
              lastUpdate: crTotalResponse.data.LastUpdate,
              actives: new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(crTotalResponse.data.sumTotalAtivos),
              inactives: new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(crTotalResponse.data.sumTotalInativos),
            });
          }

          if (annualRevenueResponse.error) {
            ErrorAlert("Falha ao carregar dados de Faturamento Anual!");
          } else {
            if (annualRevenueResponse.data.arrFaturamento.length) {
              setAnnualCharts(annualRevenueResponse.data.arrFaturamento);
              setAnnualRevenue(
                new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(
                  annualRevenueResponse.data.arrFaturamento[
                    annualRevenueResponse.data.arrFaturamento.length - 1
                  ].TOTAL
                )
              );
            } else {
              InfoAlert("Sem dados de faturamento!");
            }
          }
        })
        .catch((error) => {
          setIsLoading(false);
          console.error("Erro ao carregar dados:", error);
          ErrorAlert("Erro ao carregar informações!");
        });
    }
  }, [user]);

  return (
    <section className="bg-[var(--foreground)] dark:bg-[var(--foreground)] rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4 text-black dark:text-white">Visão Geral</h2>
      <p className="text-sm text-gray-500 text-black dark:text-white">
        Bem-vindo ao Tintoria.
      </p>
      <section className="flex gap-4">
        <DashboardCard
          title="Contas a Receber"
          isLoading={isLoading}
          linkLeft={{
            href: "/dashboard/contas-receber/ativos",
            label: "Ativos",
            value: initialInfos.actives,
          }}
          linkRight={{
            href: "/dashboard/contas-receber/inativos",
            label: "Inativos",
            value: initialInfos.inactives,
          }}
        />

        <DashboardCard
          title="Faturamento Anual"
          isLoading={isLoading}
          content={{
            value: annualRevenue || "R$ 0,00",
            href: "/dashboard/faturamento"
          }}
        />
      </section>
    </section>
  );
}
