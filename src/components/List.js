import React, { useContext, useEffect, useState } from 'react'
import { PeopleContext } from '../context/PeopleContextProvider';
import { StatusContext } from '../context/StatusContextProvider';

function List({ filter }) {
	const [filteredNames, setFilteredNames] = useState([]);
	const { state, dispatch: peopleDispatch } = useContext(PeopleContext);
	const { dispatch } = useContext(StatusContext);
	useEffect(() => {
		if (filter === '') {
			setFilteredNames(state.people);
		} else {
			setFilteredNames(
				state.people.filter((person) => {
					return person.name.toLowerCase().includes(filter);
				})
			);
		}
	}, [state.people, filter]);
	
	const handleDelete = (e, name) => {
		e.preventDefault()
		peopleDispatch({ type: 'DELETE_PERSON', payload: name })
	};

	const onSelect = (e, name) => {
		e.preventDefault();
		dispatch({ type: 'EDIT', payload: name });
	};
	return (
		<div>
			<ol className='main-list-div'>
				{state.loading ? (
					<p>Loading....</p>
				) : (
					filteredNames.map((person) => (
						<li className='list-div'>
							<div
								onClick={(e) =>
									onSelect(e, person.name)
								}
							>
								<p>{person.name}</p>
							</div>{' '}
							<div>
								<button
									className='btn btn-delete'
									onClick={(e) => {
										handleDelete(e, person.name)
									}}
								>
									Delete
								</button>
							</div>
						</li>
					))
				)}
			</ol>
			{state.errorMsg && (
				<h1 className='error-message'>
					{state.errorMsg}
				</h1>
			)}
		</div>
	);
}

export default List;
