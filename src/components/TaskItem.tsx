import React, { useEffect, useRef, useState } from 'react';
import { Image, TouchableOpacity, View, Text, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { EditTaskArgs } from '../pages/Home';
import { Task } from './TasksList';

import trashIcon from '../assets/icons/trash/trash.png'
import editIcon from '../assets/icons/edit/edit.png'

interface TaskItemProps {
    index: number;
    task: Task;
    toggleTaskDone: (id: number) => void;
    removeTask: (id: number) => void;
    editTask: ({ taskId, taskNewTitle }: EditTaskArgs) => void;
}

export function TasksItem({ index, task, toggleTaskDone, removeTask, editTask }: TaskItemProps) {
    const [editing, setEditing] = useState(false);
    const [taskNewTitle, setTaskNewTitle] = useState(task.title);
    const textInputRef = useRef<TextInput>(null);

    function handleEditing() {
        setEditing(true);
    }

    function handleCancelEditing() {
        setTaskNewTitle(task.title)
        setEditing(false);
    }

    function handleSubmit() {
        editTask({ taskId: task.id, taskNewTitle: taskNewTitle });
        setEditing(false);
    }

    useEffect(() => {
        if (textInputRef.current) {
            if (editing) {
                textInputRef.current.focus();
            } else {
                textInputRef.current.blur();
            }
        }
    }, [editing])

    return (

        <View style={styles.container}>
            <View style={styles.infoContainer}>
                <TouchableOpacity
                    testID={`button-${index}`}
                    activeOpacity={0.7}
                    style={styles.taskButton}
                    onPress={() => toggleTaskDone(task.id)}
                >
                    <View
                        testID={`marker-${index}`}
                        style={task.done ? styles.taskMarkerDone : styles.taskMarker}
                    >
                        {task.done && (
                            <Icon
                                name="check"
                                size={12}
                                color="#FFF"
                            />
                        )}
                    </View>


                    <TextInput
                        value={taskNewTitle}
                        onChangeText={setTaskNewTitle}
                        editable={editing}
                        onSubmitEditing={handleSubmit}
                        style={task.done ? styles.taskTextDone : styles.taskText}
                        ref={textInputRef}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.iconsContainer}>
                {
                    editing ? (
                        <TouchableOpacity
                            onPress={handleCancelEditing}
                        >
                            <Icon name="x" size={24} color="#b2b2b2" />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            onPress={handleEditing}
                        >
                            <Image source={editIcon} />
                        </TouchableOpacity>
                    )
                }
                <View style={styles.iconsDivider} />
                <TouchableOpacity
                    onPress={() => removeTask(task.id)}
                    disabled={editing}
                >
                    <Image source={trashIcon} style={{ opacity: editing ? .2 : 1 }} />
                </TouchableOpacity>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    infoContainer: {
        flex: 1
    },
    iconsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 12,
        paddingRight: 24
    },
    iconsDivider: {
        width: 1,
        height: 24,
        backgroundColor: '#dfdfdf',
        marginHorizontal: 12

    },
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
    }
})