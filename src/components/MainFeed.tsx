import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { GET_USER_FEED } from "../GQL/queries";

export default function MainFeed ({userData}: any) {

    console.log(userData.id)

    const {data, loading, error} = useQuery(GET_USER_FEED, {variables: {id: userData.id}})

    return (
        <View>
            <Text>
                Hi
            </Text>
            {data && <Text>{data.getUserFeed.id}</Text>}
        </View>
    )
}