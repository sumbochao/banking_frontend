import React from 'react';
import {
  PieChart, Pie, Cell,
} from 'recharts';
import "./PieCharts.css";

const COLORS = ['#15181c', '#f55c3c'];

const PieCharts = (props)=> {
  const { data } =props;
    return (
        <PieChart width={300} height={200} className="piechart">
          <Pie 
            data={data}
            labelLine={false}
            innerRadius={50}
            fill="#8884d8"
            dataKey="value"
          >
            {
              // eslint-disable-next-line react/no-array-index-key
              data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
            }
          </Pie>
        </PieChart>      
    );
};
export default PieCharts;
