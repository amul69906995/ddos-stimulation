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
        const {data}=await axios.post(`${import.meta.env.VITE_BACKEND_URL}`,{config,numReq,proxyMode})
        return data
    } catch (error) {
        throw new Error(error)
    }
}