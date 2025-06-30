import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function AppLayout() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/");
        }
    }, [navigate]);
    
    return (
        <div className="min-h-screen bg-white p-4">
            <header className="mb-4 border-b pb-2 font-semibold text-xl">
                MyTask Mngr
            </header>
            <Outlet />
        </div>
    );
}
