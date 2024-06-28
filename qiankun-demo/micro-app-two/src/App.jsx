import jquery from "jquery"

function App(props) {
  const {mainAppProps} = props;

  return (
    <div style={{border: "2px solid #1c1c1c", 
                 height: "300px", 
                 display: "flex",
                 flexDirection: "column",
                 justifyContent: "center", 
                 alignItems: "center", 
                 background: "rgba(0,0,0,0.1)",
                 fontSize: "26px"}}>
      <h2>Micro App Two</h2>
      <p>{mainAppProps.msg}</p>
    </div>
  )
}

export default App
