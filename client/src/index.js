import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {AuthProvider} from './context/AuthProvider'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

//ERROR cancel NO FUNCIONA EN REACT 18 CON EL NUEVO RENDER (POR ESO ESTA CON LA ANTIGUA SINTAXIS)
ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
           <Route path='/*' element={<App />}></Route> 
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);