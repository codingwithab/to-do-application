import React from "react"
import { RiDeleteBin5Line } from "react-icons/ri"

const style = {
  list: `flex justify-between bg-slate-200 p-6 my-2 mx-4 capitalize`,
  listComplete: `flex justify-between bg-green-600 p-6 my-2 mx-4 capitalize`,
  row: `flex`,
  listItem: `ml-2 cursor-pointer`,
  listItemComplete: `ml-2 curosr-pointer line-through`,
  button: `cursor-pointer flext items-center`
}

const Todo = ({ todo, completeCheck, deleteTodo }) => {
  return (
    <li className={todo.completed ? style.listComplete : style.list}>
      <div className={style.row}>
        <input
          onChange={() => completeCheck(todo)}
          type="checkbox"
          checked={todo.completed ? "checked" : ""}
        />
        <p
          onClick={() => completeCheck(todo)}
          className={todo.completed ? style.listItemComplete : style.listItem}
        >
          {todo.text}
        </p>
      </div>
      <button onClick={() => deleteTodo(todo.id)}>
        <RiDeleteBin5Line />
      </button>
    </li>
  )
}

export default Todo
