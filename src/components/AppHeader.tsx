import React from "react";
import { View, Text, Button } from "react-native";
import Home from "./Home";
import Profile from "./Profile/Profile";

export default function AppHeader ({style}: any) {
    return (
        <View style={{minHeight: 50, backgroundColor: 'gainsboro'}}>
            <Text style={{marginTop: 60}}>
                Hi
            </Text>
        </View>
    )
}