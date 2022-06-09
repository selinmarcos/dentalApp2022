import * as React from 'react';
import Paper from '@mui/material/Paper';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/FormControl';
// import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';
import { ViewState, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  Appointments,
  AppointmentForm,
  AppointmentTooltip,
  DragDropProvider,
  TodayButton, DateNavigator, Toolbar
} from '@devexpress/dx-react-scheduler-material-ui';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'
// import { appointments } from './appointments';
import { useEffect } from 'react';

const PREFIX = 'Demo';

// const LocaleSwitcher = (
//     ({ onLocaleChange, currentLocale }) => (
//       <StyledDiv className={classes.container}>
//         <div className={classes.text}>
//           Locale:
//         </div>
//         <TextField
//           select
//           variant="standard"
//           value={currentLocale}
//           onChange={onLocaleChange}
//         >
//           <MenuItem value="fr-FR">Le français (French)</MenuItem>
//           <MenuItem value="de-GR">Deutsch (German)</MenuItem>
//           <MenuItem value="en-US">English (United States)</MenuItem>
//         </TextField>
//       </StyledDiv>
//     )
//   );
export const classes = {
  container: `${PREFIX}-container`,
  text: `${PREFIX}-text`,
  formControlLabel: `${PREFIX}-formControlLabel`,
};
const StyledDiv = styled('div')(({ theme }) => ({
  [`&.${classes.container}`]: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  },
  [`& .${classes.text}`]: theme.typography.h6,
  [`& .${classes.formControlLabel}`]: {
    ...theme.typography.caption,
    fontSize: '1rem',
  },
}));

// const currentDate = '2022-06-27';
const editingOptionsList = [
  { id: 'allowAdding', text: 'Adding' },
  { id: 'allowDeleting', text: 'Deleting' },
  { id: 'allowUpdating', text: 'Updating' },
  { id: 'allowResizing', text: 'Resizing' },
  { id: 'allowDragging', text: 'Dragging' },
];

const EditingOptionsSelector = ({
  options, onOptionsChange,
}) => (
  <StyledDiv className={classes.container}>
    <Typography className={classes.text}>
      Enabled Options
    </Typography>
    <FormGroup row>
      {editingOptionsList.map(({ id, text }) => (
        <FormControlLabel
          control={(
            <Checkbox
              checked={options[id]}
              onChange={onOptionsChange}
              value={id}
              color="primary"
            />
          )}
          classes={{ label: classes.formControlLabel }}
          label={text}
          key={id}
          disabled={(id === 'allowDragging' || id === 'allowResizing') && !options.allowUpdating}
        />
      ))}
    </FormGroup>
  </StyledDiv>
);

