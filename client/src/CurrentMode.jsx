import axios from "axios";
import { useEffect } from "react";

const CurrentMode = ({ mode, handleChangeMode }) => {
    useEffect(()=>{
      const setCurrentMode=async()=>{
        const {data}=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/set-current-mode`,{mode})
        console.log("current mode respone",data);
      }
      setCurrentMode();
    },[mode])
    return (
        <>
        <label htmlFor="serverMode">serverMode:</label>
            <select name='mode' id='mode' value={mode} onChange={(e) => handleChangeMode(e.target.value)}>
                <option value="normal">Normal</option>
                <option value="rateLimit">RateLimiting</option>
                <option value="throttling">Throttling</option>
            </select>
        </>
    )
}

export default CurrentMode;
