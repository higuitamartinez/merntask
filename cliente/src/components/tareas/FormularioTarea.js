import React,{useContext, useState, useEffect} from 'react';
import ProyectoContext from '../../context/proyectos/proyectoContext';
import TareaContext from '../../context/tareas/tareaContext';

const FormularioTarea = () => {
    const proyectoContext = useContext(ProyectoContext);
    const {proyectoactual} = proyectoContext;

    const tareaContext = useContext(TareaContext);
    const {tareaactual, errortarea, errorTarea, agregarTarea, editarTarea} = tareaContext;

    const [tarea, guardarTarea] = useState({
        nombre: ''
    });

    useEffect(() => {
        if(tareaactual){
            guardarTarea(tareaactual);
        }else{
            guardarTarea({
                nombre: ''
            });
        }
    },[tareaactual]);

    const {nombre} = tarea;

    if(!proyectoactual){
        return null;
    }

    const handleChange = (e) => {
        guardarTarea({
            ...tarea,
            [e.target.name]: e.target.value
        })
    } 

    const handleSubmit = (e) => {
        e.preventDefault();
        if(nombre === ''){
            errorTarea('El nombre de la tarea es obligatorio');
            return;
        }
        if(!tareaactual){
            //Crear
            tarea.proyecto = proyectoactual._id;
            agregarTarea(tarea);
            
        }else{
            //Actualizar
            editarTarea(tarea);   
        }
        guardarTarea({
            nombre: ''
        });
    }

    return(
        <section className="tarea-formulario">
            <form 
                className="contenedor contenedor-minimo"
                onSubmit={handleSubmit}
            >
                <input 
                    name="nombre"
                    className="input-tarea" 
                    placeholder="Nombre Tarea..."
                    onChange={handleChange} //onChange de tareaactual
                    value={nombre}
                />
                <input 
                    type="submit"
                    className="btn btn-azul w-100"
                    value={!tareaactual ? "Agregar Tarea" : "Editar tarea"}
                />
            </form>
            {errortarea ? (<div className={'alerta error'}>{errortarea}</div>) : null}
        </section>
    );
}

export default FormularioTarea;