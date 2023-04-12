import React, { useEffect, useState } from "react";
import { FlatList, Text, View, ListRenderItem, Button } from "react-native";
import { TextInput } from "react-native-gesture-handler";

interface ExerciseReps {
    [name: string]: number[]
}

export default function LogWorkout ({route}: any) {
    const {workout} = route.params
    const times = [3]
    const order = ['Ready']
    const [count, setCount] = useState(times[0])
    const [intervalId, setIntervalId] = useState<any | null>(null)
    const [running, setRunning] = useState(false)
    const [currentExercise, setCurrentExercise] = useState(order[0])
    const [results, setResults] = useState<ExerciseReps>({})

    const breaks = 120;

    const countdown = () => {
        console.log(times)
        if (running) return
        setRunning(true)
        let time = times[0]
        setCurrentExercise(order[0])
        setCount(time)
        let stopwatch = setInterval(() => {
            setIntervalId(stopwatch)
            setCount(prev => prev - 1)
            time--
            if (time <= 0) {
                clearInterval(stopwatch); 
                setRunning(false)
                times.shift();
                order.shift()
                if (times.length > 0) {
                    countdown()
                } else {
                    return
                }
            }
        }, 100)
    }

    const stop = () => {
        clearInterval(intervalId)
        setCount(times[0])
    }

    const populateTimes = () => {
        for (const exercise of workout.exercises) {
            for (let i = 0; i < exercise.sets + 1; i++) {
                order.push(exercise.name)
                order.push('rest')
                times.push(exercise.work)
                times.push(exercise.rest)
            }
            times.push(breaks)
            order.push('break')
        }
        order.push('done!')
    }

    useEffect(() => {
        const obj = results
        for (const exercise of workout.exercises) {
            obj[exercise.name] = []
            for (let i = 0; i < exercise.sets + 1; i++) {
                obj[exercise.name].push(0)
            }
        }
        setResults(obj)
        populateTimes()
    }, [])
    
    return (
        <View>
            <Text>Choose Workout: {workout.name}</Text>
            <Text>Time: {count}</Text>
            <Text>Current exercise: {currentExercise}</Text>
            <Button title="start workout" onPress={countdown}/>
            <Button title="stop" onPress={stop}/>
            {Object.keys(results).length > 0 && <FlatList data={Object.entries(results)} keyExtractor={(item, index) => `${item[0]}, ${index}`} renderItem={({item}) => {console.log(item); let exerciseName = item[0]; return <View><Text>{item[0]}</Text><FlatList data={item[1]} keyExtractor={(item, index) => `${item}, ${index}`} renderItem={(data) => {console.log(data); return <View><Text>Set {data.index}</Text><TextInput placeholder="0" onChangeText={(text: string) => {
                const obj = results;
                obj[exerciseName][data.index] = Number(text)
                setResults(obj)
                console.log(results)
            }}></TextInput></View>}} /></View>}} />}
        </View>
    )
}