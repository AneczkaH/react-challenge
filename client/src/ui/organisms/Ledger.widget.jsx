import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import { useSnackbar } from 'notistack';

import {
  ActionHeader,
  Button,
  Table,
  LocalizedDate,
  CategoryCell,
  AddNewLedgerRecordModal,
  Money,
  Error,
  Loader,
  NoContent,
  Card,
} from 'ui';
import { LedgerService } from 'api';
import { BUDGET_QUERY, LEDGER_QUERY, SUMMARY_QUERY } from 'queryKeys';

export const LedgerWidget = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [modalVisible, toggleModal] = useState(false);
  const [modalType, setModalType] = useState('');

  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery(LEDGER_QUERY, () =>
    LedgerService.findAll(),
  );

  const mutation = useMutation((ids) => LedgerService.remove({ ids }), {
    onSuccess: async () => {
      await queryClient.refetchQueries([LEDGER_QUERY]);
      await queryClient.refetchQueries([BUDGET_QUERY]);
      await queryClient.refetchQueries([SUMMARY_QUERY]);
      enqueueSnackbar('Element został usunięty', {variant: 'success'});

    },
    onError: async () => {
      
      enqueueSnackbar('Wystąpił nieoczekiwany błąd', {variant: 'error'});
    }
  });

  const openModal = (modalType) => {
    toggleModal(true);
    setModalType(modalType);
  };

  const deleteRecords = (ids) => {
    mutation.mutate(ids);
  };

  return (
    <Card
      sx={{ minHeight: '80vh', height: '100%' }}
      title={
        <ActionHeader
          variant={'h1'}
          title="Portfel"
          renderActions={() => (
            <Box>
              <Button
                startIcon={<AddOutlinedIcon />}
                onClick={() => openModal('INCOME')}
                sx={{ marginRight: '8px' }}
              >
                Wpłać
              </Button>
              <Button
                startIcon={<RemoveOutlinedIcon />}
                onClick={() => openModal('EXPENSE')}
              >
                Wypłać
              </Button>
            </Box>
          )}
        />
      }
    >
      {isLoading && <Loader />}
      {error && <Error error={error} />}
      {!isLoading && !error && !data?.length && <NoContent />}
      {!isLoading && !error && !!data?.length && (
        <Table
          rows={data}
          headCells={headCells}
          getUniqueId={(row) => row.id}
          deleteRecords={deleteRecords}
        />
      )}
      <AddNewLedgerRecordModal
        open={modalVisible}
        onClose={() => toggleModal(false)}
        type={modalType}
      />
    </Card>
  );
};

const headCells = [
  {
    id: 'title',
    label: 'Nazwa',
    renderCell: (row) => row.title,
  },
  {
    id: 'categoryName',
    label: 'Kategoria',
    renderCell: (row) => {
      if (!row.mode === 'INCOME') return 'Wpływ';

      return (
        <CategoryCell name={row.category?.name} color={row.category?.color} />
      );
    },
  },
  {
    id: 'createdAt',
    label: 'Data',
    renderCell: (row) => <LocalizedDate date={row.createdAt} />,
  },
  {
    id: 'amountInCents',
    label: 'Kwota',
    renderCell: (row) =>
      row.mode === 'EXPENSE' ? (
        <Typography color={'error.main'} variant={'p'}>
          -<Money inCents={row.amountInCents} />
        </Typography>
      ) : (
        <Typography color={'success.main'} variant={'p'}>
          +<Money inCents={row.amountInCents} />
        </Typography>
      ),
  },
];
