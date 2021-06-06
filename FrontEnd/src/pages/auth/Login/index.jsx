import React, {useContext} from 'react';
import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet-async';
import { ReactSVG } from 'react-svg';

import {Context} from '../../../Context/AuthContext'
import { 
  LoginContainer, 
  LoginContent , 
  LoginForm,
} from './style';

export default function Login() {
  const { authenticated, handleLogin} = useContext(Context);
  const { handleSubmit, register } = useForm();
  console.log('Login', authenticated);
  
  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <LoginContainer>
        <LoginContent>
          <div>
            <ReactSVG 
              src="schedule.svg"
              alt="logo Schedule It"
              />
            <h2>Bem-vindo(a)!</h2>
            <p>O que está planejando para hoje?</p>
          </div>
          <LoginForm onSubmit={console.log(handleSubmit(handleLogin))}>
            <label htmlFor="email">e-mail</label>
            <input
              {...register('email')} 
              id="email"
              name="email" 
              autoComplete="email"
              type="email"
              placeholder="user@email.com" 
              required
            />

            <label htmlFor="password">senha</label>
            <input 
              {...register('password')}
              id="password"
              name="password"
              autoComplete="current-password" 
              type="password"
              placeholder="Digite sua senha"
              required
            />
            <p><a href=".">esqueci minha senha</a></p>

            <button type="submit" alt="Fazer login">
              Entrar
            </button>
            <p>É novo aqui? <a href='./auth/register'>Criar conta</a></p>
          </LoginForm>
        </LoginContent>
      </LoginContainer>
    </>
  );
}