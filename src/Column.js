import Task from "./Task";

const Column = (props) => {
    return (
        <div className="col">
            <h2 className="display-6">{props.status}</h2>
            {props.list.filter(el => el.status === props.status).sort((a, b) => b.priority - a.priority).map(el => <Task
                key={el._id} task={el}
                deleteButton={props.deleteButton}
                state={props.state}
                updateButton={props.updateButton}
                changes={props.changes}
                setChanges={props.setChanges}
                saveButton={props.saveButton}
                getStatuses={props.getStatuses}
                statuses={props.statuses}
                getList={props.getList}
                priorities={props.priorities}
            />)}
        </div>
    );
};
export default Column;