import axios from "axios";

export const sendReq = async (url,method,numReq,proxyMode,payLoad={}) => {
     console.log(url,method,numReq,proxyMode,payLoad)
    // console.log(typeof payLoad)
    const config = {
        url,
        method: method,
        headers: {
            'Content-Type': 'application/json',
          },
        data: payLoad,
    };
    try {
        const {data}=await axios.post('http://localhost:8000',{config,numReq,proxyMode})
        console.log(data)
    } catch (error) {
        console.log(error)
    }
}