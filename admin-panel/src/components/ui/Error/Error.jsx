import {useRouteError} from "react-router-dom"
import Header from "../Header/Header.jsx";
import './Error.scss'
import classnames from "classnames";

export default function Error() {
    const error = useRouteError()

    return (
        <div className={classnames("errorPage")}>
            <Header/>
            <p className={classnames("errorText")}>К сожалению произошла ошибка</p>
            <p className={classnames("errorMessage")}>
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    )
}