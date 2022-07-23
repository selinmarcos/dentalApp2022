import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import MaterialTable from "material-table";
import {Modal, TextField, Button } from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add'
import CircularProgress from '@mui/material/CircularProgress';
// import axios, { axiosPrivate } from '../../axios' 
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import './patients.scss'
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';

const PATIENTS_URL = '/patients';
const columns= [
  { title: "N°", render: rowData => rowData.tableData.id + 1, width: "4%" },
  { title: 'Nombre/Paciente', field: 'nombre' },
  { title: 'CI', field: 'ci' },
  { title: 'Alergias', field: 'alergias' },
  { title: 'Edad', field: 'edad'},
  { title: 'Fecha', field: 'fecha'},
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
    celular: "",
    _id: "",
    ci: "",
    direccion: "",
    alergias:"",
    fecha:"",
    edad:"",
  })
  
  const initialState = {
    nombre: "",
    celular: "",
    _id: "",
    ci: "",
    direccion: "",
    alergias:"Ninguna",
    fecha: getCurrentDate(),
    edad:"",
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
    await axiosPrivate.get(PATIENTS_URL)
    .then(response=>{
     setData(response.data);
    }).catch(error=>{
      console.log(error);
    })
  }



  const peticionPost=async()=>{
    
    await axiosPrivate.post(PATIENTS_URL, patient)
    .then(response=>{
      setData(data.concat(response.data));
      abrirCerrarModalInsertar();
      
      history(`/detail/${response.data._id}`)
      // window.location.reload();
    }).catch(error=>{
      console.log(error);
    })
  }

  const peticionPut=async()=>{
    
    await axiosPrivate.put(PATIENTS_URL+"/"+patient._id, patient)
    .then(response=>{
      var dataNueva= data;
      dataNueva.map(artista=>{
        if(artista._id===patient._id){
          artista.nombre=patient.nombre;
          artista.celular=patient.celular;
          artista.direccion=patient.direccion;
          artista.ci=patient.ci;
          artista.edad=patient.edad;
          artista.fecha=patient.fecha;
          artista.alergias=patient.alergias;
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
    await axiosPrivate.delete(PATIENTS_URL+"/"+patient._id)
  
    .then(response=>{
      setData(data.filter(artista=>artista._id!==patient._id));
      abrirCerrarModalEliminar();
 
      // window.location.reload();
    
    }).catch(error=>{
      console.log(error);
    })
  }


 const detallePaciente = (artista) =>{
    console.log(artista._id)
    history(`/detail/${artista._id}`)
 }




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
      <h3>Agregar Nuevo Paciente</h3>
      <TextField className={styles.inputMaterial} label="Nombre" name="nombre" onChange={handleChange}/>
      <br />
      <TextField className={styles.inputMaterial} label="CI" type="number" name="ci" onChange={handleChange}/>          
      <br />
      <TextField className={styles.inputMaterial} label="Alergias / Enfermedades" name="alergias" value={patient&&patient.alergias} onChange={handleChange} />          
      <br />
      <TextField className={styles.inputMaterial} label="Celular" type='number' name="celular" onChange={handleChange}/>
      <br />
      <TextField className={styles.inputMaterial} label="Edad" name="edad" type="number" onChange={handleChange}/>
      <br />
      <TextField className={styles.inputMaterial} label="Dirección" name="direccion" onChange={handleChange}/>
      <br />
      <br />
      <TextField type='date' className={styles.inputMaterial}  name="fecha" onChange={handleChange} value={patient&&patient.fecha}/>
      <br />
   
   
 
      {/* <DateTimePicker
        /> */}
      <br /><br />
      <div align="right">
        <Button color="primary" onClick={()=>peticionPost()}>Insertar</Button>
        <Button onClick={()=>abrirCerrarModalInsertar()}>Cancelar</Button>
      </div>
    </div>
  )

  const bodyEditar=(
    <div className="insertarHome">
      <h3>Editar Paciente</h3>
      <TextField className={styles.inputMaterial} label="Paciente" name="nombre" onChange={handleChange} value={patient&&patient.nombre}/>
      <br />
      <TextField className={styles.inputMaterial} label="CI" name="ci" onChange={handleChange} value={patient&&patient.ci}/>          
      <br />
      <TextField className={styles.inputMaterial} label="Alergias / Enfermedades" name="alergias" onChange={handleChange} value={patient&&patient.alergias}/>          
      <br />
      <TextField className={styles.inputMaterial} label="Celular" name="celular" onChange={handleChange} value={patient&&patient.celular}/>
      <br />
      <TextField className={styles.inputMaterial} label="Direccióm" name="direccion" onChange={handleChange} value={patient&&patient.direccion}/>
       <br />
      <TextField className={styles.inputMaterial} label="Edad" name="edad" onChange={handleChange} value={patient&&patient.edad}/>
      <br />
      <br />
      <TextField className={styles.inputMaterial} type="date" name="fecha" onChange={handleChange} value={patient&&patient.fecha}/>
            
      <br /><br />

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
        <Button className="insertar" onClick={()=>abrirCerrarModalInsertar()}> <AddIcon /> Nuevo Paciente </Button>
        <br /><br />
       
       <MaterialTable
         
            columns={columns}
            data={data} 
            title= "Lista de Pacientes"
            actions={[
              {
                icon: 'edit',
                tooltip: 'Editar Paciente',
                iconProps: { style: {color: "#111B21"} },
                
                onClick: (event, rowData) => seleccionarArtista(rowData, "Editar")
              },
              {
                icon: 'delete',
                tooltip: 'Eliminar Paciente',
                iconProps: { style: { color: "#F24E4F"} },
                onClick: (event, rowData) => seleccionarArtista(rowData, "Eliminar")
              },
             
              // {
              //   icon: 'visibility',
              //   tooltip: 'Ver detalles',
              //   onClick: (event, rowData) => seleccionarArtista(rowData, "Ver")
              // },
              {
                icon: 'assignment',
                iconProps: { style: { color: "#111B21"} },
                tooltip: 'Ver historial',
                onClick: (event, rowData) => detallePaciente(rowData)
           
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
              toolbar: {
                  searchTooltip: "Buscar",
                  searchPlaceholder: "Buscar"
              },
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