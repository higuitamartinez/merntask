import {  
  BrowserRouter as Router, //Contenedor del Switch
  Switch, //Contenedor de Router
  Route //ruta y componente
}from 'react-router-dom';

import Login from './components/login/Login';
import NuevaCuenta from './components/login/NuevaCuenta';
import Proyectos from './components/proyectos/Proyectos';

import ProyectoState from './context/proyectos/proyectoState';
import TareaState from './context/tareas/tareaState';
import AuthState from './context/auth/authState';
import tokenAuth from './config/token';

import RutaPrivada from './components/rutas/RutaPrivada';

const token = localStorage.getItem('token');

if(token){
  tokenAuth(token);
}

function App() {
  return (
    <ProyectoState>
      <TareaState>
        <AuthState>
          <Router>
            <Switch>
              <Route exact path="/" component={Login}/>
              <Route exact path="/nueva-cuenta" component={NuevaCuenta}/>
              <RutaPrivada
                exact 
                path="/proyectos" 
                component={Proyectos} 
              />
            </Switch>
          </Router>
        </AuthState>
      </TareaState>
    </ProyectoState>
  );
}

export default App;
