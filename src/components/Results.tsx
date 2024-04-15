import { Answers } from "../services/Answers";

export function Results({ answers } : { answers: Answers }) {

  return (
    <div className="block p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 text-white w-full">
      <h2>
        FÓRMULAS Y PORCENTAJES
      </h2>
      <div className="relative overflow-x-auto w-full">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                W%
              </th>
              <td className="px-6 py-4">
                {answers.W}
              </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                D%
              </th>
              <td className="px-6 py-4">
                {answers.D}
              </td>
            </tr>
            <tr className="bg-white dark:bg-gray-800">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Dd%
              </th>
              <td className="px-6 py-4">
                {answers.Dd}
              </td>
            </tr>
            <tr className="bg-white dark:bg-gray-800">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                F%
              </th>
              <td className="px-6 py-4">
                {answers.F}
              </td>
            </tr>
            <tr className="bg-white dark:bg-gray-800">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              F% amplio
              </th>
              <td className="px-6 py-4">
                {answers.FAmplio}
              </td>
            </tr>
            <tr className="bg-white dark:bg-gray-800">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              F +% simple
              </th>
              <td className="px-6 py-4">
                {answers.FposSimple}
              </td>
            </tr>
            <tr className="bg-white dark:bg-gray-800">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              F +% amplio
              </th>
              <td className="px-6 py-4">
                {answers.FposAmplio}
              </td>
            </tr>
            <tr className="bg-white dark:bg-gray-800">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              H%
              </th>
              <td className="px-6 py-4">
                {answers.H}
              </td>
            </tr>
            <tr className="bg-white dark:bg-gray-800">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              A%
              </th>
              <td className="px-6 py-4">
                {answers.A}
              </td>
            </tr>
            <tr className="bg-white dark:bg-gray-800">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              P%
              </th>
              <td className="px-6 py-4">
                {answers.P}
              </td>
            </tr>
            <tr className="bg-white dark:bg-gray-800">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              O%
              </th>
              <td className="px-6 py-4">
                {answers.O}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

