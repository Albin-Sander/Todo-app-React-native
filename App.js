import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity, Alert, } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import Task from './components/Task.js';






const App = () => {
  const createTwoButtonAlert = () =>
    Alert.alert(
      "More than 5 todos",
      "Sorry you have more than 5 todos, try and complete them before adding more!",
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false }
    );

  const [value, setValue] = useState('')
  const [todos, setTodos] = useState([])
  
  //Börja här
  function handleAddTodo() {
     if (todos.length > 4) {
      console.log("Error")
      createTwoButtonAlert()
}
    else if (value.length > 0) {
      setTodos([...todos, { text: value, key: Date.now(), checked: false}])
        setValue('')
        
        
    }
    
    
  }

  

  function handleDeleteTodo(id) {
    setTodos( todos.filter((todo) => {
      if (todo.key !== id) return true
    }))
  }

  function handleChecked(id) {
    setTodos( todos.map((todo) => {
      if(todo.key === id) todo.checked = !todo.checked;
      return todo;
    }))
  }
  return (
    <View style={styles.container}>
    <View style={styles.textInputContainer}>
      <TextInput
      style={styles.textInput}
        multiline={true}
        onChangeText={(value) => setValue(value)}
        placeholder={'Add todo'}
        value={value}
        
      />
      <TouchableOpacity
      onPress={() => handleAddTodo()}
      >
        <Icon name='plus' size={30} color='#900' style={{marginLeft: 15}}/>
      </TouchableOpacity>
      
      
      <StatusBar style="auto" />
    </View>
    <ScrollView style={{width: '100%'}}>
        {todos.map((task) => (
          <Task
          text={task.text}
          key={task.key}
          checked={task.checked}
          setChecked={() => handleChecked(task.key)}
          delete={() => handleDeleteTodo(task.key)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#ffffff'
  },
  textInput: {
    height: 20,
    flex: 1,
    minHeight: '7%',
    marginTop: '40%',
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
    paddingLeft: 10
  },
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    borderColor: 'rgb(222,222,222)',
    borderBottomWidth: 1,
    paddingRight: 10,
    paddingBottom: 5,
    
  }
});

export default App
