import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {PokemonCard} from '../components/PokemonCard';
import {usePokemonPaginated} from '../hooks/usePokemonPaginated';

import {globalStyles} from '../theme/appTheme';

export const HomeScreen = () => {
  const {top} = useSafeAreaInsets();
  const {simplePokemonList, loadPokemons} = usePokemonPaginated();

  return (
    <>
      <Image
        source={require('../assets/pokebola.png')}
        style={globalStyles.pokebolaBG}
      />

      <View style={styles.container}>
        <FlatList
          data={simplePokemonList}
          keyExtractor={pokemon => pokemon.id}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          ListHeaderComponent={
            <Text
              style={{
                ...globalStyles.title,
                ...globalStyles.globalMargin,
                ...styles.title,
                top: top + 20,
                marginBottom: top + 20,
              }}>
              Pokedex
            </Text>
          }
          renderItem={({item}) => <PokemonCard pokemon={item} />}
          //infinite scroll
          onEndReached={loadPokemons}
          onEndReachedThreshold={0.4}
          ListFooterComponent={
            <ActivityIndicator style={styles.footer} size={20} color="grey" />
          }
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  title: {
    paddingBottom: 10,
  },
  footer: {
    height: 100,
  },
});
