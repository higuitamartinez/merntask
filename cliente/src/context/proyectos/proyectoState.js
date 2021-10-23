import React,{useReducer} from 'react';
import Swal from 'sweetalert2';

import axiosCliente from '../../config/axios';

import {
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

import ProyectoContext from './proyectoContext';
import ProyectoReducer from './proyectoReducer';


const ProyectoState = (props) => {
    const initialState = {
        proyectos: [],
        proyectoactual: null,
        formulario: false,
        formularioeditar: false,
        errorproyecto: null,
        erroreditar: null
    };

    const [state, dispatch] = useReducer(ProyectoReducer, initialState);

    const obtenerProyectos = async () => {
        try{    
            const respuesta = await axiosCliente.get('/api/proyectos');
            dispatch({
                type: OBTENER_PROYECTOS,
                payload: respuesta.data.proyectos
            });   
        }catch(error){
            console.log(error);
        }
    }

    const seleccionarProyecto = (id) => {
        dispatch({
            type: SELECCIONAR_PROYECTO,
            payload: id
        });
    }

    const agregarProyecto = async (proyecto) => {
        try{
            const resultado = await axiosCliente.post('/api/proyectos', proyecto);
            dispatch({
                type: AGREGAR_PROYECTO,
                payload: resultado.data.proyecto
            });
        }catch(error){
            console.log(error);
        }
    }

    const mostrarFormulario = () => {
        dispatch({
            type: MOSTRAR_FORMULARIO
        });
    }

    const formularioEditar = () => {
        dispatch({
            type: FORMULARIO_EDITAR
        });
    }

    const errorProyecto = (mensaje) => {
        dispatch({
            type: ERROR_PROYECTO,
            payload: mensaje
        });
    }
    
    const errorEditar = (mensaje) => {
        dispatch({
            type: ERROR_EDITAR,
            payload: mensaje
        });
    }

    const eliminarProyecto = async (id) => {
        try{
            const respuesta = await axiosCliente.delete(`/api/proyectos/${id}`);
            dispatch({
                type: ELIMINAR_PROYECTO,
                payload: id
            });
            Swal.fire({
                title: 'Proyecto Eliminado',
                text: respuesta.data.msg,
                icon: 'success'
            });
        }catch(error){
            console.log(error);
            Swal.fire({
                title: 'Ocurrió un error',
                text: 'El proyecto no se pudo eliminar',
                icon: 'error'
            });
        }
    }
    const descartarProyecto = () => {
        dispatch({
            type: DESCARTAR_PROYECTO
        });
    }

    const actualizarProyecto = async (proyecto) => {
        try{    
            const resultado = await axiosCliente.put(`/api/proyectos/${proyecto._id}`, proyecto);
            dispatch({
                type: ACTUALIZAR_PROYECTO,
                payload: resultado.data.proyecto
            });
            seleccionarProyecto(resultado.data.proyecto._id);
        }catch(error){
            console.log(error);
        }
    }

    const eliminarProyectos = () => {
        dispatch({
            type: ELIMINAR_PROYECTOS
        });
    }

    return(
        <ProyectoContext.Provider
            value={{
                proyectos: state.proyectos,
                proyectoactual: state.proyectoactual,
                formulario: state.formulario,
                formularioeditar: state.formularioeditar,
                errorproyecto: state.errorproyecto,
                erroreditar: state.erroreditar,
                obtenerProyectos,
                seleccionarProyecto,
                agregarProyecto,
                mostrarFormulario,
                errorProyecto,
                eliminarProyecto,
                descartarProyecto,
                formularioEditar,
                errorEditar,
                actualizarProyecto,
                eliminarProyectos
            }}
        >
            {props.children}
        </ProyectoContext.Provider>
    );
}

export default ProyectoState;