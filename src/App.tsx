import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./styles/App.scss";
import Sidebar from "./components/sidebar/Sidebar";
import StreamRoute from "./routes/stream/StreamRoute";
import LoginRoute from "./routes/login/LoginRoute";
import RouteContainer from "./routes/RouteContainer";

function App() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        return () => {
            setIsMounted(false);
        };
    }, []);

    return (
        <div className="color-theme-glocomx mont-font">
            {!isMounted && <div className="preloader"></div>}

            <div className="main-wrapper">
                <RouteContainer />
            </div>
        </div>
    );
}

export default App;
