import {useEffect, useState} from 'react';

const regEmail =/^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,64}[A-Za-z0-9])?)*$/;
const regFIO = /^[^*-]*$/;   
const regCompanyName = /^[^*-]*$/;   
const regINN = /^[\d+]{10,12}$/;
const regPhoneNumber = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;


export const useValidation =(value,validations) =>{
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
  
     },[validations, value])
     
     useEffect ( ()=>{
        if(isEmpty || emailError || FIOError|| companyINNError|| companyNameError|| phoneNumberError){
           setInputValid(false);
        }else{
           setInputValid(true);
        }
  
     },[isEmpty, maxLengthError,minLengthError,emailError, FIOError, companyINNError, companyNameError, phoneNumberError])
  
  
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
 export const useInput = (InitialValue, validations) => {
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
  