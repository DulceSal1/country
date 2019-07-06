import * as React from 'react';
import summaryHeaders from '../../resources/jsons/summaryHeaders.json';
import summaryData from '../../resources/jsons/summaryData.json';
import styles from './Summary.module.scss';

export default (class Home extends React.PureComponent {
	state = {};

	componentDidMount() {}

	calculateFooter = (data, item) => {
		switch (item.footer) {
			case 'sum':
				return data.reduce((acc, row) => (acc += parseFloat(row[item.value])), 0);
			case 'sumtot':
				return data.reduce((acc, row) => (acc += parseFloat(row['sold']+row['promos']+row['courtesies'])), 0);
			default:
				return item.footer;
		}
	};

    render() {
		console.log(summaryHeaders);
		console.log(summaryData);
        const headers = summaryHeaders;
        return(
        summaryData.map((summ,i) => {
            const data = summaryData[i].summary;
            return (    
                <div className={styles.main}>       
                <div className={styles.tablediv}>
                {summaryData[i].date} - {summaryData[i].name}
                <table key={i} className={styles.table}>
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
										if(header.value==="quantity")
										{ 
											const subtot=item['sold']+item['promos']+item['courtesies'];
											return <td className={styles.row_item}>{subtot}</td>;	}
										else
										{  return <td className={styles.row_item}>{item[header.value]}</td>; }
										
									})}
								</tr>
							);
						})}
					</tbody>
					<tfoot className={styles.footer}>
						<tr className={styles.footer_row}>
							{headers.map((header, i) => {
								return <td key={i} className={styles.footer_item}>{this.calculateFooter(data, header)}</td>;
							})}
						</tr>
					</tfoot>
                </table>
                </div>
                </div>
            );
        })
        );
	}
});
