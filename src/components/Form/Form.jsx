import React from 'react';
import { useTelegram } from '../../hooks/useTelegram';
import './Form.css';

const Form = (props) => {
   const {user} = useTelegram();
    return (
       <div className={'form'}>
            <h3>Введите ваши данные</h3>
            <input 
               className={'input'} 
               type="text" 
               placeholder={'ФИО'}
            />
            <input 
               className={'input'} 
               type="text" 
               placeholder={'Наименование компании'}
            />
            <input 
               className={'input'} 
               type="text" 
               placeholder={'ИНН компании'}
            />
            <input 
               className={'input'} 
               type="text" 
               placeholder={'e-mail'}
            />
            <input 
               className={'input'} 
               type="text" 
               placeholder={'номер телефона'}
            />
       </div>
    );
};
export default Form;