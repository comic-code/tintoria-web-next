export default function DashboardHome() {
  return (
    <div className="bg-[var(--foreground)] dark:bg-[var(--foreground)] rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4 text-black dark:text-white">Visão Geral</h2>
      <p className="text-sm text-gray-500 text-black dark:text-white">
        Bem-vindo ao Tintoria.
      </p>

      <button className="bg-white rounded-lg shadow-lg p-4 w-full max-w-md my-4 border-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-black">
              Contas a Receber
            </h2>
          </div>
        </div>

        <div className="border-t-2 border-[var(--primary)] my-3" />

        <div className="flex justify-between items-center">
          <div className="text-left">
            <p className="text-sm font-semibold text-black">
              Ativos
            </p>
            <p className="text-2xl font-bold text-[var(--primary)]">R$ 438.483,32</p>
          </div>

          <div className="text-right">
            <p className="text-sm font-semibold text-black">
              Inativos
            </p>
            <p className="text-lg font-medium text-gray-500">R$ 17.074,90</p>
          </div>
        </div>
      </button>
    </div>
  );
}