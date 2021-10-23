import React, {useContext} from 'react';
import ListadoTareas from '../tareas/ListadoTareas';
import ProyectoContext from '../../context/proyectos/proyectoContext';
import TareaContext from '../../context/tareas/tareaContext';
import Swal from 'sweetalert2';
import EditarProyecto from './EditarProyecto';


const ContenidoProyecto = () => {
    const proyectoContext = useContext(ProyectoContext);
    const {proyectoactual, eliminarProyecto, formularioEditar} = proyectoContext;

    const tareaContext = useContext(TareaContext);
    const {eliminarTareas} = tareaContext;

    if(!proyectoactual){
        return <h2 className="text-center">Seleccione un proyecto</h2>
    }
    const {nombre} = proyectoactual;
    
    const handleActualizar = () => {
        formularioEditar();
    }

    const handleEliminar = () => {
        Swal.fire({
            title: '¿Eliminar el proyecto?',
            text: "Los proyectos eliminados no se pueden recuperar",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar',
            cancelButtonText: 'No, Cancelar'
        }).then((result) => {
            if (result.isConfirmed){
                eliminarTareas();
                eliminarProyecto(proyectoactual._id);       
            }
        });
    }
    return(
        <main className="contenedor principal">
            <h2 className="text-center">{nombre}</h2>
            <ListadoTareas/>
            <div className="proyecto-opciones">
                <button
                    type="button"
                    className="btn btn-azul"
                    onClick={handleActualizar}
                >Actualizar Proyecto</button>
                <button
                    type="button"
                    className="btn btn-gris"
                    onClick={handleEliminar}
                >Eliminar Proyecto &times;</button>
            </div>
            <EditarProyecto />
        </main>
    );
}

export default ContenidoProyecto;