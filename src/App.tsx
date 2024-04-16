import { useState } from 'react';
import './App.css'
import { Card } from './components/Card'
import { Content, Determinant, Frecuency, Localization } from './services/rorschach.types'
import { Answers } from './services/Answers';
import { Results } from './components/Results';
import { VariablesTableResult } from './components/VariablesTableResult';

function App() {
  const [addingNewLocalization, setAddingNewLocalization] = useState(false);
  const [addingNewDeterminant, setAddingNewDeterminant] = useState(false);
  const [addingNewContent, setAddingNewContent] = useState(false);
  const [addingNewFrecuency, setAddingNewFrecuency] = useState(false);

  const [numAnswers, setNumAnswers] = useState<number | undefined>(undefined);

  const [localization, setLocalization] = useState(new Map<Localization, number>());
  const [determinant, setDeterminant] = useState(new Map<Determinant, number>());
  const [content, setContent] = useState(new Map<Content, number>());
  const [frecuency, setFrecuency] = useState(new Map<Frecuency, number>());

  const [seeResults, setSeeResults] = useState(false);
  const [seeVariablesTable, setSeeVariablesTable] = useState(false);
  const [answers, setAnswers] = useState<Answers | undefined>(undefined);

  function updateNumAnswers(value: string) {
    const _numAnswers = Number.parseInt(value);
    if(isNaN(_numAnswers)) {
      setNumAnswers(undefined);
    } else {
      setNumAnswers(_numAnswers);
    }
  }

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

  function updateLocalizationValue(variable: Localization, newValue: string) {
    const value = Number.parseInt(newValue);

    if(isNaN(value)) return;
    if(value < 0) return;

    const newMap = new Map(localization);
    newMap.set(variable, value);
    setLocalization(newMap);    
  }

  function updateDeterminantValue(variable: Determinant, newValue: string) {
    const value = Number.parseInt(newValue);

    if(isNaN(value)) return;
    if(value < 0) return;

    const newMap = new Map(determinant);
    newMap.set(variable, value);
    setDeterminant(newMap);    
  }

  function updateContentValue(variable: Content, newValue: string) {
    const value = Number.parseInt(newValue);

    if(isNaN(value)) return;
    if(value < 0) return;

    const newMap = new Map(content);
    newMap.set(variable, value);
    setContent(newMap);    
  }

  function updateFrecuencyValue(variable: Frecuency, newValue: string) {
    const value = Number.parseInt(newValue);

    if(isNaN(value)) return;
    if(value < 0) return;

    const newMap = new Map(frecuency);
    newMap.set(variable, value);
    setFrecuency(newMap);    
  }

  // useEffect(() => {
  //   const _testingL = new Map(localization);
  //   _testingL.set(Localization.W, 4);
  //   _testingL.set(Localization.D, 16);
  //   _testingL.set(Localization.Dr, 3);
  //   setLocalization(_testingL);

  //   const _testingD = new Map(determinant);
  //   _testingD.set(Determinant['F+'], 2);
  //   _testingD.set(Determinant.F, 12);
  //   _testingD.set(Determinant['F-'], 2);
  //   _testingD.set(Determinant['FM+'], 1);
  //   _testingD.set(Determinant['FC+'], 1);
  //   _testingD.set(Determinant.CF, 3);
  //   _testingD.set(Determinant['FCh+'], 2);
  //   setDeterminant(_testingD);

  //   const _testingC = new Map(content);
  //   _testingC.set(Content.Hd, 3);
  //   _testingC.set(Content.A, 7);
  //   _testingC.set(Content.Ad, 4);
  //   _testingC.set(Content.obj, 5);
  //   _testingC.set(Content.ana, 1);
  //   _testingC.set(Content.veg, 2);
  //   _testingC.set(Content.nat, 1);
  //   setContent(_testingC);

  //   const _testingF = new Map(frecuency);
  //   _testingF.set(Frecuency.P, 3);
  //   _testingF.set(Frecuency['(P)'], 1);
  //   _testingF.set(Frecuency['O+'], 1);
  //   _testingF.set(Frecuency['O-'], 1);
  //   _testingF.set(Frecuency.O, 17);
  //   setFrecuency(_testingF);
  // }, []);

  function calculate() {
    if(numAnswers === undefined) {
      alert('Numero de respuestas no tiene valor.');
    } else {
      const answers = new Answers(numAnswers!, localization, determinant, content, frecuency);
      if(answers.validateNumSections()) {
        if(answers.validateNumAnswers()) {
          setAnswers(answers);
          setSeeResults(true);
          setSeeVariablesTable(false);
        } else {
          alert('Numero de respuestas no coincide con las sumas de las secciones.');
        }
      } else {
        alert('Algunos valores de las secciones están mal. Checa las sumas.');
      }
    }
  }
  
  function getTableVariables() {
    setSeeResults(false);
    setSeeVariablesTable(!seeVariablesTable);
  }

  return (
    <>
      <div className="mb-6">
        <label htmlFor="large-input" className="block mb-2 text-sm font-medium text-gray-900 text-grey">Número de respuestas</label>
        <input onChange={(e) => updateNumAnswers(e.target.value)} value={numAnswers} type="text" id="large-input" className="block m-auto p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 min-w-24" placeholder='23'/>
      </div>

      <div className='grid gap-6 m-12 grid-cols-1 md:grid-cols-2 justify-items-center'>
        <Card title="Localization">
          <>
            <button onClick={() => setAddingNewLocalization(!addingNewLocalization)} id='add_localization' type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Agregar nueva variable</button>

            {addingNewLocalization ? <div id='add_localization_div'>
              <label htmlFor='new_localization' className="block mb-2 text-sm font-medium text-gray-900 text-white">Variable</label>
              <select id='new_localization' onChange={(e) => addNewLocalization(e.target.value)} defaultValue={undefined} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option disabled selected>Selecciona una Localización</option>
                {Object.values(Localization).filter((v): v is number => typeof v === 'number').map((variable) => {
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
                    <select disabled id={Localization[entry[0]]} value={entry[0]} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      {Object.values(Localization).filter((v): v is number => typeof v === 'number').map((variable) =>
                        <option key={variable} value={variable}>{Localization[variable]}</option>)
                      }
                    </select>
                  </div>
                  <div>
                    <label htmlFor={Localization[entry[0]] + '_value'} className="block mb-2 text-sm font-medium text-gray-900 text-white">Value</label>
                    <div className="relative flex items-center max-w-[8rem]">
                      <button onClick={() => updateLocalizationValue(entry[0], (entry[1] - 1).toString())} type="button" id="decrement-button" data-input-counter-decrement={Localization[entry[0]] + '_value'} className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                        <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16"/>
                        </svg>
                      </button>
                      <input onChange={(e) => updateLocalizationValue(entry[0], e.target.value)} type="text" id={Localization[entry[0]] + '_value'} value={entry[1]} data-input-counter={true} aria-describedby="helper-text-explanation" className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="999" required />
                      <button onClick={() => updateLocalizationValue(entry[0], (entry[1] + 1).toString())} type="button" id="increment-button" data-input-counter-increment={Localization[entry[0]] + '_value'} className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                        <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>))
              }
            </div>

            <p>Suma: {Array.from(localization.values()).reduce((prev, current) => prev + current, 0)}</p>
          </>
        </Card>

        <Card title="Determinant">
          <>
            <button onClick={() => setAddingNewDeterminant(!addingNewDeterminant)} type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Agregar nueva variable</button>

            {addingNewDeterminant ? <div>
              <label htmlFor='new_determinant' className="block mb-2 text-sm font-medium text-gray-900 text-white">Variable</label>
              <select id='new_determinant' onChange={(e) => addNewDeterminant(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option disabled selected>Selecciona una Determinante</option>
                {Object.values(Determinant).filter((v): v is number => typeof v === 'number').map((variable) => {
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
                    <select disabled id={Determinant[entry[0]]} value={entry[0]} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      {Object.values(Determinant).filter((v): v is number => typeof v === 'number').map((variable) =>
                        <option key={variable} value={variable}>{Determinant[variable]}</option>)
                      }
                    </select>
                  </div>
                  <div>
                    <label htmlFor={Determinant[entry[0]] + '_value'} className="block mb-2 text-sm font-medium text-gray-900 text-white">Value</label>
                    <div className="relative flex items-center max-w-[8rem]">
                      <button onClick={() => updateDeterminantValue(entry[0], (entry[1] - 1).toString())} type="button" id="decrement-button" data-input-counter-decrement={Determinant[entry[0]] + '_value'} className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                        <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16"/>
                        </svg>
                      </button>
                      <input onChange={(e) => updateDeterminantValue(entry[0], e.target.value)} type="text" id={Determinant[entry[0]] + '_value'} value={entry[1]} data-input-counter={true} aria-describedby="helper-text-explanation" className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="999" required />
                      <button onClick={() => updateDeterminantValue(entry[0], (entry[1] + 1).toString())} type="button" id="increment-button" data-input-counter-increment={Determinant[entry[0]] + '_value'} className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                        <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>))
              }
            </div>
            <p>Suma: {Array.from(determinant.values()).reduce((prev, current) => prev + current, 0)}</p>
          </>
        </Card>

        <Card title="Content">
          <>
            <button onClick={() => setAddingNewContent(!addingNewContent)} type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Agregar nueva variable</button>

            {addingNewContent ? <div>
              <label htmlFor='new_content' className="block mb-2 text-sm font-medium text-gray-900 text-white">Variable</label>
              <select id='new_content' onChange={(e) => addNewContent(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option disabled selected>Selecciona un Contenido</option>
                {Object.values(Content).filter((v): v is number => typeof v === 'number').map((variable) => {
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
                    <select disabled id={Content[entry[0]]} value={entry[0]} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      {Object.values(Content).filter((v): v is number => typeof v === 'number').map((variable) =>
                        <option key={variable} value={variable}>{Content[variable]}</option>)
                      }
                    </select>
                  </div>
                  <div>
                    <label htmlFor={Content[entry[0]] + '_value'} className="block mb-2 text-sm font-medium text-gray-900 text-white">Value</label>
                    <div className="relative flex items-center max-w-[8rem]">
                      <button onClick={() => updateContentValue(entry[0], (entry[1] - 1).toString())} type="button" id="decrement-button" data-input-counter-decrement={Content[entry[0]] + '_value'} className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                        <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16"/>
                        </svg>
                      </button>
                      <input onChange={(e) => updateContentValue(entry[0], e.target.value)} type="text" id={Content[entry[0]] + '_value'} value={entry[1]} data-input-counter={true} aria-describedby="helper-text-explanation" className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="999" required />
                      <button onClick={() => updateContentValue(entry[0], (entry[1] + 1).toString())} type="button" id="increment-button" data-input-counter-increment={Content[entry[0]] + '_value'} className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                        <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>))
              }
            </div>
            <p>Suma: {Array.from(content.values()).reduce((prev, current) => prev + current, 0)}</p>
          </>
        </Card>

        <Card title="Frecuency">
          <>
            <button onClick={() => setAddingNewFrecuency(!addingNewFrecuency)} type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Agregar nueva variable</button>

            {addingNewFrecuency ? <div>
              <label htmlFor='new_frecuency' className="block mb-2 text-sm font-medium text-gray-900 text-white">Variable</label>
              <select id='new_frecuency' onChange={(e) => addNewFrecuency(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option disabled selected>Selecciona un Contenido</option>
                {Object.values(Frecuency).filter((v): v is number => typeof v === 'number').map((variable) => {
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
                    <select disabled id={Frecuency[entry[0]]} value={entry[0]} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      {Object.values(Frecuency).filter((v): v is number => typeof v === 'number').map((variable) =>
                        <option key={variable} value={variable}>{Frecuency[variable]}</option>)
                      }
                    </select>
                  </div>
                  <div>
                    <label htmlFor={Frecuency[entry[0]] + '_value'} className="block mb-2 text-sm font-medium text-gray-900 text-white">Value</label>
                    <div className="relative flex items-center max-w-[8rem]">
                      <button onClick={() => updateFrecuencyValue(entry[0], (entry[1] - 1).toString())} type="button" id="decrement-button" data-input-counter-decrement={Frecuency[entry[0]] + '_value'} className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                        <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16"/>
                        </svg>
                      </button>
                      <input onChange={(e) => updateFrecuencyValue(entry[0], e.target.value)} type="text" id={Frecuency[entry[0]] + '_value'} value={entry[1]} data-input-counter={true} aria-describedby="helper-text-explanation" className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="999" required />
                      <button onClick={() => updateFrecuencyValue(entry[0], (entry[1] + 1).toString())} type="button" id="increment-button" data-input-counter-increment={Frecuency[entry[0]] + '_value'} className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                        <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>))
              }
            </div>
            <p>Suma: {Array.from(frecuency.values()).reduce((prev, current) => prev + current, 0)}</p>
          </>
        </Card>
      </div>
      
      <div>
        <button onClick={getTableVariables} type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{seeVariablesTable ? 'Esconder' : 'Ver'} variables</button>
        <button onClick={calculate} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Calculate</button>
      </div>

      {(seeVariablesTable) ? <VariablesTableResult
        localization={localization}
        determinant={determinant}
        content={content}
        frecuency={frecuency} /> : ''
      }
      {(seeResults && answers) ? <Results answers={answers} /> : ''}

    </>
  )
}

export default App
