import React from "react";
import { View, Text, Button } from "react-native";

interface Props {
    name: string
    add: Function
}

export default function Equipment ({ name, add }: Props) {

    return (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text>{name}</Text>
            <Button title="+" onPress={() => add(name)}/>
        </View>
    )
}