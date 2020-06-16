const axios = require("axios");

export const URL = "https://intense-sea-52184.herokuapp.com";


const errorRedirect = (error) => {
    window.location.href = "/error"
}

export const getChatMessages = async () =>{
    try{
       let data = await axios.get(`${URL}/v1/api/chat/messages`);
       return data.data;
    }catch(error){
        console.error("getChatMessages error: " + error);
        return errorRedirect(error);
    }
}

export const joinChat = async(userData) => {
    try{
        debugger
        let data = await axios.post(`${URL}/v1/api/login/joinChat`, userData);
        return data.data;
    } catch(error){
        console.error("joinChat error: " + error);
        return errorRedirect(error);
    }
}

export const sendNewMessage = async (newMessage) =>{
    try{
       let data = await axios.post(`${URL}/v1/api/chat/send`,newMessage);
       return data.data;
    }catch(error){
        console.error("sendNewMessage error: " + error)
        return errorRedirect(error);
    }
}
