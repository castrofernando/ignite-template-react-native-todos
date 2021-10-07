import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export type EditTaskArgs = {
  taskId: Number;
  taskNewTitle: string;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const taskFound = tasks.find(t => t.title === newTaskTitle);
    if(taskFound)
    {
      Alert.alert('Task já cadastrada',
                  'Você não pode cadastrar uma task com o mesmo nome',);
      return;
    }
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
    Alert.alert('Remover item',
                  'Tem certeza que você deseja remover esse item?',
                  [
                    {
                      style: 'destructive',
                      text:'Yes',
                      onPress: () => {setTasks(oldstate => oldstate.filter(t => t.id !== id));}
                    },
                    {
                      style:'cancel',
                      text:'No'
                    }
                  ]
                  );
  }

  function handleEditTask({ taskId, taskNewTitle}: EditTaskArgs){
    //Copia array inteiro para novo array. Regra da Imutabilidade
    const updatedTasks = tasks.map( task => ({ ...task}));


    const taskToBeUpdated = updatedTasks.find(t => t.id === taskId);
    if(!taskToBeUpdated)
    return;

    taskToBeUpdated.title = taskNewTitle;
    setTasks(updatedTasks);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask={handleEditTask}
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