import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
    ViewState,
    EditingState,
    IntegratedEditing,
} from '@devexpress/dx-react-scheduler';

import {
    Scheduler,

    WeekView,
    MonthView,
    DayView,
    ViewSwitcher,

    Toolbar,

    DateNavigator,
    TodayButton,

    Appointments,
    Resources,
    DragDropProvider,

    AppointmentTooltip,

    AppointmentForm,
    EditRecurrenceMenu,
    AllDayPanel,
    ConfirmationDialog,

    CurrentTimeIndicator,
} from '@devexpress/dx-react-scheduler-material-ui';

import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';

const appointments = [{
    title: 'Website Re-Design Plan',
    startDate: new Date(2018, 5, 25, 9, 15),
    endDate: new Date(2018, 5, 25, 11, 30),
    id: 100,
    rRule: 'FREQ=DAILY;COUNT=3',
    exDate: '20180628T063500Z,20180626T061500Z',
}, {
    title: 'Book Flights to San Fran for Sales Trip',
    startDate: new Date(2018, 5, 25, 12, 11),
    endDate: new Date(2018, 5, 25, 13, 0),
    id: 101,
    rRule: 'FREQ=DAILY;COUNT=4',
    exDate: '20180627T091100Z',
    allDay: true,
}, {
    title: 'Install New Router in Dev Room',
    startDate: new Date(2018, 5, 25, 13, 30),
    endDate: new Date(2018, 5, 25, 14, 35),
    id: 102,
    rRule: 'FREQ=DAILY;COUNT=5',
    noDrag: true,
}, {
    title: 'Approve Personal Computer Upgrade Plan',
    startDate: new Date(2018, 5, 26, 10, 0),
    endDate: new Date(2018, 5, 26, 11, 0),
    id: 3,
    location: 'Room 2',
}, {
    title: 'Final Budget Review',
    startDate: new Date(2018, 5, 27, 11, 45),
    endDate: new Date(2018, 5, 27, 13, 20),
    id: 4,
    location: 'Room 2',
    noDrag: true
}, {
    title: 'New Brochures',
    startDate: new Date(2018, 5, 26, 14, 40),
    endDate: new Date(2018, 5, 26, 15, 45),
    id: 5,
    location: 'Room 2',
}, {
    title: 'Install New Database',
    startDate: new Date(2018, 5, 28, 9, 45),
    endDate: new Date(2018, 5, 28, 11, 15),
    id: 6,
    location: 'Room 1',
}, {
    title: 'Approve New Online Marketing Strategy',
    startDate: new Date(2018, 5, 29, 11, 45),
    endDate: new Date(2018, 5, 29, 13, 5),
    id: 7,
    location: 'Room 3',
}, {
    title: 'Create Icons for Website',
    startDate: new Date(2018, 5, 29, 10, 0),
    endDate: new Date(2018, 5, 29, 11, 30),
    id: 12,
    location: 'Room 2',
}];

// CONFIGURACAO DO CURRENT TIME

const styles = ({ spacing }) => ({
    checkBoxContainer: {
      paddingTop: spacing(1),
      paddingBottom: spacing(1),
      paddingLeft: spacing(4),
    },
    textField: {
      marginRight: spacing(4),
      marginLeft: spacing(1),
      width: '120px',
    },
  });
  
  const ShadeCellsCheckBox = ({ shadePreviousCells, handleChange }) => (
    <FormControlLabel
      control={(
        <Checkbox
          checked={shadePreviousCells}
          onChange={() => handleChange('shadePreviousCells')}
          color="primary"
        />
      )}
      label="Shade previous cells"
    />
  );
  
  const ShadePreviousAppointmentsCheckBox = ({ shadePreviousAppointments, handleChange }) => (
    <FormControlLabel
      control={(
        <Checkbox
          checked={shadePreviousAppointments}
          onChange={() => handleChange('shadePreviousAppointments')}
          color="primary"
        />
      )}
      label="Shade previous appointments"
    />
  );
  const CheckBoxContainer = withStyles(styles, { name: 'CheckBoxContainer' })(({
    shadePreviousCells, shadePreviousAppointments, handleCheckboxChange, classes,
  }) => (
    <Grid item container direction="column" className={classes.checkBoxContainer} xs={6}>
      <ShadeCellsCheckBox
        shadePreviousCells={shadePreviousCells}
        handleChange={handleCheckboxChange}
      />
      <ShadePreviousAppointmentsCheckBox
        shadePreviousAppointments={shadePreviousAppointments}
        handleChange={handleCheckboxChange}
      />
    </Grid>
  ));
  
  const UpdateIntervalBox = withStyles(styles, { name: 'UpdateIntervalSetter' })(({
    updateInterval, onValueChange, classes,
  }) => (
    <Grid item container xs={6} alignItems="center" justify="flex-end">
      <Typography>
        Update every:
      </Typography>
      <TextField
        className={classes.textField}
        variant="outlined"
        onChange={event => onValueChange(event.target.value)}
        value={updateInterval / 1000}
        type="number"
        InputProps={{
          endAdornment: <InputAdornment position="end">s</InputAdornment>,
        }}
      />
    </Grid>
  ));

