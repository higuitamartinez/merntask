import React,{useState, useContext, Fragment} from 'react';
import ProyectoContext from '../../context/proyectos/proyectoContext';

const NuevoProyecto = () => {
    const proyectoContext = useContext(ProyectoContext);
    const {formulario, errorproyecto, agregarProyecto, mostrarFormulario, errorProyecto} = proyectoContext;

    const [proyecto, guardarProyecto] = useState({
        nombre: ''
    });

    const llenarCampos = (e) => {
        guardarProyecto({
            ...proyecto,
            [e.target.name]: e.target.value
        });
    }

    const {nombre} = proyecto;

    const handleSubmit = (e) => {
        e.preventDefault();
        if(nombre.trim() === ''){
            errorProyecto('El nombre del proyecto es obligatorio');
            return;
        }
        agregarProyecto(proyecto);
        guardarProyecto({
            nombre: ''
        });
    }

    return(
        <Fragment>
            <button
                type="button" 
                className="btn btn-azul w-100"
                onClick={() => mostrarFormulario()}
            >Nuevo Proyecto</button>
            {formulario ?
                (<form
                    onSubmit={handleSubmit} 
                    className="w-100 seccion"
                >
                    <input 
                        type="text"
                        name="nombre"
                        onChange={llenarCampos}
                        value={nombre}
                        placeholder="Nombre Proyecto"
                        className="input-proyecto"
                    />

                    <input 
                        type="submit"
                        className="btn btn-azul w-100"
                        value="Agregar Proyecto"
                    />
                </form>
                )
                :null
            }
            { errorproyecto?
                (
                    <div className={'alerta error'}>{errorproyecto}</div>
                )
                :null
            }
        </Fragment>
    );
}

export default NuevoProyecto;