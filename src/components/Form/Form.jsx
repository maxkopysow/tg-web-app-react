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
  
   const {tg,user} = useTelegram();

   const onSendData = useCallback(()=>{
      var fullName = FIO.value.split(' ');
      const data = {
         "userName": user?.username,
         "firstname": fullName[0],
         "middlename":fullName[1],
         "lastname": fullName[2],
         "email": email.value,
         "companyName":companyName.value,
         "companyINN":companyINN.value,
         "phoneNumber":phoneNumber.value,
      }
    tg.sendData(JSON.stringify(data));
    tg.close();    
   },[tg,FIO, email, companyINN,companyName,phoneNumber]);
  
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

   const id = tg.initDataUnsafe?.chat?.id;
   return (
       <div className={'form'}>
            <h3>Введите ваши данные</h3>
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