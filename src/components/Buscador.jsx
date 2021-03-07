import React, {useState} from 'react'
import {matchPath, withRouter} from 'react-router-dom'
import {auth} from '../firebase'



const Buscador = (props) => {
    const [user, setUser] = React.useState(null)
    const [error, setError] = useState(null)
    const [nombrePersonaje, setNombrePersonaje] = useState("")
    const [reino, setReino] = useState("")
    const [servidor, setServidor] = useState("EU")
    const [personaje, setPersonaje] = useState([])
    const [hayError, setHayError] = useState(false)
    const [encontrado, setEncontado] = useState(false)


    React.useEffect(()=>{
        if (auth.currentUser) {
            console.log("si existe usuario")
            setUser(auth.currentUser)

        } else {
            console.log("no existe usuario")
            props.history.push('/login')
        }
    }, [props.history])


    const procesarDatos = e => {
        e.preventDefault()
        if(!reino.trim()) {
            setError("Escribe un reino")
            setHayError(true)
            return
        }
        if(!nombrePersonaje.trim()) {
            setError("Escribe un nombre de personaje")
            setHayError(true)
            return
        } 
        else {
            setError("")
            setHayError(false)
            obtenerDatos()
        }
    }

    const obtenerDatos = async() => {
        setPersonaje([])
        const url = "https://raider.io/api/v1/characters/profile?region="+servidor+"&realm="+reino+"&name="+nombrePersonaje
        const data = await fetch(url)
        const datos = await data.json()
        setPersonaje(datos)
        if (datos.message==="Could not find requested character"){
            setEncontado(false)
        } else{
            setEncontado(true)
        }
    }


    //API: https://raider.io/api/v1/characters/profile?region=(REGION)&realm=(REINO)&name=(NOMBRE_PJ)

    return (
        <div>
            <h1 className="mb-5">Buscador de personajes</h1>
            
            <form onSubmit={procesarDatos}>
                <div className="d-flex">
                    <div className="me-5">
                        <label htmlFor="servidor">Servidor:</label><br/>
                        <select name="servidor" id="servidor" className="form-control" onChange={(e)=>{setServidor(e.target.value)}}>
                            <option value="eu">EU</option>
                            <option value="us">US</option>
                            <option value="tw">TW</option>
                            <option value="kr">KR</option>
                            <option value="cn">CN</option>
                        </select>
                    </div>
                    <div className="me-5">
                        <label htmlFor="reino">Reino:</label><br/>
                        <input type="text" 
                            name="reino" 
                            id="reino" 
                            className="form-control"
                            onChange={(e)=>setReino(e.target.value)}
                            value={reino}/>
                    </div>
                    <div className="me-5">
                        <label htmlFor="nombrepj">Nombre del personaje:</label><br/>
                        <input type="text" 
                            name="nombrepj" 
                            id="nombrepj" 
                            className="form-control"
                            onChange={(e)=>setNombrePersonaje(e.target.value)}
                            value={nombrePersonaje}/>
                    </div>
                    <div className="me-5">
                        <br/><button type="submit" className="btn btn-danger">Buscar</button>
                    </div>
                </div>
            </form>
            {
                hayError?
                    error && (
                        <div className="alert alert-danger mt-4">{error}</div>
                    )
                : encontrado?
                    <div className="mt-4">
                        <h4>{personaje.name}</h4>
                        <p><b>Raza: </b>{personaje.race}</p>
                        <p><b>Clase: </b>{personaje.class}</p>
                        <p><b>Talentos: </b>{personaje.active_spec_name}</p>
                        <p><b>Rol: </b>{personaje.active_spec_role}</p>
                        <p><b>Facción: </b>{personaje.faction}</p>
                        <p><b>Puntos de logros: </b>{personaje.achievement_points}</p>
                        <p><b>Servidor: </b>{personaje.region}</p>
                        <p><b>Reino: </b>{personaje.realm}</p>
                        <p><b>Perfil de RaiderIo: </b><a href={personaje.profile_url}>{personaje.profile_url}</a></p>
                    </div> 
                    :
                    <h3>Personaje no encontrado</h3>
                
            }
            
        </div>
    )
}

export default withRouter(Buscador)
