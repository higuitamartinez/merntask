import React,{useContext} from 'react';
import TareaContext from '../../context/tareas/tareaContext';
import Tarea from './Tarea';

const ListadoTareas = () => {
    const tareaContext = useContext(TareaContext);
    const {tareas} = tareaContext;

    if(!tareas.length){
        return (<p className="text-center">Aún no hay tareas en este proyecto, comienza creando una</p>)
    }

    return(
        <ul className="contenedor-minimo tareas-lista">
            {tareas.map(tarea => (
                <Tarea
                    key={tarea._id}
                    tarea={tarea}
                />
            ))}
        </ul>
    );
}
export default ListadoTareas;