import * as React from 'react';
import styles from './Users.module.scss';
import WebServices from '../../WebServices/WebServices';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import produce from 'immer/dist/immer';
import Table from '../../components/Table/Table';
import SimpleBarChart from '../../components/Chart/SimpleBarChart';
const ref = React.createRef();


export default (class Users extends React.PureComponent {
	state = {
		response: {},
		input_search:'',
		datos:[],
		header:[{"name": "name","value": "name"},{"name": "temp","value": "temp"},{"name": "pressure","value": "pressure"},{"name": "humidity","value": "humidity"}]
	};

	componentDidMount() {
		this.init();
		this.fetchDataURL1('api.openweathermap.org/data/2.5/weather?q=London');
	}

	init = () => {
		let array = [];
		this.state.datos.forEach((item, i) => {
			const element = {
				name:item.name,
				temp: item.temp,
				humidity: item.humidity,
				pressure: item.pressure
			};
			array = array.concat(element);
		});
		const nextState = produce(this.state, (draft) => {
			draft.datos = array;
		});
		this.setState(nextState);
	};

	fetchDataURL1 = async (newURL) => {
		try {
			const nextState = produce(this.state, (draft) => {
				draft.loading = true;
			});
			this.setState(nextState);
			const response = await WebServices.getCountryURL1({
				newURL: newURL
			});
			const nextState2 = produce(this.state, (draft) => {
				draft.response = response;
				draft.loading = false;
			});
			this.setState(nextState2);
			console.log('TCL: getCityWeaether -> response', response);
		} catch (e) {}
	};

	showDataURL1 = (newURL) => {
		console.log('TCL: showDataURL -> URL', newURL);
		this.fetchDataURL1(newURL);
	};

	getCityWeaether = async (cityId) => {
		try {
			const nextState = produce(this.state, (draft) => {
				draft.loading = true;
			});
			this.setState(nextState);
			const response = await WebServices.getWeatherByCityId({
				cityId: cityId
			});
			const nextState2 = produce(this.state, (draft) => {
				draft.response = response;
				draft.loading = false;
			});
			this.setState(nextState2);
			console.log('TCL: getCityWeaether -> response', response);
		} catch (e) {}
	};

	showWeaether = (cityId) => {
		console.log('TCL: showWeaether -> cityId', cityId);
		this.getCityWeaether(cityId);
	};

	fetchDataURL3 = async (newURL) => {
		try {
			const nextState = produce(this.state, (draft) => {
				draft.loading = true;
			});
			this.setState(nextState);
			const response = await WebServices.getCountryURL3({
				newURL: newURL
			});
			const nextState2 = produce(this.state, (draft) => {
				draft.response = response;
				draft.loading = false;
			});
			this.setState(nextState2);
			console.log('TCL: getCityWeaether -> response', response);
		} catch (e) {}
	};
	showDataURL3 = (newURL) => {
		console.log('TCL: showDataURL -> URL', newURL);
		this.fetchDataURL3(newURL);
	};

	onAddInputChange = (event) => {
		const value = event.target.value;
		const nextState = produce(this.state, (draft) => {
			draft.input_search = value;
			console.log(value);
		});
		this.setState(nextState);
	};

	generatePDF = () => {
		console.log('TCL: generatePDF');
	};

	addTable= () =>{
		
		const nextState = produce(this.state, (draft) => {
			const value = {"name": draft.response.name, "temp": draft.response.main.temp, "pressure":draft.response.main.pressure,"humidity": draft.response.main.humidity};
			draft.datos = draft.datos.concat(value);
			console.log(draft.datos);
		});
		this.setState(nextState);
	};

	render() {
		const { response, input_search,datos,header } = this.state;
		return (
		<div ref={ref} className={styles.main}>
			<div ref={ref} className={styles.data}>
				<div className={styles.container_boards}>
						<Input type="text" value={this.state.input_search} onChange={this.onAddInputChange} className={styles.inputURL}/>
						<ul >
							<li className={styles.city} onClick={() => this.showDataURL1(input_search)}>ByCityName</li>
							<li className={styles.city} onClick={() => this.showWeaether(input_search)}>ByCityID</li>
							<li className={styles.city} onClick={() => this.showDataURL3(input_search)}>ByCoordinates</li>
						</ul>

				</div>
				<ul>
						<li>Name: {response && response.name}</li>
						<li>Temp: {response && response.main && response.main.temp}</li>
						<li>Pressure: {response && response.main && response.main.pressure}</li>
						<li>Humidity: {response && response.main && response.main.humidity}</li>
				</ul>
			</div>			

				<div className={styles.container_button}>
					
							<button className={styles.button} onClick={this.addTable}>
								NEW
							</button>
				</div>

				<br/>

				<Table data={this.state.datos} headers={header} />

				<div className={styles.chart}>
						<SimpleBarChart data={datos} x={'name'} y1={'temp'} y2={'pressute'} y1Axis={'left'} y2Axis={'right'} />
					</div>
			</div>
		);
	}
});
