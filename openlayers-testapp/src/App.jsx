import './App.css';
import { ReMap } from './Map/ReMap';


function App() {
	return (
    <div className='App'>
      <ReMap center={[0,0]} zoom={12} />
		</div>
	);
}

export default App;
