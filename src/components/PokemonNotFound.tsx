import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

export const PokemonNotFound = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/pokebola-busqueda.png')}
        style={styles.pokeball}
      />
      <Text style={styles.text}>Lo siento</Text>
      <Text style={styles.text}>No se encontro el pokemon</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pokeball: {
    width: 250,
    height: 250,
    bottom: -20,
  },
  text: {
    color: 'black',
    fontSize: 20,
    marginTop: 10,
  },
});
