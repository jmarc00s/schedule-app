import React, { useState } from 'react';
import { Menu } from '@headlessui/react';
import { IconLogout } from './icons/IconLogout';
import Avatar from './Avatar';
import { IconCog } from './icons/IconCog';

const AvatarMenu = () => {
  return (
    <Menu as="div" className={'relative h-full flex'}>
      <Menu.Button>
        <Avatar />
      </Menu.Button>
      <Menu.Items className="absolute right-0 z-50 mt-2 text-gray-800 bg-white divide-y divide-gray-100 rounded-md shadow-lg w-42 -bottom-12">
        <div className="p-2">
          <Menu.Item>
            <button className="flex items-center w-full px-4 py-2 text-sm rounded-md hover:bg-gray-100">
              <span className="text-gray-500">{IconCog(5, 5)}</span>
              <span className="ml-3">Configurações</span>
            </button>
          </Menu.Item>
        </div>
        <div className="p-2">
          <Menu.Item>
            <button className="flex items-center w-full px-4 py-2 text-sm rounded-md hover:bg-gray-100">
              <span className="text-gray-500">{IconLogout(5, 5)}</span>
              <span className="ml-3">Sair</span>
            </button>
          </Menu.Item>
        </div>
      </Menu.Items>
    </Menu>
  );
};

export default AvatarMenu;
