import {gsap} from "gsap"
import {useState, useEffect} from "react"

function App(props) {
  const {initialData} = window.$wujie?.props;

  const [basicAppAsyncData, setBasicAppAsyncData] = new useState({
    message: ""
  })

  useEffect(() => {
    const messageUpdateHandle = (message) => {
      setBasicAppAsyncData({
        message,
      })
    }
    window.$wujie?.bus.$on("micro-app-one-message-update", messageUpdateHandle)
    return () => {
      window.$wujie?.bus.$off("micro-app-one-message-update", messageUpdateHandle);
    }
  }, [basicAppAsyncData])

  return (
    <div className="box"
         onClick={() => {
           window.$wujie?.bus.$emit("count-plus", 1);
         }}>
      <h2>Micro App One</h2>
      <p>{initialData}</p>
      <p>{basicAppAsyncData.message}</p>
    </div>
  )
}

export default App
