import { useEffect, useState } from 'react';
import './App.css'
import { Card } from './components/Card'
import { Content, Determinant, Frecuency, Localization } from './services/rorschach.types'
import { Answers } from './services/Answers';

function App() {
  const [addingNewLocalization, setAddingNewLocalization] = useState(false);
  const [addingNewDeterminant, setAddingNewDeterminant] = useState(false);
  const [addingNewContent, setAddingNewContent] = useState(false);
  const [addingNewFrecuency, setAddingNewFrecuency] = useState(false);

  const [localization, setLocalization] = useState(new Map<Localization, number>());
  const [determinant, setDeterminant] = useState(new Map<Determinant, number>());
  const [content, setContent] = useState(new Map<Content, number>());
  const [frecuency, setFrecuency] = useState(new Map<Frecuency, number>());

  function addNewLocalization(newVar: string) {
    const newMap = new Map(localization);
    newMap.set(Number.parseInt(newVar), 0);
    setLocalization(newMap);
    setAddingNewLocalization(false);
  }

  function addNewDeterminant(newVar: string) {
    const newMap = new Map(determinant);
    newMap.set(Number.parseInt(newVar), 0);
    setDeterminant(newMap);
    setAddingNewDeterminant(false);
  }

  function addNewContent(newVar: string) {
    const newMap = new Map(content);
    newMap.set(Number.parseInt(newVar), 0);
    setContent(newMap);
    setAddingNewContent(false);
  }

  function addNewFrecuency(newVar: string) {
    const newMap = new Map(frecuency);
    newMap.set(Number.parseInt(newVar), 0);
    setFrecuency(newMap);
    setAddingNewFrecuency(false);
  }

  function updateLocalizationValue(variable: Localization, newValue: number) {
    if(newValue < 0) return;
    const newMap = new Map(localization);
    newMap.set(variable, newValue);
    setLocalization(newMap);    
  }

  function updateDeterminantValue(variable: Determinant, newValue: number) {
    if(newValue < 0) return;
    const newMap = new Map(determinant);
    newMap.set(variable, newValue);
    setDeterminant(newMap);    
  }

  function updateContentValue(variable: Content, newValue: number) {
    if(newValue < 0) return;
    const newMap = new Map(content);
    newMap.set(variable, newValue);
    setContent(newMap);    
  }

  function updateFrecuencyValue(variable: Frecuency, newValue: number) {
    if(newValue < 0) return;
    const newMap = new Map(frecuency);
    newMap.set(variable, newValue);
    setFrecuency(newMap);    
  }

  useEffect(() => {
    const _testing = new Map(localization);
    _testing.set(Localization.W, 3);
    _testing.set(Localization.D, 2);
    setLocalization(_testing);
  }, []);

  function calculate() {
   const answers = new Answers(23, localization, determinant, content, frecuency);
   console.log(answers.W);
  }

  return (
    <>
      <h1>Welcome</h1>

      <div className='grid gap-6 m-12 grid-cols-1 md:grid-cols-2'>
        <Card title="Localization">
          <>
            <button onClick={() => setAddingNewLocalization(!addingNewLocalization)} id='add_localization' type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Agregar nueva variable</button>

            {addingNewLocalization ? <div id='add_localization_div'>
              <label htmlFor='new_localization' className="block mb-2 text-sm font-medium text-gray-900 text-white">Variable</label>
              <select id='1' onChange={(e) => addNewLocalization(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option disabled selected>Selecciona una Localización</option>
                {Object.values(Localization).filter((v) => typeof v === 'number').map((variable) => {
                  if(!localization.has(variable)) {
                    return (
                      <option key={variable} value={variable}>{Localization[variable]}</option>
                    )
                  } else {
                    return
                  }
                })}
              </select>
            </div> : ''}

            <div className="flex flex-col w-full max-w-64 m-auto">
              {Array.from(localization.entries()).map((entry) => (
                <div key={entry[0]} className='grid gap-6 grid-cols-2'>
                  <div>
                    <label htmlFor={Localization[entry[0]]} className="block mb-2 text-sm font-medium text-gray-900 text-white">Variable</label>
                    <select id={Localization[entry[0]]} value={entry[0]} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      {Object.values(Localization).filter((v) => typeof v === 'number').map((variable) =>
                        <option key={variable} value={variable}>{Localization[variable]}</option>)
                      }
                    </select>
                  </div>
                  <div>
                    <label htmlFor={Localization[entry[0]] + '_value'} className="block mb-2 text-sm font-medium text-gray-900 text-white">Value</label>
                    <div className="relative flex items-center max-w-[8rem]">
                      <button onClick={() => updateLocalizationValue(entry[0], entry[1] - 1)} type="button" id="decrement-button" data-input-counter-decrement={Localization[entry[0]] + '_value'} className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                        <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16"/>
                        </svg>
                      </button>
                      <input type="text" id={Localization[entry[0]] + '_value'} value={entry[1]} data-input-counter={true} aria-describedby="helper-text-explanation" className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="999" required />
                      <button onClick={() => updateLocalizationValue(entry[0], entry[1] + 1)} type="button" id="increment-button" data-input-counter-increment={Localization[entry[0]] + '_value'} className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                        <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>))
              }
            </div>
          </>
        </Card>

        <Card title="Determinant">
          <>
            <button onClick={() => setAddingNewDeterminant(!addingNewDeterminant)} type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Agregar nueva variable</button>

            {addingNewDeterminant ? <div>
              <label htmlFor='new_determinant' className="block mb-2 text-sm font-medium text-gray-900 text-white">Variable</label>
              <select id='new_determinant' onChange={(e) => addNewDeterminant(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option disabled selected>Selecciona una Determinante</option>
                {Object.values(Determinant).filter((v) => typeof v === 'number').map((variable) => {
                  if(!determinant.has(variable)) {
                    return (
                      <option key={variable} value={variable}>{Determinant[variable]}</option>
                    )
                  } else {
                    return
                  }
                })}
              </select>
            </div> : ''}

            <div className="flex flex-col w-full max-w-64 m-auto">
              {Array.from(determinant.entries()).map((entry) => (
                <div key={entry[0]} className='grid gap-6 grid-cols-2'>
                  <div>
                    <label htmlFor={Determinant[entry[0]]} className="block mb-2 text-sm font-medium text-gray-900 text-white">Variable</label>
                    <select id={Determinant[entry[0]]} value={entry[0]} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      {Object.values(Determinant).filter((v) => typeof v === 'number').map((variable) =>
                        <option key={variable} value={variable}>{Determinant[variable]}</option>)
                      }
                    </select>
                  </div>
                  <div>
                    <label htmlFor={Determinant[entry[0]] + '_value'} className="block mb-2 text-sm font-medium text-gray-900 text-white">Value</label>
                    <div className="relative flex items-center max-w-[8rem]">
                      <button onClick={() => updateDeterminantValue(entry[0], entry[1] - 1)} type="button" id="decrement-button" data-input-counter-decrement={Determinant[entry[0]] + '_value'} className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                        <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16"/>
                        </svg>
                      </button>
                      <input type="text" id={Determinant[entry[0]] + '_value'} value={entry[1]} data-input-counter={true} aria-describedby="helper-text-explanation" className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="999" required />
                      <button onClick={() => updateDeterminantValue(entry[0], entry[1] + 1)} type="button" id="increment-button" data-input-counter-increment={Determinant[entry[0]] + '_value'} className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                        <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>))
              }
            </div>
          </>
        </Card>

        <Card title="Content">
          <>
            <button onClick={() => setAddingNewContent(!addingNewContent)} type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Agregar nueva variable</button>

            {addingNewContent ? <div>
              <label htmlFor='new_content' className="block mb-2 text-sm font-medium text-gray-900 text-white">Variable</label>
              <select id='new_content' onChange={(e) => addNewContent(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option disabled selected>Selecciona un Contenido</option>
                {Object.values(Content).filter((v) => typeof v === 'number').map((variable) => {
                  if(!content.has(variable)) {
                    return (
                      <option key={variable} value={variable}>{Content[variable]}</option>
                    )
                  } else {
                    return
                  }
                })}
              </select>
            </div> : ''}

            <div className="flex flex-col w-full max-w-64 m-auto">
              {Array.from(content.entries()).map((entry) => (
                <div key={entry[0]} className='grid gap-6 grid-cols-2'>
                  <div>
                    <label htmlFor={Content[entry[0]]} className="block mb-2 text-sm font-medium text-gray-900 text-white">Variable</label>
                    <select id={Content[entry[0]]} value={entry[0]} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      {Object.values(Content).filter((v) => typeof v === 'number').map((variable) =>
                        <option key={variable} value={variable}>{Content[variable]}</option>)
                      }
                    </select>
                  </div>
                  <div>
                    <label htmlFor={Content[entry[0]] + '_value'} className="block mb-2 text-sm font-medium text-gray-900 text-white">Value</label>
                    <div className="relative flex items-center max-w-[8rem]">
                      <button onClick={() => updateContentValue(entry[0], entry[1] - 1)} type="button" id="decrement-button" data-input-counter-decrement={Content[entry[0]] + '_value'} className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                        <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16"/>
                        </svg>
                      </button>
                      <input type="text" id={Content[entry[0]] + '_value'} value={entry[1]} data-input-counter={true} aria-describedby="helper-text-explanation" className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="999" required />
                      <button onClick={() => updateContentValue(entry[0], entry[1] + 1)} type="button" id="increment-button" data-input-counter-increment={Content[entry[0]] + '_value'} className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                        <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>))
              }
            </div>
          </>
        </Card>

        <Card title="Frecuency">
          <>
            <button onClick={() => setAddingNewFrecuency(!addingNewFrecuency)} type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Agregar nueva variable</button>

            {addingNewFrecuency ? <div>
              <label htmlFor='new_frecuency' className="block mb-2 text-sm font-medium text-gray-900 text-white">Variable</label>
              <select id='new_frecuency' onChange={(e) => addNewFrecuency(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option disabled selected>Selecciona un Contenido</option>
                {Object.values(Frecuency).filter((v) => typeof v === 'number').map((variable) => {
                  if(!frecuency.has(variable)) {
                    return (
                      <option key={variable} value={variable}>{Frecuency[variable]}</option>
                    )
                  } else {
                    return
                  }
                })}
              </select>
            </div> : ''}

            <div className="flex flex-col w-full max-w-64 m-auto">
              {Array.from(frecuency.entries()).map((entry) => (
                <div key={entry[0]} className='grid gap-6 grid-cols-2'>
                  <div>
                    <label htmlFor={Frecuency[entry[0]]} className="block mb-2 text-sm font-medium text-gray-900 text-white">Variable</label>
                    <select id={Frecuency[entry[0]]} value={entry[0]} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      {Object.values(Frecuency).filter((v) => typeof v === 'number').map((variable) =>
                        <option key={variable} value={variable}>{Frecuency[variable]}</option>)
                      }
                    </select>
                  </div>
                  <div>
                    <label htmlFor={Frecuency[entry[0]] + '_value'} className="block mb-2 text-sm font-medium text-gray-900 text-white">Value</label>
                    <div className="relative flex items-center max-w-[8rem]">
                      <button onClick={() => updateFrecuencyValue(entry[0], entry[1] - 1)} type="button" id="decrement-button" data-input-counter-decrement={Frecuency[entry[0]] + '_value'} className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                        <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16"/>
                        </svg>
                      </button>
                      <input type="text" id={Frecuency[entry[0]] + '_value'} value={entry[1]} data-input-counter={true} aria-describedby="helper-text-explanation" className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="999" required />
                      <button onClick={() => updateFrecuencyValue(entry[0], entry[1] + 1)} type="button" id="increment-button" data-input-counter-increment={Frecuency[entry[0]] + '_value'} className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                        <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>))
              }
            </div>
          </>
        </Card>
      </div>
      
      <button onClick={calculate} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Calculate</button>

    </>
  )
}

export default App