import React from 'react'
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/Feather';

const Task = (props) => (
    
        <View style={styles.taskWrapper}>
            <Icon
            name={props.checked ? 'check' : 'square'}
            size={30}
            color='#0b74bd'
            style={{marginLeft: 15}}
            onPress={props.setChecked}
            />
            <View>
                {props.checked && <View styles={styles.verticalLine}></View>}
                <Text style={styles.task}>{props.text}</Text>
            </View>
            <Icon
            name='trash-2'
            size={30}
            color='#D23724'
            style={{marginLeft: 'auto', marginRight: 10}}
            onPress={props.delete}
            />
        </View>
    
)

export default Task


const styles = StyleSheet.create({
    taskWrapper: {
        marginTop: '5%',
        flexDirection: 'row',
        borderColor: 'black',
        borderBottomWidth: 1.5,
        width: '100%',
        alignItems: 'stretch',
        minHeight: 40,
        
        
    },
    task: {
        paddingBottom: 20,
        paddingLeft: 10,
        marginTop: 6,
        borderColor: 'grey',
        borderBottomWidth: 1,
        fontSize: 17,
        fontWeight: 'bold',
        color: '#f0f0f0'
    },
    verticalLine: {
        borderBottomColor: '#f0f0f0',
        borderBottomWidth: 4,
        marginLeft: 10,
        width: '100%',
        position: 'absolute',
        marginTop: 15
    }
})