export default () => {

  const APPOINTMENTS_URL = '/appointments';
  const axiosPrivate = useAxiosPrivate();
  const [data, setData] = React.useState([]);
  const [editingOptions, setEditingOptions] = React.useState({
    allowAdding: true,
    allowDeleting: true,
    allowUpdating: true,
    allowDragging: true,
    allowResizing: true,
  });
  const [addedAppointment, setAddedAppointment] = React.useState({});
  const [isAppointmentBeingCreated, setIsAppointmentBeingCreated] = React.useState(false);

  const {
    allowAdding, allowDeleting, allowUpdating, allowResizing, allowDragging,
  } = editingOptions;

  const onCommitChanges = React.useCallback(({ added, changed, deleted }) => {
   
    if (added) {
      const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
      setData([...data, { id: startingAddedId, ...added }]);
      peticionPost([{id:startingAddedId,...added}])
      // console.log([{id:startingAddedId,...added}])
     
    }
    if (changed) {
      console.log(changed)
      setData(data.map(appointment => (
        changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment)));
        const id = parseInt(Object.keys(changed)[0])
        const nueva = changed[id]
        peticionPut(id, nueva)
        
    }
    if (deleted !== undefined) {
      setData(data.filter(appointment => appointment.id !== deleted));
       peticionDelete(deleted)
    }
    
    setIsAppointmentBeingCreated(false);
    
  }, [setData, setIsAppointmentBeingCreated, data]);
  const onAddedAppointmentChange = React.useCallback((appointment) => {
    setAddedAppointment(appointment);
    setIsAppointmentBeingCreated(true);
    
  });
//   const handleEditingOptionsChange = React.useCallback(({ target }) => {
//     const { value } = target;
//     const { [value]: checked } = editingOptions;
//     setEditingOptions({
//       ...editingOptions,
//       [value]: !checked,
//     });
//   });

  const TimeTableCell = React.useCallback(React.memo(({ onDoubleClick, ...restProps }) => (
    <WeekView.TimeTableCell
      {...restProps}
      onDoubleClick={allowAdding ? onDoubleClick : undefined}
    />
  )), [allowAdding]);

  const CommandButton = React.useCallback(({ id, ...restProps }) => {
    if (id === 'deleteButton') {
      return <AppointmentForm.CommandButton id={id} {...restProps} disabled={!allowDeleting} />;
    }
    return <AppointmentForm.CommandButton id={id} {...restProps} />;
  }, [allowDeleting]);

  const allowDrag = React.useCallback(
    () => allowDragging && allowUpdating,
    [allowDragging, allowUpdating],
  );
  const allowResize = React.useCallback(
    () => allowResizing && allowUpdating,
    [allowResizing, allowUpdating],
  );
// const changeLocale = event => setLocal(event.target.value );

//API-REST

const peticionPut=async(id, nueva)=>{    
  await axiosPrivate.put(APPOINTMENTS_URL+"/"+id, nueva)
  .then(response=>{
    // var dataNueva= [nueva];
    // dataNueva.map(artista=>{
    //   if(artista.id===patient.id){
    //     artista.nombre=patient.nombre;
    //     artista.celular=patient.celular;
    //     artista.direccion=patient.direccion;
    //     artista.ci=patient.ci;
    //   }
    // });
    // setData(dataNueva);
    console.log("UPDATED")
  }).catch(error=>{
    console.log(error);
  })
}

const peticionDelete=async(id)=>{
  await axiosPrivate.delete(APPOINTMENTS_URL+"/"+id)
  .then(response=>{
    // setData(data.filter(artista=>artista._id!==patient._id));
  }).catch(error=>{
    console.log(error);
  })
}

const peticionGet=async()=>{
  await axiosPrivate.get(APPOINTMENTS_URL)
  .then(response=>{
   setData(response.data);
  }).catch(error=>{
    console.log(error);
  })
}

const peticionPost=async(added)=>{
    
  await axiosPrivate.post(APPOINTMENTS_URL, added)
  .then(response=>{
    // setData(data.concat(response.data));
    // abrirCerrarModalInsertar();
    console.log(response.data)
  }).catch(error=>{
    console.log(error);
  })
}

 useEffect(()=>{
    console.log("GETEAMOS")
    peticionGet()
  },[])
  return (   
    <>
      {/* <EditingOptionsSelector
        options={editingOptions}
        onOptionsChange={handleEditingOptionsChange}
      /> */}
        {/* <LocaleSwitcher
          currentLocale={{locale:'fr-FR'}}
        //   onLocaleChange={changeLocale}
        /> */}  
      <Paper>        
        <Scheduler
          data={data}
          // height={600}
          //ERROR SLOW FIX
          // locale={{locale:'es-ES'}}
      
        >
          <ViewState
            // currentDate={currentDate}
          />
          <EditingState
            onCommitChanges={onCommitChanges}
            addedAppointment={addedAppointment}
            onAddedAppointmentChange={onAddedAppointmentChange}
            // cancelButton={'Cancelar'}
            
          />
          <IntegratedEditing />
          <WeekView
            startDayHour={8}
            endDayHour={22}
            timeTableCellComponent={TimeTableCell}
          />
            <Toolbar />
            <DateNavigator />
            <TodayButton messages={{today:'HOY'}}/>

          <Appointments />

          <AppointmentTooltip
            showOpenButton
            showDeleteButton={allowDeleting}
          />
          <AppointmentForm
            commandButtonComponent={CommandButton}
            readOnly={isAppointmentBeingCreated ? false : !allowUpdating}
            //ERROR SLOW FIX
            // messages={{commitCommand:'Guardar',titleLabel:'Nombre', detailsLabel:'Detalles',moreInformationLabel:'Más Información'}}
          />             
          <DragDropProvider
            allowDrag={allowDrag}
            allowResize={allowResize}
          />
        </Scheduler>
      </Paper>

    </>
    
  );
};