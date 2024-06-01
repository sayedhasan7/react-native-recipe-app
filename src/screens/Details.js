import { View, StyleSheet, TouchableOpacity, Linking } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'
import { Image } from 'react-native-animatable'
import { Divider, Text, Card } from 'react-native-paper'
import { ScrollView } from 'react-native-gesture-handler'

const Details = () => {
  const route = useRoute()
  const { label, image, url, source, totalWeight, mealType, calories, ingredientLines, healthLabels, totalNutrients } = route.params.data.recipe

  return (
    <ScrollView style={styles.container}>

      <View style={{ height: 300, width: "100%", position: "relative" }}>
        <Image source={{ uri: image }} style={{ height: 300, width: "100%" }}></Image>
        <Text on onPress={() => {
          Linking.openURL(url)
        }} variant='titleSmall' style={{ position: "absolute", bottom: 0, right: 0, backgroundColor: "#05B681", color: "white", padding: 10, borderTopLeftRadius: 10 }}>Added By : {source}</Text>
      </View>
      <Divider />


      <Text variant='headlineSmall' style={{ padding: 10, fontWeight: "bold" }}>{label}</Text>


      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={{ flex: 1, flexDirection: "row" }}>
          {healthLabels.map((item, index) => { return <Text key={"healthlabel" + index} style={{ margin: 10, padding: 10, backgroundColor: "#05B681", borderRadius: 10, color: "white" }}>{item}</Text> })}
        </View>
      </ScrollView>


      <View style={{ margin: 10, marginLeft: 15, marginRight: 15 }}>
        <Text variant='titleLarge'>Ingeredient</Text>
        <TouchableOpacity style={{ position: "absolute", right: 0 }}>
          <Text style={{ textDecorationLine: "underline" }}>View All</Text>
        </TouchableOpacity>
      </View>
      <Card style={{ backgroundColor: "white", margin: 10, padding: 10 }}>
        {ingredientLines.map((item, index) => {
          return <View key={"ingredientlines" + index}>
            <Text variant="bodyLarge" style={{ padding: 5 }}>{item}</Text>
            {index === ingredientLines.length - 1 ? null : <Divider />}
          </View>
        })}
      </Card>


      <View style={{ margin: 10, marginLeft: 15 }}>
        <Text variant='titleLarge'>Details</Text>
      </View>
      <Card style={{ margin: 10, marginTop: 0, backgroundColor: "white", padding: 10 }}>
        <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", paddingTop: 10, paddingBottom: 10 }}>
          <Text variant='bodyLarge'>Calories</Text>
          <Text style={{ color: "#05B681" }} variant='bodyLarge'>{calories}</Text>
        </View>
        <Divider />
        <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", paddingTop: 10, paddingBottom: 10 }}>
          <Text variant='bodyLarge'>Total Weight</Text>
          <Text style={{ color: "#05B681" }} variant='bodyLarge'>{totalWeight}</Text>
        </View>
        <Divider />
        <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", paddingTop: 10, paddingBottom: 10 }}>
          <Text variant='bodyLarge'>Meal Type</Text>
          <Text style={{ color: "#05B681" }} variant='bodyLarge'>{mealType}</Text>
        </View>
      </Card>


      <View style={{ margin: 10, marginLeft: 15 }}>
        <Text variant='titleLarge'>Nutrients</Text>
      </View>
      <Card style={styles.table}>
        <View style={styles.row}>
          <Text style={[styles.headerCell, { textAlign: "left", flex: 0.6 }]}>Label</Text>
          <Text style={[styles.headerCell, { textAlign: "left", flex: 0.4 }]}>Quantity</Text>
        </View>
        {Object.entries(totalNutrients).map(([key, value]) => (
          <View key={key}>
            <View style={styles.row}>
              <Text style={[styles.cell, { textAlign: "left", flex: 0.6 }]}>{key}</Text>
              <Text style={[styles.cell, { textAlign: "left", flex: 0.4 }]}>{value.quantity} {value.unit}</Text>
            </View>
            <Divider />
          </View>
        ))}
      </Card>


    </ScrollView >
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  table: {
    backgroundColor: '#ffffff',
    borderWidth: .5,
    borderColor: '#cccccc',
    margin: 10,
    padding: 10
  },
  row: {
    flexDirection: 'row',

  },
  headerCell: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 5,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cell: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 5,
    textAlign: 'center',
  },
})
export default Details