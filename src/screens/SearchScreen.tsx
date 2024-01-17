import React from 'react';
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

const screenWidth = Dimensions.get('window').width;

export const SearchScreen = () => {
  const {top} = useSafeAreaInsets();
  const {isFetching, simplePokemonList} = usePokemonSearch();

  if (isFetching) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <SearchInput
        style={{
          ...styles.searchInput,
          width: screenWidth - 40,
          top: Platform.OS === 'ios' ? top : top + 30,
        }}
      />

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
              marginTop: Platform.OS === 'ios' ? top + 60 : top + 80,
            }}>
            Pokedex
          </Text>
        }
        renderItem={({item}) => <PokemonCard pokemon={item} />}
      />
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
