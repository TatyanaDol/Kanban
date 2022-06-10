import React from 'react';
import './App.css';
import Column from './components/Column/Column';
import UserNameModal from './components/UserNameModal/UserNameModal';
import { useLocalStorage } from './hooks/useLocalStorage';
import { ColumnData, TaskData } from './types/data';


const START_COLUMNS = [
  {
    name: 'Todo', tasks: [
    ]
  },
  {
    name: 'In progress', tasks: [

    ]
  },
  {
    name: 'Testing', tasks: [
    ]
  },
  {
    name: 'Done', tasks: [

    ]
  }
]


function App() {
  const [columns, setColumns] = useLocalStorage('columns', START_COLUMNS)

  const handleColumnNameChangeNew = (indx: number) => {
    return (newName: string) => {
    const newCols = [...columns];
    newCols[indx].name = newName;
    setColumns(newCols);
  }}

  const addTask = (indx: number) => {
    return (newtask: TaskData) => {
    const newCols = [...columns];
    newCols[indx].tasks.push(newtask);
    setColumns(newCols);
  }}

  const editTask = (indx: number) => {
    return (newEditTask: TaskData, indTask: number ) => {
    const newCols = [...columns];
    newCols[indx].tasks[indTask] = newEditTask;
    setColumns(newCols);
  }}

  const deleteTask = (indx: number) => {
    return (indTask: number ) => {
    const newCols = [...columns];
    newCols[indx].tasks.splice(indTask, 1);
    setColumns(newCols);
  }}

  return (
    <div className="App">
      <UserNameModal />
      <div className="container">

        <div className="row flex_row">
          {columns.map((column: ColumnData, indx: number) => {
            return (
              <Column key={column.name + indx} column={column} changeColumnName={handleColumnNameChangeNew(indx)} addTask={addTask(indx)} editTask={editTask(indx)} deleteTask={deleteTask(indx)}/>
            )
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
