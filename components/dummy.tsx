import React from 'react';
import {  View,Text ,StyleSheet} from 'react-native';
import { Button } from 'react-native-paper';

const dummy =(props)=>{
    return <View style={styles.screen}>
        <Text>Dummy Screen</Text>
        <Button onPress={()=>{
            props.navigation.navigate('Details')
        }}>GO TO Details </Button>
    </View>
}

const styles=StyleSheet.create({
    screen:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
});

export default dummy;