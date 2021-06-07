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

import api from '../server/api';
import {
    TextEditor,
    BasicLayout,
    appointmentComponent,
    messages,
    allowDrag,
    appointments,
    resources
} from './Schedule/scheduleContext'

export default class Schedule extends React.PureComponent {
    
    constructor(props) {
        super(props);

        this.state = {
            mainResourceName: 'eventType',

            resources: resources,
            
            data: props.schedulerEvents,
            currentDate: props.now,

            currentViewName: 'Week',

            addedAppointment: {},
            appointmentChanges: {},
            editingAppointment: undefined,

            shadePreviousCells: true,
            shadePreviousAppointments: true,
            updateInterval: 10000,

            addedEvents: 0,
        };
        
        this.changeMainResource = this.changeMainResource.bind(this);

        this.changeViewId = () => {
            this.setState({
                addedEvents: this.state.addedEvents + 1,
            })
        }

        this.handleUpdateIntervalChange = (nextValue) => {
            this.setState({
                updateInterval: nextValue * 1000,
            });
        };

        this.currentViewNameChange = (currentViewName) => {
            this.setState({ currentViewName })
            console.log(currentViewName)
        }

        this.dataChange = (data) => {
            this.setState({ data });
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

                const editedAdded = (({
                        startDate, 
                        endDate, 
                        allDay,
                        members,
                        eventType,
                        title,
                        rRule,
                        moreDetails
                    }) => {
                    return {
                        id: Math.random().toString(36).substr(2, 9),
                        startDate: startDate.getTime(),
                        endDate: endDate.getTime(),
                        allDay,
                        moreDetails,
                        members,
                        eventType,
                        title,
                        rRule,
                }})(added)
               
                console.log(editedAdded)
                try {
                (async () => {
                        await api.post('/project/event', editedAdded)
                })()
                } catch (err) {
                    console.log(err);
                }

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
            shadePreviousCells,
            updateInterval,
            shadePreviousAppointments,
        } = this.state;
        return (
            <React.Fragment>
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
                            showDeleteButton
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

                        <CurrentTimeIndicator
                            shadePreviousCells={shadePreviousCells}
                            shadePreviousAppointments={shadePreviousAppointments}
                            updateInterval={updateInterval}
                        />
                    </Scheduler>
                </Paper>
            </React.Fragment>
        );
    }
}
