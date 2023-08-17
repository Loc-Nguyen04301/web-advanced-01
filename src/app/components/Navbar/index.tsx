import React, { useEffect, useState } from 'react';
import {
  Navbar,
  SegmentedControl,
  Text,
  createStyles,
  getStylesRef,
  rem,
} from '@mantine/core';
import {
  IconShoppingCart,
  IconLicense,
  IconMessage2,
  IconBellRinging,
  IconFingerprint,
  IconReceipt2,
} from '@tabler/icons-react';
import { useAppSelector } from 'store/hooks';

const useStyles = createStyles(theme => ({
  navbar: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  title: {
    textTransform: 'uppercase',
    letterSpacing: rem(-0.25),
  },

  link: {
    ...theme.fn.focusStyles(),
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    fontSize: theme.fontSizes.sm,
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[1]
        : theme.colors.gray[7],
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,

      [`& .${getStylesRef('icon')}`]: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      },
    },
  },

  linkIcon: {
    ref: getStylesRef('icon'),
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[2]
        : theme.colors.gray[6],
    marginRight: theme.spacing.sm,
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({
        variant: 'light',
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
        .color,
      [`& .${getStylesRef('icon')}`]: {
        color: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
          .color,
      },
    },
  },

  footer: {
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
    paddingTop: theme.spacing.md,
  },

  label: {
    textTransform: 'capitalize',
  },
}));

enum Section {
  ACCOUNT = 'account',
  GENERAL = 'general',
}

enum ActiveTab {
  NOTIFICATIONS = 'notifications',
  BILLING = 'billing',
  SECURITY = 'security',
  ORDERS = 'orders',
  RECEIPTS = 'receipts',
  REVIEWS = 'reviews',
}

const tabs = {
  [Section.ACCOUNT]: [
    { link: '', label: ActiveTab.NOTIFICATIONS, icon: IconBellRinging },
    { link: '', label: ActiveTab.BILLING, icon: IconReceipt2 },
    { link: '', label: ActiveTab.SECURITY, icon: IconFingerprint },
  ],
  [Section.GENERAL]: [
    { link: '', label: ActiveTab.ORDERS, icon: IconShoppingCart },
    { link: '', label: ActiveTab.RECEIPTS, icon: IconLicense },
    { link: '', label: ActiveTab.REVIEWS, icon: IconMessage2 },
  ],
};

const NavbarComponent = () => {
  const user = useAppSelector(state => state.user);

  const { classes, cx } = useStyles();
  const [section, setSection] = useState<Section>(Section.ACCOUNT);
  const [activeTab, setActiveTab] = useState<ActiveTab>(
    ActiveTab.NOTIFICATIONS,
  );

  const links = tabs[section].map(item => (
    <a
      className={cx(classes.link, {
        [classes.linkActive]: item.label === activeTab,
      })}
      href={item.link}
      key={item.label}
      onClick={event => {
        event.preventDefault();
        setActiveTab(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <Text sx={{ textTransform: 'capitalize' }}>{item.label}</Text>
    </a>
  ));

  useEffect(() => {
    section === Section.ACCOUNT
      ? setActiveTab(ActiveTab.NOTIFICATIONS)
      : setActiveTab(ActiveTab.ORDERS);
  }, [section]);

  return (
    <Navbar
      height={840}
      width={{ sm: 300 }}
      p="md"
      className={classes.navbar}
      hiddenBreakpoint="sm"
      hidden={true}
    >
      <Navbar.Section>
        <Text
          weight={500}
          size="sm"
          className={classes.title}
          color="dimmed"
          mb="xs"
          sx={{
            textAlign: 'center',
          }}
        >
          {user && user.username}
        </Text>

        <SegmentedControl
          classNames={{
            label: classes.label,
          }}
          value={section}
          onChange={(value: Section) => setSection(value)}
          transitionTimingFunction="ease"
          fullWidth
          data={[
            { label: Section.ACCOUNT, value: Section.ACCOUNT },
            { label: Section.GENERAL, value: Section.GENERAL },
          ]}
        />
      </Navbar.Section>
      <Navbar.Section grow mt="xl">
        {links}
      </Navbar.Section>
    </Navbar>
  );
};

export default NavbarComponent;
