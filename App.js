import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity, Alert, } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import Task from './components/Task.js';
import AsyncStorage from '@react-native-async-storage/async-storage';






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

  useEffect(() => {
    restoreTodosFromAsync();
  }, [])

  




  
  
   function handleAddTodo() {
     if (todos.length > 4) {
      console.log("Error")
      createTwoButtonAlert()
}
    else if (value.length > 0) {
      //setTodos([...todos, { text: value, key: Date.now(), checked: false}])
        setValue('')
        const key = Date.now()
        const text = value;
        let checked = false;
        const newTodos = [{ text, key, checked}, ...todos];
        setTodos(newTodos)
        storeTodosInAsync(newTodos)
        console.log(newTodos)

        
    }
    
    
  }
  
  const asyncStorageKey = '@todos';

  const storeTodosInAsync = newTodos => {
    const stringifiedTodos = JSON.stringify(newTodos);

    AsyncStorage.setItem(asyncStorageKey, stringifiedTodos).catch(err => {
      console.warn('Error storing todos in Async');
      console.warn(err);
    });
  };

  const restoreTodosFromAsync = () => {
    AsyncStorage.getItem(asyncStorageKey)
      .then(stringifiedTodos => {
        console.log('Restored Todos:');
        console.log(stringifiedTodos);

        const parsedTodos = JSON.parse(stringifiedTodos);

        if (!parsedTodos || typeof parsedTodos !== 'object') return;

        setTodos(parsedTodos);
      })
      .catch(err => {
        console.warn('Error restoring todos from async');
        console.warn(err);
      });
    };
  

  function handleDeleteTodo(key) {
    console.log('Todos BEFORE delete');
    console.log(todos);

    const newTodos = todos.filter(todo => todo.key !== key);

    console.log('Todos AFTER delete');
    console.log(todos);

    setTodos(newTodos);
    storeTodosInAsync(newTodos);
  }

 async function handleChecked(key) {
    setTodos( todos.map((todos) => {
      if(todos.key === key) todos.checked = !todos.checked;
      return todos
    
      
      
      
    }))

    
    
    // const newTodos = todos.filter(todo => todo.key !== key);

    // console.log('Todos AFTER delete');
    // console.log(todos);

    // setTodos(newTodos);
    // storeTodosInAsync(newTodos);
    
  }
  return (
    <View style={styles.container}>
      <Text style={{marginTop: 125, fontSize: 25, color: '#f0f0f0'}}>Welcome, you have {todos.length} todos</Text>
    <View style={styles.textInputContainer}>
      
      <TextInput
      style={styles.textInput}
        multiline={true}
        onChangeText={(value) => setValue(value)}
        placeholder={'Add todo'}
        value={value}
        placeholderTextColor={'#c2c2c2'}
        textBreakStrategy={'simple'}
        
        
      />
      <TouchableOpacity
      onPress={() => handleAddTodo()}
      >
        <Icon name='plus' size={30} color='#0b74bd' style={{marginLeft: 15}}/>
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
    backgroundColor: '#212121'
  },
  textInput: {
    height: 20,
    flex: 1,
    minHeight: '7%',
    marginTop: '40%',
    fontSize: 25,
    fontWeight: 'bold',
    color: '#f0f0f0',
    paddingLeft: 10,
    fontFamily: 'arial'
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
