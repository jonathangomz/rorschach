import { ReactElement } from "react";

export function Card({ title, children }: { title: string, children: ReactElement }) {

  return (
    <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 max-w-64 text-white w-full min-h-80">
      <h2>
        {title}
      </h2>
      {children}
    </div>
  )
}

