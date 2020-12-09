import React from 'react'
import {View, TouchableOpacity, Text, StyleSheet, FlatList, TouchableHighlight} from 'react-native'
import FeatherIcons from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const settingsIcon = (<Ionicons name="ios-settings" size={25} color="grey"  />);
export const appThemeIconLight = (<Ionicons name="ios-square" size={25} color="white"  />);
export const appThemeIconDark = (<Ionicons name="ios-square" size={25} color="#212121"  />);
export const appThemeIconBlue = (<Ionicons name="ios-square" size={25} color="blue"  />);

const Settings = () => {
    return (
        <View style={styles.container}>
            <Text style={{color: 'white', marginTop: 50, marginBottom: 25, alignSelf: 'center'}}>Color theme</Text>
            <FlatList style={{borderTopWidth: 1, borderColor: 'white',}}
        data={[
          {key: 'Light', icon: appThemeIconLight},
          {key: 'Dark', icon: appThemeIconDark},
          {key: 'Blue', icon: appThemeIconBlue},
          
        ]}
        renderItem={({item}) => { return(<TouchableHighlight onPress={() => this.props.navigation.navigate(`${item.page}`)}>
        <Text style={styles.item}>{item.icon}    {item.key}</Text>
      </TouchableHighlight>
        )
      }}//<Text style={styles.item}>{item.key}</Text>}
      />
      
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: '#212121'
      },
      flatlist: {
        color: 'white',
        alignItems: 'flex-start'
      },
      item: {
        padding: 10,
        fontSize: 25,
        height: 55,
        color: 'white',
        borderBottomWidth: 1,
        borderColor: 'white',

        
      }
})

export default Settings