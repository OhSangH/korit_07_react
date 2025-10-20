import { AppBar, Toolbar, Typography, Container, CssBaseline } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CarList from './components/CarList';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <Container maxWidth='xl'>
        <CssBaseline />
        <AppBar position='static'>
          <Toolbar>
            <Typography variant='h6'>Car Shop</Typography>
          </Toolbar>
        </AppBar>
        <QueryClientProvider client={queryClient}>
          <CarList />
        </QueryClientProvider>
      </Container>
    </>
  );
}

export default App;
