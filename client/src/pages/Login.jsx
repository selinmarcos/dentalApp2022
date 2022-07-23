import { useRef, useState, useEffect} from 'react';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

import './register.scss'
import axios from '../axios';
const LOGIN_URL = '/auth';

const Login = () => {
    const [values, setValues] = useState({
        showPassword: false,
      });

    const { setAuth, persist, setPersist } = useAuth()

    
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    // const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ user, pwd }),
                // axios.defaults.headers.common['Authorization'] = 'Bearer' + localStorage.getItem('token')
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
         
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response));
           
            const accessToken = response?.data?.accessToken;
            // localStorage.setItem('token', accessToken);
         

            const roles = response?.data?.roles
            const username = response?.data?.username

            setAuth({ username, roles, accessToken });
            setUser('');
            setPwd('');
            // setSuccess(true);
            navigate(from, {replace: true})
        } catch (err) {
    
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }
    //HIDE AND SHOW PASSWORD
    const handleClickShowPassword = () => {
        console.log("here")
        setValues({
          ...values,
          showPassword: !values.showPassword,
        });
      };
    //trusted device
    const togglePersist = () =>{
        setPersist(prev => !prev)
    }
    useEffect(()=>{
        localStorage.setItem("persist", persist)
    },[persist])


    return (
        <main className="register">
    
                <section className="sectionRegister">
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Iniciar Sesión</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">Usuario:</label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                        />

                        <label htmlFor="password">Contraseña:</label>
                        <div className='pass'>
                            <input
                                    type={values.showPassword ? "text" : "password"}
                                    id="password"
                                    onChange={(e) => setPwd(e.target.value)}
                                    value={pwd}
                                    required
                            />
                            {
                                values.showPassword ?   
                                <VisibilityIcon className='passIcon'
                                   onClick={handleClickShowPassword}
                                />
                                :
                                <VisibilityOffIcon className='passIcon'
                                onClick={handleClickShowPassword}
                                 />
                            }                         
                        </div>
                    

                        <button>Iniciar Sesión</button>
                        <div className='persistCheck'>
                            <input 
                                type="checkbox" 
                                id='persist' 
                                onChange={togglePersist}
                                checked={persist}
                             
                            />
                            <label htmlFor="persist">Confiar en este dispositivo </label>
                        </div>
                    </form>
                    <p>
                        Necesitas una cuenta?<br />
                        <span className="line">
                            <Link  to="/register">Registrarse</Link>
                        </span>
                    </p>
                </section>
         
        </main>
    )
}

export default Login
