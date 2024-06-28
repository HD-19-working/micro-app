import jquery from "jquery"
import {useState, useEffect} from "react"

function App(props) {
  const {initialData} = window.$wujie?.props;

  const [basicAppAsyncData, setBasicAppAsyncData] = new useState({
    message: ""
  })
  useEffect(() => {
    const messageUpdateHandle = (message) => {
      console.log("trigger check");
      setBasicAppAsyncData({
        message,
      })
    }
    window.$wujie?.bus.$on("micro-app-two-message-update", messageUpdateHandle)
    return () => {
      window.$wujie?.bus.$off("micro-app-two-message-update", messageUpdateHandle);
    }
  }, [basicAppAsyncData])
  return (
    <div className="box"
         onClick={() => {
           window.$wujie?.bus.$emit("count-minus", 1);
         }}>
      <h2>Micro App Two</h2>
      <p>{initialData}</p>
      <p>{basicAppAsyncData.message}</p>
    </div>
  )
}

export default App
