import React from 'react';
import {ScrollView, Text, View, StyleSheet} from 'react-native';
import {PokemonFull} from '../interfaces/pokemonInterfaces';
import {FadeInImage} from './FadeInImage';

interface Props {
  pokemon: PokemonFull;
}

export const PokemonDetails = ({pokemon}: Props) => {
  return (
    <ScrollView
      keyboardShouldPersistTaps="never"
      showsVerticalScrollIndicator={false}
      style={{
        ...StyleSheet.absoluteFillObject,
      }}>
      <View style={{...styles.container, marginTop: 370}}>
        <Text style={styles.title}>Types</Text>
        <View style={styles.containerTypes}>
          {pokemon.types.map(({type}) => (
            <Text key={type.name} style={styles.regularText}>
              {type.name}
            </Text>
          ))}
        </View>

        <Text style={styles.title}>Peso</Text>
        <Text style={styles.regularText}>{pokemon.weight} Kg</Text>
      </View>

      <View style={{...styles.container, marginTop: 20}}>
        <Text style={styles.title}>Sprites</Text>
      </View>

      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {pokemon.sprites.front_default && (
          <FadeInImage
            uri={pokemon.sprites.front_default}
            style={styles.basicSprite}
          />
        )}

        {pokemon.sprites.back_default && (
          <FadeInImage
            uri={pokemon.sprites.back_default}
            style={styles.basicSprite}
          />
        )}

        {pokemon.sprites.front_shiny && (
          <FadeInImage
            uri={pokemon.sprites.front_shiny}
            style={styles.basicSprite}
          />
        )}
        {pokemon.sprites.back_shiny && (
          <FadeInImage
            uri={pokemon.sprites.back_shiny}
            style={styles.basicSprite}
          />
        )}
      </ScrollView>

      <View style={styles.container}>
        <Text style={styles.title}>Habilidades Base</Text>
        <View style={styles.containerTypes}>
          {pokemon.abilities.map(({ability}, index) => (
            <Text key={ability.name + index} style={styles.regularText}>
              {ability.name}
            </Text>
          ))}
        </View>
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>Movimientos</Text>
        <View style={styles.moves}>
          {pokemon.moves.map(({move}) => (
            <Text key={move.name} style={styles.regularText}>
              {move.name}
            </Text>
          ))}
        </View>
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>Stats</Text>
        <View>
          {pokemon.stats.map((stat, index) => (
            <View key={stat.stat.name + index} style={styles.stats}>
              <Text
                key={stat.stat.name}
                style={{...styles.regularText, width: 150}}>
                {stat.stat.name}
              </Text>

              <Text style={{...styles.regularText, fontWeight: 'bold'}}>
                {stat.base_stat}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.footerImage}>
          <FadeInImage
            uri={pokemon.sprites.front_default}
            style={styles.basicSprite}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  containerTypes: {
    flexDirection: 'row',
  },
  moves: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  stats: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
  },
  regularText: {
    fontSize: 18,
    marginRight: 10,
  },
  basicSprite: {
    width: 100,
    height: 100,
  },
  footerImage: {
    marginBottom: 55,
    alignItems: 'center',
  },
});
