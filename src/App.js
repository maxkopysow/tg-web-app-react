/* eslint-disable react/jsx-no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import './App.css';
import { useTelegram } from './hooks/useTelegram';
import Header from './components/Header/Header';
import Form from './components/Form/Form';
import './components/Button/Button.css';
function App() {
  const {tg} = useTelegram();


  useEffect(() => {
    tg.ready();
  },[])

  
  return (
    <div className="App">
      <Header />
      <Form />
    </div>
  );
}

export default App;
