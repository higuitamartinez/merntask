import React from 'react';
import Sidebar from '../layout/Sidebar';
import Header from '../layout/Header';
import ContenidoProyecto from './ContenidoProyecto';
import FormularioTarea from '../tareas/FormularioTarea';
const Proyectos = () => {
    return(
        <div className="pagina">
            <Sidebar />
            <div className="contenedor-principal">
                <Header />
                <FormularioTarea />
                <ContenidoProyecto />
            </div>
        </div>
    );
}

export default Proyectos;