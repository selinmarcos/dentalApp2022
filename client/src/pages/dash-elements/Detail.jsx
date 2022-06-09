import React, { useState, useEffect, useRef } from 'react';
import {useParams, Link } from "react-router-dom"
import './detail.scss';
import MaterialTable from "material-table";
import {Modal, TextField, Button } from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import AddIcon from '@material-ui/icons/Add'
import CircularProgress from '@mui/material/CircularProgress';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';


import Odontogram from './odontogram/Odontogram'

const columns= [
  { title: "N°", render: rowData => rowData.tableData.id + 1, width:'4%' },
  { title: 'Tratamiento', field: 'tratamiento' },
  { title: 'Descripcion', field: 'descripcion' },
  { title: 'Fecha', field: 'fecha'},
  { title: 'A/Cuenta', field: 'acuenta', type: 'numeric'},
  { title: 'Saldo', field: 'saldo', type: 'numeric'},
  { title: 'Total (Bs)', field: 'total', type: 'numeric'}
  // { title: 'Estado', field: ''}
  
];


const DETAIL_URL = '/treatments/'
const GET_PATIENT = '/patients/'

const getCurrentDate = () =>{
  let today = new Date();
  let month = today.getMonth() + 1;
  month = month < 10 ? "0" + month : month;
  let days = today.getDate() < 10 ? "0" + today.getDate() : today.getDate();

  today = today.getFullYear() + "-" + month + "-" + days;

  // console.log(today);
  return today
}

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
      ['@media (max-width:480px)']: { 
        width: 250,
      }
    },
    iconos:{
      cursor: 'pointer'
    }, 
    inputMaterial:{
      width: '100%'
    },
    inputMateriall:{
      width: '30%',
       
    },
    inputTotal:{
      width: '30%',
      backgroundColor: '#DFE0E4'
    }
  }));

