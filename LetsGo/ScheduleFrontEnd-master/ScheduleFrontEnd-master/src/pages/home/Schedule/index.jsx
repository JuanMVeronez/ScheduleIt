import React, { useContext } from 'react';

import { format } from 'date-fns';

import api from '../../../server/api';
import { Context } from '../../../Context/AuthContext';
import Schedule from '../../../components/schedule';

export default function Users() {
  const { handleLogout } = useContext(Context);
  
  (async () => {
    await api.get('/project');
  })()
  
  const now = new Date()
  const currentDate = format(now, 'yyyy-MM-dd')

  const schedulerEvents = [
    { startDate: '2021-06-06T09:45', endDate:'2021-06-06T12:00', title: 'Almoço'},
    { startDate: '2021-06-06T14:15', endDate:'2021-06-06T18:00', title: 'Estudos'},
  ];
  return (
    <>
      <button type="button" onClick={handleLogout}>Sair</button>
      <Schedule schedulerEvents={schedulerEvents} currentDate={currentDate} />
      
    </>
  );
}

