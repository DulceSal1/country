import * as React from 'react';
import styles from './Users.module.scss';
import WebServices from '../../WebServices/WebServices';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import produce from 'immer/dist/immer';

export default (class Users extends React.PureComponent {
	state = {
		response: {},
		countries: [ 'mexico', 'canada', 'usa', 'india', 'china' ],
		input_search:'https://restcountries.eu/rest/v2/name/'
	};

	componentDidMount() {
		this.fetchData('mexico');
	}

	fetchData = async (country) => {
		try {
			const response = await WebServices.getCountryDetails({
				country: country
			});
			// const nextState = produce(this.state, (draft) => {
			// 	draft.response = response;
			// });
			// this.setState(nextState);
			this.setState({ response: response[0] });

			console.log('TCL: fetchData -> response', response);
		} catch (e) {}
	};

	fetchDataURL = async (newURL) => {
		try {
			const response = await WebServices.getCountryURL({
				newURL: newURL
			});
			// const nextState = produce(this.state, (draft) => {
			// 	draft.response = response;
			// });
			// this.setState(nextState);
			this.setState({ response: response[0] });

			console.log('TCL: fetchDataURL -> response', response);
		} catch (e) {}
	};

	showData = (country) => {
		console.log('TCL: showData -> country', country);
		this.fetchData(country);
	};

	showDataURL = (newURL) => {
		console.log('TCL: showDataURL -> URL', newURL);
		this.fetchDataURL(newURL);
	};

	onAddInputChange = (event) => {
		const value = event.target.value;
		const nextState = produce(this.state, (draft) => {
			draft.input_search = value;
			console.log(value);
		});
		this.setState(nextState);
	};

	render() {
		const { response, countries } = this.state;
		const iconUrl = response && response.flag;
		return (
			<div className={styles.main}>
				<div className={styles.container_boards}>
						<Input type="text" value={this.state.input_search} onChange={this.onAddInputChange} className={styles.inputURL}/>
						<Button type={'go'} onClick={() => this.showDataURL(this.state.input_search)} />
				</div>
				<ul>
					{countries.map((country, i) => {
						return (
							<li key={i} className={styles.country} onClick={() => this.showData(country)}>
								{country}
							</li>
						);
					})}
				</ul>
				<ul>
					<li> País: {response && response.name}</li>
					<li> Capital: {response && response.capital}</li>
					<li> Población: {response && response.population}</li>
					<li>
						Idioma:
						{response &&
							response.languages &&
							response.languages.map((item, i) => {
								return response.languages.length > 1 && i !== response.languages.length - 1 ? ' ' + item.nativeName + ', ' : ' ' + item.nativeName;
							})}
					</li>
					<li> Región: {response && response.region}</li>
					<li>
						Monedas:
						{response &&
							response.currencies &&
							response.currencies.map((item, i) => {
								return response.currencies.length > 1 && i !== response.currencies.length - 1 ? ' ' + item.name + ', ' : ' ' + item.name;
							})}
					</li>
					<li>
						Bandera:<br/> <img src={iconUrl} alt="" width="100px"/>
					</li>
				</ul>
			</div>
		);
	}
});
