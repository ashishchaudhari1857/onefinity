import React, { useEffect, useState } from "react";
import { addtask, get_tasks  ,delete_task ,mark_as_done ,Edit_task} from "./TodoApis";
import classes from './Todolist.module.css'
const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [error, setError] = useState(null);
  const [selected ,setSelected]=useState(null)

  const handleInputChange = (e) => {
    setNewTask(e.target.value);
  };
 //get all task
  const getTasks = async (req, res) => {
    try {
      const data = await get_tasks();
      setTasks(data.tasks);
    } catch (error) {
      setError(error.message);
    }
  };

  //adding new task
  const addTask = async () => {
     try {
        if (newTask.trim() !== "") {
            let data;
             if(selected){
                data = await Edit_task(newTask ,selected._id);
             }else{
                    data = await addtask(newTask);
             }
            setSelected(null)
            setNewTask('')
            getTasks();
          } else {
            setError("please enter  task");
          }
     } catch (error) {
        setError(error.message);
     }
  };

  //  task   make as mark as done
  const toggleTaskStatus = async (taskId) => {
    try {
         const res = await  mark_as_done(taskId);
           getTasks();
    } catch (error) {
        setError(error.message);
    }
  };

 //delete task
  const deleteTask = async (taskId) => {
          try {
            const data =await delete_task(taskId);
                 getTasks()
          } catch (error) {
            setError(error.message);
          }

  }; 
  //edit task
   const EditTask =(task)=>{
    setSelected(task);
    setNewTask(task.task)
    
   }
   
     useEffect(()=>{getTasks()},[]);
  return (
    // {add task box}
    <div className={classes.main}>
      <h2>Todo List</h2>
      <div className={classes.add_box}> 
        <input
          type="text"
          value={newTask}
          onChange={handleInputChange}
          placeholder="Enter task..."
        />
        <button onClick={addTask}>Add Task</button>
      </div>


      {/* {task list } */}
      <ul className={classes.task_container}>
  {tasks.map((task) => (
    <li key={task._id} className={classes.task}>
      <div className={classes.checkbox}>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTaskStatus(task._id)}
        />
      </div>
      <div className={classes.task_text}>
        <span
          style={{ textDecoration: task.done ? "line-through" : "none" }}
        >
          {task.task}
        </span>
      </div>
      <div className={classes.buttons}>
        <button onClick={() => deleteTask(task._id)}>Delete</button>
        <button onClick={() => EditTask(task)}>Edit</button>
      </div>
    </li>
  ))}
</ul>

    </div>
  );
};

export default TodoList;
