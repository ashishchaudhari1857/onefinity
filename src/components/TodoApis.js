 // Add  task Api call

export const addtask = async (task) => {
    try {
      const res = await fetch('https://onefinity-todo.onrender.com/api/task/add', {
        method: "POST",
        body: JSON.stringify({ task: task }),
        headers: {
          'Content-Type': 'application/json', 
        },
      });
  
      const data = await res.json();
      return data;
    } catch (err) {
      throw err;
    }
  };
  
 // Gets ALL  task Api call
  export const get_tasks = async () => {
    try {
      const res = await fetch('https://onefinity-todo.onrender.com/api/task')
      const data = await res.json();
      return data;
    } catch (err) {
      throw err;
    }
  };


 // Delete  task Api call

  export const delete_task = async (id) => {
    try {
      const res = await fetch(`https://onefinity-todo.onrender.com/api/task/delete/${id}`, {
        method:"DELETE"
      })
      const data = await res.json();
      return data;
    } catch (err) {
      throw err;
    }
  };

  // mark as done  task Api call
   export const mark_as_done =async (id)=>{
    try {
        const res = await fetch(`https://onefinity-todo.onrender.com/api/task/update/done/${id}`, {
          method:"PUT"
        })
        const data = await res.json();
        return data;
      } catch (err) {
        throw err;
      }
   }

   // edit  task Api call
   export const Edit_task =async (task ,id)=>{
    try {
        const res = await fetch(`https://onefinity-todo.onrender.com/api/task/update/${id}`, {
          method:"PUT",
          body:JSON.stringify({task:task}),
          headers: {
            'Content-Type': 'application/json', 
          },
        })
        const data = await res.json();
        return data;
      } catch (err) {
        throw err;
      }
   }