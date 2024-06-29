import React from 'react';
import { Card, CardContent, Typography, Avatar, Grid } from '@mui/material';
import { User } from '../types/User';

interface UserDetailsProps {
  user: User | null;
}

const UserDetails: React.FC<UserDetailsProps> = ({ user }) => {
  if (!user) {
    return <Typography variant="h6" className="text-xl">Select a user to see details</Typography>;
  }

  return (
    <Card className="mt-4">
      <CardContent className="p-4">
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            {user.avatar && <Avatar src={user.avatar} className="w-14 h-14" />}
          </Grid>
          <Grid item>
            <Typography variant="h5" className="text-xl font-bold">{user.profile.firstName} {user.profile.lastName}</Typography>
            <Typography variant="body1" className="text-sm text-gray-500">{user.profile.email}</Typography>
            <Typography variant="body1" className="text-sm text-gray-500">{user.jobTitle}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default UserDetails;
