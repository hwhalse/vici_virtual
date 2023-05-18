import React, { useState } from "react";
import { View, Text, TextInput, Button, TouchableOpacity, FlatList } from "react-native";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import { CREATE_EXERCISE, GET_EQUIPMENT, SEARCH_EQUIPMENT } from "../../GQL/queries";
import Equipment from "./Equipment";
import CreateExerciseList from "./CreateExerciseList";

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

    const [showTypes, setShowTypes] = useState(false);
    const [showPosture, setShowPosture] = useState(false);
    const [showMovements, setShowMovements] = useState(false);
    const [showSymmetry, setShowSymmetry] = useState(false);

    const [searchName, setSearchName] = useState('')

    const [createExercise] = useMutation(CREATE_EXERCISE, {
      onError: (err) => console.log(JSON.stringify(err))
    })

    const addToEquipment = (name: string) => {
      setEx({...ex, equipment: [...ex.equipment, name]})
    }

    const deleteFromEquipment = (name: string): void => {
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
            {ex.equipment && <FlatList data={ex.equipment} keyExtractor={(item, index) => `${item}, ${index}`}renderItem={({item}) => <CreateExerciseList text={item} callback={() => deleteFromEquipment(item)} />} />}
            <Button title="Add Type" onPress={() => setShowTypes(!showTypes)}/>
            {showTypes && <FlatList data={types} keyExtractor={(item, index) => `${item} ${index}`} renderItem={({item}) => <CreateExerciseList text={item} callback={() => setEx({...ex, type: item})} toggle={() => setShowTypes(!showTypes)} />}/>}
            <Button title="Add Posture" onPress={() => setShowPosture(!showPosture)}/>
            {showPosture && <FlatList data={postures} keyExtractor={(item, index) => `${item} ${index}`} renderItem={({item}) => <CreateExerciseList text={item} callback={() => setEx({...ex, posture: item})} toggle={() => setShowPosture(!showPosture)} />}/>}
            <Button title="Add Movement" onPress={() => setShowMovements(!showMovements)}/>
            {showMovements && <FlatList data={movements} keyExtractor={(item, index) => `${item} ${index}`} renderItem={({item}) => <CreateExerciseList text={item} callback={() => setEx({...ex, movement: item})} toggle={() => setShowMovements(!showMovements)} />}/>}
            <Button title="Add Symmetry" onPress={() => setShowSymmetry(!showSymmetry)}/>
            {showSymmetry && <FlatList data={symmetrys} keyExtractor={(item, index) => `${item} ${index}`} renderItem={({item}) => <CreateExerciseList text={item} callback={() => setEx({...ex, symmetry: item})} toggle={() => setShowSymmetry(!showSymmetry)} />}/>}
            <Button title="Save Exercise" onPress={addExercise} />
        </View>
        <View>
            <Text>Add Equipment:</Text>
            <TextInput placeholder="..." onChangeText={(text: string) => setSearchName(text)}/>
            {data && <FlatList data={data.getEquipmentByString.filter((equipment: any) => !ex.equipment.includes(equipment.name))} keyExtractor={(item, index) => `${item}, ${index}`} renderItem={({item}) => <Equipment add={addToEquipment} name={item.name}/>} />}
            <Button title="Search Equipment" onPress={search}/>
        </View>
    </View>
  )
}