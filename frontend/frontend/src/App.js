import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';

function AppRoutes() {

    return (
        <Routes>
            <Route path="/" element={<TodoList/>}/>
            <Route path="/create-task" element={<TodoForm/>}/>
            <Route path="/task/:id" element={<TodoItem/>}/>
        </Routes>
    )
}


function App() {
    return (
            <BrowserRouter>
                <AppRoutes />
            </BrowserRouter>
    )
}

export default App;
