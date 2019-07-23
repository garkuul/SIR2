import React from 'react';
import { Provider } from 'react-redux';
import Container from './components/Container'

import store from './store'


function App() {

  return (
    <Provider store={store}>
      <div className="App">
        <Container/>
      </div>
    </Provider>
  );
}

export default App;