// Parte sobre estilizacao de campos (com color para os cards)
const stylesSwitcher = theme => ({
    container: {
        display: 'flex',
        marginBottom: theme.spacing(2),
        justifyContent: 'flex-end',
    },
    text: {
        ...theme.typography.h6,
        marginRight: theme.spacing(2),
    },
});

const ResourceSwitcher = withStyles(stylesSwitcher, { name: 'ResourceSwitcher' })(
    ({
        mainResourceName, onChange, classes, resources,
    }) => (
        <div className={classes.container}>
            <div className={classes.text}>
                Main resource name:
        </div>
            <Select
                value={mainResourceName}
                onChange={e => onChange(e.target.value)}
            >
                {resources.map(resource => (
                    <MenuItem key={resource.fieldName} value={resource.fieldName}>
                        {resource.title}
                    </MenuItem>
                ))}
            </Select>
        </div>
    ),
);


// PARTE SOBRE CAMPOS NÃO MOVIVEIS
const dragDisableIds = appointments.map(appointment => {
    if (appointment.noDrag) {
        return appointment.id;
    }
    return null;
});

const allowDrag = ({ id }) => !dragDisableIds.includes(id);

const appointmentComponent = (props) => {
    if (allowDrag(props.data)) {
        return <Appointments.Appointment {...props} />;
    }
    return <Appointments.Appointment {...props}
        style={{
            ...props.style,
            cursor: 'not-allowed'
        }}
    />;
};

// PARTE SOBRE OS CAMPOS PERSONALIZADOS
const messages = {
    moreInformationLabel: '',
};

const TextEditor = (props) => {
    // eslint-disable-next-line react/destructuring-assignment
    if (props.type === 'multilineTextEditor') {
        return null;
    } return <AppointmentForm.TextEditor {...props} />;
};

const BasicLayout = ({ onFieldChange, appointmentData, ...restProps }) => {
    const onCustomFieldChange = (nextValue) => {
        onFieldChange({ customField: nextValue });
    };

    return (
        <AppointmentForm.BasicLayout
            appointmentData={appointmentData}
            onFieldChange={onFieldChange}
            {...restProps}
        >
            <AppointmentForm.Label
                text="Custom Field"
                type="title"
            />
            <AppointmentForm.TextEditor
                value={appointmentData.customField}
                onValueChange={onCustomFieldChange}
                placeholder="Custom field"
            />
        </AppointmentForm.BasicLayout>
    );
};

