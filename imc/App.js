import styled from 'styled-components/native';
import {Text} from 'react-native';
import React, { useState, useEffect } from 'react';

const Pagina = styled.SafeAreaView `
  flex: 1;
  align-items: center;
  padding-top: 20px;
`;

const Titulo = styled.Text `
  font-size: 25px;
`;
const Input = styled.TextInput `
  width: 90%;
  height: 50px;
  font-size: 25px;
  background-color: #eee;
  margin-top: 20px;
  padding-left: 10px;
  border-radius: 60px;

`;

const ResultadoView = styled.View `
  background-color: grey;
  margin-top: 30px;
  padding: 40px;
  align-items: center;
  justify-content: center;
`;

const Resultado = styled.Text`
  font-size: 25px;
`;
export default function App() {
  const [peso, alteraPeso] = useState('80');
  const [altura, alteraAltura] = useState('1.84');
  const [imc, alteraIMC] = useState(0);
  const [categoria, alteraCategoria] = useState('Normal');
  const [cor, alteraCor] = useState('blue')

  const calcularIMC = () => { 
    const indice = ( parseFloat(peso) / (  parseFloat(altura) *  parseFloat(altura))  );
    alteraIMC(indice.toFixed(1));
    if (indice < 18.5) {
      alteraCategoria('Magreza');
      alteraCor('blue');
    } else if ( indice < 24.9) {
      alteraCategoria('Normal');
      alteraCor('green');
    } else if ( indice < 29.9) {
      alteraCategoria('Sobrepeso');
      alteraCor('yellow');
    } else if ( indice < 39.9) {
      alteraCategoria('Obesidade');
      alteraCor('orange');
    } else {
      alteraCategoria('Obesidade Grave');
      alteraCor('red');
    }
   }

   useEffect ( () => { calcularIMC() }, [altura, peso] );

  return (
    <Pagina>
      <Titulo>Calculadora de IMC</Titulo>
      <Input placeholder="Peso" keyboardType="numeric" value={peso} onChangeText={ (p) => {alteraPeso(p)} } />
      <Input placeholder="Altura" keyboardType="numeric" value={altura} onChangeText={ (a) => {alteraAltura(a)} } />
      
      { imc > 0 && (
      <ResultadoView cor={cor}>
        <Resultado>{imc}</Resultado>
        <Resultado>{categoria}</Resultado>
      </ResultadoView>
      )}
    </Pagina>
  );
}