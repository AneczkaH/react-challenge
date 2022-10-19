import React from 'react';
import { useQuery } from 'react-query';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { BUDGET_QUERY } from 'queryKeys';
import { Loader, Error, ActionHeader } from 'ui';
import { BudgetService } from 'api';
import { Card } from 'ui';

export const BudgetChart = () => {
  
  const { isLoading, isError, data, error } = useQuery(BUDGET_QUERY, () =>
    BudgetService.findAll(),
  );

  if (isLoading) return <Loader></Loader>;
  if (isError) return <Error error={error}></Error>;

  console.log(data);
  let expensesEmpty = true;
  data.forEach((element) => {
    if (element.currentSpending !== 0) {
      expensesEmpty = false;
    }
  });

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Legend,
    Title,
    Tooltip,
  );

  const labels = [];
  const backgroundColor = [];
  const amount = [];
  data.map((el) => {
    labels.push(el.category.name + '  %');
    backgroundColor.push(el.category.color);
    amount.push(el.currentSpendingPercent);
  });

  const options = {
    indexAxis: 'y',
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const dataChart = {
    labels,
    datasets: [
      {
        label: 'budget',
        data: amount,
        backgroundColor: backgroundColor,
      },
    ],
  };
  console.log(data);

  return (
    <Card
      title={<ActionHeader variant={'h4'} title="Budżet" />}
      subheader="Podsumowanie wydatków"
      sx={{ widht: '495px', height: '367px' }}
    >
      {expensesEmpty === true ? (
        'Brak wyników'
      ) : (
        <Bar options={options} data={dataChart} />
      )}
    </Card>
  );
};
