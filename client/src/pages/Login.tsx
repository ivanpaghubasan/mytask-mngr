import AuthFormWrapper from '@/components/AuthFormWrapper';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { apiFetch } from '@/lib/api';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
    const [form, setForm] = useState({ identifier: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({...form, [e.target.name]: e.target.value });
    }
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await apiFetch("/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });
        const data = await res.json();
        if (res.ok) {
            localStorage.setItem("token", data.token);
            alert("Login successful");
            navigate('/tasks');
        } else {
            alert(data.message);
        }
    }
  return (
    <AuthFormWrapper title="Login">
        <form className='space-y-4' onSubmit={handleSubmit}>
            <div>
                <Label htmlFor='identifier'>Username or Email</Label>
                <Input name='identifier' value={form.identifier} onChange={handleChange} required />
            </div>
            <div>
                <Label htmlFor='password'>Password</Label>
                <Input name='password' value={form.password} onChange={handleChange} required />
            </div>
            <Button className='w-full' type='submit'>Login</Button>
        </form>
        <p className="text-sm text-center text-muted-foreground mt-3">
        Don’t have an account? <Link to="/register" className="text-blue-600">Register</Link>
        </p>
    </AuthFormWrapper>
  );
}