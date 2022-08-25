import React, { useEffect, useState } from 'react';
import {
  Button,
  SafeAreaView, Text
} from 'react-native';
import axios from 'axios'

import { JsiHttp } from 'react-native-jsi-cpr';
import performance from 'react-native-performance';

const http = new JsiHttp({
  baseUrl: 'https://api.github.com',
  timeout: 1000,
}, false)

async function sleep() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 500)
  })
}

const App = () => {
  const [fetchTime, setFetchTime] = useState(0)
  const [cprTime, setCprTime] = useState(0)
  const [axiosTime, setAxiosTime] = useState(0)

  const fetchData = async () => {
    let now = +new Date()
    const fetchRes = await fetch('https://api.github.com/search/repositories?q=ospfranco')
    await fetchRes.json()
    setFetchTime(+new Date() - now)

    // Wait for system to stabilize again
    await sleep()

    now = +new Date()
    await http.get('/search/repositories?q=ospfranco')
    setCprTime(+new Date() - now)

    await sleep()

    now = +new Date()
    await axios.get('https://api.github.com/search/repositories?q=ospfranco')
    setAxiosTime(+new Date() - now)
  }

  return (
    <SafeAreaView style={{alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', flex: 1}}>
      <Text>Fetch: {fetchTime} ms</Text>
      <Text>JSI Cpr: {cprTime} ms</Text>
      <Text>Axios: {axiosTime} ms</Text>
      <Button title='Fetch data' onPress={fetchData}/>
    </SafeAreaView>
  );
};

export default App;
