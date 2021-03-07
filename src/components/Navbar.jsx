import React from 'react'
import {Link, NavLink, withRouter} from 'react-router-dom'
import {auth} from '../firebase'


const Navbar = (props) => {
  
    const cerrarSesion = () => {
            auth.signOut()
            .then (()=>{
                props.history.push('/login')
            })
    }


    return (
        <div className="navbar navbar-dark bg-dark mt-5">
            <Link to="/" className="navbar-brand mx-3">BUSCADOR DE PERSONAJES WORLD OF WARCRAFT</Link>
            <div>
                <div className="d-flex">
                    <NavLink className="btn btn-dark mr-2" to="/"  exact>
                        Inicio
                    </NavLink>
                   { props.firebaseuser !== null ? (

                    <NavLink className="btn btn-dark  mr-2" to="/buscador">
                        Buscador
                    </NavLink>
                    ):null}

                    {
                        props.firebaseuser !== null ? (
                        <button 
                            className="btn btn-dark"
                            onClick={()=> cerrarSesion()}
                        >
                            Cerrar sesión
                        </button>

                        ):(
                    <NavLink className="btn btn-dark  mr-2" to="/login">
                        Login
                    </NavLink>
                        )
                    }
                    



                </div>
            </div>
        </div>
    )
}

export default withRouter(Navbar)
