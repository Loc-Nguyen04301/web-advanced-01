import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { AppShell, useMantineTheme } from '@mantine/core';
import HeaderComponent from 'app/components/Header';
import NavbarComponent from 'app/components/Navbar';
import FooterComponent from 'app/components/Footer';
import { useAppDispatch } from 'store/hooks';
import { loginAccount } from 'store/reducers/user';
import { User } from 'store/types/userType';

export function HomePage() {
  const theme = useMantineTheme();
  const dispatch = useAppDispatch();
  // SAVE USER IN LOCALSTORAGE
  React.useEffect(() => {
    const userJson = localStorage.getItem('user');
    let user: User;
    if (userJson !== null) {
      user = JSON.parse(userJson);
    }
    if (userJson) {
      user = JSON.parse(userJson);
      dispatch(loginAccount(user));
    }
  }, [dispatch]);

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
        footer={<FooterComponent />}
        header={<HeaderComponent />}
      >
        main here
      </AppShell>
    </>
  );
}
