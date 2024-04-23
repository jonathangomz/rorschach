import { Answers } from "../services/Answers";

export function Results({ answers } : { answers: Answers }) {

  return (
    <div className="block p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 text-black w-full">
      <h2 className="text-white">
        FÓRMULAS Y PORCENTAJES
      </h2>
      <div className="relative overflow-x-auto w-full">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Nombre
              </th>
              <th scope="col" className="px-6 py-3">
                Resultado
              </th>
              <th scope="col" className="px-6 py-3">
                Fórmula
              </th>
          </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                W%
              </th>
              <td className="px-6 py-4">
                {answers.W.result}%
              </td>
              <td className="px-6 py-4">
                {answers.W.formula}
              </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                D%
              </th>
              <td className="px-6 py-4">
                {answers.D.result}%
              </td>
              <td className="px-6 py-4">
              {answers.D.formula}
              </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Dd%
              </th>
              <td className="px-6 py-4">
                {answers.Dd.result}%
              </td>
              <td className="px-6 py-4">
              {answers.Dd.formula}
              </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                F%
              </th>
              <td className="px-6 py-4">
                {answers.F.result}%
              </td>
              <td className="px-6 py-4">
              {answers.F.formula}
              </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              F% amplio
              </th>
              <td className="px-6 py-4">
                {answers.FAmplio.result}%
              </td>
              <td className="px-6 py-4">
              {answers.FAmplio.formula}
              </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              F +% simple
              </th>
              <td className="px-6 py-4">
                {answers.FposSimple.result}%
              </td>
              <td className="px-6 py-4">
              {answers.FposSimple.formula}
              </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              F +% amplio
              </th>
              <td className="px-6 py-4">
                {answers.FposAmplio.result}%
              </td>
              <td className="px-6 py-4">
              {answers.FposAmplio.formula}
              </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              H%
              </th>
              <td className="px-6 py-4">
                {answers.H}%
              </td>
              <td className="px-6 py-4">
              todavía no la agrego
              </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              A%
              </th>
              <td className="px-6 py-4">
                {answers.A}%
              </td>
              <td className="px-6 py-4">
              todavía no la agrego
              </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              P%
              </th>
              <td className="px-6 py-4">
                {answers.P}%
              </td>
              <td className="px-6 py-4">
              todavía no la agrego
              </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              O%
              </th>
              <td className="px-6 py-4">
                {answers.O}%
              </td>
              <td className="px-6 py-4">
              todavía no la agrego
              </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              App
              </th>
              <td className="px-6 py-4">
                {answers.App}
              </td>
              <td className="px-6 py-4">
              todavía no la agrego
              </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              W:M
              </th>
              <td className="px-6 py-4">
                {answers.W_M.result}
              </td>
              <td className="px-6 py-4">
                {answers.W_M.formula}
              </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              M:ΣC
              </th>
              <td className="px-6 py-4">
                {answers.M_ΣC.result}
              </td>
              <td className="px-6 py-4">
                {answers.M_ΣC.formula}
              </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              FC:CF:C
              </th>
              <td className="px-6 py-4">
                {answers.FC_CF_C.result}
              </td>
              <td className="px-6 py-4">
                {answers.FC_CF_C.formula}
              </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              Relación H
              </th>
              <td className="px-6 py-4">
                {answers.RelationH.result}
              </td>
              <td className="px-6 py-4">
                {answers.RelationH.formula}
              </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              Relación A
              </th>
              <td className="px-6 py-4">
                {answers.RelationA.result}
              </td>
              <td className="px-6 py-4">
                {answers.RelationA.formula}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

