import { ChangeEvent, useState } from 'react';
import { Button, TextField, Snackbar, Divider, Box, CircularProgress, Stack, Alert } from '@mui/material';
import { AccountCredentials } from '../types';
import { login, authenticateWithGoogleToken } from '../api/shoppingapi';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';

type LoginProps = {
  loginSuccess: () => void;
};

function Login({ loginSuccess }: LoginProps) {
  const [user, setUser] = useState<AccountCredentials>({ username: '', password: '' });
  const [open, setOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState('Login failed');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // 아이디 / 비밀번호 로그인
  const handleUsernamePasswordLogin = () => {
    setLoading(true);
    login(user)
      .then((authorizationHeader) => {
        sessionStorage.setItem('jwt', authorizationHeader);
        loginSuccess();
      })
      .catch((err) => {
        console.error('Login error : ' + err);
        setErrorMsg(err.message || '예상 못한 로그인 관련 에러가 발생하였습니다.');
        setOpen(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Google 로그인 관련
  const handleGoogleLoginSuccess = async (credentialResponse: CredentialResponse) => {
    console.log('Google Login Success(Frontend 상황에서 ) : ', credentialResponse);
    if (credentialResponse.credential) {
      setLoading(true);
      try {
        const backendJwt = await authenticateWithGoogleToken(credentialResponse.credential);
        sessionStorage.setItem('jwt', backendJwt);
        loginSuccess();
      } catch (err: any) {
        console.error('구글 로그인 후에 백엔드 부분에서 인증 실패.', err);
        setErrorMsg(`구글 로그인은 성공했는데 백엔드에서 실패하였습니다. ${err?.message || '알수 없는 에러'}`);
        setOpen(true);
      } finally {
        setLoading(false);
      }
    } else {
      console.error('응답 결과에서 Google Credential을 찾을 수 없습니다. ');
      setErrorMsg('Google Login Failed : Credential Not Found');
      setOpen(true);
    }
  };

  const handleGoogleLoginError = () => {
    console.error('Google Login Failed (frontend)');
    setErrorMsg('구글 로그인 자체가 실패했습니다. 다시 시도하거나 좀 있다 시도해 주세요');
    setOpen(true);
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Enter' && !loading) {
      handleUsernamePasswordLogin();
    }
  };

  return (
    <>
      <Stack spacing={2} alignItems='center' mt={10}>
        <h2>Login</h2>
        <TextField
          name='username'
          label='UserName'
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          disabled={loading}
          autoFocus
          sx={{ width: '300px' }}
        />
        <TextField
          type='password'
          name='password'
          label='Password'
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          disabled={loading}
          sx={{ width: '300px' }}
        />
        <Button
          variant='contained'
          color='primary'
          onClick={handleUsernamePasswordLogin}
          disabled={loading}
          sx={{ width: '300px' }}
        >
          {loading ? <CircularProgress size={24} color='inherit' /> : 'LOGIN WITH USERNAME'}
        </Button>

        <Divider sx={{ width: '300px', marginY: 2 }}>OR</Divider>

        <Box sx={{ width: '300px', display: 'flex', justifyContent: 'center', opacity: loading ? 0.5 : 1 }}>
          {!loading && (
            <GoogleLogin
              width='300px'
              onSuccess={handleGoogleLoginSuccess}
              onError={handleGoogleLoginError}
              useOneTap={false}
            />
          )}
          {loading && <CircularProgress size={24} />}
        </Box>
      </Stack>
      <Snackbar open={open} onClose={() => setOpen(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity='error' onClose={() => setOpen(false)}>
          {errorMsg}
        </Alert>
      </Snackbar>
    </>
  );
}

export default Login;
