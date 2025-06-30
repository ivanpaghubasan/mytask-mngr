


import Layout from './components/Layout';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import TaskList from './components/TaskList';

function App() {
    

    return (
        <Routes>
            <Route path='/' element={<Login />}/>

            <Route>
                <Route element={<Layout />}>
                    <Route path='/tasks' element={<TaskList />}/>
                </Route>
            </Route>
            <Route path="*" element={<h2>Page not found</h2>}/>
        </Routes>
    );
}

export default App;
