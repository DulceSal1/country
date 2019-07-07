import * as React from 'react';
import styles from './Summary.module.scss';
import Table from '../../components/Table/Table';
import summaryHeaders from '../../resources/jsons/summaryHeaders.json';
import summaryData from '../../resources/jsons/summaryData.json';
import { IconTable, IconChart } from '../../resources/svg/Icons';
import produce from 'immer/dist/immer';
import CurrencyFormat from 'react-currency-format';


export default (class Summary extends React.PureComponent {
	state = {
		selected: {
			table: true,
			chart: false
		},
		grandtot:0
	};

	componentDidMount() {}

	onHandleIcon = (item) => {
		const nextState = produce(this.state, (draft) => {
			draft.selected.table = false;
			draft.selected.chart = false;
			draft.selected[item] = true;
		});
		this.setState(nextState);
	};

	onGrandTot = (summaryData) => {	
		let sum=0;	
		summaryData.forEach((data) => {			
			data.summary.forEach((values) => {
				sum = sum + values.value;
			})
		})
		const nextState = produce(this.state, (draft) => {
			draft.grandtot=sum;
		});
		this.setState(nextState);	
		return  <CurrencyFormat value={this.state.grandtot} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale={true} />;
	};

	render() {
		const { selected } = this.state;
		const headers = summaryHeaders;

		return (
			<div className={styles.main}>
				<h3>Gran Total: { this.onGrandTot(summaryData)}</h3>
				<div className={styles.icons}>
					<div className={styles.container_icon} onClick={() => this.onHandleIcon('table')}>
						<IconTable className={selected.table ? styles.icon_selected : styles.icon} />
					</div>
					<div className={styles.container_icon} onClick={() => this.onHandleIcon('chart')}>
						<IconChart className={selected.chart ? styles.icon_selected : styles.icon} />
					</div>
				</div>
				{selected.table && (
					<div className={styles.table}>
						{summaryData.map((data, i) => {
							data.summary.forEach((item, i) => {
								item.total = item.sold + item.courtesies + item.promos;
							});
							return (
								<div key={i}>
									<p className={styles.title}>{data.name}</p>
									<Table data={data.summary} headers={headers} />
								</div>
							);
						})}
					</div>
				)}
				{selected.chart && <div className={styles.chart}>Gráfica</div>}
			</div>
		);
	}
});
