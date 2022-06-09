import React from 'react'
import './user-info.scss'

const UserInfo = (props) => {
    console.log(props.rol)
    return (
        <div className='user-info'>
            <div className="user-info__img">
                <img src={props.img} alt="" />
            </div>
            <div className="user-info__name">
                <span>{props.user} - {props.rol == 5150 ? 'ADMIN' : "ODONTÓLOGO"}</span>
           
            </div>
        </div>
    )
}

export default UserInfo
