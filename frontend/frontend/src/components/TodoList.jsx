import { Link } from "react-router-dom";
import axios from 'axios';
import { useState, useEffect } from "react";

function TodoList() {
    const [todos, setTodos] = useState([])

    async function getTodos() {
      let res = await axios.get('/api/todos')
      setTodos(res.data)
    }

    async function handleFormDelete(id) {
        let res = await axios.delete(`api/todos/${id}`)
        setTodos(todos => todos.filter(todo => todo.id !== id));
        console.log(todos)
    }

    async function handleFormChangeStatus(id, status) {
        let res = await axios.patch(`api/todos/${id}`, status)
        setTodos(todos.map(todo => todo.id === id ? { ...todo, status: !todo.status } : todo))
    }

    useEffect(() => {
        getTodos()
    }, [])

    return (
        <div className="p-2">
            <div>
            <h1>TodoList</h1>
            </div>
            <div>
                <Link to="/create-task" className="btn btn-primary">Create Task</Link>
            </div>
            <div>
                <table class="table">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Description</th>
      <th scope="col">Статус</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
  {todos.map((todo) => (
     <tr key={todo.id}>
         <th scope="row">
            <a href={`/todo/${todo.id}`}>{todo.name}</a>
          </th>
      <td>{todo.description}</td>
     <td>
     <span className={`badge ${todo.status ? 'bg-success' : 'bg-warning'}`}>
         {todo.status ? 'Выполнено' : 'Не выполнено'}
     </span>
           </td>
              <td>
                  <button onClick={() => handleFormChangeStatus(todo.id, todo.status)} className="btn btn-primary btn-sm">Изменить статус</button>
                  <button onClick={() => handleFormDelete(todo.id)} className="btn btn-danger btn-sm">Удалить</button>
                </td>
           </tr>
         ))}
  </tbody>
</table>
            </div>
        </div>
    )
}

export default TodoList;