import React, { useState } from 'react';
import { Container, Grid, Paper } from '@mui/material';
import UserList from './components/UserList';
import UserDetails from './components/UserDetails';
import { User } from './types/User';
import './styles.css';

const App: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  return (
    <Container className="mt-8">
      <Grid container spacing={3} direction="column">
        <Grid item>
          <Paper className="p-4">
            <UserList onSelectUser={setSelectedUser} />
          </Paper>
        </Grid>
        {selectedUser && (
          <Grid item>
            <Paper className="p-4">
              <UserDetails user={selectedUser} />
            </Paper>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default App;
