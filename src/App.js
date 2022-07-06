import { useState } from 'react';
import './App.css';
import Board from './components/Board';
import Wordmark from './imgs/duke_wordmark_white.png'


function App() {
  const [seed, setSeed] = useState(parseInt(Math.random() * 10000));
  
  function handleSeedChange (event) {
    const submitted_seed = document.getElementById("seed").value;
    document.getElementById("seed").value = "";
    event.preventDefault();    
    setSeed(submitted_seed);
  };

  return (
    <div className="App">
      <div className='header'>
        <img src={Wordmark} alt="Duke Logo" className='logo' />
        <h2 className=''>| BotW Bingo</h2>
      </div>
      <Board size="5" seed={seed}/>

      <form onSubmit={handleSeedChange}>
        <label>
          Current Seed: {seed}
          <input type="text" id='seed' placeholder="New Seed" className='seed-input' ></input>
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default App;
