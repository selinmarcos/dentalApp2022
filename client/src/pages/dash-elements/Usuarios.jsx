import React, {useState, useEffect, useRef} from 'react'
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import {useNavigate} from 'react-router-dom'
import MaterialTable from "material-table";
import {Modal, TextField, Button } from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add'
import CircularProgress from '@mui/material/CircularProgress';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import './usuarios.scss'
const REGISTER_URL = '/register';
const USER_URL = '/users'
const columns= [
    { title: "N°", render: rowData => rowData.tableData.id + 1, width:'4%'},
    { title: 'Usuario', field: 'username'},
    { title: 'Nombre', field: 'name'},
    { title: 'C.I', field: 'ci'},
    { title: 'Celular', field: 'phone' },
    { title: 'Dirección', field: 'address' },
    { title: 'Rol', field: 'roles.User'}

    // { title: 'Estado', field: 'direccion', type: 'numeric'}    
  ];
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
    
    // modall:{
    //   position: 'absolute',
    //   width: 600,
    //   backgroundColor: theme.palette.background.paper,
    //   border: '2px solid #000',
    //   boxShadow: theme.shadows[5],
    //   padding: theme.spacing(2, 4, 3),
    //   top: '50%',
    //   left: '50%',
    //   transform: 'translate(-50%, -50%)'
    // },
    iconos:{
      cursor: 'pointer'
    }, 
    inputMaterial:{
      width: '100%'
    }
  }));

