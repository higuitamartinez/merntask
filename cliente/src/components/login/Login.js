import React, {useState, useEffect, useContext} from 'react';
import {Link} from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

const Login = (props) => {
    const authContext = useContext(AuthContext);
    const {autenticado,errorlogin, errorLogin, iniciarSesion} = authContext;

    const [usuario, guardarUsuario] = useState({
        email: '',
        password: ''
    });

    useEffect(() => {
        if(autenticado){
            props.history.push('/proyectos');
        }
        //eslint-disable-next-line
    },[autenticado]);

    const llenarCampos = (e) => {
        guardarUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        });
    }

    const {email, password} = usuario;

    const validarFormulario = (e) => {
        e.preventDefault();
        if(email.trim() === '' || password.trim() === ''){
            console.log('Hola');
            errorLogin('Todos los campos son obligatorios');
            return;
        }
        iniciarSesion(usuario);
    }

    return(
        <main className="sesion">
            <div className="contenedor contenedor-light">
                {errorlogin ? <div className="alerta error-login">{errorlogin}</div> : null}
                <div className="contenedor-formulario">
                    <h1 className="titulo">Iniciar Sesión</h1>
                    <form
                        onSubmit={validarFormulario}
                    >
                        <div className="campo">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email" 
                                name="email"
                                id="email"
                                placeholder="Tu email"
                                onChange={llenarCampos}
                                value={email}
                            />
                        </div>
                        <div className="campo">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Tu contraseña"
                                onChange={llenarCampos}
                                value={password}
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-azul w-100"
                        >Iniciar Sesión</button>
                    </form>
                    <Link to="/nueva-cuenta" className="btn-link">Obtener Cuenta</Link>
                </div>
            </div>
        </main>
    );
}

export default Login;