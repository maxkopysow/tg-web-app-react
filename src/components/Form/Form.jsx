/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { Textbox, Radiobox, Checkbox, Select, Textarea } from 'react-inputs-validation';
import 'react-inputs-validation/lib/react-inputs-validation.min.css';
import React, {useCallback, useEffect, useState} from 'react';
import {useTelegram} from '../../hooks/useTelegram';
import { useValidation, useInput } from '../../hooks/useValidation';
import './Form.css';

const Form = () => {
   const FIO =  useInput('', {isEmpty:true ,isFIO:true}); 
   const email =  useInput('', {isEmpty:true ,isEmail:true});
   const companyName = useInput('', {isEmpty:true, isCompanyName:true});
   const companyINN = useInput('', {isEmpty:true, isCompanyINN:true});
   const phoneNumber = useInput('', {isEmpty:true, isPhoneNumber:true});
  
   const {tg, queryId, chatId, user} = useTelegram();
   
   const onSendData = useCallback(()=>{
      const data = {
         "queryId":queryId,
            "context": {
               "responsible_for_working_with_partners": [
                  "00000000-0000-0000-0000-000000000000"
               ],
               "email": [
                  {
                  "type": "main",
                  "email": "mail@example.com"
                  }
               ],
               "full_name": {
                  "lastname": "Иванов",
                  "middlename": "Сидорович",
                  "firstname": "Пётр1"
               },
               "company_name": "example",
               "company_inn": "9876543212",
               "nomer_telefona": "example",
               "phone_number": [
                  {
                  "type": "main",
                  "tel": "79120284114"
                  }
               ],
               "teg_telegram": "example",
               "vneshnii_polzovatel": [
                  "00000000-0000-0000-0000-000000000000"
               ],
               "e_mail": "kopysovmm@gmail.com",
               "__target": "example"
            }
          }
     
      fetch('http://158.160.14.193:3000/web-data', {  // Enter your IP address here
         headers:{"Content-Type":"application/json"},
         method: 'POST', 
         body: JSON.stringify(data) // body data type must match "Content-Type" header
      }
    ) 
   },[queryId]);
  
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
      if(!email.inputValid || !FIO.inputValid || !companyINN.inputValid || !companyName.inputValid ||!phoneNumber.inputValid ){
         tg.MainButton.hide();
      }else{
         tg.MainButton.show();
      }
   }, [email, FIO,companyINN,companyName,phoneNumber])


   return (
       <div className={'form'}>
            <h3>Введите ваши данные</h3>
            <h3>query {queryId}</h3>
            {/* <h3>{useTelegram.user?.username}</h3> */}
            <div className="input-container">
               <input 
                  className={'input'}
                  placeholder = "Введите ФИО " 
                  type="text" 
                  onChange = {e => FIO.onChange(e)}
                  onBlur = {e => FIO.onBlur(e)}
                  value={FIO.value}  
               />
            </div>  
            {(FIO.isDirty && FIO.FIOError) && <div style={{color:'red'}}>{ FIO.FIOErrorText}</div>}
            {(FIO.isDirty && FIO.isEmpty) && <div style={{color:'red'}}>{FIO.isEmptyText}</div>}    
                     
             <div className="input-container">
               <input 
                  className={'input'}
                  placeholder = "Введите название компании" 
                  type="text" 
                  onChange = {e => companyName.onChange(e)}
                  onBlur = {e => companyName.onBlur(e)}
                  value={companyName.value}  
               />
            </div>
            {(companyName.isDirty && companyName.companyNameError) && <div style={{color:'red'}}>{ companyName.companyNameErrorText}</div>}
            {(companyName.isDirty && companyName.isEmpty) && <div style={{color:'red'}}>{companyName.isEmptyText}</div>}    
           
            <div className="input-container">
               <input 
                  className={'input'}
                  placeholder = "Введите ИНН компании" 
                  type="text" 
                  onChange = {e => companyINN.onChange(e)}
                  onBlur = {e => companyINN.onBlur(e)}
                  value={companyINN.value}  
               />
            </div>
            {(companyINN.isDirty && companyINN.companyINNError) && <div style={{color:'red'}}>{ companyINN.companyINNErrorText}</div>}
            {(companyINN.isDirty && companyINN.isEmpty) && <div style={{color:'red'}}>{companyINN.isEmptyText}</div>}    
            <div className="input-container">
               <input 
                  className={'input'}
                  placeholder = "Введите email" 
                  type="text" 
                  onChange = {e => email.onChange(e)}
                  onBlur = {e => email.onBlur(e)}
                  value={email.value}  
               />
            </div>
            {(email.isDirty && email.emailError) && <div style={{color:'red'}}>{ email.emailErrorText}</div>}
            {(email.isDirty && email.isEmpty) && <div style={{color:'red'}}>{email.isEmptyText}</div>}    
            <div className="input-container">
               <input 
                  className={'input'}
                  placeholder = "Введите номер телефона" 
                  type="text" 
                  onChange = {e => phoneNumber.onChange(e)}
                  onBlur = {e => phoneNumber.onBlur(e)}
                  value={phoneNumber.value}  
               />
            </div>
            {(phoneNumber.isDirty && phoneNumber.phoneNumberError) && <div style={{color:'red'}}>{ email.phoneNumberErrorText}</div>}
            {(phoneNumber.isDirty && phoneNumber.isEmpty) && <div style={{color:'red'}}>{phoneNumber.isEmptyText}</div>}    
            
       </div>
    );
};
export default Form;