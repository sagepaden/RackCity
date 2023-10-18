import './App.css';
import Header from './Components/Header';
import { ThemeProvider } from './Context/ThemeProvider';
import Home from './Pages/Home';

function App() {
	return (
		<div>
			<ThemeProvider>
				<div>
					<Home />
				</div>
			</ThemeProvider>
		</div>
	);
}

export default App;
