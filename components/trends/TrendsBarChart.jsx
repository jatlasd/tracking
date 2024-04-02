import React, { useEffect, useState } from 'react'
import { BarChart } from '@tremor/react'

const TrendsBarChart = ({filtered1, filtered2, displayDate1, displayDate2, target}) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const targetCounts = new Map();
  
    [...filtered1, ...filtered2].forEach(entry => {
      const targetValue = entry[target]; 
      if (!targetCounts.has(targetValue)) {
        const initialCount = {};
        initialCount[displayDate1] = 0;
        initialCount[displayDate2] = 0;
        targetCounts.set(targetValue, initialCount);
      }
      const currentCount = targetCounts.get(targetValue);
      if (filtered1.includes(entry)) currentCount[displayDate1] += 1;
      if (filtered2.includes(entry)) currentCount[displayDate2] += 1;
      targetCounts.set(targetValue, currentCount);
    });
  
    const formattedData = Array.from(targetCounts.keys()).map(targetValue => ({
      name: targetValue,
      ...targetCounts.get(targetValue),
    }));
  
    setChartData(formattedData);
  }, [filtered1, filtered2, displayDate1, displayDate2, target]);

  const dataFormatter = (number) =>
  Intl.NumberFormat('us').format(number).toString();

  return (
            <BarChart 
        data={chartData}
        index="name"
        categories={[
          displayDate1,
          displayDate2
        ]}
        colors={["#c1e6e2", '#FFc966']} 
        yAxisWidth={48}
        valueFormatter={dataFormatter}

      />

  );
}

export default  React.memo(TrendsBarChart)