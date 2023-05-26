import  './MainPage.scss'
import Header from "../Header/Header.jsx";
import Menu from "../Menu/Menu.jsx";

const MainPage = () => {

    return (
        <>
            <Header/>
            <Menu/>
            <div className="wrapper">
                <h2 className="mainTitle">M-Social</h2>
                <h3>Добро пожаловать в админ-панель M-Social!</h3>
                <p>Используйте боковое меню, чтобы перейти к нужному разделу</p>
            </div>
        </>
    )
}

export default MainPage

