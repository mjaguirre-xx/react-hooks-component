import React, { useContext } from 'react';
import { getPerson } from '../apis/people';
import { ModalContext } from '../context/ModalContextProvider';
import { PeopleContext } from '../context/PeopleContextProvider';
import { StatusContext } from '../context/StatusContextProvider';
import Modal from './Modal';

function Header({ filter, setFilter }) {
	const { state } = useContext(StatusContext);
	const { state: modalState, dispatch } = useContext(ModalContext);
	const { state: peopleState, dispatch: peopleDispatch } =
		useContext(PeopleContext);

	const fetchOne = async (e) => {
		e.preventDefault();
		const data = await getPerson(peopleState.count);

		peopleDispatch({ type: 'ADD_PERSON', payload: data });
		peopleDispatch({ type: 'INCREMENT_COUNT' });
	};
	return (
		<div className='main-div'>
			<div>
				<h1>May the force be with you</h1>
			</div>
			<div className='innver-div'>
				<button
					className='btn btn-main'
					onClick={() => dispatch({ type: 'OPEN_MODAL' })}
				>
					{state.status === 'add' ? (
						<span>Add</span>
					) : (
						<span>Edit</span>
					)}
				</button>
				{modalState.openModal && <Modal />}
				<button
					className='btn btn-fetch'
					onClick={(e) => fetchOne(e)}
				>
					Fetch
				</button>
			</div>
			<div className='search'>
				<input
					type='text'
					value={filter}
					onChange={(e) => setFilter(e.target.value)}
				/>
			</div>
		</div>
	);
}

export default Header;
