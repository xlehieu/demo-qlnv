import React, { Fragment } from 'react';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    return (
        <Fragment>
            {/* Main Content */}
            <div className="flex-1 flex flex-col w-screen min-h-screen bg-gray-100/35">
                {/* Header */}
                <header className="container mx-auto h-16 bg-white">
                    <h1 className="text-4xl font-semibold text-amber-800 mt-3 uppercase">Quản lý nhân viên</h1>
                </header>

                {/* Content */}
                <main className="flex-1 container mx-auto bg-white">
                    <Outlet />
                </main>
            </div>
        </Fragment>
    );
};

export default MainLayout;
