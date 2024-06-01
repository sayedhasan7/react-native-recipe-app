import React from 'react'
import { StyleSheet } from 'react-native'
import AppNavigator from './src/AppNavigator'
import { PaperProvider } from 'react-native-paper'


const App = () => {
  return (
    <>
      <PaperProvider>
        <AppNavigator />
      </PaperProvider>
    </>
  )
}

const style = StyleSheet.create({
  text: {
    fontSize: 40
  },
  highlight: {
    padding: 10,
    margin: 10,
    backgroundColor: "red",
    borderRadius: 10,
    color: "white"
  },
  container: {
    backgroundColor: "black",
    flex: 1,
    height: "auto",
    width: "auto",
    justifyContent: "center",
    alignItems: "center",
    color: "white"
  }
})
export default App