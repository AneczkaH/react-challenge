import React from 'react';
import { useQuery } from 'react-query';
import { Loader, Error, Money, ActionHeader, Card, CategoryCell } from 'ui';
import { SummaryService } from 'api';
import { SUMMARY_QUERY } from 'queryKeys';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { CardContent } from '@mui/material';

export const SummaryChart = () => {
  
  const { isLoading, isError, data, error } = useQuery(SUMMARY_QUERY, () =>
    SummaryService.findAll(),
  );

  if (isLoading) return <Loader></Loader>;
  if (isError) return <Error error={error}></Error>;

  ChartJS.register(ArcElement, Tooltip, Legend);

  const res = data;

  const balance = res.balance;
  const labels = [];
  const amount = [];
  const backgroundColor = [];
  res.spending.map((spendingElement) => {
    labels.push(spendingElement.categoryName);
    amount.push(spendingElement.amountInCents);
    backgroundColor.push(spendingElement.categoryColor);
  });

  const options = {
    responsive: true,
    aspectRatio: 2,
    plugins: {
      legend: {
        display: false,
        textAlgin: 'left',
        position: 'bottom',
        align: 'start',

        labels: {
          usePointStyle: true,
          font: {
            size: '20px',
          },
        },
      },
    },
  };

  const dataChart = {
    labels,
    datasets: [
      {
        label: 'spending',
        data: amount,
        backgroundColor: backgroundColor,
      },
    ],
  };

  return (
    <Card
      title={
        <ActionHeader
          variant={'h4'}
          title="Saldo"
          renderActions={() => (
            <h3>
              <Money inCents={balance} />
            </h3>
          )}
        ></ActionHeader>
      }
      subheader="Pozostała kwota"
      sx={{ widht: '493px', height: '555px' }}
    >
      <CardContent>
        {data.spending.length === 0 ? (
          'Brak wyników'
        ) : (
          <Doughnut data={dataChart} options={options} />
        )}
        {labels.map((el, i) => (
          <CategoryCell
            key={el.toString()}
            name={el}
            color={backgroundColor[i]}
          />
        ))}
      </CardContent>
    </Card>
  );
};
