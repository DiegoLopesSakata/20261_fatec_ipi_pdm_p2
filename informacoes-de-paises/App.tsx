import { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

export default function App() {
  const [nome, setNome] = useState('');
  const [resultado, setResultado] = useState(null);

  const BuscaNome = async () => {
    const resposta = await fetch(
      `https://restcountries.com/v3.1/name/${nome}`
    );
    const info = await resposta.json();
      setResultado(info[0]);
      console.log(info[0]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.div}>
        <Text style={styles.title}>BUSQUE POR PAÍSES</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o nome de um país"
          value={nome}
          onChangeText={setNome}
        />
        <Pressable style={styles.button} onPress={BuscaNome}>
          <Text style={styles.textButton}>BUSCAR</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  div: {
    flex: 1,
    width: '80%',
    marginVertical: 30,
    padding: 20,
    backgroundColor: '#a459eb63',
    borderWidth: 3,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#08000a',
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '50%',
    height: 40,
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: '#000000',
  },
  button: {
    backgroundColor: '#2416eca2',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    width: '50%',
  },
  textButton: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});