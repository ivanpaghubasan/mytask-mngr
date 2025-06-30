import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function PublicLayout() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate('/tasks');
        }
    }, [navigate])
    
    return (
        <div className="min-h-screen bg-gray-100">
            <Outlet />
        </div>
    );
}
