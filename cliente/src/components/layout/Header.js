import React,{useContext} from 'react';
import AuthContext from '../../context/auth/authContext';
import ProyectoContext from '../../context/proyectos/proyectoContext';
import TareaContext from '../../context/tareas/tareaContext';

const Header = () => {
    const authContext = useContext(AuthContext);
    const {usuarioautenticado, cerrarSesion} = authContext;

    const proyectoContext = useContext(ProyectoContext);
    const {eliminarProyectos} = proyectoContext;

    const tareaContext = useContext(TareaContext);
    const {eliminarTareas} = tareaContext;
    return(
        <header className="header-contenedor">
            <div className="header-contenido">
                {
                    usuarioautenticado ?
                    <p>Hola <span>{usuarioautenticado.nombre}</span></p>
                    : null
                }
                <button
                    type="button"
                    onClick={() => {
                        eliminarTareas();
                        eliminarProyectos();
                        cerrarSesion();
                    }}
                >Cerrar Sesión</button>
            </div>
        </header>
    );  
}

export default Header;