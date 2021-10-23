import {useReducer} from 'react';
import TareaContext from './tareaContext';
import TareaReducer from './tareaReducer';

import axiosCliente from '../../config/axios';
import Swal from 'sweetalert2';

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

const TareaState = (props) => {
    const initialState = {
        tareas: [],
        tareaactual: null,
        errortarea: null
    }
    const [state, dispatch] = useReducer(TareaReducer, initialState);

    const obtenerTareas = async (proyecto) => {
        try{
            const resultado = await axiosCliente.get('/api/tareas', {
                params:{
                    proyecto
                }
            });
            dispatch({
                type: OBTENER_TAREAS,
                payload: resultado.data.tareas
            });
        }catch(error){
            console.log(error.response);
        }
    }

    const obtenerTareaActual = (id) => {
        dispatch({
            type: OBTENER_TAREA,
            payload: id
        })
    }

    const descartarTarea = () => {
        dispatch({
            type: DESCARTAR_TAREA
        })
    }

    const agregarTarea = async (tarea) => {
        try{
            const resultado = await axiosCliente.post('/api/tareas', tarea);
            dispatch({
                type: AGREGAR_TAREA,
                payload: resultado.data.tarea
            });
        }catch(error){
            console.log(error);
        }
    }

    const errorTarea = (mensaje) => {
        dispatch({
            type: ERROR_TAREA,
            payload: mensaje
        });
    }

    const editarTarea = async (tarea) => {
        try{
            const resultado = await axiosCliente.put(`/api/tareas/${tarea._id}`, tarea);
            dispatch({
                type: EDITAR_TAREA,
                payload: resultado.data.tarea
            });
        }catch(error){
            console.log(error);
        }
    }

    const actualizarTarea = async (tarea) => {
        tarea.estado = !tarea.estado;
        try{
            const resultado = await axiosCliente.put(`/api/tareas/${tarea._id}`, tarea);
            dispatch({
                type: ACTUALIZAR_TAREA,
                payload: resultado.data.tarea
            });
        }catch(error){
            console.log(error);
        }
    }

    const eliminarTarea = async (id) => {
        try{
            const resultado = await axiosCliente.delete(`/api/tareas/${id}`);
            dispatch({
                type: ELIMINAR_TAREA,
                payload: id
            });
            Swal.fire({
                title: 'Tarea eliminada',
                text: resultado.data.msg,
                icon: 'success'
            });
        }catch(error){
            console.log(error);
            Swal.fire({
                title: 'Ocurrió un error',
                text: 'La tarea no se pudo eliminar',
                icon: 'error'
            });
        }
    }

    const eliminarTareas = () => {
        dispatch({
            type: ELIMINAR_TAREAS
        });
    }

    return(
        <TareaContext.Provider
            value={{
                tareas: state.tareas,
                tareaactual: state.tareaactual,
                errortarea: state.errortarea,
                obtenerTareas,
                obtenerTareaActual,
                descartarTarea,
                agregarTarea,
                editarTarea,
                errorTarea,
                actualizarTarea,
                eliminarTarea,
                eliminarTareas
            }}
        >   
            {props.children}
        </TareaContext.Provider>
    );
}

export default TareaState;