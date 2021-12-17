import { useContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { ModalContext } from '../context/ModalContextProvider';
import { PeopleContext } from '../context/PeopleContextProvider';
import { StatusContext } from '../context/StatusContextProvider';

function Modal(props) {
	const [name, setName] = useState({ first_name: '', last_name: '' });
	const { state, dispatch: dispatchStatus } = useContext(StatusContext);
	const { dispatch: peopleDispatch } = useContext(PeopleContext);

	const { dispatch } = useContext(ModalContext);
	const whenSelected = (selected) => {
		if (selected) {
			const tempArr = selected.split(' ');

			if (tempArr.length < 3) {
				setName({ first_name: tempArr[0], last_name: tempArr[1] });
			} else {
				setName({
					first_name: `${tempArr[0]} ${tempArr[1]}`,
					last_name: tempArr[2],
				});
			}
		}
	};
	useEffect(() => whenSelected(state.selected), [state.selected]);
	const handleButton = () => {
		if (name.last_name === '') {
			setName({
				first_name: name.first_name,
				last_name: 'robot',
			});
		} else if (state.status === 'add') {
			peopleDispatch({
				type: 'ADD_PERSON',
				payload: { name: `${name.first_name} ${name.last_name}` },
			});
			setName({ first_name: '', last_name: '' });
			dispatch({ type: 'CLOSE_MODAL' });
		} else if (state.status === 'edit') {
			peopleDispatch({
				type: 'EDIT_PERSON',
				name: state.selected,
				payload: { name: `${name.first_name} ${name.last_name}` },
			});
			dispatchStatus({ type: 'ADD' });
			setName({ first_name: '', last_name: '' });
			dispatch({ type: 'CLOSE_MODAL' });
		}
	};

	const handleClose = () => {
		setName({ first_name: '', last_name: '' });
		dispatchStatus({ type: 'ADD' });
		dispatch({ type: 'CLOSE_MODAL' });
	};
	return ReactDOM.createPortal(
		<div className='main-modal'>
			<div className='inner-modal'>
				<div className='state-header'>
					<h1 className='inner-state-header'>
						{state.status.toUpperCase()}
					</h1>
				</div>

				<div className='form form-fname'>
					<label htmlFor='first_name'>First name:</label>
					<input
						type='text'
						value={name.first_name}
						onChange={(e) =>
							setName({
								...name,
								first_name: e.target.value,
							})
						}
					/>
				</div>
				<div className='form form-lname'>
					<label htmlFor='last_name'>Last name:</label>
					<input
						type='text'
						value={name.last_name}
						onChange={(e) =>
							setName({
								...name,
								last_name: e.target.value,
							})
						}
					/>
				</div>
				<div className='cancel-div'>
					<button
						className='btn btn-cancel'
						onClick={handleClose}
					>
						Cancel
					</button>
					<button
						className={`${
							state.status === 'add'
								? 'bg-blue-500'
								: 'bg-green-500'
						} add-edit-btn`}
						onClick={handleButton}
					>
						{state.status === 'add' ? (
							<span className='btn-modal'>Add</span>
						) : (
							<span className='btn-modal'>Edit</span>
						)}
					</button>
				</div>
			</div>
		</div>,
		document.getElementById('modal')
	);
}

export default Modal;
