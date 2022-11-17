/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { Textbox, Radiobox, Checkbox, Select, Textarea } from 'react-inputs-validation';
import 'react-inputs-validation/lib/react-inputs-validation.min.css';
import React, {useCallback, useEffect, useState} from 'react';
import { useTelegram, tg, user } from '../../hooks/useTelegram';
import './Form.css';

const useValidation =(value,validations) =>{
  const [isEmpty,setEmpty] = useState(true);
  const [minLengthError, setMinLengthError] = useState(false);
  const [maxLengthError, setMaxLengthError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [inputValid, setInputValid] = useState(false);
  const isEmptyText = "Поле не может быть пустым";
//   const minLengthErrorText = "Значение поля должно быть больше"+ validations[validation];
//   const maxLengthErrorText = "Значение поля должно быть меньше " + validations[validation];
  const emailErrorText = "Некорректно введен email";
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
               const re =/^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;
               re.test(String(value).toLowerCase()) ? setEmailError(false) : setEmailError(true)
               break;
            case 'isFIO':
               value ? setEmpty(false): setEmpty(true)
               break;
             default:
               break;
         }
      }

   },[value])
   
   useEffect ( ()=>{
      if(isEmpty || maxLengthError || minLengthError || emailError){
         setInputValid(false);
      }else{
         setInputValid(true);
      }

   },[isEmpty, maxLengthError,minLengthError,emailError])


   return {
      isEmpty,
      minLengthError,
      maxLengthError,
      emailError,
      inputValid,
      isEmptyText,
      emailErrorText,
      
   }
}


const useInput = (InitialValue, validations) => {
   const [value,setValue] = useState(InitialValue);
   const [isDirty, setDirty] = useState(false);
   const valid =   useValidation(value,validations)
   const onChange = () =>{
      setValue(e.target.value);

   } 
   const onBlur = () =>{
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

   
   
   const email =  useInput('', {isEmpty:true , minLength:3, isEmail:true});
   const FIO =  useInput('', {isEmpty:true , minLength:3, isFIO:true});
   const  queryId = 1;


   // const [phoneNumber, setPhoneNumber] = useState('');
   // const {tg, queryId, chatId, user} = useTelegram();
   const inputValues = [FIO, email];
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
      // if(!FIO.inputValid || !companyName || !companyINN
      // || !email || !phoneNumber){
      //       tg.MainButton.hide();
      //    }else{
      //       tg.MainButton.show();
      //    }
      for (const val in inputValues){
         // if(!val.inputValid){
         //    tg.MainButton.hide();
         // }else{
         //    tg.MainButton.show();
         // }
      }
   }, [inputValues])

   




   // const onChangeFIO = (e) => {
   //    if(e.target.value)
   //    setFIO(e.target.value);
   // }

   return (
       <div className={'form'}>
            <h3>Введите ваши данные</h3>
            <h3>query {queryId}</h3>
            {/* <h3>{useTelegram.user?.username}</h3> */}
           {/* <div className="input-container">           
              
               <Textbox
                  name='FIO' 
                  className={'input'} 
                  type="text" 
                  value={FIO.value}
                  onChange = {e => FIO.onChange(e)}
                  onBlur = {e => FIO.onBlur(e)}
               />
               <label className={FIO && 'filled'}>
                     {'ФИО'}
               </label>
            </div> */}

            {/* <div className="input-container">
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
            </div> */}
            {(email.isDirty && email.emailError) && <div style={{color:'red'}}> email.emailErrorText</div>}
            {(email.isDirty && email.isEmpty) && <div style={{color:'red'}}>email.isEmptyText</div>}
            
            <div className="input-container">
               <input 
                  className={'input'}
                  placeholder = "Email" 
                  type="text" 
                  onChange = {Element => email.onChange(Element)}
                  onBlur = {Element => email.onBlur(Element)}
                  value={email.value}
                  
               />
            </div>
            {/* <div className="input-container">
               <input 
                  className={'input'} 
                  type="text" 
                  value={phoneNumber}
                  onChange = {onChangePhoneNumber}
               />
               <label className={phoneNumber && 'filled'}>
                     {'Номер телефона'}
               </label>
            </div> */}
       </div>
    );
};
export default Form;