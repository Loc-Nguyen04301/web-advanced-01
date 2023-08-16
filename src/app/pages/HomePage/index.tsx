import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { AppShell, Footer, useMantineTheme } from '@mantine/core';
import HeaderComponent from 'app/components/Header';
import NavbarComponent from 'app/components/Navbar';

export function HomePage() {
  const theme = useMantineTheme();

  return (
    <>
      <Helmet>
        <title>HomePage</title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>
      <AppShell
        styles={{
          main: {
            background:
              theme.colorScheme === 'dark'
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        }}
        navbarOffsetBreakpoint="sm"
        navbar={<NavbarComponent />}
        footer={
          <Footer height={60} p="md">
            Application footer
          </Footer>
        }
        header={<HeaderComponent />}
      >
        main here
      </AppShell>
    </>
  );
}
