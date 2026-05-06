import { Link } from "react-router-dom";

function TodoItem() {
    return (
        <div>
            <div className="m-2">
                <Link to="/">← Вернуться</Link>
            </div>
            <div>
                <h2>Название</h2>
                <h2>Описание</h2>
                <h2>Выполнено</h2>
            </div>
        </div>
    )
}

export default TodoItem;