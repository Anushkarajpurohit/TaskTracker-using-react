import { useState,useEffect } from 'react'
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'


  const App = () => {
    const[showAddTask,setShowAddTask]=useState(false)
    const [tasks, setTasks] = useState([])
    const [toggleSave,setToggleSave]=useState([true])

useEffect(()=>{
 const getTasks=async()=>{
  const tasksFromServer=await fetchTasks()
  setTasks(tasksFromServer)
 }
  getTasks()
},[])

//fetch Tasks
const fetchTasks=async()=>{
  const res=await fetch('http://localhost:3002/getTasks')
  const data=await res.json()
return data  }

//fetch task
const fetchTask=async(id)=>{
  const res=await fetch(`http://localhost:3002/getTasks/add/${id}`)
  const data=await res.json()
return data  }
// Delete Task 
 const deleteTasks =async (id) => {
await fetch(`http://localhost:3002/getTasks/delete/${id}`,{
  method:'DELETE',
})

  setTasks(tasks.filter((task) =>task.id !==id))
  const data=await fetchTasks()
    setTasks(data)
 }

 //toggleto Reminder
const toggleReminder=async(id)=>{

  const taskToToggle=await fetchTask(id)
  const updTask={...taskToToggle,
    reminder:!taskToToggle.reminder}
  console.log(updTask)
 
const res=await fetch(`http://localhost:3002/getTasks/${id}`,{
  
  method:'PUT',
  headers:{
    'Content-type':'application/json',
    'Accept':'application/json',

  },
body:JSON.stringify(updTask),

})
const data=await res.json()

setTasks(
  tasks.map((task)=>task.id===id ? {...task,reminder:data.reminder}:task))
  console.log("rem is",updTask.reminder)
  // return  
  // const rdata=await fetchTasks()
  //   setTasks(rdata)

}


//addtask
const addTask=async(task)=>{
  console.log(task)
  const res=await fetch('http://localhost:3002/getTasks/add',{
  method:'POST',
  headers:{
    'Content-type':'application/json', 
    'Accept':'application/json'
  },
  body:JSON.stringify(task)
    })
    const data=await fetchTasks()
    setTasks(data)
  }

  // const id=Math.floor(Math.random()*1000)+1
  // const newTask={id,...task}
  // setTasks([...tasks,newTask])
  
  //EDIT TASK
  const editTask=async(id)=>{
    let newItem=tasks.find((task)=>{
return task.id===id
    })  
    console.log(newItem)
  }

    return (
      <div className='container'> 
     <Header onAdd={()=>setShowAddTask
    (!showAddTask)}  showAdd={showAddTask}/>
{showAddTask && 
     <AddTask onAdd={addTask}/>}
     {tasks.length > 0 ? (
       <Tasks tasks={tasks} onDelete = {deleteTasks} onToggle={toggleReminder} onEdit={editTask}/>
      ) :( 
          'No Tasks To shown'
      )}
       </div>
        
  )
}
export default App
