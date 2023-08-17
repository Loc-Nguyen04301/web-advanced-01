import { useEffect, useState } from 'react';
import {
  createStyles,
  UnstyledButton,
  Menu,
  Image,
  Group,
  rem,
} from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import images from '../../assets/images';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface Item {
  label: string;
  image: string;
  locale: string;
}

const data = [
  { label: 'English', image: images.english, locale: 'en' },
  { label: 'Vietnamese', image: images.vietnamese, locale: 'vi' },
];

const useStyles = createStyles((theme, { opened }: { opened: boolean }) => ({
  control: {
    width: rem(200),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    borderRadius: theme.radius.md,
    border: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[2]
    }`,
    transition: 'background-color 150ms ease',
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[opened ? 5 : 6]
        : opened
        ? theme.colors.gray[0]
        : theme.white,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[5]
          : theme.colors.gray[0],
    },
  },

  label: {
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,
  },

  icon: {
    transition: 'transform 150ms ease',
    transform: opened ? 'rotate(180deg)' : 'rotate(0deg)',
  },
}));

export function LanguagePicker() {
  const { i18n } = useTranslation();

  const [opened, setOpened] = useState(false);
  const { classes } = useStyles({ opened });
  const [selected, setSelected] = useState(data[0]);

  const handleChangeLanguage = (item: Item) => {
    i18n.changeLanguage(item.locale);
    setSelected(item);
  };

  useEffect(() => {
    const matchingItem = data.find(item => item.locale === i18n.language);
    if (matchingItem) {
      setSelected(matchingItem);
    }
  }, [i18n.language]);

  const items = data.map(item => (
    <Menu.Item
      icon={<Image src={item.image} width={18} height={18} />}
      onClick={() => handleChangeLanguage(item)}
      key={item.label}
    >
      {item.label}
    </Menu.Item>
  ));

  return (
    <Menu
      onOpen={() => setOpened(true)}
      onClose={() => setOpened(false)}
      radius="md"
      width="target"
      withinPortal
    >
      <Menu.Target>
        <UnstyledButton className={classes.control}>
          <Group spacing="xs">
            <Image src={selected.image} width={22} height={22} />
            <span className={classes.label}>{selected.label}</span>
          </Group>
          <IconChevronDown size="1rem" className={classes.icon} stroke={1.5} />
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>{items}</Menu.Dropdown>
    </Menu>
  );
}
