import React, { useState } from 'react';
import useAuth from 'src/core/hooks/useAuth';
import AvatarMenu from './AvatarMenu';

const Avatar = () => {
  const { user } = useAuth();

  return (
    <div className="flex items-center h-full gap-2 px-3 cursor-pointer">
      <p>{user?.name}</p>
      <div className="w-8 h-8 rounded-full cursor-pointer">
        <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="User" />
      </div>
    </div>
  );
};

export default Avatar;
