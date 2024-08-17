import { useState } from "react"
import { sendReq } from "./utils/sendReq";
import CurrentMode from "./CurrentMode";

function App() {
  const [apiEndPoint, setApiEndPoint] = useState('')
  const [httpVerb, setHttpVerb] = useState('GET');
  const [bodyData, setBodyData] = useState(null);
  const [numReq, setNumReq] = useState('1')
  const [mode, setMode] = useState('normal')
  const [proxyMode, setProxyMode] = useState('normal')
  const [analytics, setAnalytics] = useState()
  const handleChangeMode = (modeValue) => {
    setMode(modeValue)
  }
  const handleSubmit = async (e) => {
    try {
      setAnalytics()
      e.preventDefault();
      if (!apiEndPoint || !httpVerb || !numReq) {

        alert('Please fill all the fields')
      }
      let d;
      if (!bodyData) {
        d = await sendReq(apiEndPoint, httpVerb, numReq, proxyMode)
      } else {
        d = await sendReq(apiEndPoint, httpVerb, numReq, proxyMode, bodyData)
      }
      //console.log(d)
      setAnalytics(d)
    }
    catch (e) {
      alert(e.message)
    }
  }
  return (
    <>
      <label htmlFor="proxyMode">ProxyMode:</label>
      <select name="proxyMode" id="proxyMode" value={proxyMode} onChange={(e) => setProxyMode(e.target.value)}>
        <option value="normal">Normal</option>
        <option value="ipSnoof">ip snoof bypass rateLimit</option>
      </select>
      <CurrentMode mode={mode} handleChangeMode={handleChangeMode} />
      <h2>CurrentMode:{mode}</h2>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '6vh'
      }}>
        <form onSubmit={handleSubmit}>
          <label htmlFor="numReq">Number of Request:</label>
          <input type="number" id="numReq" style={{ border: '1px solid black' }} value={numReq} onChange={(e) => setNumReq(e.target.value)} />
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '3vh' }}>
            <label htmlFor="httpVerb">Enter HTTP Verb:</label>
            <select name="httpVerb" style={{ border: '1px solid black' }} id="httpVerb" value={httpVerb} onChange={(e) => setHttpVerb(e.target.value)}>
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
            </select>
            <label htmlFor="apiEndPoint">Enter API End Point:</label>
            <input type="text" id="apiEndPoint" style={{ border: '1px solid black', width: '60%' }} value={apiEndPoint} onChange={(e) => setApiEndPoint(e.target.value)} />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', marginTop: '3vh' }}>
            <label htmlFor="bodyData">Enter Body Data:</label>
            <textarea style={{ width: '50vw', height: '20vh', border: '1px solid black' }} name="bodyData" id="bodyData" value={bodyData} onChange={(e) => setBodyData(e.target.value)} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '5vh' }}>
            <button type="submit">Send Request</button>
          </div>
        </form>
      </div>
      <div>
        {
          analytics && (
            <>
              <p><strong>Total Requests: </strong>{analytics.totalRequests}</p>
              <p> <strong>Successful Requests: </strong>{analytics.successfulRequests}</p>
              <p><strong>Time Taken: </strong>{analytics.timeTaken} seconds</p>
              <p><strong>Failed Requests: </strong>{analytics.failedRequests}</p>
            </>
          )

        }
      </div>
    </>
  )
}

export default App;
