import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

import { generateId } from '../utils/generateId';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const alreadyExistsTask = tasks.find((task) => task.title === newTaskTitle);

    if (!alreadyExistsTask) {
      const task = {
        id: generateId(),
        title: newTaskTitle,
        done: false,
      };
  
      setTasks((prevState) => ([
        ...prevState,
        task,
      ]));

      return;
    }

    Alert.alert(
      'Task já cadastrada', 
      'Você não pode cadastrar uma task com o mesmo nome.'
    );

  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        const updatedTask = {
          ...task,
          done: !task.done,
        }

        return updatedTask;
      }

      return task;
    });

    setTasks(updatedTasks);
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      'Remover item',
      'Tem certeza que você deseja remover esse item?',
      [
        {
          text: 'Sim',
          onPress: () => (
            setTasks(tasks.filter((task) => task.id !== id))
          ),
        },
        {
          text: 'Não',
        },
      ],
    );
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