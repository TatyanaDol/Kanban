
export type TaskData = {
    name: string, 
    author: string,
    text: string,
    
};

export type TasksData = TaskData[];


export type ColumnData = {
    
    name: string, 
    tasks: TasksData,
      
};

export type ColumnsData = ColumnData[];

