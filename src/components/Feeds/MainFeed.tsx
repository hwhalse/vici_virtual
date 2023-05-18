import { useQuery, useLazyQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { GET_GLOBAL_FEED, GET_USER_FEED, GET_WORKOUT_IDS } from "../../GQL/queries";
import { FlatList } from "react-native-gesture-handler";
import MainFeedItem from "./MainFeedItem";

export default function MainFeed ({userData, navigation}: any) {

    // const followingWorkouts = useQuery(GET_USER_FEED, {variables: {id: Number(userData.id)}});

    const {data, loading, error} = useQuery(GET_GLOBAL_FEED);

    const results = useQuery(GET_WORKOUT_IDS, {variables: {id: 1}});

    console.log(data)


    return (
        <View>
            {data && results.data &&
            <FlatList data={data.getGlobalFeed} keyExtractor={((item, index) => `${item.author_id}, ${index}`)} renderItem={(({item}) => <MainFeedItem workout={item} navigation={navigation} workoutIds={results.data.getWorkoutIds} />)} /> 
            }
        </View>
    )
}