import React, { useEffect, useState } from "react";
import { FlatList, Text, View, ListRenderItem, Button } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import EncryptedStorage from "react-native-encrypted-storage";
import { useMutation } from "@apollo/client";
import { LOG_WORKOUT } from "../../GQL/queries";

interface RepsWeight {
    reps: number
    weight: number
}

interface LogNumbers {
    [name: string]: RepsWeight[]
}

interface ExerciseReps {
    name: string;
    result: {
        reps: number[]
        weight: number[]
    }
}

export default function LogWorkout ({route}: any) {
    const {workout} = route.params
    let times = [3]
    let order = ['Ready']
    const [count, setCount] = useState(times[0])
    console.log(times)
    const [intervalId, setIntervalId] = useState<any | null>(null)
    const [running, setRunning] = useState(false)
    const [currentExercise, setCurrentExercise] = useState(order[0])
    const [results, setResults] = useState<ExerciseReps[]>([])
    const [username, setUsername] = useState('')
    const [timerMode, setTimerMode] = useState(true)

    const [logWorkout] = useMutation(LOG_WORKOUT, {
        onError: ((err: Error) => console.log(err))
    })

    const breaks = 120;

    const countdown = () => {
        if (running) return
        setRunning(true)
        let time = times[0]
        setCurrentExercise(order[0])
        if (order[0] !== 'Ready' && order[0] !== 'rest' && order[0] !== 'break') {
            console.log(results)
            const newArr = results;
            if (newArr.length === 0) {
                newArr.push({name: order[0], result: {reps: [0], weight: [0]}})
            } else {
                let addNew = true
                for (const ex of newArr) {
                    console.log('exercise name', ex)
                    console.log('list name', order[0])
                    if (ex.name === order[0]) {
                        ex.result.reps.push(0)
                        ex.result.weight.push(0)
                        addNew = false
                    }
                }
                if (addNew) newArr.push({name: order[0], result: {reps: [0], weight: [0]}})
            }
            setResults(newArr)
        }
        setCount(time)
        let stopwatch = setInterval(() => {
            setIntervalId(stopwatch)
            setCount(prev => prev - 1)
            time--
            if (time <= 0) {
                clearInterval(stopwatch); 
                setRunning(false)
                times.shift();
                order.shift();
                if (times.length > 0) {
                    countdown()
                } else {
                    return
                }
            }
        }, 100)
    }

    const getUserInfo = async (): Promise<void> => {
        try {
          const info = await EncryptedStorage.getItem("user_session");
          console.log(info)
          if (info !== null) {
            const obj = await JSON.parse(info)
            setUsername(obj.username)
          }
        } catch(err) {
            console.log(err)
        }
    }

    const stop = () => {
        clearInterval(intervalId)
        setCount(times[0])
    }

    const populateTimes = () => {
        times = [3];
        order = ['Ready'];
        for (const exercise of workout.exercises) {
            for (let i = 0; i < exercise.sets; i++) {
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

    const addSet = (name: string) => {
        const newArr = [...results];
        for (const ex of newArr) {
            if (ex.name === name) {
                ex.result.reps.push(0)
                ex.result.weight.push(0)
            }
        }
        setResults(newArr)
        console.log(results)
    }

    const submitWorkout = () => {
        console.log(results)
        const input = {
            workout_id: workout.id,
            results: results,
            user_id: 1,
            location: 'gym',
            priv: true,
            date: new Date().toISOString()
        }
        console.log('submitting log workout input', input)
        logWorkout({
            variables: {
                input: input
            }
        })
    }

    const toggleTimer = () => {
        setTimerMode(!timerMode)
        setResults([])
    }

    const populateWorkout = () => {
        setResults([])
        const newArr = [...results];
        for (const ex of workout.exercises) {
            const repsAndWeight = new Array(ex.sets).fill(0)
            newArr.push({name: ex.name, result: {reps: repsAndWeight, weight: repsAndWeight}})
        }
        setResults(newArr)
    }

    useEffect(() => {
        populateTimes()
        getUserInfo()
        if (timerMode === false) populateWorkout()
    }, [timerMode])
    
    return (
        <View>
            {timerMode ?
            <View>
            <Text>Workout: {workout.name}</Text>
            <Text>Time: {count}</Text>
            <Text>Current exercise: {currentExercise}</Text>
            <Button title="start workout" onPress={countdown}/>
            <Button title="stop" onPress={stop}/>
            {results.length > 0 && 
            <FlatList 
                data={results} 
                extraData={results} 
                keyExtractor={(item, index) => `${item.name}, ${index}`} 
                renderItem={({item}) => {
                    let exerciseName = item.name; 
                    return (
                    <View>
                        <Text>
                            {exerciseName}
                        </Text>
                        <Button title="Add Set" onPress={() => addSet(exerciseName)}/>
                        <FlatList 
                            data={new Array(item.result.reps.length).fill(0)} 
                            extraData={item.result.reps}
                            keyExtractor={(item, index) => `${item}, ${index}`} 
                            renderItem={(data) => { 
                                return (
                                <View>
                                    <Text>Set {data.index + 1}</Text>
                                    <TextInput 
                                        placeholder="Reps: 0" 
                                        onChangeText={(text: string) => {
                                            console.log(results[0].result.reps)
                                            const newArr = [...results];
                                            for (const ex of results) {
                                                if (ex.name === exerciseName) {
                                                    ex.result.reps[data.index] = Number(text)
                                                }
                                            }
                                            setResults(newArr)
                                            }
                                        }>
                                    </TextInput>
                                    <TextInput 
                                        placeholder="Weight: 0" 
                                        onChangeText={(text: string) => {
                                            const newArr = [...results];
                                            for (const ex of results) {
                                                if (ex.name === exerciseName) {
                                                    ex.result.weight[data.index] = Number(text)
                                                }
                                            }
                                            setResults(newArr)
                                            }
                                        }>
                                    </TextInput>
                                </View>)
                            }}/>
                    </View>)
                }}/>
            }
            </View>
            :
            <View>
                <Text>Workout: {workout.name}</Text>
                <FlatList data={results} extraData={results} keyExtractor={(item) => `${item.name}, ${item.result.reps}`} renderItem={({item, index}) => 
                {
                let exerciseName = item.name;
                return (
                <View>
                    <Text>Exercise: {item.name}</Text>
                    <FlatList data={new Array(item.result.reps.length).fill(0)} extraData={results} keyExtractor={(item, index) => `${item}, ${index}`} renderItem={({item, index}) => 
                    <View>
                        <Text>Set #{index + 1}</Text>
                        <TextInput placeholder="Reps: 0" onChangeText={(text: string) => {
                            const newArr = [...results];
                            for (const ex of newArr) {
                                if (ex.name === exerciseName) {
                                    ex.result.reps[index] = Number(text)
                                }
                            }
                        }}></TextInput>
                        <TextInput placeholder="Weight: 0" onChangeText={(text: string) => {
                            const newArr = [...results];
                            for (const ex of newArr) {
                                if (ex.name === exerciseName) {
                                    ex.result.weight[index] = Number(text)
                                }
                            }
                        }}></TextInput>
                    </View>
                    }/>
                    <Button title="Add set" onPress={() => addSet(exerciseName)} />
                </View>)}}/>
            </View>}
            <Button title="toggle timer" onPress={toggleTimer}/>
            <Button title="Log workout" onPress={submitWorkout}/>
        </View>
    )
}