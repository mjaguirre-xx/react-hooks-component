import React, { useState } from 'react'
import Header from './components/Header'
import List from './components/List'
import StatusContextProvider from './context/StatusContextProvider'

function App() {
  const [filter, setFilter] = useState('');

	return (
		<StatusContextProvider>
			<div>
				<Header filter={filter} setFilter={setFilter} />
				<List filter={filter} setFilter={setFilter} />
			</div>
		</StatusContextProvider>
	);
}

export default App
