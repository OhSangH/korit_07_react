import { Container } from '@mui/material';
import { AppBar, Toolbar, Typography } from '@mui/material';
import ItemList from './components/ItemList';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {
  const queryClient = new QueryClient();
  // const addItem = (item: Item) => {
  //   setItems([item, ...items]);
  // };

  return (
    <Container>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6'>쇼핑 리스트 Shopping List</Typography>
        </Toolbar>
      </AppBar>
      <QueryClientProvider client={queryClient}>
        <ItemList />
      </QueryClientProvider>
    </Container>
  );
}

export default App;
