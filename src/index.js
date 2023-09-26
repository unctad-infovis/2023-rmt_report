import React from 'react';

import { createRoot } from 'react-dom/client';

import Figure1 from './jsx/Figure1.jsx';

import Figure2 from './jsx/Figure2.jsx';

import Footer from './jsx/Footer.jsx';

const container_figure1 = document.getElementById('app-root-2023-rmt_report_figure1');
if (container_figure1) {
  const root_figure1 = createRoot(container_figure1);
  root_figure1.render(<Figure1 />);
}

const container_figure2 = document.getElementById('app-root-2023-rmt_report_figure2');
if (container_figure2) {
  const root_figure2 = createRoot(container_figure2);
  root_figure2.render(<Figure2 />);
}

const container_footer = document.getElementById('app-root-2023-rmt_report_footer');
if (container_footer) {
  const root_footer = createRoot(container_footer);
  root_footer.render(<Footer />);
}
