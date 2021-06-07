import * as React from 'react';
import {
    Appointments,
    AppointmentForm,
} from '@devexpress/dx-react-scheduler-material-ui';


export const appointments = [];

export const resources = [
    {
        fieldName: 'eventType',
        title: 'Type',
        instances: [
            { id: 'pessoa', text: 'Vida pessoal' },
            { id: 'estudo', text: 'Estudos' },
            { id: 'trabalho', text: 'Trabalho ou serviços' },
            { id: 'facul', text: 'Faculdade' },
            { id: 'event', text: 'Eventos' },
            { id: 'other', text: 'Outros'},
        ],
    },
    {
        fieldName: 'members',
        title: 'Members',
        allowMultiple: true,
        instances: [
            
        ],
    },
]


// PARTE SOBRE CAMPOS NÃO MOVIVEIS
const dragDisableIds = appointments.map(appointment => {
    if (appointment.noDrag) {
        return appointment.id;
    }
    return null;
});

export const allowDrag = ({ id }) => !dragDisableIds.includes(id);

export const appointmentComponent = (props) => {
    if (allowDrag(props.data)) {
        return <Appointments.Appointment {...props}
            style={{
                borderRadius: '8px',
            }}
        />;
    }
    return <Appointments.Appointment {...props}
        style={{
            ...props.style,
            cursor: 'not-allowed',
            borderRadius: '8px'
        }}
    />;
};

// PARTE SOBRE OS CAMPOS PERSONALIZADOS
export const messages = {
    moreInformationLabel: '',
};

export const TextEditor = (props) => {
    // eslint-disable-next-line react/destructuring-assignment
    if (props.type === 'multilineTextEditor') {
        return null;
    } return <AppointmentForm.TextEditor {...props} />;
};

export const BasicLayout = ({ onFieldChange, appointmentData, ...restProps }) => {
    const onCustomFieldChange = (nextValue) => {
        onFieldChange({ moreDetails: nextValue });
    };

    return (
        <AppointmentForm.BasicLayout
            appointmentData={appointmentData}
            onFieldChange={onFieldChange}
            {...restProps}
        >
            <AppointmentForm.Label
                text="More Information"
                type="title"
            />
            <AppointmentForm.TextEditor
                value={appointmentData.moreDetails}
                onValueChange={onCustomFieldChange}
                placeholder="Descrição..."
            />
        </AppointmentForm.BasicLayout>
    );
};