const Detail = () => {
    const axiosPrivate = useAxiosPrivate();

  const {id} = useParams()
    // const [checked, setChecked] = useState(false); 

    const [data, setData]= useState([]); //state pacientes
    const [dataT, setDataT]= useState([]); //state tratamientos

    const [modalInsertar, setModalInsertar]= useState(false);
    const [modalEditar, setModalEditar]= useState(false);
    const [modalEliminar, setModalEliminar]= useState(false);
    const [modalVer, setModalVer]= useState(false);

    const [mostrar, setMostrar] = useState(false)
    const [mostrarEditar, setMostrarEditar] = useState(false)
    //para insertar
    const Num1E = useRef(null)
    const Num2E = useRef(null)

    //para editar
    const Numero1E = useRef(null)
    const Numero2E = useRef(null)

    const styles= useStyles();
    const estadoInicial = {
      idP:id,
      _id:"",
      tratamiento: "",
      descripcion: "",
      total: "",
      acuenta:"",
      saldo:"",
      fecha: getCurrentDate()
      // estado: "",
    }
    const [paciente, setPaciente]=useState({
        idP:id,
        _id:"",
        tratamiento: "",
        descripcion: "",
        total: "",
        acuenta:"",
        saldo:"",
        fecha: ""
      })

   

    const peticionGet=async()=>{
        await axiosPrivate.get(GET_PATIENT+id)
        .then(response=>{
        //  console.log(response.data)
         setData(response.data);
        }).catch(error=>{
          console.log(error);
        })
    }

    const peticionGetT=async()=>{
      await axiosPrivate.get(DETAIL_URL+id)
      .then(response=>{
      //  console.log(response.data)
       setDataT(response.data);
      }).catch(error=>{
        console.log(error);
      })
  }

    const peticionPost=async()=>{
        await axiosPrivate.post(DETAIL_URL, paciente)
        .then(response=>{
          console.log(paciente)
          setDataT(dataT.concat(response.data));
          // abrirCerrarModalInsertar();
          // setPaciente(estadoInicial)
          setMostrar((prev) => !prev)
          

        }).catch(error=>{
          console.log(error);
          alert("Error al insertar por favor intente de nuevo")
          window.location.reload();
        })
    
      }

      const peticionDelete=async()=>{
        console.log(paciente._id)
        await axiosPrivate.delete(DETAIL_URL+paciente._id)
      
        .then(response=>{
          setDataT(dataT.filter(artista=>artista._id!==paciente._id));
          abrirCerrarModalEliminar();

          // setPaciente(estadoInicial)
        }).catch(error=>{
          console.log(error);
        })
      }


      const peticionPut=async()=>{
        
        console.log("edit")
        await axiosPrivate.put(DETAIL_URL+paciente._id, paciente)
        .then(response=>{
          var dataNueva= dataT;
          dataNueva.map(artista=>{
            if(artista._id===paciente._id){

              artista.tratamiento=paciente.tratamiento;
              artista.descripcion=paciente.descripcion;
              artista.fecha=paciente.fecha;
              artista.total=paciente.total;
              artista.acuenta=paciente.acuenta;
              artista.saldo=paciente.saldo;

            }
          });
          setDataT(dataNueva);
          setMostrarEditar((prev) => !prev)

        }).catch(error=>{
          console.log(error);
        })
      }  


    const handleSubmit = (e) =>{

      e.preventDefault()
      peticionPost()
    }  

    const handleChange=e=>{
            const {name, value}=e.target;
            setPaciente(prevState=>({
              ...prevState,
              [name]: value
            })); 

         
              // console.log("no tendrias que entrar aqui")
              if(name == 'acuenta' || name == 'total'){
                const n1 = parseInt(Num1E.current.value)
                const n2 = parseInt(Num2E.current.value)
                // console.log(num1-num2)
                
                setPaciente(prevState=>({
                  ...prevState,
                  saldo: n1 - n2
                }));               
              }               
       }
      //hay dos handleChanges debido a que no se pudo identificar de donde provenia cada useRef Num1E y Numero1E... 
    const handleChangeEditar=e=>{

        const {name, value}=e.target;
        setPaciente(prevState=>({
          ...prevState,
          [name]: value
        })); 


          if(name == 'acuenta' || name == 'total'){
            const num1 = parseInt(Numero1E.current.value)
            const num2 = parseInt(Numero2E.current.value)

            setPaciente(prevState=>({
              ...prevState,
              saldo: num1 - num2
            }));               
          }               
   }

    useEffect(()=>{
      peticionGet();
      peticionGetT();
          
      }, [])
    

      const seleccionarArtista=(artista, caso)=>{
        setPaciente(artista);
        if(caso==="Editar"){
          // abrirCerrarModalEditar()
          setMostrarEditar((prev) => !prev)
          console.log("aquiiiiiiiiiiiiiiiii")
        }
        else if(caso==="Ver"){
          abrirCerrarModalVer()
        }
        else if(caso==="Eliminar"){
          abrirCerrarModalEliminar()
        }
    
      }
        
      const abrirCerrarModalEliminar=()=>{
        setModalEliminar(!modalEliminar);
      }
    
      const abrirCerrarModalVer = () =>{
        setModalVer(!modalVer)
      }  
     

      
      const bodyEliminar=(
        <div className={styles.modal}>
          <p>Estás seguro que deseas eliminar este registro <b>{paciente && paciente.tratamiento}</b>? </p>
          <div align="right">
            <Button color="secondary" onClick={()=>peticionDelete()}>Sí</Button>
            <Button onClick={()=>abrirCerrarModalEliminar()}>No</Button>    
          </div>    
        </div>
      )


    return (
      <div className='detalle'>        
          
            <div className="card-header">
              <p>PACIENTE: {data.nombre}</p>
            </div>
            <div className="card">
            <div className="container">
              {/* <strong>ID: </strong>
                        <span>{data._id}</span> */}
              <strong>Nombre: </strong>
              <span className='infoPaciente'> {data.nombre}</span>
              <strong>Celular: </strong>
              <span className='infoPaciente'>{data.celular}</span>
              <strong>CI: </strong>
              <span className='infoPaciente'>{data.ci}</span>
              <br />
              <strong>Enfermedades / Alergias: </strong>
              <span className='infoPaciente'>{data.alergias}</span>
              <br />

              <strong>Fecha: </strong>
              <span className='infoPaciente'>{data.fecha}</span>

              <strong>Edad: </strong>
              <span className='infoPaciente'>{data.edad}</span>

              <strong>Dirección: </strong>
              <span className='infoPaciente'>{data.direccion}</span>
              <br />

              {/* <Link to="/">
                <Button className="irAtras" variant="outlined">
                  👈 IR ATRAS
                </Button>
              </Link> */}
            </div>
          </div>  
        {/* <Button className="insertar" onClick={()=>abrirCerrarModalInsertar()}> <AddIcon /> Nuevo Registro</Button> */}
        <Button
          style={{ display: mostrarEditar || mostrar ? "none" : "" }}
          className="insertar"
          onClick={() =>{
             setMostrar((prev) => !prev)
             setPaciente(estadoInicial)
            }}
        >
          {" "}
          <AddIcon /> Nuevo Tratamiento
        </Button>
        <br />
    

          {/* INSERTAR */}
        <form onSubmit={handleSubmit} id="dPaciente" style={{ display: mostrar ? "" : "none" }}>
          <div className="insertarView">
            <h3 className="tituloModal">Nuevo Tratamiento</h3>
            <br /> 
            <TextField
              className={styles.inputMaterial}
              label="Tratamiento:"
              name="tratamiento"
              onChange={handleChange}
              value={paciente&&paciente.tratamiento}
              variant="outlined"
              required
            />
            <br />
            <br />            
            <TextField     
                placeholder="Descripción:"
                // style={{ width: 200 }}
                onChange={handleChange}
                name="descripcion"
                className={styles.inputMaterial}
                value={paciente&&paciente.descripcion}
                variant="outlined"
                multiline
            
            />
            <br />
            <br />
            <TextField
              type="date"
              className={styles.inputMaterial}
              name="fecha"
              onChange={handleChange}
              value={paciente&&paciente.fecha}
              variant="outlined"
            />
             <br />
            <br />
            <div className="pagos">
              <br />
              <TextField
                className={styles.inputTotal}
                label="Total:"
                name="total"
                type="number"
                min="1"
                onChange={handleChange}
                value={paciente&&paciente.total}
                variant="outlined"   
                // id="Num1"
                inputRef={Num1E}
                        
              />
              <br />
              <TextField
                className={styles.inputMateriall}
                label="A/Cuenta:"
                name="acuenta"
                type="number"
                min="1"
                onChange={handleChange}
                value={paciente&&paciente.acuenta}
                variant="outlined"
                // id="Num2"  
                inputRef={Num2E}
              />
              <br />
              <TextField
                className={styles.inputMateriall}
                label="Saldo:"
                name="saldo"
                type="number"
                min="1"
                onChange={handleChange}
                value={paciente&&paciente.saldo}
                // value={total}
                variant="outlined"
                focused
              />
              <br />
            </div>

      
            <br />
            <br />
            <div className='odonto'>  
            <h4>Odontograma: </h4>  
            <br />         
              {/* <Odontogram />  */}
            </div>
         
            <br />
            <div align="right">
              <Button color="primary" type='submit' >
                Insertar
              </Button>
              <Button onClick={() => setMostrar(prev=> !prev)}>
                Cancelar
              </Button>
            </div>
          </div>
        </form>

           {/* EDITAR */}
        <form onSubmit={handleSubmit} id="dPaciente" style={{ display: mostrarEditar ? "" : "none" }}>
          <div className="insertarView">
            <h3 className="tituloModal">Editar Tratamiento</h3>
            <br />
            <TextField
              className={styles.inputMaterial}
              label="Tratamiento:"
              name="tratamiento"
              onChange={handleChangeEditar}
              value={paciente&&paciente.tratamiento}
              required
              variant="outlined"              
            />
            <br />
            <br />
       
            {/* <TextField
              className={styles.inputMaterial}
              label="Descripcion"
              name="descripcion"
              onChange={handleChange}
            /> */}
            
            <TextField
     
              placeholder="Descripción:"
              // style={{ width: 200 }}
              onChange={handleChangeEditar}
              name="descripcion"
              className={styles.inputMaterial}
              value={paciente&&paciente.descripcion}
              variant="outlined"
              multiline
          
            />
            <br />
            <br />
            <TextField
              type="date"
              className={styles.inputMaterial}
              name="fecha"
              onChange={handleChangeEditar}
              value={paciente&&paciente.fecha}
              variant="outlined"
  
            />
             <br />
            <br />
            <div className="pagos">
            <br />
              <TextField
                className={styles.inputTotal}
                label="Total:"
                name="total"
                type="number"
                min="1"
                onChange={handleChangeEditar}
                value={paciente&&paciente.total}
                variant="outlined"
                id='Num1E'
                inputRef={Numero1E}
              />
              <br />
              <TextField
                className={styles.inputMateriall}
                label="A/Cuenta:"
                name="acuenta"
                type="number"
                min="1"
                onChange={handleChangeEditar}
                value={paciente&&paciente.acuenta}
                variant="outlined"
                id='Num2E'
                inputRef={Numero2E}
              />
              <br />
              <TextField
                className={styles.inputMateriall}
                label="Saldo:"
                name="saldo"
                type="number"
                min="1"
                onChange={handleChangeEditar}
                value={paciente&&paciente.saldo}
                variant="outlined"
              />

              <br />
            </div>

      
            <br />
            <br />
            <div className='odonto'>             
              {/* <Odontogram /> */}
              <h4>aqui va el odontograma</h4>
            </div>
         
            <br />
            <div align="right">
              <Button color="primary" onClick={()=>peticionPut()}>Editar</Button>
              <Button onClick={()=>setMostrarEditar(prev => !prev)}>Cancelar</Button>
            </div>
          </div>
        </form>

        

        <br />

        <div style={{ display: mostrarEditar || mostrar ? "none" : "" }}>
          <MaterialTable         
            columns={columns}
            data={dataT}
            title="Historial del Paciente"
            actions={[
              {
                icon: "edit",
                tooltip: "Editar Registro",
                iconProps: { style: {color: "#111B21" } },
                onClick: (event, rowData) =>{
                  seleccionarArtista(rowData, "Editar")
                }
              },
              {
                icon: "delete",
                iconProps: { style: { color: "#F24E4F"} },
                tooltip: "Eliminar Registro",
                onClick: (event, rowData) =>
                  seleccionarArtista(rowData, "Eliminar"),
              },
              // {
              //   icon: 'visibility',
              //   tooltip: 'Ver detalles',
              //   onClick: (event, rowData) => seleccionarArtista(rowData, "Ver")
              // },
            ]}
            options={{
              actionsColumnIndex: -1,
              headerStyle: {
                backgroundColor: "#23272A",
                color: "#FFFFFF",
              },
              rowStyle: {
                backgroundColor: "#EEE",
                fontSize: '16px',
                overflowWrap: 'break-word'
                
              },
              // rowStyle: (rowData) => {
              //   return {
              //     fontFamily: "Mulish-Regular",
              //     backgroundColor: rowBackgroundColors[rowData.priority] ?? "blue",
              //   };
              // },
            }}
            localization={{
              header: {
                actions: "Acciones",
              },
              body: {
                emptyDataSourceMessage:
                  //  <CircularProgress />
                  "No hay registros ",
              },
            }}
          />
        </div> 
        {/* <Modal open={modalInsertar} onClose={abrirCerrarModalInsertar}>
          {bodyInsertar}
        </Modal> */}
        <Modal open={modalEliminar} onClose={abrirCerrarModalEliminar}>
          {bodyEliminar}
        </Modal>
        {/* <Modal open={modalEditar} onClose={abrirCerrarModalEditar}>
          {bodyEditar}
        </Modal> */}
      </div>
    );
}
 
export default Detail;