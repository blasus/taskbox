import React from 'react';
import { Provider } from 'react-redux';
import store from './store/createStore';
import './index.css';
import InboxScreen from './components/InboxScreen';

function App() {
  return (
    <Provider store={store}>
      <InboxScreen />
    </Provider>
  );
}

export default App;
