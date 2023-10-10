import DashboardSideBar from '@/components/module/DashboardSideBar';
import { getServerSession } from 'next-auth';
import React from 'react';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

const layout = async ({ children }) => {
    const session = await getServerSession(authOptions)

    if (!session) {
        redirect("/signin")
    }


    return (
        <DashboardSideBar email={session.user.email}>
            {children}
        </DashboardSideBar>
    );
};

export default layout;