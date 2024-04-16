import { Content, Determinant, Frecuency, Localization } from "../services/rorschach.types";
import { VariableTable } from "./VariableTable";

export function VariablesTableResult({ localization, determinant, content, frecuency }
  : {
    localization: Map<Localization, number>,
    determinant: Map<Determinant, number>,
    content: Map<Content, number>,
    frecuency: Map<Frecuency, number>
  }) {

  return (
    <>
    <VariableTable title="Localización">
      {Array.from(localization.entries()).map((entry) => (
        <tr key={entry[0]} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
          <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {Localization[entry[0]]}
          </th>
          <td className="px-6 py-4">
            {entry[1]}
          </td>
        </tr>
      ))}
    </VariableTable>

    <VariableTable title="Determinante">
      {Array.from(determinant.entries()).map((entry) => (
        <tr key={entry[0]} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
          <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {Determinant[entry[0]]}
          </th>
          <td className="px-6 py-4">
            {entry[1]}
          </td>
        </tr>
      ))}
    </VariableTable>

    <VariableTable title="Contenido">
      {Array.from(content.entries()).map((entry) => (
        <tr key={entry[0]} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
          <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {Content[entry[0]]}
          </th>
          <td className="px-6 py-4">
            {entry[1]}
          </td>
        </tr>
      ))}
    </VariableTable>

    <VariableTable title="Frecuencia">
      {Array.from(frecuency.entries()).map((entry) => (
        <tr key={entry[0]} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
          <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {Frecuency[entry[0]]}
          </th>
          <td className="px-6 py-4">
            {entry[1]}
          </td>
        </tr>
      ))}
    </VariableTable>
    </>
  )
}

