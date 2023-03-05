import React, { useReducer } from "react";
import { Routes, Route } from "react-router-dom";
import Chat from "./components/chat/Chat";
import Join from "./components/join/Join";
import { appReducer } from "./reducer/appReducer";

function App() {

  const [ state, dispatch ] = useReducer( appReducer, {
    user: null
  } );

  return (

    <div className="App">
      
      <Routes>
        <Route index element={<Join state={state} dispatch={dispatch}/>}/>
        <Route path="/chat" element={<Chat state={state} dispatch={dispatch}/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
