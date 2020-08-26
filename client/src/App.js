import React from 'react';
import './App.css';
import GenericPage from './GenericPage';
import ScrollListener from './ScrollListener';

function App() {
  const getPage = () => {
    switch(window.location.pathname) {
      case '/generic-page':
        return <GenericPage />;
      case '/scroll-listener':
        return <ScrollListener />;
      default:
        return <h1>Page not recognised, sorry</h1>;
    }
  };

  return (
    <div className="App">
      {getPage()}
    </div>
  );
}

export default App;
