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


export default (state, action) => {
    switch(action.type){
        case ERROR_LOGIN:
            return{
                ...state,
                errorlogin: action.payload
            }
        case DESCARTAR_ERROR_LOGIN:
            return{
                ...state,
                errorlogin: null
            }
        case ERROR_NUEVA:
            return{
                ...state,
                errornueva: action.payload
            }
        case DESCARTAR_ERROR_NUEVA:
            return{
                ...state,
                errornueva: null
            }
        case CREAR_CUENTA:
            return{
                ...state,
                errornueva: null,
                creado: true
            }
        case REINICIAR_CREADO:
            return{
                ...state,
                creado: false
            }
        case INICIAR_SESION:
            localStorage.setItem('token', action.payload)
            return{
                ...state,
                autenticado: true
            }
        case AUTENTICAR_USUARIO:
            return{
                ...state,
                errorlogin: null,
                autenticado: true,
                usuarioautenticado: action.payload
            }
        case CERRAR_SESION:
        case ERROR_AUTENTICAR:
            localStorage.removeItem('token');
            return{
                ...state,
                autenticado: false,
                usuarioautenticado: null
            }
        default:
            return state;
    }
}