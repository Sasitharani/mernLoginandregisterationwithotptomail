import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';
import './index.css'; // Import Tailwind CSS

const App = () => {
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div className="App">
      {showRegister ? (
        <Register setShowRegister={setShowRegister} />
      ) : (
        <Login setShowRegister={setShowRegister} />
      )}
    </div>
  );
};

export default App;
