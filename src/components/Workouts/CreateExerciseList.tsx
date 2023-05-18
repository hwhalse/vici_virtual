import React from 'react';
import { Text, View, Button } from 'react-native';

interface ListProps {
    text: string;
    callback: Function;
    toggle?: Function;
  }
  
  export default function CreateExerciseList (props: ListProps) {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text>
          {props.text}
        </Text>
        <Button title="+" onPress={() => props.callback()}/>
      </View>
    )
  }