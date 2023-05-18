import React from "react";
import { View, Text, Button } from "react-native";

interface Exercise {
  name: string;
  movement?: string;
  posture?: string;
  type?: string;
  symmetry?: string;
  equipment: string[]
}

interface Props {
    exercise: Exercise
    addEx: Function
}

export default function Exercise (props: Props) {
    const exercise = props.exercise
    let exName = '';
    if (exercise.equipment.length > 0) {
      for (const eq of exercise.equipment) {
        exName += eq + ' '
      }
    }
    if (exercise.posture !== null) exName += exercise.posture + ' '
    if (exercise.symmetry !== null) exName += exercise.symmetry + ' '
    exName += exercise.name
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text>{exName}</Text>
        <Button title="+" onPress={() => props.addEx({...exercise, name: exName})}/>
    </View>
  )
}