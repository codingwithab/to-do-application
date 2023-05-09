import React, { useState, useEffect } from "react"
import { MdFormatListBulletedAdd } from "react-icons/md"
import Todo from "./Todo"
import { db } from "./firebase"
import {
  query,
  collection,
  onSnapshot,
  QuerySnapshot,
  doc,
  updateDoc,
  addDoc,
  deleteDoc
} from "firebase/firestore"

const style = {
  bg: `h-screen w-screen p-4 bg-gradient-to-r from-[#353585] to-[#553388]`,
  container: `bg-zinc-400 w-full m-auto max-w-[500px] rounded-md shadow-xl`,
  title: `text-3xl text-center font-bold text-white py-16`,
  form: `flex juustify-between`,
  input: `border p-2 w-full text-xl ml-4 mr-2`,
  button: `text-5xl rounded-xl text-white bg-red-600 hover:text-red-600 hover:rounded-xl hover:bg-white mx-2 mr-4`,
  count: `text-center p-2`,
  zeroCount: `text-center p-2 text-pink-600 font-bold`
}

function App() {
  const [todos, setTodos] = useState([])
  const [userInput, setUserInput] = useState("")

  // Create todo

  const addTodo = async e => {
    e.preventDefault(e)
    if (userInput === "") {
      alert("Please enter some text to create a task!")
      return
    }
    await addDoc(collection(db, "todos"), {
      text: userInput,
      completed: false
    })
    setUserInput("")
  }

  // Read todo from firebase

  useEffect(() => {
    const a = query(collection(db, "todos"))
    const unsub = onSnapshot(a, QuerySnapshot => {
      let todoArr = []
      QuerySnapshot.forEach(doc => {
        todoArr.push({ ...doc.data(), id: doc.id })
      })
      setTodos(todoArr)
    })
    return () => unsub()
  }, [])

  // Update todo in firebase

  const completeCheck = async todos => {
    await updateDoc(doc(db, "todos", todos.id), {
      completed: !todos.completed
    })
  }

  // Delete todo

  const deleteTodo = async id => {
    await deleteDoc(doc(db, "todos", id))
  }

  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h3 className={style.title}>To-Do Planning Application</h3>
        <form onSubmit={addTodo} className={style.form}>
          <input
            className={style.input}
            type="text"
            placeholder="Enter a task"
            value={userInput}
            onChange={e => setUserInput(e.target.value)}
          ></input>
          <button className={style.button}>
            <MdFormatListBulletedAdd />
          </button>
        </form>
        <ul>
          {todos.map((todo, index) => (
            <Todo
              key={index}
              todo={todo}
              completeCheck={completeCheck}
              deleteTodo={deleteTodo}
            />
          ))}
        </ul>
        {todos.length < 1 ? (
          <p
            className={style.zeroCount}
          >{`You have nothing to do. Add a task now!`}</p>
        ) : (
          <p className={style.count}>{`You have ${todos.length} todos`}</p>
        )}
      </div>
    </div>
  )
}

export default App
