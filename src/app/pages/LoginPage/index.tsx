import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Container,
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  Button,
  Divider,
  Stack,
  LoadingOverlay,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import {
  GoogleButton,
  TwitterButton,
} from '../../../components/SocialButtons/SocialButton';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../../../store/hooks/index';
import { loginAccount } from 'store/reducers/user';
import { useNavigate } from 'react-router-dom';
import { alertAction } from 'store/reducers/alert';

export function LoginPage() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user);
  console.log(user);
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },

    validate: {
      password: val =>
        val.length < 6 ? 'Password should include at least 6 characters' : null,
    },
  });

  const handleSubmit = async () => {
    const data = { ...form.values };
    if (form.isValid()) {
      // call Login API
      const config = {
        method: 'POST',
        url: `https://api.godoo.asia/bs/login`,
        headers: { 'X-Requested-With': 'XMLHttpRequest' },
        data,
      };
      dispatch(alertAction({ loading: true }));
      const res = await axios(config);
      console.log(res);

      if (res.data.error === 0) {
        const payload = res.data.data;
        dispatch(loginAccount(payload));
        // SET USER TO LOCAL STORAGE
        localStorage.setItem('user', JSON.stringify(payload));
        dispatch(alertAction({ loading: false }));
      } else {
        console.log(res.data.message);
        dispatch(alertAction({ errors: res.data.message }));
      }
    }
  };

  // RETURN HOMEPAGE IF USER LOGGED IN
  React.useEffect(() => {
    if (user.id) navigate('/');
  }, [user, navigate]);

  return (
    <>
      <Helmet>
        <title>LoginPage</title>
        <meta
          name="description"
          content="A Boilerplate application LoginPage"
        />
      </Helmet>
      <Container size={'xs'}>
        <Paper radius="md" p="xl">
          <Text size="lg" weight={500}>
            Welcome to Mantine
          </Text>

          <Group grow mb="md" mt="md">
            <GoogleButton radius="xl">Google</GoogleButton>
            <TwitterButton radius="xl">Twitter</TwitterButton>
          </Group>

          <Divider
            label="Or continue with email"
            labelPosition="center"
            my="lg"
          />

          <form onSubmit={form.onSubmit(() => {})}>
            <Stack>
              <TextInput
                required
                label="Username"
                placeholder="hello@mantine.dev"
                value={form.values.username}
                onChange={event =>
                  form.setFieldValue('username', event.currentTarget.value)
                }
                radius="md"
                autoComplete="true"
              />

              <PasswordInput
                required
                label="Password"
                placeholder="Your password"
                value={form.values.password}
                onChange={event =>
                  form.setFieldValue('password', event.currentTarget.value)
                }
                error={
                  form.errors.password &&
                  'Password should include at least 6 characters'
                }
                radius="md"
                autoComplete="true"
              />
            </Stack>

            <Group position="apart" mt="xl">
              <Button type="submit" radius="xl" onClick={handleSubmit}>
                Login
              </Button>
            </Group>
          </form>
        </Paper>
      </Container>
    </>
  );
}
