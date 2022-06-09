import { Link } from "react-router-dom"
import { useContext } from "react"
import AuthContext from '../context/AuthProvider'

const Lounge = () => {
    const con =  useContext(AuthContext)
    console.log(con.auth)    
    return (
        <section>
            <h1>The Lounge</h1>
            <br />
            <p>Admins and Editors can hang out here.</p>
            <div className="flexGrow">
                <Link to="/">Home</Link>
            </div>
        </section>
    )
}

export default Lounge