const Usuarios = () => {
    const axiosPrivate = useAxiosPrivate();

    const history = useNavigate()
  
    const styles= useStyles();
    const [data, setData]= useState([]);
    const [modalInsertar, setModalInsertar]= useState(false);
    const [modalEditar, setModalEditar]= useState(false);
    const [modalEliminar, setModalEliminar]= useState(false);
    const [modalVer, setModalVer]= useState(false);

    const [usuario, setUsuario]=useState({
        username: "",
        name: "",
        ci: "",
        pwd: "",
        address: "",
        phone:"",
        // email:"",
        roles:"",
        matchPwd:"",
        _id: "",
      })

      const initialState = {
        username: "",
        name: "",
        ci: "",
        pwd: "",
        address: "",
        phone:"",
        // email:"",
        roles:"",
        matchPwd:"",
        _id: "",
      }  
    
      const peticionGet=async()=>{
        console.log("llegue")
        await axiosPrivate.get(USER_URL)
        .then(response=>{
         setData(response.data);
        }).catch(error=>{
          console.log(error);
        })
      } 

      const peticionPost=async()=>{
        if(usuario.pwd !== usuario.matchPwd){
          return  alert("Las contraseñas no coinciden")
        }
    
        await axiosPrivate.post(REGISTER_URL, usuario)
        .then(response=>{
          console.log(response.data)
          setData(data.concat(response.data));
          abrirCerrarModalInsertar();
          
          // history(`/view/${response.data._id}`)
          // alert("Usuario Agregado !")
        }).catch(err=>{
          if (!err?.response) {
            alert('Error en el servidor');
        } else if (err.response?.status === 409) {
            alert('Ya existe ese nombre de usuario.');
        } else {
            alert('Registration Failed')
        }
        }
        
        )
      }


      const peticionPut=async()=>{
      console.log(usuario)
        await axiosPrivate.put(USER_URL+"/"+usuario._id, usuario)
     
        .then(response=>{
          var dataNueva= data;
          console.log(dataNueva)
          dataNueva.map(artista=>{
            if(artista._id===usuario._id){
              artista.name=usuario.name;
              artista.username=usuario.username;
              artista.ci=usuario.ci;
              artista.address=usuario.address;
              artista.phone=usuario.phone;
              artista.roles=usuario.roles ? usuario.roles : usuario.roles.User;
            }
          });
          setData(dataNueva);
          abrirCerrarModalEditar();
    
    
          // window.location.reload();
        }).catch(error=>{
          console.log(error);
          window.location.reload();
        })
      }
      
      const peticionDelete=async()=>{
        await axiosPrivate.delete(USER_URL+"/"+usuario._id)
      
        .then(response=>{
          setData(data.filter(artista=>artista._id!==usuario._id));
          abrirCerrarModalEliminar();
     
          // window.location.reload();
        
        }).catch(error=>{
          console.log(error);
        })
      }
    
   
  const abrirCerrarModalInsertar=()=>{
    setModalInsertar(!modalInsertar);
    //reinitializing
    setUsuario(initialState)
  }

  
  const abrirCerrarModalEditar=()=>{
    setModalEditar(!modalEditar);
  }

  const abrirCerrarModalEliminar=()=>{
    setModalEliminar(!modalEliminar);
  }

  const abrirCerrarModalVer = () =>{
    setModalVer(!modalVer)
  }



  const seleccionarArtista=(artista, caso)=>{
    setUsuario(artista);
    if(caso==="Editar"){
      abrirCerrarModalEditar()
    }
    else if(caso==="Ver"){
      abrirCerrarModalVer()
    }
    else if(caso==="Eliminar"){
      abrirCerrarModalEliminar()
    }

  }
  const handleChange=e=>{
    

    if(e.target.type === 'checkbox'){
      let checkboxValue = e.target.checked ? "checked": ""
      console.log(checkboxValue)
      setUsuario(prevState =>({
          ...prevState,
         [e.target.name]: checkboxValue
      }))

    }
    else {
          const {name, value}=e.target;
          setUsuario(prevState=>({
            ...prevState,
            [name]: value
          }));
           
    }

 
    }
  const handleSubmit = (e) =>{
    e.preventDefault()
  }  

  const bodyInsertar=(
    <form className="insertarHome" onSubmit={handleSubmit}>
      <h3>Nuevo Usuario</h3>
      <TextField className={styles.inputMaterial} label="Nombre" name="name" onChange={handleChange}/>
      <br />
      {/* <TextField className={styles.inputMaterial} label="Correo" name="email" type='email' onChange={handleChange}/>
      <br /> */}
      <TextField className={styles.inputMaterial} label="Usuario"  name="username" required onChange={handleChange}/>          
      <br />
      <TextField className={styles.inputMaterial} label="Contraseña" type="password" required name="pwd" onChange={handleChange}/>          
      <br />
      <TextField className={styles.inputMaterial} label="Confirmar Contraseña" required type="password" name="matchPwd" onChange={handleChange}/>          
      <br />
      <TextField className={styles.inputMaterial} label="Celular" name="phone" onChange={handleChange} />          
      <br />
      <TextField className={styles.inputMaterial} label="Direccion" name="address" onChange={handleChange}/>
      <br />
      <TextField className={styles.inputMaterial} label="C.I" name="ci" type="number" onChange={handleChange}/>
      <br />
     
      <FormControl  fullWidth variant="standard"  >
        <InputLabel id="demo-simple-select-standard">ROL</InputLabel>
        <Select
        
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          name="roles"
          // label="Age"
          onChange={handleChange}   
        
        >
          <MenuItem value={5150}>ADMIN</MenuItem>
          <MenuItem value={1984}>EDITOR</MenuItem>
          {/* <MenuItem value={"USADO"}>Usado</MenuItem> */}
        </Select>
      </FormControl>
        {/* <TextField className={styles.inputMaterial} label="ROL" name="roles"  onChange={handleChange}/> */}
      <br />
      
      {/* <TextField type='date' className={styles.inputMaterial}  name="fecha" onChange={handleChange}/> */}

   
   
 
      {/* <DateTimePicker
        /> */}
      <br />
      <div align="right">
        <Button color="primary" onClick={()=>peticionPost()} type='submit'>Insertar</Button>
        <Button onClick={()=>abrirCerrarModalInsertar()}>Cancelar</Button>
      </div>
    </form>
  )

  const bodyEliminar=(
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar al paciente: <b>{usuario && usuario.username}</b>? </p>
      <div align="right">
        <Button color="secondary" onClick={()=>peticionDelete()}>Sí</Button>
        <Button onClick={()=>abrirCerrarModalEliminar()}>No</Button>

      </div>

    </div>
  )
  // const handleSubmit = ()=>{
  //   console.log("submit")
  // }


  const bodyEditar=(
    <div className="insertarHome" >
      <h3>Editar Usuario</h3>
      <TextField className={styles.inputMaterial} label="Nombre" name="name" onChange={handleChange} value={usuario&&usuario.name}/>
      <br />
      {/* <TextField className={styles.inputMaterial} label="Correo" name="email" type='email' onChange={handleChange}/>
      <br /> */}
      <TextField className={styles.inputMaterial} label="Usuario"  name="username" onChange={handleChange} value={usuario&&usuario.username}/>          
      <br />
      <TextField className={styles.inputMaterial} label=" Nueva Contraseña" required type="password" name="pwd" onChange={handleChange} />          
      <br />
      <TextField className={styles.inputMaterial} label="Confirmar Nueva Contraseña" required type="password" name="matchPwd" onChange={handleChange}/>          
      <br />
      <TextField className={styles.inputMaterial} label="Celular" name="phone" onChange={handleChange} value={usuario&&usuario.phone}/>          
      <br />
      <TextField className={styles.inputMaterial} label="Direccion" name="address" onChange={handleChange} value={usuario&&usuario.address}/>
      <br />
      <TextField className={styles.inputMaterial} label="C.I" name="ci" type="number" onChange={handleChange} value={usuario&&usuario.ci}/>
      <br />
     <br />
      <label htmlFor="rol">Rol:</label>
      <br />
      <select name="roles" id="rol" onChange={handleChange} value={usuario&&usuario.roles.User}>
        <option value={5150}>ADMIN</option>
        <option value={1984}>EDITOR</option>
      </select>
        {/* <TextField className={styles.inputMaterial} label="ROL" name="roles" type="number" onChange={handleChange} value={usuario&&usuario.roles.User}/> */}
      <br />
      <br />
      <div align="right">
        <Button color="primary" onClick={()=>peticionPut()}>Editar</Button>
        <Button onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )  

    useEffect(()=>{
        peticionGet()
    },[])  
    
    console.log(usuario)
    return ( 
        <div className='users'>
       
      
        <Button className="insertar"onClick={()=>abrirCerrarModalInsertar()}> <AddIcon /> Nuevo Usuario</Button>
        <br /><br /> 
       
       <MaterialTable
         
            columns={columns}
            data={data}
            title="Usuarios"  
            actions={[
              {
                icon: 'edit',
                tooltip: 'Editar Registro',
                iconProps: { style: {color: "#111B21" } },
                onClick: (event, rowData) => seleccionarArtista(rowData, "Editar")
              },
              {
                icon: 'delete',
                tooltip: 'Eliminar Registro',
                iconProps: { style: { color: "#F24E4F"} },
                onClick: (event, rowData) => seleccionarArtista(rowData, "Eliminar")
              },
              // {
              //   icon: 'visibility',
              //   tooltip: 'Ver detalles',
              //   onClick: (event, rowData) => detallePaciente(rowData)
           
              // },
            ]}
            options={{
              actionsColumnIndex: -1,
              headerStyle: {
                backgroundColor: '#23272A',
                color: '#FFFFFF'
              },
              rowStyle: {
                backgroundColor: '#EEE',
                fontSize: '16px',
                overflowWrap: 'break-word'
                // fontFamily: "Mulish-Regular",
              },
              
            }}
            localization={{
              header:{
                actions: "Acciones"
              },
              body: {
                emptyDataSourceMessage: (
                  <CircularProgress />
                ),
            },
              
            }}
          />

        <Modal
          open={modalInsertar}
          onClose={abrirCerrarModalInsertar}>
            {bodyInsertar}
        </Modal>  

  
          
          <Modal
          open={modalEditar}
          onClose={abrirCerrarModalEditar}>
            {bodyEditar}
          </Modal>
  
          <Modal
          open={modalEliminar}
          onClose={abrirCerrarModalEliminar}>
            {bodyEliminar}
          </Modal> 
  
          {/* <Modal open={modalVer} onClose={abrirCerrarModalVer}>
            {bodyVer}
          </Modal> */}
      </div>
     );
}
 
export default Usuarios;