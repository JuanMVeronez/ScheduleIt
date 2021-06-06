import styled from 'styled-components';

export const RegisterContainer = styled.div`
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
`;

export const RegisterContent = styled.div`
    width: 100%;
    max-width: 350px;
    margin: 2rem;
    padding: 1.5rem 3rem;
    background-color: #fafafa;
    border-radius: 10px;

    h2 {
        color: #e17055;
        font-weight: 700;
        font-size: 2rem;
        display: inline-block;
    }

    p {
        color: #666666;
        margin: 0.5rem 0 1rem 0;
    }
`;

export const RegisterForm = styled.form`
    display: flex;
    flex-direction: column;

    label {
        font-size: 1.2rem;
        color: #666666;
        padding-top: 1rem; 
        padding-bottom: 0.5rem;
    }

    input {
        border: 1px solid #88888899;
        border-radius: 6px;
        
        color: #444444;
        padding: 0.5rem 0 0.5rem 0.5rem;
    }

    input:focus {
        border-color:  #e1705588;
    }

    button {

        margin: 3.5rem auto 0 auto;
        padding: 0.8rem 4rem;
        border: 1px solid;
        border-radius: 5px;
        
        color: #f9f9f9;
        font-weight: bold;
        font-size: 1.1rem;

        background-color: #e17055dd;

        transition: background-color 0.5s;
    }

    button:hover {
        cursor: pointer;
        background-color: #e17055 
    }

    p {
        font-size: 0.9rem;
        color: #444444;

        a {
            text-decoration: none;
            color: #e17055;
        }

        a:hover{
            text-decoration: underline;
        }
    }

    p:last-child {
        text-align: center;
    }
`;

export const BackLoginButton = styled.button`
    background-color: #e17055dd;
    border: none;
    padding: 0.2rem;
    border-radius: 0.8rem;
    vertical-align: super;
    margin-right: 1rem;

    cursor: pointer;

    transition: background-color 0.5s;

    &:hover {
        background-color: #e17055;
    }
`;