import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export type EditTaskArgs = {
  taskId: number;
  taskNewTitle: string;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const taskData = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }

    //Duplicated Task (Complementary Challenge)
    const duplicatedTasks = tasks.map(task => ({ ...task }))
    const foundItem = duplicatedTasks.find(item => item.title === newTaskTitle);

    if (foundItem) {
      Alert.alert("Você não pode cadastrar uma task com o mesmo nome")
      return;
    }
    //

    setTasks(oldState => [...oldState, taskData]);
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => ({ ...task }))
    const foundItem = updatedTasks.find(item => item.id === id);

    if (!foundItem)
      return;

    foundItem.done = !foundItem.done;
    setTasks(updatedTasks);
  }

  //Duplicated Task (Complementary Challenge)
  function handleRemoveTask(id: number) {
    Alert.alert(
      'Remover Item',
      'Tem certeza que deseja remover o item?',
      [
        {
          text: 'Sim', onPress: () => {
            const removeTasks = tasks.filter(task => task.id !== id);
            setTasks(removeTasks)
          }
        },
        { text: 'Não' }
      ]
    )
  }
  //

  //Edited Task (Complementary Challenge)
  function handleEditTask({ taskId, taskNewTitle }: EditTaskArgs) {
    const editedTasks = tasks.map(task => ({ ...task }))
    const foundItem = editedTasks.find(item => item.id === taskId);

    if (foundItem) {
      foundItem.title = taskNewTitle;
      setTasks(editedTasks);
    }
  }
  //

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