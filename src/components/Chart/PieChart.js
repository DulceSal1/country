import React, { PureComponent } from 'react';
import {  PieChart, Pie,  Tooltip,} from 'recharts';

export default class Example extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/k9jkog04/';

  render() {
      const {data,y} = this.props;
      console.log(data);
    return (
      <PieChart width={400} height={400}>
        <Pie dataKey={y} isAnimationActive={false} data={data} cx={200} cy={200} outerRadius={100} fill="#8884d8" label/>
        <Tooltip />
      </PieChart>
    );
  }
}
