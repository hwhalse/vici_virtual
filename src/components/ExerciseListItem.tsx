import React, {useState} from "react"
import { View, Text, TextInput, FlatList } from "react-native"

export default function ExerciseListItem ({exercise}: any) {
    const [workoutNumbers, setWorkoutNumber] = useState({
      weight: 0,
      sets: 0,
      work: 0,
      rest: 0,
      reps: 0
    })
    return (
      <View style={{paddingBottom: 5}}>
        <View>
          <Text style={{fontWeight: 'bold'}}>Name: {exercise.name}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={{flexDirection: 'row', alignItems: 'center', paddingRight: 5}}><Text>Weight: </Text><TextInput placeholder="0" onChangeText={(text: string) => exercise.weight = Number(text)}>{exercise.weight}</TextInput></View>
          <View style={{flexDirection: 'row', alignItems: 'center', paddingRight: 5}}><Text>Sets: </Text><TextInput placeholder="0" onChangeText={(text: string) => exercise.sets = Number(text)}>{exercise.sets}</TextInput></View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}><Text>Reps: </Text><TextInput placeholder="0" onChangeText={(text: string) => exercise.reps = Number(text)}>{exercise.reps}</TextInput></View>
          <View style={{flexDirection: 'row', alignItems: 'center', paddingRight: 5}}><Text>Work (s): </Text><TextInput placeholder="0" onChangeText={(text: string) => exercise.work = Number(text)}>{exercise.work}</TextInput></View>
          <View style={{flexDirection: 'row', alignItems: 'center', paddingRight: 5}}><Text>Rest (s): </Text><TextInput placeholder="0" onChangeText={(text: string) => exercise.rest = Number(text)}>{exercise.rest}</TextInput></View>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}><Text>Equipment: </Text><FlatList style={{flexDirection: 'row'}} data={exercise.equipment} key={exercise.id + 20} renderItem={({item}: any) => <Text style={{paddingRight: 5}}>{item} |</Text>}/></View>
      </View>
    )
  }