import './assets/libs/boxicons-2.1.1/css/boxicons.min.css'

import {Routes, Route } from 'react-router-dom'
import Blank from './pages/dash-elements/Blank'
import Dashboard from './pages/Dashboard'
import MainLayout from './layout/MainLayout'
import Patients from './pages/dash-elements/Patients'
import Inventory from './pages/dash-elements/Inventory'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import './scss/App.scss'
import Admin from './pages/Admin'
import Layout from './pages/Layout'
import Missing from './pages/Missing'
import Editor from './pages/Editor'
import Lounge from './pages/Lounge'
import LinkPage from './pages/LinkPage'
import Unauthorized from './pages/Unauthorized'
import RequireAuth from './pages/RequireAuth'
import PersistLogin from './pages/PersistLogin'
import Drugs from './pages/dash-elements/Drugs'
import Detail from './pages/dash-elements/Detail'
import Usuarios from './pages/dash-elements/Usuarios'
import Demo from './pages/dash-elements/appointments/Demo'

const ROLES = {
    'User': 2001,
    'Editor': 1984,
    'Admin': 5150
  }
function App() {
    return (
    
            <Routes>
                <Route path="/" element={<Layout />}>
                    {/* public routes */}
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="linkpage" element={<LinkPage />} />
                    <Route path="unauthorized" element={<Unauthorized />} />
                
                    
                    <Route element={< PersistLogin/>}>
                                {/* PONEMOS LOS 3 ROLES YA QUE NO HAY FORMA ENVIAR 2 CODIGO COMO EN EL TUTORIAL / TAMBIEN FUNIONA CAMBIAR EN EL MODEL Y PONER DOS ROLES USER Y EDITOR O ADMIN  */}
                            <Route element={<RequireAuth allowedRoles={[ROLES.User, ROLES.Editor, ROLES.Admin]} />}>
                            {/* <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}> */}
                                <Route path="/" element={<Home />} />
                            </Route>

                            <Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />}>
                                <Route path="editor" element={<Editor />} />
                            </Route>


                            <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                               <Route path="admin" element={<Admin />} />
                            </Route>

                            <Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />}>
                                 <Route path="lounge" element={<Lounge />} />
                            </Route> 

                            <Route element={<RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin]} />}>
                                <Route path="/dash" element={<MainLayout />}>
                                    <Route index element={<Dashboard />} />
                                    <Route path="patients" element={<Patients />} />
                                    <Route path="detail/:id" element={<Detail />} />
                                    <Route path="appointments" element={<Demo />} />
                                    

                                    <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                                         <Route path="users" element={<Usuarios />} />
                                         <Route path="drugs" element={<Drugs />} />
                                         <Route path="inventory" element={<Inventory />} />
                                    </Route>   
                                
                                    <Route path="settings" element={<Blank />} />
                                    <Route path="stats" element={<Blank />} />
                                </Route>
                            </Route> 
                   
                    </Route>
                   



    

                    {/* catch all */}
                    <Route path="*" element={<Missing />} />
                </Route>

   
            </Routes>
    
        
    )
}

export default App
