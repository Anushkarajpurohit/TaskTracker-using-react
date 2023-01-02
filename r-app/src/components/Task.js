import React from 'react'
import { FaTimes } from 'react-icons/fa'

const Task = ({ task, onDelete, onToggle ,onEdit}) => {
  return (
    <div
      className={`task ${task.reminder ? 'reminder': ''}`}
      onDoubleClick={() => onToggle(task.id)}
    >
      
      <h3>
        {task.text}
        
        <FaTimes
          style={{ color: 'red ', cursor: 'pointer' }}
          onClick={() => onDelete(task.id)}
        />
      </h3>
      <h4>{task.day}<button className='editBut' onClick={()=>onEdit(task.id)}>Edit</button></h4>
    </div>
  )
}

export default Task    