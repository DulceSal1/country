import * as React from 'react';
import styles from './Table.module.scss';
import CurrencyFormat from 'react-currency-format';

export default (class Table extends React.PureComponent {
	formatData = (data, type) => {
		switch (type) {
			case 'text':
				return data;
			case 'number':
				return data.toLocaleString(navigator.language, { minimumFractionDigits: 0 });
			case 'money':
				return <CurrencyFormat value={data} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale={true} />;
			default:
				return data;
		}
	};

	calculateFooter = (data, item) => {
		switch (item.footer) {
			case 'sum':
				return data.reduce((acc, row) => (acc += parseFloat(row[item.value])), 0);
			default:
				return item.footer;
		}
	};

	render() {
		const { headers, data } = this.props;
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
										return (
											<td key={i} className={styles.row_item}>
												{this.formatData(item[header.value], header.type)}
											</td>
										);
									})}
								</tr>
							);
						})}
					</tbody>
					<tfoot className={styles.footer}>
						<tr className={styles.footer_row}>
							{headers.map((header, i) => {
								return (
									<td key={i} className={styles.footer_item}>
										{this.formatData(this.calculateFooter(data, header), header.type)}
									</td>
								);
							})}
						</tr>
					</tfoot>
				</table>
			</div>
		);
	}
});
