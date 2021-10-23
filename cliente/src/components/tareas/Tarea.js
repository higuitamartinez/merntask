import React,{useContext} from 'react';
import TareaContext from '../../context/tareas/tareaContext';
import Swal from 'sweetalert2';

const Tarea = ({tarea}) => {
    const tareaContext = useContext(TareaContext);
    const {tareaactual, obtenerTareaActual, actualizarTarea, eliminarTarea, descartarTarea} = tareaContext;

    const handleEliminar = () => {
        Swal.fire({
            title: '¿Eliminar Tarea?',
            text: "Las tareas eliminadas no se pueden recuperar",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar',
            cancelButtonText: 'No, Cancelar'
        }).then((result) => {
            if (result.isConfirmed){
                if(tareaactual){
                    if(tareaactual._id === tarea._id){
                        descartarTarea();
                    }
                }
                eliminarTarea(tarea._id);  
            }
        });
    }

    return(
        <li>
            <span>{tarea.nombre}</span>
            <div className="tarea-opciones">
                <button
                    type="button" 
                    className={`estado ${tarea.estado ? 'completo' : 'incompleto'}`}
                    onClick={() => actualizarTarea(tarea)}
                >{`${tarea.estado ? 'Completo' : 'Incompleto'}`}</button>
                <button
                    type="button" 
                    className="btn btn-light btn-azul-oscuro"
                    onClick={() => obtenerTareaActual(tarea._id)}
                >Editar</button>
                <button
                    type="button" 
                    className="btn btn-light btn-gris-claro"
                    onClick={handleEliminar} 
                >Eliminar</button>
            </div>
        </li>
    );
}

export default Tarea;