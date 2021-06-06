import React, {useContext} from 'react';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { MdKeyboardArrowLeft } from 'react-icons/md';

import {Context} from '../../../Context/AuthContext'
import history from '../../../history';
import { 
  RegisterContainer, 
  RegisterContent , 
  RegisterForm,
  BackLoginButton,
} from './style';

export default function Login() {
    const { authenticated, handleLogin} = useContext(Context);
    const { handleSubmit, register } = useForm();
    console.log('Login', authenticated);
  
    const handleLoginn = (data) => {
      console.log(data);
    }
    
    return (
      <>
        <Helmet>
          <title>Cadastre-se</title>
        </Helmet>
        <RegisterContainer>
          <RegisterContent>
            <div>
              <BackLoginButton onClick={() => history.goBack()}>
                  <MdKeyboardArrowLeft style={{
                    color: '#fafafa',
                    strokeWidth: "2",
                    verticalAlign: 'center'
                  }}/>
              </BackLoginButton>
              <h2>Criar conta</h2>
              <p>Preencha os campos abaixo para criar sua conta conosco!</p>
            </div>
            <RegisterForm onSubmit={handleSubmit(handleLoginn)}>    
              <label htmlFor="name">Nome</label>
              <input
                {...register('name')} 
                id="name"
                name="name" 
                autoComplete="name"
                type="name"
                placeholder="Seu nome" 
                required
              />  
            

            
              <label htmlFor="lastName">Sobrenome</label>
              <input
                {...register('lastName')} 
                id="lastName"
                name="lastName" 
                autoComplete="lastName"
                type="lastName"
                placeholder="Seu sobrenome" 
                required
              />
                
              
              <label htmlFor="email">E-mail</label>
              <input
                {...register('email')} 
                id="email"
                name="email" 
                autoComplete="email"
                type="email"
                placeholder="user@email.com" 
                required
              />
    
              <label htmlFor="password">Senha</label>
              <input 
                {...register('password')}
                id="password"
                name="password"
                type="password"
                placeholder="Digite uma senha"
                required
              />

              <label htmlFor="confirmPassword">Confirmar senha</label>
              <input 
                {...register('confirmPassword')}
                id="confirmPassword"
                name="confirmPassword"
                type="confirmPassword"
                placeholder="Digite novamente"
                required
              />
              
              <button type="submit">
                Finalizar cadastro
              </button>
            </RegisterForm>
          </RegisterContent>
        </RegisterContainer>
      </>
    );
  }