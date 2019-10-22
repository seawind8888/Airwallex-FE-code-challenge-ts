import React from 'react';
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Main from './components/Main/Main'
import './App.scss';

const App: React.FC = () => {

  return (
    <div className="App">
      <Header/>
      <Main/>
      <Footer />
    </div>
  );
}

export default App;
