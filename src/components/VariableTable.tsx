import { ReactNode } from "react";

export function VariableTable({ title, children } : { title: string, children: ReactNode }) {

  return (
    <div className="block p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 text-white w-full mb-0.5">
      <h2 className="mb-0.5">
      {title}
      </h2>
      <div className="relative overflow-x-auto w-full">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Variable
              </th>
              <th scope="col" className="px-6 py-3">
                Cantidad
              </th>
          </tr>
          </thead>
          <tbody>
          {children}
          </tbody>
        </table>
      </div>
    </div>
  )
}

