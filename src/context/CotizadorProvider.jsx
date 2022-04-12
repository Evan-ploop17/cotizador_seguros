import { createContext, useState } from 'react'
import { obtenerDiferenciaYear, calcularMarca, calcularPlan, formatearDinero } from '../helpers'
const CotizadorContext = createContext()

const CotizadorProvider = ({children}) => {

    const [data, setData] = useState({
        marca: '',
        year: '',
        plan: ''
    })
    const [error, setError] = useState('')
    const [resultado, setResultado] = useState(0)
    const [cargando, setCargando] = useState(false)

    const handleChangesDatos = e =>{
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const cotizarSeguro = () => {
        setCargando(true)
        let resultado = 2000
        let diferencia = obtenerDiferenciaYear(data.year)
        resultado -= ( (diferencia*3) * resultado) / 100
        resultado *= calcularMarca(data.marca)
        resultado *= calcularPlan(data.plan)
        resultado = formatearDinero(resultado)
        setTimeout(() => {
            setResultado(resultado)
            setCargando(false)
        }, 1500);
    }


  return (
    <CotizadorContext.Provider
        value={{
            handleChangesDatos,
            data,
            error,
            setError,
            cotizarSeguro,
            resultado,
            cargando
        }}
    >
        {children}
    </CotizadorContext.Provider>
  )
}

export {
    CotizadorProvider
}
export default CotizadorContext