import { ChangeEvent, useState } from 'react';
import axios from 'axios';
import { Button, TextField, Stack, Snackbar } from '@mui/material';
import CarList from './CarList';
import { Message } from '@mui/icons-material';

type User = {
  username: string;
  password: string;
};

// type AuthResponse = {}

function Login() {
  const [user, setUser] = useState<User>({
    username: '',
    password: '',
  });

  const [isAuthenticated, setAuth] = useState(false);
  const [open, setOpen] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    axios
      .post(import.meta.env.VITE_API_URL + '/login', user, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        const jwtToken = res.headers.authorization;
        if (jwtToken != null) {
          sessionStorage.setItem('jwt', jwtToken);
          setAuth(true);
        }
      })
      .catch((err) => console.log(err));
  };
  if (isAuthenticated) {
    return (
      <>
        <CarList />
      </>
    );
  } else {
    return (
      <>
        <Stack spacing={2} mt={2} alignItems='center'>
          <TextField label='Username' name='username' onChange={handleChange} />
          <TextField type='password' label='Password' name='password' onChange={handleChange} />
          <Button variant='outlined' color='primary' onClick={handleLogin}>
            Login
          </Button>
          <Snackbar
            open={open}
            autoHideDuration={2000}
            onClose={() => setOpen(false)}
            message='Id 혹은 비밀번호가 들렸습니다.'
          />
        </Stack>
      </>
    );
  }
}

export default Login;
