import React, {useState, useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

const NuevaCuenta = (props) => {
    const authContext = useContext(AuthContext);
    const {autenticado, errornueva, creado, errorNueva, crearCuenta} = authContext;

    useEffect(() =>{
        if(autenticado){
            props.history.push('/proyectos');
        }
        if(creado){
            props.history.push('/');
        }
        //eslint-disable-next-line
    },[creado]);

    const [usuario, guardarUsuario] = useState({
        nombre: '',
        email: '',
        password: '',
        confirmar: ''
    });

    const llenarCampos = (e) => {
        guardarUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        });
    }

    const {nombre, email, password, confirmar} = usuario;

    const validarFormulario = (e) => {
        e.preventDefault();
        if(nombre.trim() === '' || email.trim() === '' || password.trim() === '' || confirmar.trim() === ''){
            errorNueva('Todos los campos son obligatorios');
            return;
        }else if(password.trim().length < 6){
            errorNueva('El password debe ser mayor o igual a 6 caracteres');
            return;
        }else if(password.trim() !== confirmar.trim()){
            errorNueva('Las contraseñas no coinciden');
            return;
        }
        crearCuenta({
            nombre,
            email,
            password
        });
    }
    return(
        <main className="sesion">
            <div className="contenedor contenedor-light">
                {errornueva ?
                    <div className="alerta error-login">{errornueva}</div>
                    : null
                }
                <div className="contenedor-formulario">
                    <h1 className="titulo">Obtener una cuenta</h1>
                    <form
                        onSubmit={validarFormulario}
                    >
                        <div className="campo">
                            <label htmlFor="nombre">Nombre</label>
                            <input 
                                type="text"
                                name="nombre"
                                id="nombre"
                                placeholder="Tu Nombre"
                                onChange={llenarCampos}
                                value={nombre}
                            />
                        </div>
                        <div className="campo">
                            <label htmlFor="email">Email</label>
                            <input 
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Tu Email"
                                onChange={llenarCampos}
                                value={email}
                            />
                        </div>
                        <div className="campo">
                            <label htmlFor="password">Contraseña</label>
                            <input 
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Tu Contraseña"
                                onChange={llenarCampos}
                                value={password}
                            />
                        </div>
                        <div className="campo">
                            <label htmlFor="confirmar">Confirmar Contraseña</label>
                            <input 
                                type="password"
                                name="confirmar"
                                id="confirmar"
                                placeholder="Repite tu Contraseña"
                                onChange={llenarCampos}
                                value={confirmar}
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-azul w-100"
                        >Registrarme</button>
                    </form>
                    <Link to="/" className="btn-link">Volver a Iniciar Sesión</Link>
                </div>
            </div>
        </main>
    );
}

export default NuevaCuenta;