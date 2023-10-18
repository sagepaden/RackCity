import React from 'react';
import Header from './Components/Header/Header';
import Home from '../../frontend/src/Pages/Home';
import { ThemeProvider } from './Context/ThemeProvider';

function App() {
	return (
		<div>
			<ThemeProvider>
				<div>
					<Header />
					<Home />
				</div>
			</ThemeProvider>
		</div>
	);
}

export default App;
