import React, { useState } from 'react';
import { Typography, Box } from '@mui/material';

import NavGroup from './NavGroup';
import { useNestedMenu } from './useNestedMenuItems';
import { CustomSearch } from '@/shared/components';

export type MenuListProps = {};

const normalizeText = (text: string) => {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
};

const MenuList: React.FC<MenuListProps> = () => {
  const { menuItems } = useNestedMenu();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = menuItems
    .map(item => {
      if (searchTerm === '') {
        return item;
      }
      if (item.type === 'group' && item.children) {
        const filteredChildren = item.children
          .map(child => {
            if (child.children) {
              const nestedFiltered = child.children.filter(nestedChild =>
                normalizeText(nestedChild.title).includes(
                  normalizeText(searchTerm),
                ),
              );
              if (nestedFiltered.length > 0) {
                return {
                  ...child,
                  children: nestedFiltered,
                };
              }
            }
            return null;
          })
          .filter(child => child !== null);
        if (filteredChildren.length > 0) {
          return {
            ...item,
            children: filteredChildren,
          };
        }
      }
      return null;
    })
    .filter(item => item !== null);
  const navItems = filteredItems.map(item => {
    if (item && item.type === 'group') {
      return <NavGroup key={item.id} item={item as any} />;
    }
    return (
      <Typography key={item?.id} variant="h6" color="error" align="center">
        Menu Items Error
      </Typography>
    );
  });

  return (
    <>
      <CustomSearch
        onChange={e => setSearchTerm(e)}
        value={searchTerm}
        text="modulos"
      />
      {navItems.length > 0 ? (
        navItems
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="60vh"
        >
          <Typography variant="h6" color="textSecondary" align="center">
            <iframe
              src="https://lottie.host/embed/9d2ca7c4-7c34-48f7-91d2-e16d3416dad4/hY1PUviu39.json"
              style={{ border: 'none' }}
            ></iframe>
            Módulo no encontrado
          </Typography>
        </Box>
      )}
    </>
  );
};

export default MenuList;
