/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from 'react';
import { useTelegram } from './hooks/useTelegram';
import './Form.css';

const Form = (props) => {
   const {user} = useTelegram();
    
   const [FIO, setFIO] = useState('');
   const [companyName, setCompanyName] = useState('');
   const [companyINN, setCompanyINN] = useState('');
   const [email, setEmail] = useState('');
   const [phoneNumber, setPhoneNumber] = useState('');
   
   const onChangeFIO = (e) => {
      setFIO(e.target.value);
   }
   const onChangeCompanyName = (e) => {
      setCompanyName(e.target.value);
   }
   const onChangeCompanyINN = (e) => {
      setCompanyINN(e.target.value);
   }
   const onChangeEmail = (e) => {
      setCompanyEmail(e.target.value);
   }
   const onChangePhoneNumber = (e) => {
      setCompanyPhoneNumber(e.target.value);
   }
   return (
       <div className={'form'}>
            <h3>Введите ваши данные</h3>
            <input 
               className={'input'} 
               type="text" 
               placeholder={'ФИО'}
               value={FIO}
               onChange = {onChangeFIO}
            />
            <input 
               className={'input'} 
               type="text" 
               placeholder={'Наименование компании'}
               value={companyName}
               onChange = {onChangeCompanyName}
            />
            <input 
               className={'input'} 
               type="text" 
               placeholder={'ИНН компании'}
               value={companyINN}
               onChange = {onChangeCompanyINN}
            />
            <input 
               className={'input'} 
               type="text" 
               placeholder={'e-mail'}
               value={email}
               onChange = {onChangeEmail}
            />
            <input 
               className={'input'} 
               type="text" 
               placeholder={'номер телефона'}
               value={phoneNumber}
               onChange = {onChangePhoneNumber}
            />
       </div>
    );
};
export default Form;