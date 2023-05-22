import React from "react";
import { View, Text } from "react-native";
import { FlatList } from "react-native-gesture-handler";

export default function LoggedWorkoutExercises ({list, index}: any) {
    
    return (
        <View>
            <View style={{flexDirection: 'row', justifyContent: 'space-around', paddingTop: 5, paddingBottom: 5}}>
                <Text style={{fontWeight: 'bold'}}>
                    Exercise #{index + 1}:  
                </Text>
                <Text style={{marginLeft: 2, flex: 1, flexWrap: 'wrap'}}>
                        {list.name}
                </Text>
            </View>
            <FlatList data={list.result[0].reps} keyExtractor={(item, index) => `${item}, ${index}`} renderItem={({item, index}) => 
                <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 3, marginBottom: 3, borderWidth: 1}}>
                    <Text>Set #{index + 1}</Text>
                    <Text>Reps: {item}</Text>
                    <Text>Weight: {list.result[0].weight[index]}</Text>
                </View>
            }/>
        </View>
    )
}