import React from 'react'
import './topnav.scss'
import UserInfo from '../user-info/UserInfo'
import { data } from '../../constants'
import { useContext } from "react"
import AuthContext from '../../context/AuthProvider'

const TopNav = () => {
    const contexto = useContext(AuthContext)

    const openSidebar = () => {
        document.body.classList.add('sidebar-open')
    }
    // console.log(contexto.auth.roles)
    return (
        <div className='topnav'>
            {/* <UserInfo user={data.user} /> */}
            
            <UserInfo user={contexto.auth.username} rol={contexto.auth.roles} img = {data.user.img}/>
            <div className="sidebar-toggle" onClick={openSidebar}>
                <i className='bx bx-menu-alt-right'></i>
            </div>
        </div>
    )
}

export default TopNav
