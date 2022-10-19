import { useMutation, useQuery, useQueryClient } from 'react-query';
import { BUDGET_QUERY, PARTIAL_CATEGORIES_QUERY } from 'queryKeys';
import { BudgetService } from 'api';
import { Loader } from 'ui/atoms/Loader';
import { Error } from 'ui/atoms/Error';
import { NoContent } from 'ui/atoms/NoContent';
import { Table } from 'ui/molecules/table/Table';
import React from 'react';
import { CategoryCell } from 'ui/molecules/CategoryCell';
import { Money } from 'ui/atoms/Money';
import { LocalizedDate } from 'ui/atoms/LocalizedDate';
import { useSnackbar } from 'notistack';

export const BudgetTableWidget = () => {
  
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery(BUDGET_QUERY, () =>
    BudgetService.findAll(),
  );

  const mutation = useMutation((ids) => BudgetService.remove({ ids }), {
    onSuccess: async () => {
      await queryClient.refetchQueries([BUDGET_QUERY]);
      await queryClient.refetchQueries([PARTIAL_CATEGORIES_QUERY]);
      enqueueSnackbar('Element został usunięty', {variant: 'success'});
    },
    onError: async () => {
      enqueueSnackbar('Wystąpił nieoczekiwany błąd', {variant: 'error'});
    }
  });

  const deleteRecords = (ids) => mutation.mutate(ids);

  const tableDefinition = [
    {
      id: 'name',
      label: 'Nazwa',
      renderCell: (row) => (
        <CategoryCell color={row.category?.color} name={row.category?.name} />
      ),
    },
    {
      id: 'amount',
      label: 'Planowane wydatki',
      renderCell: (row) => <Money inCents={row.amountInCents} />,
    },
    {
      id: 'current-amount',
      label: 'Obecna kwota',
      renderCell: (row) => <Money inCents={row.currentSpending} />,
    },
    {
      id: 'status',
      label: 'Status',
      renderCell: (row) => {
        if (row.currentSpending === row.amountInCents) return 'Wykorzystany';
        if (row.currentSpending > row.amountInCents) return 'Przekroczone';
        if (row.currentSpending < row.amountInCents) return 'W normie';
      },
    },
    {
      id: 'createdAt',
      label: 'Data utworzenia',
      renderCell: (row) => <LocalizedDate date={row.createdAt} />,
    },
  ];

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Error error={error} />;
  }

  if (!data?.length) {
    return <NoContent />;
  }

  return (
    <Table
      rows={data}
      headCells={tableDefinition}
      getUniqueId={(row) => row.id}
      deleteRecords={deleteRecords}
    />
  );
};
