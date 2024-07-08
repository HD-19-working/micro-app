import {useState, useEffect, useCallback} from "react"

function App(props) {
  const { loginState, permission } = window.$wujie?.props || "";

  const [data, setData] = useState();

  const getData = useCallback(() => {   // 发送请求获取数据（需要携带loginState, permission验证是否有权限）
    return new Promise((resolve) => {
      setTimeout(() => {
        if(loginState && permission) {
          resolve({
            data: "micro app two data",
            msg: "ok"
          })
        } else {
          resolve({
            data: "",
            msg: "not allowed"
          })
        }
      }, 500)
    })
  }, [loginState, permission])

  useEffect(() => {
    getData().then(res => {
      setData(res.data);
    });
  }, [])

  return (
    <div className="box">
      <h2>Micro App Two</h2>
      <p>{data}</p>
      <button
        className="btn"
        onClick={() => {
          window.$wujie?.bus.$emit("logout");
        }}>
        退出登录
      </button>
    </div>
  )
}

export default App
