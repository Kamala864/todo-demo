"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import axios from 'axios';

const Header = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [selectedTodo, setSelectedTodo]: any = useState(null);
  const [filterStatus, setFilterStatus] = useState('');
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  interface Todo {
    id: number;
    taskName: string;
    description: string;
    status: string;
    createdAt?: Date; // Optional field, as it seems to be nullable in your Prisma model
  }

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:4000/todos');
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const fetchTodosByStatus = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/todos/status/${filterStatus}`);
      setFilteredTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos by status:', error);
    }
  };
  const fetcAllToDo = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/todos`);
      setFilteredTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos by status:', error);
    }
  };
  

  const handleCreateTodo = async () => {
    try {
      await axios.post('http://localhost:4000/todos', {
        taskName: newTodo,
        description: newDescription,
        status: 'incomplete',
      });
      fetchTodos();
      setNewTodo('');
      setNewDescription('');
    } catch (error) {
      console.error('Error creating todo:', error);
    }
  };

 

  const handleDeleteTodo = async (id: number) => {
    const confirmation = window.confirm('Are you sure you want to delete this todo?');

    if (confirmation) {
      try {
        await axios.delete(`http://localhost:4000/todos/${id}`);
        fetchTodos();
      } catch (error) {
        console.error('Error deleting todo:', error);
      }
    }
  };

  const handleUpdateTodo = async (todo: Todo) => {
    const confirmation = window.confirm(`Do you want to mark "${todo.taskName}" as complete?`);

    if (confirmation) {
      try {
        await axios.put(`http://localhost:4000/todos/${todo.id}`, {
          taskName: todo.taskName,
          description: todo.description,
          status: 'complete',
        });
        fetchTodos();
        setSelectedTodo(null);
      } catch (error) {
        console.error('Error updating todo:', error);
      }
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <>
    
     <div className="flex items-center justify-center ">
        <div className="w-full px-2 m-2 shadow lg:w-2/3 bg-slate-400">
          <div className="flex items-center m-6 bg-gray-700 px-4 py-2 rounded-xl text-white">
            <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"><span className="text-transparent bg-clip-text bg-gradient-to-r to-sky-700 from-yellow-600">To Do</span>.</h1>
          </div>

           <div className="bg-gray-700 m-7 p-7">
           <div className="flex space-x-4">
           <div className="w-1/3">
            <input className="w-full border rounded p-1" placeholder="Title" type="text" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
</div>   
<div className="w-1/3">    
        <input className="w-full border rounded p-1" placeholder="Short Description" type="text" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} />
       </div>
        <button className="bg-yellow-500 text-white px-4  rounded" onClick={handleCreateTodo}>
       Create
      </button>
      </div>
    </div> 

    <div className="bg-gray-900 m-2">
  <div className="flex justify-end py-2 px-8">
    <select 
      className="w-1/2 border rounded p-2"
      value={filterStatus}
      onChange={(e) => setFilterStatus(e.target.value)}>
      <option value="all">All</option>
      <option value="incomplete">Incomplete</option>
      <option value="complete">Complete</option>
    </select>
    <button className="bg-yellow-500 text-white px-4 rounded" onClick={fetchTodosByStatus}>
      Filter
    </button>
    <button className="bg-yellow-500 text-white px-4 rounded" onClick={fetcAllToDo}>
      Fetch All
    </button>
  </div>

  <div className="flex justify-center py-2 px-8">
    <ul className="bg-white shadow overflow-hidden sm:rounded-md w-2/3 mt-4">
      {filterStatus ? (
        filteredTodos.map((todo: any) => (
          <li key={todo.id} onClick={() => setSelectedTodo(todo)}>
            <div className="px-2 py-2 border-double border-4 border-yellow-700">
              <div className="flex items-center justify-between">
                <h3 className="text-lg leading-6 font-medium text-gray-900">{todo.taskName}</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">{todo.description}</p>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <p className="text-sm font-medium text-gray-500">Status: <span className={todo.status === 'incompletene' ? 'text-green-600' : 'text-red-600'}>{todo.status}</span></p>
                <button className="bg-sky-700 rounded-md p-2 text-white" onClick={() => handleUpdateTodo(todo)}>Complete</button>
                <button className="bg-red-600 rounded-md p-2 text-white" onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
                
              </div>
            </div>
          </li>
        ))
      ) : (
        todos.map((todo: any) => (
          <li key={todo.id} onClick={() => setSelectedTodo(todo)}>
             <div className="px-2 py-2 border-double border-4 border-yellow-700">
              <div className="flex items-center justify-between">
                <h3 className="text-lg leading-6 font-medium text-gray-900">{todo.taskName}</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">{todo.description}</p>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <p className="text-sm font-medium text-gray-500">Status: <span className={todo.status === 'incompletene' ? 'text-green-600' : 'text-red-600'}>{todo.status}</span></p>
                <button className="bg-sky-700 rounded-md p-2 text-white" onClick={() => handleUpdateTodo(todo)}>Complete</button>
                <button className="bg-red-600 rounded-md p-2 text-white" onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
               </div> 
              </div>
          </li>
        ))
      )}
    </ul>
  </div>
</div>
</div>
    </div>
   
    </>
  );
};

export default Header;