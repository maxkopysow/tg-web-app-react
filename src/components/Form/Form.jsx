/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, {useCallback, useEffect, useState} from 'react';
import { useTelegram } from '../../hooks/useTelegram';
import './Form.css';

const Form = () => {
   const [FIO, setFIO] = useState('');
   const [companyName, setCompanyName] = useState('');
   const [companyINN, setCompanyINN] = useState('');
   const [email, setEmail] = useState('');
   const [phoneNumber, setPhoneNumber] = useState('');
   const {tg, queryId, chatId} = useTelegram();

   const onSendData = useCallback(()=>{
      const data = {
         queryId,
         chatId,
         FIO,
         companyName,
         companyINN,
         email,
         phoneNumber
      }

      fetch('http://158.160.17.3:3000',{
         method:'POST',
         headers:{
            'Content-Type':'application/json',

         },
         body: JSON.stringify(data)
      })
   },[queryId,chatId, FIO, companyName, companyINN, email, phoneNumber ])


   useEffect(() => {
      tg.onEvent('mainButtonClicked',onSendData);
      return ()=>{
         tg.offEvent('mainButtonClicked',onSendData);
      }
   }, [onSendData])

   useEffect(() => {
         tg.MainButton.setParams({
               text:'Зарегистрироваться'
         })
   }, [])

   useEffect(() =>{
      if(!FIO || !companyName || !companyINN
      || !email || !phoneNumber){
            tg.MainButton.hide();
         }else{
            tg.MainButton.show();
         }
   }, [FIO,companyName,companyINN,email,phoneNumber])

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
            
           <div className="input-container">           
               <input 
                  className={'input'} 
                  type="text" 
                  value={FIO}
                  onChange = {onChangeFIO}
               />
               <label className={FIO && 'filled'}>
                     {'ФИО'}
               </label>
            </div>

            <div className="input-container">
               <input 
                  className={'input'} 
                  type="text" 
                  value={companyName}
                  onChange = {onChangeCompanyName}
               />
               <label className={companyName && 'filled'}>
                     {'Наименование компании'}
               </label>
            </div>
            <div className="input-container">
               <input 
                     className={'input'} 
                     type="text" 
                     value={companyINN}
                     onChange = {onChangeCompanyINN}
                  />
               <label className={companyINN && 'filled'}>
                     {'ИНН компании'}
               </label>
            </div>
            <div className="input-container">
               <input 
                  className={'input'} 
                  type="text" 
                  value={email}
                  onChange = {onChangeEmail}
               />
               <label className={email && 'filled'}>
                     {'Email'}
               </label>
            </div>
            <div className="input-container">
               <input 
                  className={'input'} 
                  type="text" 
                  value={phoneNumber}
                  onChange = {onChangePhoneNumber}
               />
               <label className={phoneNumber && 'filled'}>
                     {'Номер телефона'}
               </label>
            </div>
       </div>
    );
};
export default Form;