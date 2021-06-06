import React, {useContext} from 'react';
import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet-async';
import { MdKeyboardArrowLeft } from 'react-icons/md';


import {yupResolver} from '@hookform/resolvers/yup';

import validatedSchema from './registerFormSchema';
import history from '../../../history';
import {Context} from '../../../Context/AuthContext';
import { 
  RegisterContainer, 
  RegisterContent , 
  RegisterForm,
  BackLoginButton,
} from './style';

export default function Login() {
  const {handleRegister} = useContext(Context);
  
  const { handleSubmit, register, reset } = useForm({
    resolver: yupResolver(validatedSchema)
  })

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
          <RegisterForm onSubmit={handleSubmit(handleRegister)} onReset={reset}>    
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
            <span> * A senha deve ter pelo menos 8 dígitos</span>

            <label htmlFor="confirmPassword">Confirmar senha</label>
            <input 
              {...register('confirmPassword')}
              id="confirmPassword"
              name="confirmPassword"
              type="password"
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