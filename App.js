import React, { useEffect, useState } from 'react';
import {
  Button,
  SafeAreaView, Text
} from 'react-native';

import { JsiHttp } from 'react-native-jsi-cpr';

const http = new JsiHttp({
  baseUrl: 'https://api.github.com',
  timeout: 1000,
}, false)

async function sleep() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 100)
  })
}

const App = () => {
  const [fetchTime, setFetchTime] = useState(0)
  const [cprTime, setCprTime] = useState(0)

  const fetchData = async () => {
    let now = new Date()
    const fetchRes = await fetch('https://api.github.com/search/repositories?q=ospfranco')
    await fetchRes.json()
    setFetchTime(new Date().getMilliseconds() - now.getMilliseconds())

    // Wait for system to stabilize again
    await sleep()

    now = new Date()
    const jsiRes = await http.get('/search/repositories?q=ospfranco')
    setCprTime(new Date().getMilliseconds() - now.getMilliseconds())


  }

  return (
    <SafeAreaView style={{alignItems: 'center', justifyContent: 'center'}}>
      <Text>Github.com</Text>
      <Text>Fetch request:</Text>
      <Text>{fetchTime} ms</Text>
      <Text>Cpr request:</Text>
      <Text>{cprTime} ms</Text>
      <Button title='Fetch data' onPress={fetchData}/>
    </SafeAreaView>
  );
};

export default App;
