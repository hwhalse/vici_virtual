import React, { useEffect, useRef, useState } from "react";
import { FlatList, Text, View, ListRenderItem, Button, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import EncryptedStorage from "react-native-encrypted-storage";
import { useMutation } from "@apollo/client";
import { LOG_WORKOUT } from "../../GQL/queries";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { Svg, Circle } from "react-native-svg";
import Animated, { useAnimatedProps, useSharedValue, withTiming, useDerivedValue } from "react-native-reanimated";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const radius = 45;
const AnimatedText = Animated.createAnimatedComponent(Text)

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

export default function LogWorkout ({route, navigation}: any) {

    const {workout} = route.params
    let times = useRef([3])
    let order = useRef(['Ready'])
    const [count, setCount] = useState(times.current[0])
    
    const [running, setRunning] = useState(false)
    const [currentExercise, setCurrentExercise] = useState(order.current[0])
    const [results, setResults] = useState<ExerciseReps[]>([])
    const [timerMode, setTimerMode] = useState(true)
   
    let intervalRef = useRef<any>()

    const strokeOffset = useSharedValue(radius * Math.PI * 2);
    const circumference = radius * Math.PI * 2

    const percentage = useDerivedValue(() => {
        const number = ((circumference - strokeOffset.value) / (circumference)) * 100;
        return withTiming(number, {duration: 2000});
      });

    const [logWorkout] = useMutation(LOG_WORKOUT, {
        onError: ((err: Error) => console.log(err))
    })

    const breaks = 120;

    const countdown = () => {
        setRunning(true)

        if (times.current.length === 0) return clearInterval(intervalRef.current)
       
        if (order.current[0] !== 'Ready' && order.current[0] !== 'rest' && order.current[0] !== 'break') {
            const newArr = results;
            if (newArr.length === 0) {
                newArr.push({name: order.current[0], result: {reps: [0], weight: [0]}})
            } else {
                let addNew = true
                for (const ex of newArr) {
                    if (ex.name === order.current[0]) {
                        ex.result.reps.push(0)
                        ex.result.weight.push(0)
                        addNew = false
                    }
                }
                if (addNew) newArr.push({name: order.current[0], result: {reps: [0], weight: [0]}})
            }
            setResults(newArr)
        }

        setCount(times.current[0])
        times.current = [...times.current.slice(1)];
        order.current = [...order.current.slice(1)];

        intervalRef.current = setInterval(() => {
            setCount(prev => {
                console.log(prev)
                if (prev === 0) {
                    stopTimer()
                    countdown()
                    return 0
                } else {
                    return prev - 1
                }
            })
        }, 1000)
    }

    const getUserInfo = async (): Promise<void> => {
        try {
          const info = await EncryptedStorage.getItem("user_session");
          console.log(info)
          if (info !== null) {
            const obj = await JSON.parse(info)
          }
        } catch(err) {
            console.log(err)
        }
    }

    const stopTimer = () => {
        clearInterval(intervalRef.current)
        intervalRef.current = 0
        setRunning(false)
    }

    const pauseTimer = () => {
        stopTimer()
        times.current = [count, ...times.current]
    }

    const populateTimes = () => {
        times.current = [3];
        order.current = ['Ready'];
        for (const exercise of workout.exercises) {
            for (let i = 0; i < exercise.sets; i++) {
                order.current = [...order.current, exercise.name, 'rest']
                times.current = [...times.current, exercise.work, exercise.rest]
            }
            times.current = [...times.current, breaks]
            order.current = [...order.current, 'break']
        }
        order.current = [...order.current, 'done']
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
    }

    const submitWorkout = () => {
        if (results.length === 0) return
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

    const animatedTextProps = useAnimatedProps(() => {
        return {
          text: `${Math.round(percentage.value)}`,
        };
      });

    const populateWorkout = () => {
        setResults([])
        const newArr = [...results];
        for (const ex of workout.exercises) {
            const repsAndWeight = new Array(ex.sets).fill(0)
            newArr.push({name: ex.name, result: {reps: repsAndWeight, weight: repsAndWeight}})
        }
        setResults(newArr)
    }

    const animatedCircleProps = useAnimatedProps(() => {
        return {
            strokeDashoffset: withTiming(strokeOffset.value, {duration: 2000})
        }
    })

    useEffect(() => {
        populateTimes()
        getUserInfo()
        if (timerMode === false) populateWorkout()
        strokeOffset.value = 0
    }, [timerMode])
    
    return (
        <View style={{padding: 5}}>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Text style={{fontWeight: 'bold', fontSize: 25}}>
                    Workout: {workout.name}
                </Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 15, alignItems: 'center', marginBottom: 15}}>
                <TouchableOpacity onPress={toggleTimer} style={{backgroundColor: 'red', padding: 6, borderRadius: 5, marginLeft: 5}}>
                    <Text>{timerMode ? 'Turn timer off' : 'Turn timer on'}</Text>
                </TouchableOpacity>
            </View>
            {timerMode ?
            <View>
                <View style={{alignItems: 'center', marginTop: 10, justifyContent: 'center'}}>
                    <CountdownCircleTimer
                        isPlaying={running}
                        key={times.current[0]}
                        duration={times.current[0]}
                        // onComplete={(time: number): any => {return {shouldRepeat: true, delay: 1.5}}}
                        colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                        colorsTime={[7, 5, 2, 0]}>
                        {({remainingTime}) => <Text>{remainingTime}</Text>}
                    </CountdownCircleTimer>
                    {/* <AnimatedText style={{color: 'black', fontSize: 15, fontWeight: 'bold', position: 'absolute'}} animatedProps={animatedTextProps}/> */}
                    {/* <AnimatedText>

                    </AnimatedText>
                    <Svg height="50%" width="50%" viewBox="0 0 100 100" >
                        <AnimatedCircle 
                        animatedProps={animatedCircleProps} 
                        cx="50"
                        cy="50"
                        r="45"
                        stroke="rgb(246, 79, 89)"
                        fill={'white'}
                        opacity={0.2}
                        strokeWidth="5"
                        strokeDasharray={`${radius * Math.PI * 2}`}
                        />
                    </Svg> */}
                </View>
                <View style={{alignItems: 'center', marginTop: 10, marginBottom: 10}}>
                    <Text style={{fontSize: 20}}>Current exercise: {currentExercise}</Text>
                </View>
                <Button title="start workout" onPress={countdown}/>
                <Button title="stop" onPress={stopTimer}/>
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
            <Button title="Log workout" onPress={submitWorkout}/>
        </View>
    )
}