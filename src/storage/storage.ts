import AsyncStorage from "@react-native-async-storage/async-storage";
import {Task} from "../types/Task";


const KEY="TASKS";


export const saveTasks = async(tasks:Task[])=>{

await AsyncStorage.setItem(
KEY,
JSON.stringify(tasks)
);

}



export const getTasks = async():Promise<Task[]>=>{

const data =
await AsyncStorage.getItem(KEY);


if(!data)
return [];


return JSON.parse(data);

}