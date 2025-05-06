'use client';

import { useState } from "react";

export default function PermissionsControl() {
  const [permissionGroups, setPermissionGroups] = useState([
    {
      id: 1,
      name: "Administrador",
      actions: ["Pedidos", "Clientes", "Funcionarios", "Permissões"],
    },
    {
      id: 2,
      name: "Financeiro",
      actions: ["Contas a Pagar"],
    },
    {
      id: 3,
      name: "Operador Padrão",
      actions: ["Dashboard"],
    },
  ]);

  const availableActions = ["Pedidos", "Clientes", "Funcionarios", "Permissões", "Contas a Pagar", "Dashboard"];

  function handleAddAction(groupId, action) {
    setPermissionGroups((prevGroups) =>
      prevGroups.map((group) =>
        group.id === groupId && !group.actions.includes(action)
          ? { ...group, actions: [...group.actions, action] }
          : group
      )
    );
  }

  function handleRemoveAction(groupId, action) {
    setPermissionGroups((prevGroups) =>
      prevGroups.map((group) =>
        group.id === groupId
          ? { ...group, actions: group.actions.filter((a) => a !== action) }
          : group
      )
    );
  }

  return (
    <section className="bg-[var(--foreground)] dark:bg-[var(--foreground)] rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4 text-black dark:text-white">Controle de Permissões</h2>
      <p className="text-sm text-gray-500 text-black dark:text-white mb-6">
        Gerencie os grupos de permissões dos usuários.
      </p>

      <div className="flex flex-col gap-4">
        {permissionGroups.map((group) => (
          <div
            key={group.id}
            className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 flex flex-col gap-2 bg-white dark:bg-gray-900 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-black dark:text-white">{group.name}</h3>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                ID: {group.id}
              </span>
            </div>

            {/* Ações já adicionadas (em verde) */}
            <div className="flex gap-2 flex-wrap mt-2">
              {group.actions.map((action) => (
                <div key={action} className="flex items-center gap-1">
                  <div className="px-4 py-2 rounded-full text-base font-medium bg-green-500 text-white flex items-center gap-2">
                    <button
                      onClick={() => handleRemoveAction(group.id, action)}
                      className="text-red-500 hover:text-red-300 text-lg leading-none font-bold"
                      title="Remover ação"
                    >
                      -
                    </button>
                    {action}
                  </div>
                </div>
              ))}
            </div>

            {/* Ações disponíveis para adicionar (em cinza) */}
            <div className="flex gap-2 flex-wrap mt-4">
              {availableActions
                .filter((action) => !group.actions.includes(action))
                .map((action) => (
                  <button
                    key={action}
                    onClick={() => handleAddAction(group.id, action)}
                    className="px-3 py-1 rounded-full text-sm bg-gray-300 text-gray-800 hover:bg-gray-400 transition-colors"
                  >
                    <span className="text-green-600 font-bold">+</span> {action}
                  </button>
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
