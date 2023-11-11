"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import axios from 'axios';

const Main = () => {
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

  // const handleCreateTodo = async () => {
  //   try {
  //     await axios.post('http://localhost:4000/todos', { taskName: newTodo, description: '', status: 'incomplete' });
  //     fetchTodos();
  //     setNewTodo('');
      
  //   } catch (error) {
  //     console.error('Error creating todo:', error);
  //   }
  // };
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

  const handleUpdateTodo = async () => {
    if (!selectedTodo) return;

    try {
      await axios.put(`http://localhost:4000/todos/${selectedTodo.id}`, {
        taskName: selectedTodo.taskName,
        description: '',
        status: 'complete',
      });
      fetchTodos();
      setSelectedTodo(null);
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <>
       <div>
      <h1>Todo List</h1>
      <div className="bg-gray-900 m-2">
  <div className="flex justify-end py-2 px-8">
    <select className="w-1/2 border rounded p-2" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
      <option value="incomplete">Incomplete</option>
      <option value="complete">Complete</option>
      <option value="all">All</option>
    </select>
    <button className="bg-yellow-500 text-white px-4 rounded" onClick={fetchTodosByStatus}>
      Filter
    </button>
  </div>

  <div className="flex justify-center py-2 px-8">
    <ul className="bg-white shadow overflow-hidden sm:rounded-md w-2/3 mt-4">
      {filterStatus ? (
        filteredTodos.map((todo: any) => (
          <li key={todo.id} onClick={() => setSelectedTodo(todo)}>
            <div className="px-2 py-2">
              <div className="flex items-center justify-between">
                <h3 className="text-lg leading-6 font-medium text-gray-900">{todo.taskName}</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">{todo.description}</p>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <p className="text-sm font-medium text-gray-500">Status: <span className={todo.status === 'done' ? 'text-green-600' : 'text-red-600'}>{todo.status}</span></p>
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">Edit</a>
              </div>
            </div>
          </li>
        ))
      ) : (
        todos.map((todo: any) => (
          <li key={todo.id} onClick={() => setSelectedTodo(todo)}>
            <div className="px-2 py-2">
              <div className="flex items-center justify-between">
                <h3 className="text-lg leading-6 font-medium text-gray-900">{todo.taskName}</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">{todo.description}</p>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <p className="text-sm font-medium text-gray-500">Status: <span className={todo.status === 'done' ? 'text-green-600' : 'text-red-600'}>{todo.status}</span></p>
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">Edit</a>
              </div>
            </div>
          </li>
        ))
      )}
    </ul>
  </div>
</div>

      {/* <div>
        <label>Filter by Status:</label>
        <input type="text" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} />
        <button onClick={fetchTodosByStatus}>Filter</button>
      </div>
      

      {filterStatus && (
        <ul>
          {filteredTodos.map((todo:any) => (
            <li key={todo.id} onClick={() => setSelectedTodo(todo)}>
              {todo.taskName} - {todo.status}
            </li>
          ))}
        </ul>
      )}

      {!filterStatus && (
        <ul>
          {todos.map((todo:any) => (
            <li key={todo.id} onClick={() => setSelectedTodo(todo)}>
              {todo.taskName} - {todo.status}
            </li>
          ))}
        </ul>
      )} */}

<div>
        <h2>Create Todo</h2>
        <label>Task Name:</label>
        <input type="text" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
        <label>Description:</label>
        <input type="text" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} />
        <button onClick={handleCreateTodo}>Create</button>
      </div>

      {selectedTodo && (
        <div>
          <h2>Update Todo</h2>
          <p>{selectedTodo.taskName}</p>
          <button onClick={handleUpdateTodo}>Mark as Complete</button>
        </div>
      )}
    </div>
    </>
  );
};

export default Main;