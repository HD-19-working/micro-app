import {gsap} from "gsap"

function App(props) {
  const {mainAppProps} = props;
  
  return (
    <div style={{border: "2px solid #1c1c1c", 
                 height: "300px", 
                 display: "flex", 
                 flexDirection: "column",
                 justifyContent: "center", 
                 alignItems: "center", 
                 fontSize: "26px"}}>
      <h2>Micro App One</h2>
      <p>{mainAppProps.msg}</p>
    </div>
  )
}

export default App
