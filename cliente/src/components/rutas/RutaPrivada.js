import React, {useContext, useEffect} from 'react';
import {Route, Redirect} from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

const RutaPrivada = ({component: Component, ...props}) => {
    //props: exact patch="/ruta"

    const authContext = useContext(AuthContext);
    const {autenticado, autenticarUsuario} = authContext;

    //1. Verificamos que hay un token el LS
    useEffect(() => {
        autenticarUsuario();
        //eslint-disable-next-line
    },[]);
    
    //2. Decidimos si redirigimos o renderizamos directamente el componente
    return(
        <Route 
            {...props} /*El render me permite hacer una condición de comp*/
            render={(props) => !autenticado 
                ?
                    (<Redirect to="/" />)
                :
                    (<Component 
                        {...props}
                    />)
            }
        />
    );
}

export default RutaPrivada;