import { useCallback, useEffect, useState } from 'react'
import WujieReact from "wujie-react";
import { bus } from "wujie";

function App() {
  const [loginState, setLoginState] = useState("");
  const [microAppOnePermission, setMicroAppOnePermission] = useState("");
  const [microAppTwoPermission, setMicroAppTwoPermission] = useState("");

  const getUserPermission = useCallback((userId) => {   // 发送请求获取用户权限
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if(userId === "user_1") {
          resolve({
            microAppOnePermission: "MICRO_APP_ONE_PERMISSION_TOKEN",
            microAppTwoPermission: ""
          });
        } else if (userId === "user_2") {
          resolve({
            microAppOnePermission: "",
            microAppTwoPermission: "MICRO_APP_TWO_PERMISSION_TOKEN"
          });
        }
      }, 500);
    })
  }, [])

  const loginHandle = useCallback(async (userId) => {   // 设置登录状态、用户权限
    localStorage.setItem("loginState", userId);
    setLoginState(userId);
    const {microAppOnePermission, microAppTwoPermission} = await getUserPermission(userId);
    setMicroAppOnePermission(microAppOnePermission);
    setMicroAppTwoPermission(microAppTwoPermission);
  }, [])

  const logoutHandle = useCallback(() => {    // 退出登录
    setLoginState("");
    localStorage.setItem("loginState", "");
    setMicroAppOnePermission("");
    setMicroAppTwoPermission("");
  }, [])

  useEffect(() => {
    const ls = localStorage.getItem("loginState");
    if(ls) {
      loginHandle(ls);
    }
    bus.$on("logout", logoutHandle)
  }, [])
  
  return (
    <div>
      <h1 style={{fontSize: "32px", textAlign: "center"}}>主应用</h1>
      {
        loginState && microAppOnePermission &&
        <WujieReact
          width="100%"
          height="100%"
          name="micro-app-one"
          url="http://localhost:5174/"
          sync={false}
          props={{
            loginState,
            permission: microAppOnePermission
          }}
        ></WujieReact>
      }
      {
        loginState && microAppTwoPermission &&
        <WujieReact
          width="100%"
          height="100%"
          name="micro-app-two"
          url="http://localhost:5175/"
          sync={false}
          props={{
            loginState,
            permission: microAppTwoPermission
          }}
        ></WujieReact>
      }
      {
        !loginState && 
        <div className='box'>
          <h1>登录模块</h1>
          <button onClick={() => {loginHandle("user_1")}}>用户1登录（有micro-app-one权限）</button>
          <button onClick={() => {loginHandle("user_2")}}>用户2登录（有micro-app-two权限）</button>
        </div>
      }
    </div>
  )
}

export default App
