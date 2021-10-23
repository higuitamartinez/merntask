import{
    OBTENER_PROYECTOS, 
    SELECCIONAR_PROYECTO,
    AGREGAR_PROYECTO,
    MOSTRAR_FORMULARIO,
    ERROR_PROYECTO,
    ELIMINAR_PROYECTO,
    DESCARTAR_PROYECTO,
    FORMULARIO_EDITAR,
    ERROR_EDITAR,
    ACTUALIZAR_PROYECTO,
    ELIMINAR_PROYECTOS
}from '../../types';

export default (state, action)=> {
    switch(action.type){
        case OBTENER_PROYECTOS:
            return{
                ...state,
                proyectos: action.payload
            }
        case SELECCIONAR_PROYECTO:
            return{
                ...state,
                formularioeditar: false,
                erroreditar: null,
                proyectoactual: state.proyectos.find(proyecto => proyecto._id === action.payload)
            }
        case AGREGAR_PROYECTO:
            return{
                ...state,
                errorproyecto: null,
                proyectos: [...state.proyectos, action.payload]
            }
        case MOSTRAR_FORMULARIO:
            return{
                ...state,
                errorproyecto:null,
                formulario: !state.formulario
            }
        case FORMULARIO_EDITAR:
            return{
                ...state,
                erroreditar: null,
                formularioeditar: !state.formularioeditar
            }
        case ERROR_PROYECTO:
            return{
                ...state,
                errorproyecto: action.payload
            }
        case ERROR_EDITAR:
            return{
                ...state,
                erroreditar: action.payload
            }
        case ELIMINAR_PROYECTO:
            return{
                ...state,
                proyectoactual:null,
                proyectos: state.proyectos.filter(proyecto => proyecto._id !== action.payload)
            }
        case DESCARTAR_PROYECTO:
            return{
                ...state,
                proyectoactual: null
            }
        case ACTUALIZAR_PROYECTO:
            return{
                ...state,
                formularioeditar: false,
                erroreditar: false,
                proyectos: state.proyectos.map(proyecto => {
                    if(proyecto._id === action.payload._id){
                        return action.payload;
                    }
                    return proyecto;
                })
            }
        case ELIMINAR_PROYECTOS:
            return{
                ...state,
                errorproyecto: null,
                erroreditar: null,
                proyectoactual:null,
                proyectos: []
            }
        default:
            return state;
    }
}