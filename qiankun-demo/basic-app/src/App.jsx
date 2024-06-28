import { useState } from 'react'

function App() {
  const [date, setDate] = new useState(Date.now() % 100000);
  return (
    <div>
      <h1 style={{fontSize: "32px", textAlign: "center"}}>主应用-{date}</h1>
      <div id='MICRO-APP-ONE'></div>
      <div id='MICRO-APP-TWO'></div>
    </div>
  )
}

export default App
