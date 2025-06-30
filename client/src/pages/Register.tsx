import AuthFormWrapper from '@/components/AuthFormWrapper';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { apiFetch } from '@/lib/api';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

export default function Register() {
    const [form, setForm] = useState({ username: "", email: "", password: "" });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({...form, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await apiFetch("/users/register", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(form),
        });
        const data = await res.json();
        alert(data.message);
    }

  return (
    <AuthFormWrapper title='Register'>
        <form className='space-y-4' onSubmit={handleSubmit}>
            <div>
               <Label htmlFor='username'>Username</Label>
               <Input name='username' value={form.username} onChange={handleChange} required />
            </div>
            <div>
               <Label htmlFor='email'>Email</Label>
               <Input name='email' type='email' value={form.email} onChange={handleChange} required />
            </div>
            <div>
               <Label htmlFor='password'>Password</Label>
               <Input name='password' type='password' value={form.password} onChange={handleChange} required />
            </div>
            <Button className='w-full' type='submit'>Register</Button>
        </form>
        <p className="text-sm text-center text-muted-foreground mt-3">
        Already have an account? <Link to="/" className="text-blue-600">Login</Link>
        </p>
    </AuthFormWrapper>
  )
}
