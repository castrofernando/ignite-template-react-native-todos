import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
   const task : Task = {
     id: new Date().getTime(),
     title: newTaskTitle,
     done: false
   }
   setTasks(oldstate => [...tasks, task]);
  }

  function handleToggleTaskDone(id: number) {
    //TODO - change task from state
    const updatedTasks = tasks.map( task => ({ ...task}));

    const taskClicked = updatedTasks.find(t => t.id === id);
    if(!taskClicked)
      return;

    taskClicked.done = !taskClicked.done;
    setTasks(updatedTasks);
    
  }

  function handleRemoveTask(id: number) {
    //TODO - remove task from state
    setTasks(oldstate => oldstate.filter(t => t.id !== id));
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})