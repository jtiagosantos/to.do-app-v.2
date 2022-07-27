import React, { useState, useRef, useEffect } from 'react';
import { 
  Image, 
  TouchableOpacity, 
  View, 
  StyleSheet, 
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { Task, EditTaskData } from './TasksList';

import trashIcon from '../assets/icons/trash/trash.png';
import penIcon from '../assets/icons/pen/pen.png';

interface TaskItemProps {
  index: number;
  item: Task
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: ({ taskId, taskNewTitle }: EditTaskData) => void;
}

export function TaskItem(
  { index, item, removeTask, toggleTaskDone, editTask }: TaskItemProps
) {
  const [isBeingEdited, setIsBeingEdited] = useState(false);
  const [editedTaskTitle, setEditedTaskTitle] = useState(item.title);
  const textInputRef = useRef<TextInput>(null);

  function handleStartEditing() {
    setIsBeingEdited(true);
  }

  function handleCancelEditing() {
    setEditedTaskTitle(item.title);
    setIsBeingEdited(false);
  }

  function handleSubmitEditing() {
    editTask({
      taskId: item.id,
      taskNewTitle: editedTaskTitle,
    });

    setIsBeingEdited(false);
  }

  useEffect(() => {
    if (isBeingEdited) {
      textInputRef.current?.focus();
    } else {
      textInputRef.current?.blur();
    }
  }, [
    isBeingEdited,
  ]);

  return (
    <>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(item.id)}
        >
          <View 
            testID={`marker-${index}`}
            style={item.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            { item.done && (
              <Icon 
                name="check"
                size={12}
                color="#FFF"
              />
            )}
          </View>
          
          <TextInput 
            value={editedTaskTitle}
            onChangeText={setEditedTaskTitle}
            editable={isBeingEdited}
            onSubmitEditing={handleSubmitEditing}
            style={item.done ? styles.taskTextDone : styles.taskText}
            ref={textInputRef}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.iconsContainer}>
        {isBeingEdited ? (
          <TouchableOpacity
            testID={`trash-${index}`}
            style={{ marginRight: 24 }}
            onPress={handleCancelEditing}
          >
            <Icon name="x" size={24} color="#b2b2b2" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            testID={`trash-${index}`}
            style={{ paddingHorizontal: 12 }}
            onPress={handleStartEditing}
          >
            <Image source={penIcon} />
          </TouchableOpacity>
        )}

        <View 
          style={ styles.iconsDivider }
        />

        <TouchableOpacity
          disabled={isBeingEdited}
          onPress={() => removeTask(item.id)}
          style={{ marginLeft: 12 }}
        >
          <Image 
            source={trashIcon} 
            style={{ opacity: isBeingEdited ? 0.2 : 1 }} 
          />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  },
  iconsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
  },
  iconsDivider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(196, 196, 196, .24)',
  }
});
