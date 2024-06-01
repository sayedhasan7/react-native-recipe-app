import { View, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';


const Splash = () => {

    const navigation = useNavigation()
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Home')
        }, 2000);
    }, [])

    return (
        <View style={style.container}>
            <Animatable.Image animation={"slideInUp"} source={require("../assets/images/splashlogo.png")} style={style.image} ></Animatable.Image>
            <Animatable.Text animation={"slideInUp"} style={{ color: "black", fontSize: 50, fontWeight: '600', marginTop: 10 }}>Recipe Pro</Animatable.Text>
            <Animatable.Text animation={"fadeIn"} style={style.tagline}>Search Any Recipe With Health Filter</Animatable.Text>

        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#05B681"
    },
    image: {
        height: 200,
        width: 200
    },
    tagline: {
        position: "absolute",
        fontSize: 20,
        bottom: 50,
        color: "black",
        fontWeight: "500"
    }
})

export default Splash