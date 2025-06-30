import { Route, Routes } from 'react-router-dom';
import './App.css'
import PublicLayout from './routes/PublicLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import AppLayout from './routes/AppLayout';
import Tasks from './pages/Tasks';
import NotFound from './pages/NotFound';

function App() {
    return (
        <Routes>
           {/* Public Routes */}
            <Route element={<PublicLayout />}>
                <Route path='/' element={<Login />}/>
                <Route path='/register' element={<Register />} />
            </Route>
            {/* Protected Routes */}
            <Route element={<AppLayout />}>
                <Route path='/tasks' element={<Tasks />} />
            </Route>

            <Route path='*' element={<NotFound />} />
        </Routes>
    );
}

export default App
