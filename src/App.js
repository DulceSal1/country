import React from 'react';
import styles from './App.module.scss';
import Input from './components/Input/Input';
import Board from './Board/Board';
import Button from './components/Button/Button';
import produce from 'immer/dist/immer';

class App extends React.PureComponent {
	state = {
	boards:[
			{
				title: 'Familia',
				items: [ 'Dulce', 'Maru', 'Peter', 'Vilma' ],
				index: 0,
				input: {
					add: '',
					remove: ''
				}
			}	
		],
		input: {
			add: '',
			remove: ''
		}
	};

	onAddButtonClick = (property) => {
		const nextState = produce(this.state, (draft) => {
			const indexBoard = draft.boards.findIndex(x => x.title ===property.title);
			draft.boards[indexBoard].items = draft.boards[indexBoard].items.concat(draft.boards[indexBoard].input.add);
			draft.boards[indexBoard].input.add = '';
		});
		this.setState(nextState);
	};

	onRemoveItem = (index, property) => {
		const nextState = produce(this.state, (draft) => {
		const indexBoard = draft.boards.findIndex(x => x.title ===property.title);
			draft.boards[indexBoard].items.splice(index, 1);
		});
		this.setState(nextState);
	};

	onRemoveBoardButtonClick = (property) => {
		const nextState = produce(this.state, (draft) => {
		const indexBoard = draft.boards.findIndex(x => x.title ===property.title);
		draft.boards.splice(indexBoard, 1);
		});
		this.setState(nextState);
	};

	onAddInputChange = (event, property) => {
		const value = event.target.value;
		const nextState = produce(this.state, (draft) => {
			const indexBoard = draft.boards.findIndex(x => x.title ===property.title);
			draft.boards[indexBoard].input.add = value;
			console.log(property);
		});
		this.setState(nextState);
	};

	onAddBoardInputChange = (event) => {
		const value = event.target.value;
		const nextState = produce(this.state, (draft) => {
			draft.input.add = value;
			console.log(this.state.input);
		});
		this.setState(nextState);
	};

	onAddBoardButtonClick = () => {
		const nextState = produce(this.state, (draft) => {
			const newBoardtitle=draft.input.add;
			const newBoard ={
				title: newBoardtitle,
				items: [ ],
				index: 0,
				input: {
					add: '',
					remove: ''
				}
			};
			draft.boards.push(newBoard);
			draft.input.add = '';			
	console.log(this.state.boards);
		});
		this.setState(nextState);
	};

	render() {
		const { boards} = this.state;
		return (
			<div className={styles.alignBoard}>
				<div className={styles.top}>
				<p className={styles.title}>MIS TABLEROS</p>
				<div className={styles.countBoards}>{this.state.boards.length} Elemento(s)</div>
				</div>
				<div className={styles.board_add}>
						<div className={styles.container_input}>
							<Input type="text" value={this.state.input.add} onChange={this.onAddBoardInputChange}/>
						</div>
						<Button type={'add'} onClick={this.onAddBoardButtonClick} />
					</div>
				<div className={styles.container_boards}>
					{boards.map((i) => (
						<Board
							object={i}
							onRemoveBoard={() => this.onRemoveBoardButtonClick(i)}
							onAddButtonClick={() => this.onAddButtonClick(i)}
							onAddInputChange={(event) => this.onAddInputChange(event, i)}
							onRemoveItem={(index) => this.onRemoveItem(index, i)}
						/>
					))}							
				</div>
			</div>
		);
	}
}

export default App;
