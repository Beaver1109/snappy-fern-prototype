import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter, Link, NavLink } from 'react-router';
import {
  DexProvider,
  DexNotificationViewport,
  DexConfirmDialogViewport,
  DexRouterAdapterProvider,
} from '@thryvlabs/dex-react';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <StrictMode>
    <DexProvider>
      <BrowserRouter>
        <DexRouterAdapterProvider adapter={{ Link, NavLink }}>
          <App />
          <DexNotificationViewport />
          <DexConfirmDialogViewport />
        </DexRouterAdapterProvider>
      </BrowserRouter>
    </DexProvider>
  </StrictMode>,
);
