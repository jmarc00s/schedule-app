import React from 'react';
import PageHeader from 'src/components/PageHeader';
import useAuth from 'src/core/hooks/useAuth';
import { useAxios } from 'src/core/hooks/useAxios';
import { UserModel } from 'src/core/models/user.model';

const User = () => {
  const { user } = useAuth();
  const { request, loading } = useAxios<UserModel>();

  return (
    <>
      <PageHeader title="Usuário" />
      <section className="flex flex-col">
        <div></div>
        <div></div>
      </section>
    </>
  );
};

export default User;
