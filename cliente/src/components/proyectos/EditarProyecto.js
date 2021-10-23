import React,{useState, useContext, useEffect} from 'react';
import ProyectoContext from '../../context/proyectos/proyectoContext';

const EditarProyecto = () => {
    const proyectoContext = useContext(ProyectoContext);
    const {proyectoactual, formularioeditar, erroreditar, errorEditar, actualizarProyecto} = proyectoContext;

    const [proyecto, guardarProyecto] = useState({
        nombre: ''
    });

    useEffect(() => {
        if(formularioeditar){
            guardarProyecto(proyectoactual);
        }else{
            guardarProyecto({
                nombre: ''
            });
        }
        //eslint-disable-next-line
    }, [formularioeditar]);

    if(!formularioeditar){
        return null;
    }

    const llenarCampos = (e) => {
        guardarProyecto({
            ...proyecto,
            [e.target.name]:e.target.value
        });
    }

    const {nombre} = proyecto;

    const validarFormulario = (e) => {
        e.preventDefault();
        if(nombre.trim() === ''){
            errorEditar('El nombre del proyecto es obligatorio');
            return;
        }
        actualizarProyecto(proyecto);
    }

    return(
        <div className="editar-contenedor">
            <h2>Actualizar proyecto</h2>
            {
                erroreditar ?
                    (<div className="alerta error seccion">{erroreditar}</div>)
                    :null
            }
            <form 
                className="contenedor-centrado"
                onSubmit={validarFormulario}
            >
                <div className="campo">
                    <label htmlFor="nombre">Nombre del proyecto</label>
                    <input
                        type="text" 
                        name="nombre"
                        id="nombre"
                        placeholder="Nombre de tu proyecto"
                        onChange={llenarCampos}
                        value={nombre}
                    />
                </div>
                <div className="pos-derecha">
                    <button
                        type="submit"
                        className="btn btn-azul"
                    >Actualizar</button>
                </div>
            </form>
        </div>
    );
}

export default EditarProyecto;