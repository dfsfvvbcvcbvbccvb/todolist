import { Link } from "react-router-dom";

function TodoList() {
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
    <tr>
      <th scope="row"><a href="/">Название</a></th>
      <td>Описание</td>
      <td><span class="badge bg-success">Выполнено</span></td>
      <td><button className="btn btn-danger">Удалить</button></td>
    </tr>
  </tbody>
</table>
            </div>
        </div>
    )
}

export default TodoList;