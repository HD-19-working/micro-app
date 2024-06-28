import { useEffect, useState } from 'react'
import WujieReact from "wujie-react";
import { bus } from "wujie";

function App() {
  const [date, setDate] = new useState(Date.now() % 100000);
  const [count, setCount] = new useState(0);

  useEffect(() => {
    const countPlusHanlde = (num) => {
      setCount(count + Number(num))
    }
    bus.$on("count-plus", countPlusHanlde)
    return () => {
      bus.$off("count-plus", countPlusHanlde);
    }
  }, [count])

  useEffect(() => {
    const countMinusHanlde = (num) => {
      setCount(count - Number(num))
    }
    bus.$on("count-minus", countMinusHanlde)
    return () => {
      bus.$off("count-minus", countMinusHanlde);
    }
  }, [count])
  
  return (
    <div>
      <h1 style={{fontSize: "32px", textAlign: "center"}}>主应用-{date}</h1>
      <div className='box'>
        <button onClick={() => {  
          bus.$emit("micro-app-one-message-update", "micro app one message from basic app")
          bus.$emit("micro-app-two-message-update", "micro app two message from basic app")
        }}>发送动态消息</button>
        <span>count: {count}</span>
      </div>
      {/* http://localhost:5177/ 修改为实际项目的运行url */}
      <WujieReact
        width="100%"
        height="100%"
        name="micro-app-one"
        url="http://localhost:5177/"
        sync={false}
        props={{
          initialData: "micro app one initial data"
        }}
        beforeLoad={() => {console.log("micro-app-one 开始加载之前")}}
        beforeMount={() => {console.log("micro-app-one 加载完毕，但还未挂载到主应用")}}
        afterMount={() => {console.log("micro-app-one 已经挂载到主应用")}}
        beforeUnmount={() => {console.log("micro-app-one 卸载之前")}}
        afterUnmount={() => {console.log("micro-app-one 已经卸载")}}
      ></WujieReact>

      {/* http://localhost:5178/ 修改为实际项目的运行url */}
      <WujieReact
        width="100%"
        height="100%"
        name="micro-app-two"
        url="http://localhost:5178/"
        sync={false}
        props={{
          initialData: "micro app two initial data"
        }}
        beforeLoad={() => {console.log("micro-app-two 开始加载之前")}}
        beforeMount={() => {console.log("micro-app-two 加载完毕，但还未挂载到主应用")}}
        afterMount={() => {console.log("micro-app-two 已经挂载到主应用")}}
        beforeUnmount={() => {console.log("micro-app-two 卸载之前")}}
        afterUnmount={() => {console.log("micro-app-two 已经卸载")}}
      ></WujieReact>
    </div>
  )
}

export default App
