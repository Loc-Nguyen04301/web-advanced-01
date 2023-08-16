/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { GlobalStyle } from 'styles/global-styles';

import { HomePage } from './pages/HomePage/Loadable';
import { LoginPage } from './pages/LoginPage/Loadable';
import { NotFoundPage } from './components/NotFoundPage/Loadable';
import { useTranslation } from 'react-i18next';
import Loading from 'components/Loading';
import { LoadingOverlay } from '@mantine/core';
import { useAppSelector } from 'store/hooks';
import NotificationComponent from 'components/Notifications';

export function App() {
  const { i18n } = useTranslation();
  const loading = useAppSelector(state => state.alert.loading);
  const errors = useAppSelector(state => state.alert.errors);

  return (
    <BrowserRouter>
      <LoadingOverlay visible={loading || false} loader={Loading} />
      {errors && errors.length > 0 && (
        <NotificationComponent success={false} title={errors} />
      )}
      <Helmet
        titleTemplate="%s - React Boilerplate"
        defaultTitle="React Boilerplate"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content="A React Boilerplate application" />
      </Helmet>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <GlobalStyle />
    </BrowserRouter>
  );
}
