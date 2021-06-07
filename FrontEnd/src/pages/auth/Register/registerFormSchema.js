import * as yup from 'yup';
import {toast} from 'react-toastify';

const validatedSchema = yup.object().shape({
    name: yup.string()
        .matches(/^[A-Za-zÀ-ÿ]+$/)
        .required(() => toast('Digite seu nome sem espaços')),
    lastName: yup.string()
    .matches(/^[A-Za-zÀ-ÿ]+$/)
    .required(() => toast('Digite seu sobrenome sem espaços')),
    email: yup.string(),
    password: yup.string()
        .min(8)
        .required(),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password'), null], () => toast.error('As senhas precisam ser iguais', {
            toastId: 'only two',
            autoClose: 10000,
        }))
        .required(() => toast.error('Comfirme sua senha'))
});

export default validatedSchema