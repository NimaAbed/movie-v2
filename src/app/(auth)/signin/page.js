import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import SigninPage from '@/components/template/SigninPage';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react';

const page = async () => {
    const session = await getServerSession(authOptions)

    if (session) redirect("/dashboard")

    return (
        <SigninPage />
    );
};

export default page;