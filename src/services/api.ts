import {Task} from "../types/Task";


export const fetchTasks = async():Promise<Task[]>=>{


const response =
await fetch(
"https://jsonplaceholder.typicode.com/todos?_limit=5"
);


const data =
await response.json();



return data.map((item:any)=>({

id:String(item.id),

title:item.title,

description:"Imported from API",

completed:item.completed,

createdAt:new Date().toISOString()

}));

}