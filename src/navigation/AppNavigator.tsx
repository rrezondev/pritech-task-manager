import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TasksScreen from "../screens/TasksScreen";
import AddTaskScreen from "../screens/AddTaskScreen";
import DetailsScreen from "../screens/DetailsScreen";


const Stack = createNativeStackNavigator();


export default function AppNavigator(){

return (

<NavigationContainer>

<Stack.Navigator>


<Stack.Screen
name="Tasks"
component={TasksScreen}
options={{
title:"My Tasks"
}}
/>


<Stack.Screen
name="AddTask"
component={AddTaskScreen}
options={{
title:"Add Task"
}}
/>


<Stack.Screen
name="Details"
component={DetailsScreen}
options={{
title:"Task Details"
}}
/>


</Stack.Navigator>

</NavigationContainer>

)

}