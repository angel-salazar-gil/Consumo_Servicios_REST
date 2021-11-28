import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { FlatList, StyleSheet, Text, View, Button } from 'react-native';

//export default function App() {
export default class App extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      loading: false,
      pokemon: [],
      url: 'https://pokeapi.co/api/v2/pokemon/'
    }
    
  }

  componentDidMount(){
    this.getPokemon();
  }

  getPokemon = () => {
    this.setState({ loading:true })
    fetch(this.state.url)
    .then(res => res.json())
    .then( res=> {
      this.setState({
        pokemon: res.results,
        url: res.next,
        loading: false
      })

    });

  };

  render(){

    if(this.state.loading){
      return (
        <View style={styles.container}>
          <Text>Descargando Pokemons !</Text>
          <StatusBar style="auto" />
        </View>
      );
    }

    return (
      <View style={{flex: 1, paddingTop: 50, paddingLeft:5}}>
        <Text style={styles.titulo}>Listado de Pokemons</Text>
        <FlatList
          data={this.state.pokemon}
          renderItem={
            ({item}) => <Text onPress={() => console.log('Hello World')} style={styles.caja}> {item.name} </Text>
          }
        />
        <Button
        title="Press me"
        color="#f194ff"
        onPress={() => console.log('Hello World')}
      />
      </View>
    );
    
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  caja: {
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'blue',
    maxWidth: '150vw',
    height: '100px',
    margin: '15px',
    textAlign: 'center',
    fontSize: '16px',
    fontWeight: 'bold',
    paddingTop: '35px',
    textTransform: 'uppercase',
  },

  titulo: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '20px',
    marginBottom: '20px'
  }

});
