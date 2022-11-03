/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react';
import { useTelegram } from '../../hooks/useTelegram';
import './Form.css';

const Form = () => {
   const [FIO, setFIO] = useState('');
   const [companyName, setCompanyName] = useState('');
   const [companyINN, setCompanyINN] = useState('');
   const [email, setEmail] = useState('');
   const [phoneNumber, setPhoneNumber] = useState('');
   const {tg} = useTelegram();

   useEffect(() => {
         tg.MainButton.setParams({
               text:'Зарегистрироваться'
         })
   }, [])

   useEffect(() =>{
      if(companyName){
            tg.MainButton.hide();
         }else{
            tg.MainButton.show();
         }
   }, [])
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
      setEmail(e.target.value);
   }
   const onChangePhoneNumber = (e) => {
      setPhoneNumber(e.target.value);
   }
   return (
       <div className={'form'}>
            <h3>Введите ваши данные</h3>
            <input 
               className={'input'} 
               type="text" 
               placeholder={'Фамилия имя отчество'}
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
               placeholder={'Email'}
               value={email}
               onChange = {onChangeEmail}
            />
            <input 
               className={'input'} 
               type="text" 
               placeholder={'Номер телефона'}
               value={phoneNumber}
               onChange = {onChangePhoneNumber}
            />
       </div>
    );
};
export default Form;