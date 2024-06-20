import React, { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "components/Navbar";
import Sidebar from "components/Sidebar";

const Layout = () => {
    const isNonMobile = useMediaQuery("(min-width: 500px)");
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <Box display={isNonMobile ? "flex" : "block"} width="100vw" height="100vh" overflow="hidden">
            <Sidebar
                isNonMobile={isNonMobile}
                drawerWidth="200px"
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
            />
            <Box flexGrow={1} overflow="auto">
                <Navbar
                    isSidebarOpen={isSidebarOpen}
                    setIsSidebarOpen={setIsSidebarOpen}
                />
                <Outlet />
            </Box>
        </Box>
    );
};

export default Layout;
