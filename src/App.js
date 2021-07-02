import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import {useEffect, useState} from "react";
import Column from "./Column";
import AddTaskModal from "./AddTaskModal";

function App() {
    let [list, setList] = useState([]);
    let [statuses, setStatuses] = useState([]);

    const getList = () => {
        axios
            .get('https://nazarov-kanban-server.herokuapp.com/card')
            .then(res => {
                setList(res.data);
            })
            .catch(error => console.log(error))
    };
    useEffect(() => {
        getList();
    }, [])

    const getStatuses = () => {
        axios
            .get('https://nazarov-kanban-server.herokuapp.com/column')
            .then(res => {
                setStatuses((res.data).map(el => el.status));
            })
            .catch(error => console.log(error))
    };

    useEffect(() => {
        getStatuses();
    }, [])

    const deleteButton = (id) => {
        axios
            .delete(`https://nazarov-kanban-server.herokuapp.com/card/${id}`)
            .then(() => {
                getList();
            })
            .catch(error => console.log(error))
    };

    let priorities = [1, 2, 3, 4, 5];

    return (
        <div className="App">
            <div className="container">
                <h1 className="display-2">Kanban board</h1>
                <AddTaskModal getList={getList} priorities={priorities} statuses={statuses}/>
                <div className="row align-items-start">
                    {statuses.map(el => <Column key={el} status={el} statuses={statuses} list={list}
                                                deleteButton={deleteButton} getList={getList}
                                                priorities={priorities}/>)}
                </div>
            </div>
        </div>
    );
}

export default App;
