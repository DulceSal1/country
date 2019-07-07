import * as React from 'react';
import styles from './Report.module.scss';
import Table from '../../components/Table/Table';
import cashoutHeader from '../../resources/jsons/cashoutHeader.json';
import cashoutData from '../../resources/jsons/cashoutData.json';
import produce from 'immer/dist/immer';
import { IconTable, IconChart } from '../../resources/svg/Icons';
import PieChart from '../../components/Chart/PieChart';
import SimpleBarChart from '../../components/Chart/SimpleBarChart';

export default (class Report extends React.PureComponent {
	state = {
		selected: {
			table: true,
			chart: false
		},
		data: []
	};

	componentDidMount() {
		this.init();
	}
	
	init = () => {
		let array = [];
		cashoutData[0].cashout.forEach((item, i) => {
			const element = {
				name:item.zone,
				zone: item.zone,
				sold: item.sold,
				total: item.total
			};
			array = array.concat(element);
		});
		const nextState = produce(this.state, (draft) => {
			draft.data = array;
		});
		this.setState(nextState);
	};

	onHandleIcon = (item) => {
		const nextState = produce(this.state, (draft) => {
			draft.selected.table = false;
			draft.selected.chart = false;
			draft.selected[item] = true;
		});
		this.setState(nextState);
	};

	render() {
		const { selected} = this.state;
		const headers = cashoutHeader;
		const data = cashoutData[0].cashout;
		return (
			<div className={styles.main}>
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
					<Table data={data} headers={headers} />
					</div>
				)}
				{selected.chart && (
					<div className={styles.chart}>
						<PieChart data={this.state.data} y={'sold'}/>
						<SimpleBarChart data={data} x={'zone'} y1={'sold'} y2={'total'} y1Axis={'left'} y2Axis={'right'} />
					</div>
				)}
			</div>
		);
	}
});
