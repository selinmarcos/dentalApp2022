import React, { useEffect, useState } from 'react'
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import './sidebar.scss'
import { images } from '../../constants'
import {sidebarNav, sidebarNavEditor} from '../../configs/sidebarNav'
import AuthContext from '../../context/AuthProvider';
import useLogout from '../../hooks/useLogout';
import {Modal, Button } from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    modal: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      ['@media (max-width:480px)']: { // eslint-disable-line no-useless-computed-key
        width: 230
      }
    },
  }));
const Sidebar = () => {
    const contexto = useContext(AuthContext)
    console.log(contexto.auth.roles)
    // contexto.auth.roles == 5150 ? sidebarNav = sidebarNavEditor : sidebarNav = sidebarNav
    const styles= useStyles();
    const [modalEliminar, setModalEliminar]= useState(false);
    // const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();
    const logout = useLogout()

    const signOut = async () => {
        // if used in more components, this should be in context 
        // axios to /logout endpoint 
        await logout()
        // navigate('/linkpage');
        navigate('/login');
    }



    //added lo de arriba


    const [activeIndex, setActiveIndex] = useState(0)
    const location = useLocation()

    useEffect(() => {
        if(location.pathname === "/"){
            const curPath = location.pathname.split('/')[1]
            const activeItem = contexto.auth.roles == 5150 ? sidebarNav.findIndex(item => item.section === curPath) : sidebarNavEditor.findIndex(item => item.section === curPath)
            setActiveIndex(curPath.length === 0 ? 0 : activeItem)
        }else{
            const curPath = location.pathname.split('/')[1]
            const activeItem = contexto.auth.roles == 5150 ? sidebarNav.findIndex(item => item.section === curPath) : sidebarNavEditor.findIndex(item => item.section === curPath)
            setActiveIndex(curPath.length === 0 ? 0 : activeItem)

        }

 
    }, [location])

    const closeSidebar = () => {
        document.querySelector('.main__content').style.transform = 'scale(1) translateX(0)'
        setTimeout(() => {
            document.body.classList.remove('sidebar-open')
            document.querySelector('.main__content').style = ''
        }, 500);
    }

    const bodyEliminar=(
        <div className={styles.modal}>
          <p>Estás seguro que deseas Cerrar Sesión ? </p>
          <div align="right">
            <Button color="secondary" onClick={signOut} >Sí</Button>
            <Button onClick={()=>abrirCerrarModalEliminar()}>No</Button>    
          </div>
    
        </div>
      )
      const abrirCerrarModalEliminar=()=>{
        setModalEliminar(!modalEliminar);
      }   

    return (
        <div className='sidebar'>
            <div className="sidebar__logo">
                <img src={images.logo} alt="" />
                <div className="sidebar-close" onClick={closeSidebar}>
                    <i className='bx bx-x'></i>
                </div>
            </div>
            <div className="sidebar__menu">
  
                {
                  contexto.auth.roles == 5150 ? sidebarNav.map((nav, index) => (
                    // sidebarNav.map((nav, index) => (
                        <Link to={nav.link} key={`nav-${index}`} className={`sidebar__menu__item ${activeIndex === index && 'active'}`} onClick={closeSidebar}>
                            <div className="sidebar__menu__item__icon">
                                {nav.icon}
                            </div>
                            <div className="sidebar__menu__item__txt">
                                {nav.text}
                            </div>
                        </Link>
                    ))
                    :
                    sidebarNavEditor.map((nav, index) => (
                        // sidebarNav.map((nav, index) => (
                            <Link to={nav.link} key={`nav-${index}`} className={`sidebar__menu__item ${activeIndex === index && 'active'}`} onClick={closeSidebar}>
                                <div className="sidebar__menu__item__icon">
                                    {nav.icon}
                                </div>
                                <div className="sidebar__menu__item__txt">
                                    {nav.text}
                                </div>
                            </Link>
                        ))
                }
                <div className="sidebar__menu__item">
                    <div className="sidebar__menu__item__icon">
                        <i className='bx bx-log-out'></i>
                    </div>
                    <div className="sidebar__menu__item__txt" onClick={abrirCerrarModalEliminar}>                      
                      SALIR
                    </div>
                </div>
            </div>
            <Modal
                open={modalEliminar}
                onClose={abrirCerrarModalEliminar}>
                {bodyEliminar}
            </Modal>
        </div>
    )
}

export default Sidebar
