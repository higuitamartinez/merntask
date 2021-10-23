import axiosCliente from './axios';

const tokenAuth = (token) => {
    if(token){
        //Inyectar en el header de axios
        axiosCliente.defaults.headers.common['x-auth-token'] = token;
    }else{
        delete axiosCliente.defaults.headers.common['x-auth-token'];
    }
}

export default tokenAuth;