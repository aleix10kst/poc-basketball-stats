import { StrictMode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as ReactDOM from 'react-dom/client';

import App from './app/app';
import { MatchProvider } from './app/providers/match.provider';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <MatchProvider>
        <App />
      </MatchProvider>
    </QueryClientProvider>
  </StrictMode>
);
