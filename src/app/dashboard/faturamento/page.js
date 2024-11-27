'use client';

import { useGlobal } from "@/context/Global";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import Loading from "@/components/Loading";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function Faturamento() {
  const { annualCharts, isLoading } = useGlobal();

  const chartData = {
    labels: annualCharts.map((item) => item.ANO),
    datasets: [
      {
        label: "Faturamento Anual (R$)",
        data: annualCharts.map((item) => item.TOTAL),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.raw;
            return `R$ ${parseFloat(value).toLocaleString("pt-BR")}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          callback: (value) => `R$ ${parseFloat(value).toLocaleString("pt-BR")}`,
        },
        grid: {
          color: "rgba(200, 200, 200, 0.2)",
        },
      },
    },
  };

  return (
    <section className="bg-[var(--foreground)] dark:bg-[var(--foreground)] rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4 text-black dark:text-white">
        Faturamento Anual
      </h2>
      <p className="text-sm text-gray-500 text-black dark:text-white">
        Aqui está o faturamento anual da lavanderia.
      </p>

      {isLoading ? (
        <Loading />
      ) : annualCharts.length ? (
        <div className="w-full max-w-3xl">
          <Bar data={chartData} options={chartOptions} />
        </div>
      ) : (
        <p className="text-gray-500 mt-4">Nenhum dado de faturamento disponível.</p>
      )}
    </section>
  );
}
