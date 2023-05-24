import './App.scss'
import Header from "./components/Header/Header.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./components/Login/Login.jsx";
import MainPage from "./components/MainPage/MainPage.jsx";

function App() {

  return (
      <div className="app-wrapper">
        <Header/>
        <div className="app-wrapper-content">
            <MainPage/>
        </div>
      </div>
  )
}

export default App
