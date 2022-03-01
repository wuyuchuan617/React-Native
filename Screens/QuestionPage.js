import React, { useState, useContext } from "react"
import { ThemeContext } from "../theme/theme-context"

import { QUESTIONS, CATEGORY } from "../const/const.js"
import {
    StyleSheet,
    Text,
    View,
    Button,
    TextInput,
    ScrollView,
    SectionList,
    FlatList,
    SafeAreaView,
    Dimensions,
    Image,
    Share,
} from "react-native"

function QuestionPage({ route, navigation }) {
    const { movie } = route.params
    const { dark, theme, toggle } = useContext(ThemeContext)

    const [random, setRandom] = useState(null)
    const [question, setQuestion] = useState(QUESTIONS)

    const [category, setCategory] = useState("ALL")

    const getRandom = (min, cate) => {
        let filterQuestion
        if (cate === "ALL") {
            filterQuestion = QUESTIONS
        } else {
            filterQuestion = QUESTIONS.filter((item) => item.Category === cate)
        }
        setQuestion(filterQuestion)
        // console.log("filterQuestion", filterQuestion)
        let max = filterQuestion.length - 1
        // console.log(max)
        if (cate) setRandom(Math.floor(Math.random() * (max - min + 1)) + min)
    }

    const onShare = async (text) => {
        try {
            const result = await Share.share({
                message: text,
            })
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message)
        }
    }
    return (
        <View>
            <View
                style={{
                    width: Dimensions.get("window").width - 80,
                    height: 60,
                    margin: 10,
                    marginBottom: 30,
                    marginTop: 20,
                    display: "flex",
                    flexDirection: "row",
                    alignContent: "center",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                {CATEGORY.map((item, index) => {
                    return (
                        <>
                            <Text
                                style={{
                                    backgroundColor:
                                        category === item.Value ? "grey" : null,
                                }}
                                onPress={() => {
                                    setCategory(item.Value)
                                }}
                            >
                                {item.Name}
                            </Text>
                        </>
                    )
                })}
            </View>
            <Button
                style={{
                    padding: 10,
                    fontSize: 14,
                    fontWeight: "600",
                }}
                title="Pick one question"
                onPress={() => getRandom(0, category)}
            ></Button>
            <Text>Index: {random}</Text>
            <Text>category: {category}</Text>
            <Text>Question: {question[random ? random : 0]?.Name}</Text>
            <Text>Category: {question[random ? random : 0]?.Category}</Text>
            <Text>Difficult: {question[random ? random : 0]?.Difficult}</Text>
            <Button
                onPress={() => onShare(question[random ? random : 0]?.Name)}
                title="Share"
            />
        </View>
    )
}

export default QuestionPage
