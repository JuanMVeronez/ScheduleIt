import React, { useContext, useEffect, useState } from 'react';
import { ReactSVG } from 'react-svg'

import { HeaderSchedule } from './style';
import api from '../../../server/api';
import { Context } from '../../../Context/AuthContext';
import Schedule from '../../../components/schedule';

export default function Users() {
  const { handleLogout } = useContext(Context);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    try {
      (async () => {
        console.log('try to pick')
        await api.get('/auth/pick-user').then((resp, err) => {
          setCurrentUser(resp.data.user);
        })
      })()
    } catch (err) {
      console.log(err);
    }
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
  const now = new Date()
  if (!loadingEvents) {
    return (
      <>
        <HeaderSchedule>
          <div>
            <ReactSVG src="schedule.svg"
              style={{
                display: 'inline-block',
                width: '80px',
                height: '80px',
              }}
            />
            <h2>Schedule It </h2>
          </div>
          <p><span>{currentUser.name}</span>, qual seu próximo plano?</p>
          <button type="button" onClick={handleLogout}>Sair</button>
        </HeaderSchedule>

        <Schedule schedulerEvents={currentEvents} currentDate={now} />

      </>)
  }
  else {
    return (<h1>Loading...</h1>)
  }
}

