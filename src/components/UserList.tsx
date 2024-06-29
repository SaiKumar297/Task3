import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, CircularProgress, Typography, Collapse } from '@mui/material';
import { User } from '../types/User';
import UserDetails from './UserDetails';

interface UserListProps {
  onSelectUser: (user: User) => void;
}

const UserList: React.FC<UserListProps> = ({ onSelectUser }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  useEffect(() => {
    axios.get<User[]>('https://602e7c2c4410730017c50b9d.mockapi.io/users')
      .then(response => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch data');
        setLoading(false);
      });
  }, []);

  const handleUserClick = (user: User) => {
    setSelectedUserId(prevSelectedUserId => (prevSelectedUserId === user.id ? null : user.id));
    onSelectUser(user);
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography variant="h6">{error}</Typography>;
  }

  if (!users.length) {
    return <Typography variant="h6">No data to show</Typography>;
  }

  return (
    <>
      <Typography variant="h4" gutterBottom className="text-2xl font-bold mb-4">Employees</Typography>
      <List className="bg-white shadow rounded-lg">
        {users.map(user => (
          <React.Fragment key={user.id}>
            <ListItem button onClick={() => handleUserClick(user)} className="hover:bg-gray-100">
              <ListItemAvatar>
                {user.avatar && <Avatar src={user.avatar} className="w-14 h-14" />}
              </ListItemAvatar>
              <ListItemText 
                primary={<Typography variant="subtitle1" className="text-lg font-medium">{user.profile.firstName} {user.profile.lastName}</Typography>} 
                secondary={<Typography variant="body2" color="textSecondary" className="text-sm text-gray-500">{user.jobTitle}</Typography>} 
              />
            </ListItem>
            <Collapse in={selectedUserId === user.id} timeout="auto" unmountOnExit>
              <UserDetails user={selectedUserId === user.id ? user : null} />
            </Collapse>
          </React.Fragment>
        ))}
      </List>
    </>
  );
};

export default UserList;
