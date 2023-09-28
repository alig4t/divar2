import React from "react";
import NavBar from "../NavBar/NavBar";
import ActionNav from "../NavBar/ActionNav";
import BottomNavbar from "../NavBar/BottomNavbar";

const Layout = (props) => {
    return (
        <>
            <NavBar />
            <ActionNav />
            {props.children}
            <BottomNavbar />
        </>
    );
}

export default React.memo(Layout);