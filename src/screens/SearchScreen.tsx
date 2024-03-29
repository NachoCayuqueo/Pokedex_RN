import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SearchInput} from '../components/SearchInput';
import {usePokemonSearch} from '../hooks/usePokemonSearch';
import {globalStyles} from '../theme/appTheme';
import {PokemonCard} from '../components/PokemonCard';
import {Loading} from '../components/Loading';
import {SimplePokemon} from '../interfaces/pokemonInterfaces';
import {PokemonNotFound} from '../components/PokemonNotFound';

const screenWidth = Dimensions.get('window').width;

export const SearchScreen = () => {
  const [term, setTerm] = useState('');
  const [pokemonFiltered, setPokemonFiltered] = useState<SimplePokemon[]>([]);

  const {top} = useSafeAreaInsets();
  const {isFetching, simplePokemonList} = usePokemonSearch();

  useEffect(() => {
    if (term.length === 0) {
      return setPokemonFiltered([]);
    }

    //* If it is not a number, search by name.
    if (isNaN(Number(term))) {
      setPokemonFiltered(
        simplePokemonList.filter(pokemon =>
          pokemon.name.toLocaleLowerCase().includes(term.toLocaleLowerCase()),
        ),
      );
    } else {
      //* If it is not a number, search by ID.
      const pokemonById = simplePokemonList.find(
        pokemon => pokemon.id === term,
      );
      setPokemonFiltered(pokemonById ? [pokemonById] : []);
    }
  }, [term]);

  if (isFetching) {
    return <Loading />;
  }
  console.log(pokemonFiltered.length);
  return (
    <View style={styles.container}>
      <SearchInput
        onDebounce={value => setTerm(value)}
        style={{
          ...styles.searchInput,
          width: screenWidth - 40,
          top: Platform.OS === 'ios' ? top : top + 30,
        }}
      />

      {term && pokemonFiltered.length === 0 ? (
        <PokemonNotFound />
      ) : (
        <FlatList
          data={pokemonFiltered}
          keyExtractor={pokemon => pokemon.id}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          ListHeaderComponent={
            <Text
              style={{
                ...globalStyles.title,
                ...globalStyles.globalMargin,
                ...styles.title,
                marginTop: Platform.OS === 'ios' ? top + 60 : top + 80,
              }}>
              {term}
            </Text>
          }
          renderItem={({item}) => <PokemonCard pokemon={item} />}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  title: {
    paddingBottom: 10,
  },
  searchInput: {
    position: 'absolute',
    zIndex: 999,
  },
});
