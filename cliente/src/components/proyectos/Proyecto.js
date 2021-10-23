import React,{useContext} from 'react';
import ProyectoContext from '../../context/proyectos/proyectoContext';
import TareaContext from '../../context/tareas/tareaContext';

const Proyecto = ({proyecto}) => {
    const proyectoContext = useContext(ProyectoContext);
    const {seleccionarProyecto} = proyectoContext;

    const tareaContext = useContext(TareaContext);
    const {tareaactual, obtenerTareas, descartarTarea} = tareaContext;

    return(
        <li>
            <button
                type="button"
                onClick={() => {
                    if(tareaactual){
                        descartarTarea();
                    }
                    seleccionarProyecto(proyecto._id);
                    obtenerTareas(proyecto._id);
                }}
            >{proyecto.nombre}</button>
        </li> 
    );
}

export default Proyecto;