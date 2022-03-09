import React, { useState } from 'react';
import { Menu } from '@headlessui/react';
import { IconLogout } from './icons/IconLogout';
import Avatar from './Avatar';
import { IconCog } from './icons/IconCog';
import { useNavigate } from 'react-router-dom';
import { IconUser } from './icons/IconUser';
import ConfirmDialog from './ConfirmDialog';
import useAuth from 'src/core/hooks/useAuth';

const AvatarMenu = () => {
  const [openConfirmLogoutDialog, setOpenConfirmLogoutDialog] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleOpenConfirmLogoutDialog = () => setOpenConfirmLogoutDialog(true);

  function handleConfigClick() {}

  function handleProfileClick() {
    navigate('/user');
  }

  function handleLogoutClick() {
    handleOpenConfirmLogoutDialog();
  }

  return (
    <>
      <Menu as="div" className={'relative inline-block'}>
        <Menu.Button>
          <Avatar />
        </Menu.Button>
        <Menu.Items className="absolute right-0 z-50 mt-2 text-gray-800 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg w-42">
          <div className="p-2">
            <Menu.Item>
              <button
                onClick={handleProfileClick}
                className="flex items-center w-full px-4 py-2 text-sm rounded-md hover:bg-gray-100"
              >
                <span className="text-gray-500">{IconUser(5, 5)}</span>
                <span className="ml-3">Perfil</span>
              </button>
            </Menu.Item>
          </div>
          <div className="p-2">
            <Menu.Item>
              <button
                onClick={handleConfigClick}
                className="flex items-center w-full px-4 py-2 text-sm rounded-md hover:bg-gray-100"
              >
                <span className="text-gray-500">{IconCog(5, 5)}</span>
                <span className="ml-3">Configurações</span>
              </button>
            </Menu.Item>
          </div>
          <div className="p-2">
            <Menu.Item>
              <button
                onClick={handleLogoutClick}
                className="flex items-center w-full px-4 py-2 text-sm rounded-md hover:bg-gray-100"
              >
                <span className="text-gray-500">{IconLogout(5, 5)}</span>
                <span className="ml-3">Sair</span>
              </button>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Menu>
      <ConfirmDialog
        open={openConfirmLogoutDialog}
        setOpen={setOpenConfirmLogoutDialog}
        description="Deseja realmente sair da aplicação ?"
        onConfirm={() => logout()}
      />
    </>
  );
};

export default AvatarMenu;
