import React from "react";
import NavBar from "../NavBar/NavBar";
import ActionNav from "../NavBar/ActionNav";

const Layout = (props) => {
    console.log("Layout Render");
    return (
        <>
            
             <NavBar />
             <ActionNav />
            {props.children}
        </>
    );
}

export default React.memo(Layout);