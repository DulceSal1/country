import * as React from 'react';
import cashoutHeader from '../../resources/jsons/cashoutHeader.json';
import cashoutData from '../../resources/jsons/cashoutData.json';
import styles from './Tables.module.scss';

export default (class Home extends React.PureComponent {
	state = {};

	componentDidMount() {}

	calculateFooter = (data, item) => {
		switch (item.footer) {
			case 'sum':
				return data.reduce((acc, row) => (acc += parseFloat(row[item.value])), 0);
			default:
				return item.footer;
		}
	};

	render() {
		console.log(cashoutHeader);
		console.log(cashoutData);
		const headers = cashoutHeader;
		const data = cashoutData[0].cashout;
		console.log('TCL: Tables -> render -> data', data);
		return (
			<div className={styles.main}>
				<table className={styles.table}>
					<thead className={styles.mainHeader}>
						<tr className={styles.header}>
							{headers.map((header, i) => {
								return (
									<th key={i} className={styles.header_item}>
										{header.name}
									</th>
								);
							})}
						</tr>
					</thead>
					<tbody className={styles.body}>
						{data.map((item, i) => {
							return (
								<tr key={i} className={styles.row}>
									{headers.map((header, i) => {
										return <td className={styles.row_item}>{item[header.value]}</td>;
									})}
								</tr>
							);
						})}
					</tbody>
					<tfoot className={styles.footer}>
						<tr className={styles.footer_row}>
							{headers.map((header, i) => {
								return <td className={styles.footer_item}>{this.calculateFooter(data, header)}</td>;
							})}
						</tr>
					</tfoot>
				</table>
			</div>
		);
	}
});
