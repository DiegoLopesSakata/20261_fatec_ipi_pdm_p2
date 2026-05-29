import { useState } from 'react'
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'

export default function App() {
  const [nome, setNome] = useState('')
  const [nomeComum, setNomeComum] = useState('')
  const [nomeOficial, setNomeOficial] = useState('')
  const [nomeRusso, setNomeRusso] = useState('')
  const [mapa, setMapa] = useState('')
  const [bandeira, setBandeira] = useState('')
  const [exibicao, setExibicao] = useState('')

  const BuscaNome = async () => {
    const resposta = await fetch(
      `https://restcountries.com/v3.1/name/${nome}`
    )
    const resultado = await resposta.json()
    setNomeComum(resultado[0].name.common)
    setNomeOficial(resultado[0].name.official)
    setNomeRusso(resultado[0].translations.rus.common)
    setMapa(resultado[0].maps.openStreetMaps)
    setExibicao('pais')
  }

  const BuscaCapital = async () => {
    const resposta = await fetch(
      `https://restcountries.com/v3.1/capital/${nome}`
    )
    const resultado = await resposta.json()
    setNomeOficial(resultado[0].name.official)
    setBandeira(resultado[0].flags.png)
    setExibicao('capital')
  }

  return (
    <View style={styles.container}>
      <View style={styles.div}>
        <Text style={styles.title}>INFORMAÇÕES DOS PAÍSES</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o nome de um país"
          value={nome}
          onChangeText={setNome}
        />
        <Pressable style={styles.button} onPress={BuscaNome}>
          <Text style={styles.textButton}>BUSCAR POR PAÍS</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={BuscaCapital}>
          <Text style={styles.textButton}>BUSCAR POR CAPITAL</Text>
        </Pressable>
        {exibicao === 'pais' && (
          <View style={styles.resultDiv}>
            <Text style={styles.title}>RESULTADO</Text>
            <View style={styles.infoDiv}>
              <Text style={styles.label}>Nome comum:</Text>
              <Text style={styles.value}>{nomeComum}</Text>
              <Text style={styles.label}>Nome oficial:</Text>
              <Text style={styles.value}>{nomeOficial}</Text>
              <Text style={styles.label}>Nome em russo:</Text>
              <Text style={styles.value}>{nomeRusso}</Text>
              <Text style={styles.label}>Mapa:</Text>
              <Text style={styles.value}>{mapa}</Text>
            </View>
          </View>
        )}
        {exibicao === 'capital' && (
          <View style={styles.resultDiv}>
            <Text style={styles.title}>RESULTADO</Text>
            <View style={styles.infoDiv}>
              <Text style={styles.label}>Nome oficial:</Text>
              <Text style={styles.value}>{nomeOficial}</Text>
              <Text style={styles.label}>Bandeira:</Text>
              <Image source={{uri: bandeira}} style={{width: 250, height: 150}} />
            </View>
          </View>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  div: {
    flex: 1,
    width: '100%',
    padding: 20,
    backgroundColor: '#a459eb63',
    borderWidth: 3,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    color: '#08000a',
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20
  },
  input: {
    width: '50%',
    height: 40,
    borderColor: '#000000',
    borderWidth: 3,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: '#000000'
  },
  button: {
    backgroundColor: '#2416eca2',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 3,
    marginTop: 10,
    width: '70%'
  },
  textButton: {
    fontWeight: 'bold',
    fontSize: 18
  },
  infoDiv: {
    flex: 1,
    width: '80%',
    marginTop: 5,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5
  },
  value: {
    fontSize: 16,
    marginBottom: 5
  },
  resultDiv: {
    flex: 1,
    width: '100%',
    padding: 20,
    marginVertical: 30,
    backgroundColor: '#a459eb63',
    borderWidth: 3,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center'
  }
})