export default class Schedule extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            mainResourceName: 'members',
            resources: [
                {
                    fieldName: 'location',
                    title: 'Location',
                    instances: [
                        { id: 'Room 1', text: 'Room 1' },
                        { id: 'Room 2', text: 'Room 2' },
                        { id: 'Room 3', text: 'Room 3' },
                        { id: 'Room 4', text: 'Room 4' },
                        { id: 'Room 5', text: 'Room 5' },
                    ],
                },
                {
                    fieldName: 'members',
                    title: 'Members',
                    allowMultiple: true,
                    instances: [
                        { id: 1, text: 'Andrew Glover' },
                        { id: 2, text: 'Arnie Schwartz' },
                        { id: 3, text: 'John Heart' },
                        { id: 4, text: 'Taylor Riley' },
                        { id: 5, text: 'Brad Farkus' },
                    ],
                },
            ],

            data: appointments,
            currentDate: '2018-06-27',

            currentViewName: 'Week',

            addedAppointment: {},
            appointmentChanges: {},
            editingAppointment: undefined,
        };

        this.changeMainResource = this.changeMainResource.bind(this);

        this.currentViewNameChange = (currentViewName) => {
            this.setState({ currentViewName })
            console.log(currentViewName)
        }

        this.currentDateChange = (currentDate) => {
            this.setState({ currentDate });
        };

        this.commitChanges = this.commitChanges.bind(this);
        this.changeAddedAppointment = this.changeAddedAppointment.bind(this);
        this.changeAppointmentChanges = this.changeAppointmentChanges.bind(this);
        this.changeEditingAppointment = this.changeEditingAppointment.bind(this);

        this.viewChange = React.createRef();
    }


    changeMainResource(mainResourceName) {
        this.setState({ mainResourceName });
    }

    changeAddedAppointment(addedAppointment) {
        this.setState({ addedAppointment });
    }

    changeAppointmentChanges(appointmentChanges) {
        this.setState({ appointmentChanges });
    }

    changeEditingAppointment(editingAppointment) {
        this.setState({ editingAppointment });
    }

    commitChanges({ added, changed, deleted }) {
        this.setState((state) => {
            let { data } = state;
            if (added) {
                const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
                data = [...data, { id: startingAddedId, ...added }];
            }
            if (changed) {
                data = data.map(appointment => (
                    changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
            }
            if (deleted !== undefined) {
                data = data.filter(appointment => appointment.id !== deleted);
            }
            return { data };
        });
    }

    render() {
        const {
            currentDate,
            mainResourceName,
            resources,
            data,
            currentViewName,
            addedAppointment,
            appointmentChanges,
            editingAppointment,
        } = this.state;

        return (
            <React.Fragment>
                <ResourceSwitcher
                    resources={resources}
                    mainResourceName={mainResourceName}
                    onChange={this.changeMainResource}
                />
                <Paper>
                    <Scheduler
                        data={data}
                        height={630}
                    >
                        <ViewState
                            currentDate={currentDate}
                            currentViewName={currentViewName}
                            onCurrentViewNameChange={this.currentViewNameChange}
                            onCurrentDateChange={this.currentDateChange}
                        />
                        <EditingState
                            onCommitChanges={this.commitChanges}
                            addedAppointment={addedAppointment}
                            onAddedAppointmentChange={this.changeAddedAppointment}
                            appointmentChanges={appointmentChanges}
                            onAppointmentChangesChange={this.changeAppointmentChanges}
                            editingAppointment={editingAppointment}
                            onEditingAppointmentChange={this.changeEditingAppointment}
                        />
                        <IntegratedEditing />

                        <DayView displayName={'Dia'} />

                        <WeekView
                            excludedDays={[0, 6]}
                            name={'semana-util'}
                            displayName={'Work Week'}
                        />

                        <WeekView
                            displayName={'Semana'}
                        />

                        <MonthView displayName={'Mês'} />

                        <Toolbar />
                        <DateNavigator />
                        <TodayButton />
                        <ViewSwitcher />

                        <EditRecurrenceMenu />
                        <ConfirmationDialog />

                        <Appointments
                            appointmentComponent={appointmentComponent}
                        />
                        <AppointmentTooltip
                            showCloseButton
                            showOpenButton
                        />
                        <AppointmentForm
                            basicLayoutComponent={BasicLayout}
                            textEditorComponent={TextEditor}
                            messages={messages}
                        />
                        <AllDayPanel />
                        <DragDropProvider
                            allowDrag={allowDrag} />
                        <Resources
                            data={resources}
                            mainResourceName={mainResourceName}
                        />
                    </Scheduler>
                </Paper>
            </React.Fragment>
        );
    }
}
