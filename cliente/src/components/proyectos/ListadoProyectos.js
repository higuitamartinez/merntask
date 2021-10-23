import React,{useContext, useEffect} from 'react';
import ProyectoContext from '../../context/proyectos/proyectoContext';
import Proyecto from './Proyecto';


const ListadoProyectos = () => {
    const proyectoContext = useContext(ProyectoContext);
    const {proyectos, obtenerProyectos} = proyectoContext;

    useEffect(() => {
        obtenerProyectos();
        //eslint-disable-next-line
    },[])
    
    if(!proyectos.length){
        return <p>Aún no hay proyectos, comienza creando uno</p>
    }

    return(
        <ul className="proyectos-lista">
            {
                proyectos.map(proyecto => (
                    <Proyecto 
                        key={proyecto._id}
                        proyecto={proyecto}
                    />
                ))
            }
        </ul>
    );
}

export default ListadoProyectos;