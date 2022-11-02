/* eslint-disable react/jsx-no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import './App.css';
import { useTelegram } from './hooks/useTelegram';
import Header from './components/Header/Header';
import Form from './components/Form/Form';
function App() {
  const {onToggleButton, tg} = useTelegram();


  useEffect(() => {
    tg.ready();
    tg.MainButton.show();
    tg.MainButton.text ='Зарегистрироваться';
  },[])

  
  return (
    <div className="App">
      <Header />
      <Form />
      <button onClick={onToggleButton}>toggle</button> 
    </div>
  );
}

export default App;
