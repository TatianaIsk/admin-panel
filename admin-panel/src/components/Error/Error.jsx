import {useRouteError} from "react-router-dom"
import Header from "../Header/Header.jsx";
import './Error.scss'

export default function Error() {
    const error = useRouteError()

    return (
        <div className="errorPage">
            <Header/>
            <p className="errorText">К сожалению произошла ошибка</p>
            <p className="errorMessage">
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    )
}