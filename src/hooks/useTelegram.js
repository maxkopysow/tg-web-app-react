/* eslint-disable no-unused-vars */
const tg = window.Telegram.WebApp;

export function useTelegram(){
    const onClose = () =>{
        tg.close();
      }
      const onOpen = () =>{
        tg.MainButton.show();
      }
      const onToggleButton = () =>{
        if(tg.MainButton.isVisible){
            tg.MainButton.hide();
        }else{
            tg.MainButton.show();
        }
      }
    return{
        onClose,
        onToggleButton,
        tg,
        user: tg.initDataUnsafe?.user,
        queryId:tg.initDataUnsafe?.query_id,
        chatId:tg.initDataUnsafe?.chat?.id
}

}