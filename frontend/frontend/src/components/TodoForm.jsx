import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';

function TodoForm() {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    async function handleFormSubmit(e) {
        e.preventDefault()

        let formdata = {
            name: name,
            description: description,
            status: true
        }

        const response = await axios.post('/api/todos', formdata);
        navigate('/')
    }

    return (
        <div>
            <div className="m-2">
                <Link to="/">← Вернутьсяv</Link>
            </div>
            <div className="m-2">
                <h1>Create Task</h1>
            <form onSubmit={handleFormSubmit}>
            <div class="form-group row">
                <div class="col-sm-10">
                <input onChange={(e) => setName(e.target.value)} type="text" class="form-control form-control-sm" id="colFormLabelSm" placeholder="Name"/>
                </div>
            </div>
            <div class="form-group row mt-2">
                <div class="col-sm-10">
                <input onChange={(e) => setDescription(e.target.value)} type="text" class="form-control form-control-sm" id="colFormLabelSm" placeholder="Description"/>
                </div>
            </div>
            <button type="submit" className="btn btn-primary mt-2">Create</button>
            </form>               
            </div>
        </div>
    )
    
}

export default TodoForm;