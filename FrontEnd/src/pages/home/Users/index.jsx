import React, { useContext } from 'react';

import api from '../../../server/api';
import { Context } from '../../../Context/AuthContext';


export default function Users() {
  const { handleLogout } = useContext(Context);
  
  (async () => {
    await api.get('/project');
    console.log(1)
  })()
  
  return (
    <>
      <h1>Agora sim</h1>
      <p>K7</p>
      <button type="button" onClick={handleLogout}>Sair</button>
    </>
  );
}

