import React from 'react';

import { createRoot } from 'react-dom/client';

import App from './jsx/Figure1.jsx';

const container = document.getElementById('app-root-2023-rmt_report');
const root = createRoot(container);
root.render(<App />);
