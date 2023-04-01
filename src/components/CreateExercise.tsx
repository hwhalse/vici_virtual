import React, { useState } from "react";
import { View, Text, TextInput, Button, TouchableOpacity } from "react-native";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import { CREATE_EXERCISE, GET_EQUIPMENT, SEARCH_EQUIPMENT } from "../GQL/queries";
import Equipment from "./Equipment";

interface ExerciseItem {
    name: string;
    type: string;
    posture: string;
    movement: string;
    symmetry: string;
    equipment: string[];
}

export default function CreateExercise () {

    const [ex, setEx] = useState<ExerciseItem>({
        name: '',
        type: '',
        posture: '',
        movement: '',
        symmetry: '',
        equipment: []
    })

    const [showPosture, setShowPosture] = useState(false)
    const [showMovement, setShowMovement] = useState(false)
    const [showSymmetry, setShowSymmetry] = useState(false)
    const [showTypes, setShowTypes] = useState(false)

    const [searchName, setSearchName] = useState('')

    const [createExercise] = useMutation(CREATE_EXERCISE, {
      onError: (err) => console.log(JSON.stringify(err))
    })

    const addToEquipment = (name: string) => {
      setEx({...ex, equipment: [...ex.equipment, name]})
    }

    const deleteFromEquipment = (name: string) => {
      setEx({...ex, equipment: ex.equipment.filter((el: string) => el !== name)})
    }
    
    const addExercise = (e: any): void => {
        createExercise({variables: {
          input: ex
        }
      })
    }

    const postures = ['standing', 'seated', 'prone', 'supine'];
    const movements = ['knee dominant', 'hip dominant', 'vertical press', 'vertical pull', 'horizontal press', 'horizontal pull', 'core', 'rotation', 'run', 'swim', 'cycle', 'striking', 'grappling', 'throwing'];
    const symmetrys = ['bilateral', 'unilateral', 'alternating'];
    const types = ['resistance', 'flexibility', 'mobility', 'stability', 'cardio', 'hybrid']

    const equipment = useQuery(GET_EQUIPMENT)

    const [getEquipment, {loading, error, data}] = useLazyQuery(SEARCH_EQUIPMENT)

    const search = () => {
      getEquipment({variables: {name: searchName}})
    }

    const showType = () => {
      setShowTypes(!showTypes)
    }

    const posture = () => {
      setShowPosture(!showPosture)
    }

    const movement = () => {
      setShowMovement(!showMovement)
    }

    const symmetry = () => {
      setShowSymmetry(!showSymmetry)
    }

  return (
    <View>
      <Text>Add Exercise:</Text>
        <View style={{display: 'flex'}}>
            <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{marginRight: 5}}>Name: {ex.name}</Text>
            <TextInput onChangeText={((text: string) => setEx({...ex, name: text}))} style={{marginTop: 5, marginBottom: 5}} value={ex.name} placeholder="..."></TextInput>
            </View>
            <Text style={{marginRight: 5}}>Type: {ex.type}</Text>
            <Text>Posture: {ex.posture}</Text>
            <Text style={{marginRight: 5}}>Movement: {ex.movement}</Text>
            <Text style={{marginRight: 5}}>Symmetry: {ex.symmetry}</Text>
            <Text>Equipment:</Text>
            {ex.equipment && ex.equipment.map((name, i) => <View style={{flexDirection: 'row'}}><Text key={i + 49}>{name}</Text><Button title="-" onPress={() => deleteFromEquipment(name)}/></View>)}
            <Button title="Add Type" onPress={showType}/>
            {showTypes && types.map((el: any) => <View style={{flexDirection: 'row', alignItems: 'center'}}><Text>{el}</Text><Button title="+" onPress={() => {setEx({...ex, type: el});posture()}}/></View>)}
            <Button title="Add Posture" onPress={posture}/>
            {showPosture && postures.map((el: any) => <View style={{flexDirection: 'row', alignItems: 'center'}}><Text>{el}</Text><Button title="+" onPress={() => {setEx({...ex, posture: el});posture()}}/></View>)}
            <Button title="Add Movement" onPress={movement}/>
            {showMovement && movements.map((el: any) => <View style={{flexDirection: 'row', alignItems: 'center'}}><Text>{el}</Text><Button title="+" onPress={() => {setEx({...ex, movement: el});movement()}}/></View>)}
            <Button title="Add Symmetry" onPress={symmetry}/>
            {showSymmetry && symmetrys.map((el: any) => <View style={{flexDirection: 'row', alignItems: 'center'}}><Text>{el}</Text><Button title="+" onPress={() => {setEx({...ex, symmetry: el});symmetry()}}/></View>)}
            <Button title="Save Exercise" onPress={addExercise} />
        </View>
        <View>
            <Text>Add Equipment:</Text>
            <TextInput placeholder="..." onChangeText={(text: string) => setSearchName(text)}/>
            {data && data.getEquipmentByString.filter((equipment: any) => !ex.equipment.includes(equipment.name)).map((equipment: any, i: number) => <Equipment key={i + 50} add={addToEquipment} name={equipment.name}/>)}
            <Button title="Search Equipment" onPress={search}/>
        </View>
    </View>
  )
}