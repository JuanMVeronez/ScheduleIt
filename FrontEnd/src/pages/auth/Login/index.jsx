import React, {useContext} from 'react';
import { useForm } from 'react-hook-form';
import { ReactSVG } from 'react-svg';
import { Helmet } from 'react-helmet-async';

import {Context} from '../../../Context/AuthContext'
import { 
  LoginContainer, 
  LoginContent , 
  LoginForm,
} from './style';


export default function Login() {
  const { handleLogin } = useContext(Context);
  const { handleSubmit, register, reset } = useForm();

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
              
              />
            <h2>Bem-vindo(a)!</h2>
            <p>O que está planejando para hoje?</p>
          </div>
          <LoginForm onSubmit={handleSubmit(handleLogin)} onReset={reset}>
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
              autoComplete="current-password" 
              type="password"
              placeholder="digite sua senha"
              required
              />
            <p><a href=".">Esqueci minha senha</a></p>

            <button type="submit">
              Entrar
            </button>
            <p>É novo aqui? <a href='./auth/register'>Criar conta</a></p>
          </LoginForm>
        </LoginContent>
      </LoginContainer>
    </>
  );
}