import React, {useEffect, useState} from "react";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import { FlatList, Text, View, ListRenderItem, TextInput, Button } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import { CREATE_WORKOUT, GET_EXERCISES, SEARCH_EXERCISES } from "../GQL/queries";
import Exercise from "./Exercise";
import ExerciseListItem from "./ExerciseListItem";

type WorkoutExercise = {
  id: number | string,
  name: string,
  weight: number | string,
  sets: number | string,
  reps: number | string,
  equipment?: string[]
}

interface Workout {
  name: string;
  date: string;
  author: string;
  type: string; 
  level: number;
  exercises: WorkoutExercise[]
}

interface Ex {
  id: string | number;
  name: string;
  type: string;
  posture: string;
  movement: string;
  symmetry: string;
  equipment: string[]
}

const today = Date.now().toLocaleString()

export default function CreateWorkout ({navigation}: any) {

  const [showTypes, setShowTypes] = useState(false)
  const [workout, setWorkout] = useState<Workout>({
    name: '',
    author: '',
    date: today,
    type: '',
    level: 0,
    exercises: [],
  })

  const [createWorkout] = useMutation(CREATE_WORKOUT, {
    onError: (err) => console.log(JSON.stringify(err))
  })

  const addWorkout = (e: any): void => {
    createWorkout({variables: {
      input: workout
    }
  })
}

  const workoutTypes = ["Strength", "Hypertrohpy", "Cardio - Endurance", "Cardio - Sprint", "HIIT", "Flexibility", "Recovery", "Bodyweight", "Hybrid"];


  const [searchString, setSearchString] = useState('')
  const [getExercise, {loading, error, data}] = useLazyQuery(SEARCH_EXERCISES)

  const addEx = (ex: Ex) => {
    for (const exercise of workout.exercises) {
      if (exercise.name === ex.name) return
    }
    setWorkout({...workout, exercises: [...workout.exercises, {id: Number(ex.id), name: ex.name, weight: 0, sets: 0, reps: 0, equipment: ex.equipment}]})
  }

  const toggleTypes = () => {
    setShowTypes(!showTypes)
  }

  const allExercises = useQuery(GET_EXERCISES)

  const searchExercises = () => {
    getExercise({variables: {name: searchString}})
  }
    
    return (
        <View>
            <View>
                <Text>Workout Creator</Text>
            </View>
            <View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text>Name: </Text>
                <TextInput placeholder="..." onChangeText={(name: string) => setWorkout({...workout, name: name})}></TextInput>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text>Type: {workout.type}</Text>
              </View>
              {showTypes && workoutTypes.map((type: string) => <View style={{flexDirection: 'row', alignItems: 'center'}}><Text>{type}</Text><Button title="+" onPress={() => {setWorkout({...workout, type: type});toggleTypes()}} /></View>)}
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Button title="Set Workout Type" onPress={toggleTypes}/>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text>Level: </Text>
                <TextInput placeholder="0-10" keyboardType="numeric" onChangeText={(text: string) => setWorkout({...workout, level: Number(text)})}></TextInput>
              </View>
            </View>
            <View style={{display: 'flex', marginTop: 5, justifyContent: 'space-between'}}>
                <View>
                  <Text>Search:</Text>
                  <TextInput placeholder="Search Exercises" onChangeText={(text:string) => setSearchString(text)}></TextInput>
                  {data && <FlatList data={data.getExerciseByName} keyExtractor={item => item.id} renderItem={({item}: any) => <Exercise addEx={addEx} exercise={item}/>} ListEmptyComponent={<Text>No exercises</Text>}/>}
                  <Button title="Search" onPress={searchExercises} />
                </View>
                <View>
                  <Button title="Create New Exercise" onPress={() => navigation.navigate('CreateExercise')}/>
                </View>
                <View>
                  <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: 5}}>
                    <View>
                      <Text>Exercises: </Text>
                      <FlatList data={workout.exercises} keyExtractor={(item: any, index: number) => item.id + index} renderItem={({item}: any) => <ExerciseListItem exercise={item}/>}/>
                    </View>
                  </View>
                </View>
            </View>
            <Button title="Save Workout" onPress={addWorkout} />
        </View>
    )
}

