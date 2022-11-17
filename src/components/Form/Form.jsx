/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { Textbox, Radiobox, Checkbox, Select, Textarea } from 'react-inputs-validation';
import 'react-inputs-validation/lib/react-inputs-validation.min.css';
import React, {useCallback, useEffect, useState} from 'react';
import { useTelegram} from '../../hooks/useTelegram';
import './Form.css';

const useValidation =(value,validations) =>{
  const [isEmpty,setEmpty] = useState(true);
  const [minLengthError, setMinLengthError] = useState(false);
  const [maxLengthError, setMaxLengthError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [FIOError, setFIOError] = useState(false);
  const [companyNameError, setCompanyNameError] = useState(false);
  const [companyINNError, setCompanyINNError] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState(false);
  const [inputValid, setInputValid] = useState(false);

  const isEmptyText = "Поле не может быть пустым";
  const emailErrorText = "Некорректно введен email";
  const FIOErrorText = "Некорректно введено ФИО";
  const companyNameErrorText ="Некорректно введено название компании";
  const companyINNErrorText = "Некорректно введен ИНН";
  const phoneNumberErrorText = "Некорректно введен номер телефона";;
  
  
  const regEmail =/^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,64}[A-Za-z0-9])?)*$/;
  const regFIO = /^[^*-]*$/;   
  const regCompanyName = /^[^*-]*$/;   
  const regINN = /^[\d+]{10,12}$/;
  const regPhoneNumber = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
  
  useEffect(()=>{
      for(const validation in validations){
          switch(validation){
            case 'minLength':
               value.length < validations[validation] ? setMinLengthError(true): setMinLengthError(false)
               break;
            case 'maxLength':
               value.length > validations[validation] ? setMaxLengthError(true): setMaxLengthError(false)
               break;
            case 'isEmpty':
               value ? setEmpty(false): setEmpty(true)
               break;
            case 'isEmail':
               regEmail.test(String(value).toLowerCase()) ? setEmailError(false) : setEmailError(true)
               break;
            case 'isFIO':
               regFIO.test(String(value).toLowerCase()) ? setFIOError(false): setFIOError(true)
               break;
            case 'isCompanyName':
               regCompanyName.test(String(value).toLowerCase()) ? setCompanyNameError(false): setCompanyNameError(true)
               break;
            case 'isCompanyINN':
               regINN.test(String(value).toLowerCase()) ? setCompanyINNError(false): setCompanyINNError(true)
               break;
            case 'isPhoneNumber':
               regPhoneNumber.test(String(value).toLowerCase()) ? setPhoneNumberError(false): setPhoneNumberError(true)
               break;
             default:
               break;
         }
      }

   },[value])
   
   useEffect ( ()=>{
      if(isEmpty || emailError){
         setInputValid(false);
      }else{
         setInputValid(true);
      }

   },[isEmpty, maxLengthError,minLengthError,emailError])


   return {
      inputValid,
      isEmpty,
      minLengthError,
      maxLengthError,
      FIOError,
      emailError,
      companyNameError,
      companyINNError,
      phoneNumberError,
      FIOErrorText,
      isEmptyText,
      emailErrorText,
      companyNameErrorText,
      companyINNErrorText,
      phoneNumberErrorText,
   }
}


const useInput = (InitialValue, validations) => {
   const [value,setValue] = useState(InitialValue);
   const [isDirty, setDirty] = useState(false);
   const valid =   useValidation(value,validations)
   const onChange = (e) =>{
      setValue(e.target.value);
   } 
   const onBlur = (e) =>{
      setDirty(true);
      
   } 
   return {
      value,
      onChange,
      onBlur,
      isDirty,
      ...valid
   }
}



const Form = () => {
   
   const FIO =  useInput('', {isEmpty:true ,isFIO:true}); 
   const email =  useInput('', {isEmpty:true ,isEmail:true});
   const companyName = useInput('', {isEmpty:true, isCompanyName:true});
   const companyINN = useInput('', {isEmpty:true, isCompanyINN:true});
   const phoneNumber = useInput('', {isEmpty:true, isPhoneNumber:true});
  
   const {tg, queryId, chatId, user} = useTelegram();
   const inputValues = [FIO, email, companyName,companyINN, phoneNumber];
   // const onSendData = useCallback(()=>{
   
   //    const data = {
   //       "queryId":queryId,
   //    }
   
   //    fetch('http://158.160.14.193:3000/web-data', {  // Enter your IP address here
   //    headers:{"Content-Type":"application/json"},
   //    method: 'POST', 
   //    mode: 'cors', 
   //    body: JSON.stringify(data) // body data type must match "Content-Type" header
   //  })
   
   
   // },[queryId]);
   // useEffect(() => {
   //    tg.onEvent('mainButtonClicked',onSendData);
   //    return ()=>{
   //       tg.offEvent('mainButtonClicked',onSendData);
   //    }
   // }, [onSendData])
   // useEffect(() => {
   //       tg.MainButton.setParams({
   //             text:'Зарегистрироваться'
   //       })
   // }, [])




   useEffect(() =>{
      if(!inputValid){
         tg.MainButton.hide();
      }else{
         tg.MainButton.show();
      }
   }, [inputValid])

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