import{
    OBTENER_TAREAS,
    OBTENER_TAREA,
    DESCARTAR_TAREA,
    AGREGAR_TAREA,
    ERROR_TAREA,
    EDITAR_TAREA,
    ACTUALIZAR_TAREA,
    ELIMINAR_TAREA,
    ELIMINAR_TAREAS
} from '../../types';

export default (state, action) => {
    switch(action.type){
        case OBTENER_TAREAS:
            return{
                ...state,
                errortarea: null,
                tareaactual: null,
                tareas: action.payload
            }
        case OBTENER_TAREA:
            return{
                ...state,
                errortarea: null,
                tareaactual: state.tareas.find(tarea => tarea._id === action.payload)
            }
        case DESCARTAR_TAREA:
            return{
                ...state,
                errortarea: null,
                tareaactual: null
            }
        case AGREGAR_TAREA:
            return{
                ...state,
                errortarea: null,
                tareas: [...state.tareas, action.payload]
            }
        case ERROR_TAREA:
            return{
                ...state,
                errortarea: action.payload
            }
        case EDITAR_TAREA:
            return{
                ...state,
                errortarea: null,
                tareaactual: null,
                tareas: state.tareas.map(tarea => {
                    if(tarea._id === action.payload._id){
                        return action.payload
                    }
                    return tarea;
                })
            }
        case ACTUALIZAR_TAREA:
            return{
                ...state,
                tareas: state.tareas.map(tarea => {
                    if(tarea._id === action.payload._id){
                        return action.payload
                    }
                    return tarea;
                })
            }
        case ELIMINAR_TAREA:
            return{
                ...state,
                tareas: state.tareas.filter(tarea => tarea._id !== action.payload)
            }
        case ELIMINAR_TAREAS:
            return{
                ...state,
                errortarea: null,
                tareaactual: null,
                tareas: []
            }
        default:
            return state
    }
};