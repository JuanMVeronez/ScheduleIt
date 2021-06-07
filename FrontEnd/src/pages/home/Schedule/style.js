import styled from 'styled-components';

export const HeaderSchedule = styled.header`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 0 20px 0 20px;
    vertical-align: center;

    

    div {
        display: flex;
        margin: 10px 0;

        svg {
            width: 80px;
            height: 80px;
        }

        h2 {
            margin: auto 0 auto 0.7rem;
            font-size: 2rem;
            height: 2rem;
            color: #e17055;
            font-weight: 600;
        }
    }

    p {
        margin: auto 0;

        span {
            color: #e17055dd;
            font-weight: 600;
        }
    }

    button {
        
        border: 1px solid;
        border-radius: 5px;
        height: fit-content;
        vertical-align: middle;
        color: #f9f9f9;
        font-weight: bold;
        font-size: 1.1rem;
        padding: 1rem 2rem;
        margin: auto 0;

        background-color: #e17055dd;
    
        &:hover {
            cursor: pointer;
            background-color: #e17055;
        }
    }


`;