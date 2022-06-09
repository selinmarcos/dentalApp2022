import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import MaterialTable from "material-table";
import {Modal, TextField, Button } from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add'
import CircularProgress from '@mui/material/CircularProgress';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import './patients.scss'


const INVENTORY_URL = '/inventory';
const columns= [
  { title: "N°", render: rowData => rowData.tableData.id + 1, width: "4%" },
  { title: 'Articulo', field: 'nombre' },
  { title: 'Descripcion', field: 'descripcion' },
  { title: 'Cantidad', field: 'cantidad' },
  { title: 'Precio (Bs)', field: 'precio'},
  { title: 'Estado', field: 'estado'},
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

  iconos:{
    cursor: 'pointer'
  }, 
  inputMaterial:{
    width: '100%'
  }
}));

const Patients = () => {
  const axiosPrivate = useAxiosPrivate();

  const history = useNavigate()

  const styles= useStyles();
  const [data, setData]= useState([]);
  const [modalInsertar, setModalInsertar]= useState(false);
  const [modalEditar, setModalEditar]= useState(false);
  const [modalEliminar, setModalEliminar]= useState(false);
  const [modalVer, setModalVer]= useState(false);

  const getCurrentDate = () =>{
    let today = new Date();
    let month = today.getMonth() + 1;
    month = month < 10 ? "0" + month : month;
    let days = today.getDate() < 10 ? "0" + today.getDate() : today.getDate();
  
    today = today.getFullYear() + "-" + month + "-" + days;
  
    console.log(today);
    return today
  }
  const [patient, setPatient]=useState({
    nombre: "",
    descripcion: "",
    _id: "",
    cantidad: "",
    precio: "",
    estado:"",
  })
  
  const initialState = {
    nombre: "",
    descripcion: "",
    _id: "",
    cantidad: "",
    precio: "",
    estado:"",
  }

  // const handleChange=e=>{
  //   console.log(patient)
  //   const {name, value}=e.target;
  //   setPatient(prevState=>({
  //     ...prevState,
  //     [name]: value
  //   }));
  // }
  const handleChange=e=>{
    console.log(patient)

    if(e.target.type === 'checkbox'){
      let checkboxValue = e.target.checked ? "checked": ""
      console.log(checkboxValue)
      setPatient(prevState =>({
          ...prevState,
         [e.target.name]: checkboxValue
      }))

    }
    else {
          const {name, value}=e.target;
          setPatient(prevState=>({
            ...prevState,
            [name]: value
          }));
           
    } 
  }
  

  const peticionGet=async()=>{
    console.log("llegue")
    await axiosPrivate.get(INVENTORY_URL)
    .then(response=>{
     setData(response.data);
    }).catch(error=>{
      console.log(error);
    })
  }



  const peticionPost=async()=>{
    
    await axiosPrivate.post(INVENTORY_URL, patient)
    .then(response=>{
      console.log(response.data)
      setData(data.concat(response.data));
      abrirCerrarModalInsertar();
      
      // window.location.reload();
    }).catch(error=>{
      console.log(error);
    })
  }

  const peticionPut=async()=>{
    
    await axiosPrivate.put(INVENTORY_URL+"/"+patient._id, patient)
    .then(response=>{
      var dataNueva= data;
      dataNueva.map(artista=>{
        if(artista._id===patient._id){
          artista.nombre=patient.nombre;
          artista.descripcion=patient.descripcion;
          artista.cantidad=patient.cantidad;
          artista.precio=patient.precio;
          artista.estado=patient.estado;
        }
      });
      setData(dataNueva);
      abrirCerrarModalEditar();


      // window.location.reload();
    }).catch(error=>{
      console.log(error);
    })
  }

  const peticionDelete=async()=>{
    console.log(patient._id)
    await axiosPrivate.delete(INVENTORY_URL+"/"+patient._id)
  
    .then(response=>{
      setData(data.filter(artista=>artista._id!==patient._id));
      abrirCerrarModalEliminar();
 
      // window.location.reload();
    
    }).catch(error=>{
      console.log(error);
    })
  }


//  const detallePaciente = (artista) =>{
//     console.log(artista._id)
//     history(`/dash/detail/${artista._id}`)
//  }




  const seleccionarArtista=(artista, caso)=>{
    setPatient(artista);
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

  const abrirCerrarModalInsertar=()=>{
    setModalInsertar(!modalInsertar);
    //reinitializing
    setPatient(initialState)
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

  useEffect(()=>{
    peticionGet()
  }, [])


  const bodyInsertar=(
    <div className="insertarHome">
      <h3>Nuevo Registro</h3>
      
      <TextField className={styles.inputMaterial} label="Articulo" name="nombre" onChange={handleChange}/>
      <br />
      <TextField className={styles.inputMaterial} label="Descripcion"  name="descripcion" onChange={handleChange}/>          
      <br />
      <TextField className={styles.inputMaterial} label="Cantidad" type='number' name="cantidad"  onChange={handleChange} />          
      <br />
      <TextField className={styles.inputMaterial} label="Precio" type='number' name="precio" onChange={handleChange}/>
      <br />
      {/* <TextField className={styles.inputMaterial} label="Estado" name="estado"  onChange={handleChange}/> */}
      <br />    
      <FormControl  fullWidth variant="standard"  >
        <InputLabel id="demo-simple-select-standard">Estado</InputLabel>
        <Select
        
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          name="estado"
          // label="Age"
          onChange={handleChange}   
        
        >
          <MenuItem value={"NUEVO"}>Nuevo</MenuItem>
          <MenuItem value={"SEMI-NUEVO"}>Semi-nuevo</MenuItem>
          <MenuItem value={"USADO"}>Usado</MenuItem>
        </Select>
      </FormControl>
      <br />
      <br />
      <div align="right">
        <Button color="primary" onClick={()=>peticionPost()}>Insertar</Button>
        <Button onClick={()=>abrirCerrarModalInsertar()}>Cancelar</Button>
      </div>
    </div>
  )

  const bodyEditar=(
    <div className="insertarHome">
      <h3>Editar Registro</h3>
    <br />
      <TextField className={styles.inputMaterial} label="Articulo" name="nombre" onChange={handleChange} value={patient&&patient.nombre}/>
      <br />
      <TextField className={styles.inputMaterial} label="Descripcion" name="descripcion" onChange={handleChange} value={patient&&patient.descripcion}/>          
      <br />
      <TextField className={styles.inputMaterial} label="Cantidad" name="cantidad" type='number' onChange={handleChange} value={patient&&patient.cantidad}/>          
      <br />
      <TextField className={styles.inputMaterial} label="Precio" name="precio" type='number' onChange={handleChange} value={patient&&patient.precio}/>
      <br />
      <FormControl  fullWidth variant="standard"  >
        <InputLabel id="demo-simple-select-standard">Estado</InputLabel>
        <Select
        
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          name="estado"
         
          onChange={handleChange}
          value={patient&&patient.estado}   
        
        >
          <MenuItem value={"NUEVO"}>Nuevo</MenuItem>
          <MenuItem value={"SEMI-NUEVO"}>Semi-nuevo</MenuItem>
          <MenuItem value={"USADO"}>Usado</MenuItem>
        </Select>
      </FormControl>
       <br />
        <br />
      <div align="right">
        <Button color="primary" onClick={()=>peticionPut()}>Editar</Button>
        <Button onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const bodyEliminar=(
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar al paciente: <b>{patient && patient.nombre}</b>? </p>
      <div align="right">
        <Button color="secondary" onClick={()=>peticionDelete()}>Sí</Button>
        <Button onClick={()=>abrirCerrarModalEliminar()}>No</Button>

      </div>

    </div>
  )

    return ( 
      <div className='patients'>
       
           
        

        <br />
        <Button className="insertar"onClick={()=>abrirCerrarModalInsertar()}> <AddIcon /> Nuevo Registro</Button>
        <br /><br />
       
       <MaterialTable
         
            columns={columns}
            data={data} 
            title= "INVENTARIO"
            actions={[
              {
                icon: 'edit',
                tooltip: 'Editar Registro',
                iconProps: { style: {color: "#111B21"}},
                
                onClick: (event, rowData) => seleccionarArtista(rowData, "Editar")
              },
              {
                icon: 'delete',
                tooltip: 'Eliminar Registro',
                iconProps: { style: { color: "#F24E4F" } },
                onClick: (event, rowData) => seleccionarArtista(rowData, "Eliminar")
              },             

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
                // Added for custom with column,
                overflowWrap: 'break-word'
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
              // toolbar: {
              //     searchTooltip: 'Buscar'
              // },
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
 
export default Patients;