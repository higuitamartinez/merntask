import React,{useReducer} from 'react';
import authReducer from './authReducer';
import AuthContext from './authContext';

import Swal from 'sweetalert2';
import axiosCliente from '../../config/axios';
import tokenAuth from '../../config/token';

import {
    ERROR_LOGIN,
    DESCARTAR_ERROR_LOGIN,
    ERROR_NUEVA,
    DESCARTAR_ERROR_NUEVA,
    CREAR_CUENTA,
    REINICIAR_CREADO,
    INICIAR_SESION,
    AUTENTICAR_USUARIO,
    ERROR_AUTENTICAR,
    CERRAR_SESION
} from '../../types';

const AuthState = (props) => {
    const initialState = {
        errorlogin: null,
        errornueva: null,
        creado: false,
        autenticado: false,
        usuarioautenticado: null
    }

    const [state, dispatch] = useReducer(authReducer, initialState);
    
    const errorLogin = (mensaje) => {
        dispatch({
            type: ERROR_LOGIN,
            payload: mensaje
        });

        setTimeout(() => {
            descartarErrorLogin();
        }, 5000);
    }

    const descartarErrorLogin = () => {
        dispatch({
            type: DESCARTAR_ERROR_LOGIN
        });
    }

    const errorNueva = (mensaje) => {
        dispatch({
            type: ERROR_NUEVA,
            payload: mensaje
        });

        setTimeout(() => {
            descartarErrorNueva();
        }, 5000);
    }

    const descartarErrorNueva = () => {
        dispatch({
            type: DESCARTAR_ERROR_NUEVA
        });
    }

    const reiniciarCreado = () => {
        dispatch({
            type: REINICIAR_CREADO
        });
    }

    const crearCuenta = async (usuario) => {
        try{
            const respuesta = await axiosCliente.post('/api/usuarios', usuario);
            Swal.fire({
                icon: 'success',
                title: respuesta.data.msg,
                text: 'Serás redirigido a iniciar sesión'
            }).then(() => {
                dispatch({
                    type: CREAR_CUENTA
                });
                reiniciarCreado();
            })
            setTimeout(() => {
                dispatch({
                    type: CREAR_CUENTA
                });
                Swal.close();
                reiniciarCreado();
            }, 5000);
        }catch(error){
            errorNueva(error.response.data.msg);
        }
    }

    const iniciarSesion = async (usuario) => {
        try{    
            const respuesta = await axiosCliente.post('/api/auth', usuario);
            dispatch({
                type: INICIAR_SESION,
                payload: respuesta.data.token
            });
            autenticarUsuario();
        }catch(error){
            errorLogin(error.response.data.msg);
        }
    }

    const autenticarUsuario = async () => {
        const token = localStorage.getItem('token');
        if(token){
            tokenAuth(token);
        }
        try{
            const respuesta = await axiosCliente.get('/api/auth');
            dispatch({
                type: AUTENTICAR_USUARIO,
                payload: respuesta.data.usuario
            });
        }catch(error){
            dispatch({
                type: ERROR_AUTENTICAR
            });
            errorLogin(error.response.data.msg);
        }
    }

    const cerrarSesion = () => {
        dispatch({
            type: CERRAR_SESION
        })
    }
    return(
        <AuthContext.Provider
            value={{
                errorlogin: state.errorlogin,
                errornueva: state.errornueva,
                creado: state.creado,
                autenticado: state.autenticado,
                usuarioautenticado: state.usuarioautenticado,
                errorLogin,
                errorNueva,
                crearCuenta,
                reiniciarCreado,
                iniciarSesion,
                autenticarUsuario,
                cerrarSesion
            }}
        >
            {props.children}   
        </AuthContext.Provider>
    );
}   

export default AuthState;