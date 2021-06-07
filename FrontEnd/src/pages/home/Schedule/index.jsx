import React, { useContext, useEffect, useState } from 'react';


import api from '../../../server/api';
import { Context } from '../../../Context/AuthContext';
import Schedule from '../../../components/schedule';

export default function Users() {
  const { handleLogout} = useContext(Context);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  
  useEffect(() => {
    
    try {
      (async () => {
        await api.get('/project/event').then((resp, err) => {
          const editedresp = resp.data.map(
            ({ _id, event: {
              startDate,
              endDate,
              allDay,
              members,
              eventType,
              title,
              rRule,
              moreDetails
            } }) => {
              return {
                id: _id,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                allDay,
                members,
                eventType,
                title,
                rRule,
                moreDetails
              };
            });
          
          setCurrentEvents(editedresp);
          setLoadingEvents(false);
        });
      })()

    } catch (err) {
      console.log(err);
    }

  }, [])

  console.log(currentEvents)
  const now = new Date()
  if (!loadingEvents){
  return (
    <>
      <button type="button" onClick={handleLogout}>Sair</button>
      <Schedule schedulerEvents={currentEvents} currentDate={now}/>

    </>)
    }
    else {
      return (<h1>Loading...</h1>)
    }
}

