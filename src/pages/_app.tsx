import '../styles/tailwind.css';

import { QueryClient, QueryClientProvider } from 'react-query';

import Layout from '../components/Layout';
import { UserProvider } from '@auth0/nextjs-auth0';
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <QueryClientProvider client={queryClient} contextSharing>
        <Toaster />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </QueryClientProvider>
    </UserProvider>
  );
}

export default MyApp;
