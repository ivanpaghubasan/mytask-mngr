import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

type Props = {
    title: string;
    children: React.ReactNode;
}

export default function AuthFormWrapper({
    title,
    children
}: Props) {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 px-4'>
        <Card className='w-full max-w-md shadow-md rounded-lg border border-gray-200'>
            <CardHeader>
                <CardTitle className='text-xl text-center'>{title}</CardTitle>
            </CardHeader>
            <CardContent>{children}</CardContent>
        </Card>
    </div>
  )
}
