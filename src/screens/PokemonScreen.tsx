import React from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../navigator/Tab1';

import Icon from 'react-native-vector-icons/Ionicons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {FadeInImage} from '../components/FadeInImage';
import {usePokemon} from '../hooks/usePokemon';
import {PokemonDetails} from '../components/PokemonDetails';

interface Props extends StackScreenProps<RootStackParams, 'PokemonScreen'> {}

export const PokemonScreen = ({navigation, route}: Props) => {
  const {simplePokemon, color} = route.params;
  const {id, name, picture} = simplePokemon;

  const {top} = useSafeAreaInsets();

  const {isLoading, pokemon} = usePokemon(id);

  return (
    <View style={styles.container}>
      <View style={{...styles.headerContainer, backgroundColor: color}}>
        {/* back button */}
        <TouchableOpacity
          onPress={() => navigation.pop()}
          activeOpacity={0.8}
          style={{...styles.backButton, top: top + 5}}>
          <Icon name="arrow-back-outline" color="white" size={35} />
        </TouchableOpacity>

        {/* pokemon name */}
        <Text style={{...styles.pokemonName, top: top + 40}}>
          {name + '\n'}#{id}
        </Text>

        {/* pokeball white */}
        <Image
          source={require('../assets/pokebola-blanca.png')}
          style={styles.pokeball}
        />

        <FadeInImage uri={picture} style={styles.pokemonImage} />
      </View>

      {/* loading */}
      {isLoading ? (
        <View style={styles.loadingIndicator}>
          <ActivityIndicator color={color} size={50} />
        </View>
      ) : (
        <PokemonDetails pokemon={pokemon} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    height: 370,
    zIndex: 999,
    alignItems: 'center',
    borderBottomRightRadius: 1000,
    borderBottomLeftRadius: 1000,
  },
  backButton: {
    position: 'absolute',
    left: 20,
  },
  pokemonName: {
    color: 'white',
    fontSize: 40,
    alignSelf: 'flex-start',
    left: 20,
  },
  pokeball: {
    width: 250,
    height: 250,
    bottom: -20,
    opacity: 0.7,
  },
  pokemonImage: {
    width: 250,
    height: 250,
    position: 'absolute',
    bottom: -15,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
