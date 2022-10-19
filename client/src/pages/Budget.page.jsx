import React, { useState } from 'react';
import { ActionHeader, Button, Card, Page, AddNewBudgetRecordModal } from 'ui';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { Grid } from '@mui/material';
import { BudgetTableWidget } from 'ui/organisms/BudgetTable.widget.jsx';

export const BudgetPage = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <Page title="Budżet">
      <Card
        title={
          <ActionHeader
            variant={'h1'}
            title="Twój budżet"
            renderActions={() => (
              <Button
                variant={'contained'}
                onClick={() => setModalVisible(true)}
                startIcon={<AddOutlinedIcon />}
              >
                Zdefiniuj budżet
              </Button>
            )}
          />
        }
      >
        <Grid container>
          <Grid item xs={12}>
            <BudgetTableWidget />
            <AddNewBudgetRecordModal
              open={modalVisible}
              onClose={() => setModalVisible(false)}
            />
          </Grid>
        </Grid>
      </Card>
    </Page>
  );
};
