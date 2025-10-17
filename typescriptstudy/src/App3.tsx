import HelloComponent from './HelloComponent';
import ByeComponent from './ByeComponent';
import './App.css';

function App3() {
  return (
    <>
      <HelloComponent name='김일' age={20} />
      <br />
      <br />
      <ByeComponent name='김일' />
    </>
  );
}

export default App3;
