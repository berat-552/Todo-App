import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
function App() {
  interface TodoInterface {
    text: string;
    id: string;
  }
  // todos will be an array of objects with interface TodoInterface
  const [todos, setTodos] = useState<TodoInterface[]>(() => {
    // returns TODOS from local storage or an empty array if it doesn't exist
    const data = window.localStorage.getItem("TODOS");
    return data ? JSON.parse(data) : [];
  });
  const [input, setInput] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  function addTodo(todo: string): void {
    if (input === "") {
      setErrorMessage("Todo cannot be empty!");
      return;
    }

    // each Todo will follow a set type interface
    const newTodo: TodoInterface = {
      text: todo,
      id: uuidv4(),
    };

    // append new todo to existing todos
    setTodos([...todos, newTodo]);

    // clear input to indicate that todo has been added
    setInput("");
  }

  // keep every other todo except the one that was passed in to delete
  function deleteTodo(id: string): void {
    const filteredTodos = todos.filter((todo) => todo.id !== id);

    setTodos(filteredTodos);
  }

  useEffect(() => {
    // if the todos change then it will write it again in local storage
    window.localStorage.setItem("TODOS", JSON.stringify(todos));
  }, [todos]);

  function year(): number {
    return new Date().getFullYear();
  }

  return (
    <div className="bg-gray-900 min-h-screen overflow-hidden">
      <div className="max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl sm:text-xl md:text-xl mx-auto mt-16 p-4 bg-white rounded-lg shadow-lg select-none">
        <div className="flex justify-between items-baseline">
          <h1 className="text-2xl font-bold mb-4">Todo List</h1>
          <button
            className="border-2 bg-red-600 text-white outline-none border-none px-2 rounded-lg my-2 py-1 hover:-translate-y-0.5 transition-all font-medium"
            onClick={() => setTodos([])}
          >
            Delete All
          </button>
        </div>
        <div className="flex mb-4">
          <input
            type="text"
            className="w-full rounded-l-lg p-2 border-2 outline-none transition-all"
            placeholder="Add a new todo"
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
          <button
            onClick={() => addTodo(input)}
            className="bg-blue-500 text-white px-4 rounded-r-lg hover:scale-105 transition-all font-medium"
          >
            Add
          </button>
        </div>
        <ul>
          {todos.length > 0 ? (
            todos.map((todo) => (
              <div className="flex flex-col text-2xl" key={todo.id}>
                <h1 className="text-red-500 font-medium text-xl"></h1>

                <li
                  className="text-black flex justify-between items-center"
                  key={uuidv4()}
                >
                  <div className="flex items-baseline justify-center">
                    <p>{todo.text} </p>
                  </div>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="text-3xl font-bold border-2 bg-red-600 text-white outline-none border-none px-2 pb-1 mb-2 rounded-lg hover:scale-105 transition-all flex"
                  >
                    &times;
                  </button>
                </li>
              </div>
            ))
          ) : (
            <span className="font-medium text-orange-500">{errorMessage}</span>
          )}
        </ul>
      </div>
      <div className="text-white text-md sm:text-lg md:text-xl flex justify-center items-center my-4 font-medium">
        Copyright {year()}{" "}
        <span className="ml-2 text-teal-500">Berat Dilki</span>
      </div>
    </div>
  );
}

export default App;
