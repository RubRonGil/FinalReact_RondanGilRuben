import React, {useState} from 'react'
import {db, auth, googleProvider} from '../firebase'
import {withRouter} from 'react-router-dom'


const Login = (props) => {
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const [error, setError] = useState(null)
    const [esregistro, setEsregistro] = useState(false)

    const procesarDatos = e => {
        e.preventDefault()
        if(!email.trim()) {
            setError("Escribe un email")
          return
        }
        if(!pass.trim()) {
            setError("Escribe una password")
            return
          }
          if(pass.length<6) {
            setError("Escribe una contraseña de 6 o mas carácteres")
            return
          }
        if(esregistro){
            registrar()
        } else {
            login()
        }
    }

    const registrar = async ()=> {
        try {
            const res = await auth.createUserWithEmailAndPassword(email, pass)
            //console.log(res.user)
            await db.collection('usuarios').doc(email).set({
                email:res.user.email,
                uid:res.user.uid
            })
            setEmail("")
            setPass("")
            setError(null)
            props.history.push('/buscador')

        } catch (error) {
            //console.log(error)
            if (error.code==="auth/invalid-email") {
                setError("El email es invalido")
            }
            if (error.code==="auth/email-already-in-use") {
                setError("Ya existe un usuario registrado con ese email")
            }
        }
    }

    const login = async () => {
            try {
                await auth.signInWithEmailAndPassword(email, pass)
                setEmail("")
                setPass("")
                setError(null)
                props.history.push('/buscador')
                
            } catch (error) {
                //console.log(error)
                if (error.code==="auth/user-not-found" || error.code==="auth/wrong-password") {
                    setError("Email y/o password incorrecto")
                }
            }
    }

    //Redirección con login de google
    //gLog && (props.history.push('/buscador'))


    //https://console.developers.google.com/
    //Login con Google
    
    const signInWithGoogle = () => {
    auth.signInWithPopup(googleProvider).then((res) => {
        console.log(res.user)
        props.history.push('/buscador')
    }).catch((error) => {
        console.log(error.message)
    })
    }

    

    return (
        <div className="mt-5">
            <h3 className="text-center">
                {esregistro? "Registro":"Login"}
            </h3>
            <hr/>
            <div className="row justify-content-center">
                <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                 <form onSubmit={procesarDatos}>
                    {
                        error && (
                            <div className="alert alert-danger">{error}</div>
                        )
                    }
                    <input 
                        type="email" 
                        className="form-control mb-2"
                        placeholder="Introduce el email"
                        onChange={(e)=>setEmail(e.target.value)}
                        value={email}
                    />
                    <input 
                        type="password" 
                        className="form-control mb-2"
                        placeholder="Introduce el password"
                        onChange={(e)=>setPass(e.target.value)}
                        value={pass}
                    />
                    <button 
                        className="btn btn-lg btn-dark w-100  mb-2"
                        type="submit"
                    >
                        {esregistro?"Registrar":"Login"}
                        
                    </button>
                    <button className="btn btn-lg btn-light w-100 mb-2" onClick={signInWithGoogle}>
                        <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="google icon"/>
                        <span> Login con Google</span>
                    </button>
                    <button 
                        className="btn btn-sm btn-info w-100  mb-2"
                        onClick={()=>setEsregistro(!esregistro)}
                        type="button"
                    >
                       {esregistro? "¿Ya tienes cuenta?":"¿No tienes cuenta?"} 
                    </button>
                    {
                        !esregistro && (
                            <button 
                                className="btn btn-danger btm-sm"
                                type="button"
                                onClick={()=>props.history.push('/reset')}
                            >
                                Recuperar contraseña
                            </button>
                        )
                    }
                     
                </form>
                <br/>

                 {/*Botón de login de google*/}
                 
                    
                </div>
            </div>
        </div>
    )
}

export default withRouter(Login)
