import md5 from 'md5';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Input from 'src/components/Input';
import PageHeader from 'src/components/PageHeader';
import useAuth from 'src/core/hooks/useAuth';
import { useAxios } from 'src/core/hooks/useAxios';
import { useToast } from 'src/core/hooks/useToast';
import { UserModel } from 'src/core/models/user.model';
import { emailPattern } from 'src/utils/regex';

interface UserFormData {
  name: string;
  lastname: string;
  username: string;
  email: string;
}

const User = () => {
  const [password, setPassword] = useState<string | undefined>();
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const { showSuccessToast } = useToast();
  const { request, loading } = useAxios<UserModel>();
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<UserFormData>();

  useEffect(() => {
    async function getUser() {
      const response = await request({ url: `/users/${user?.id}` });
      reset({ ...response });
      setPassword(response?.password);
    }
    getUser();
  }, []);

  async function onSubmit(data: UserFormData) {
    const response = await request({
      url: `/users/${user?.id}`,
      data: { ...data, password },
      method: 'PUT',
    });

    if (response) {
      updateUser(response);
      showSuccessToast('Usuário editado com sucesso!');
      navigate('/');
      return;
    }
  }

  return (
    <>
      <PageHeader
        title="Perfil"
        btnText="Salvar"
        handleBtnClick={handleSubmit(onSubmit)}
        showProgress={loading}
      />
      <section className="max-w-screen-lg mx-auto">
        <form className="flex flex-col">
          <div className="flex justify-center w-full mb-6">
            <img
              className="w-48 h-48 rounded-full"
              src={
                user?.imageUrl || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
              }
              alt="User"
            />
          </div>
          <div className="mb-6">
            <Input
              required={true}
              placeholder="Nome"
              register={register}
              name="name"
              errors={errors.name}
              validation={{ required: true }}
              maxLength={50}
              disabled={loading}
            />
          </div>
          <div className="mb-6">
            <Input
              register={register}
              name="lastname"
              placeholder="Sobrenome"
              maxLength={100}
              disabled={loading}
            />
          </div>
          <div className="mb-6">
            <Input
              register={register}
              name="email"
              placeholder="Email"
              validation={{ pattern: emailPattern }}
              errors={errors.email}
              disabled={loading}
            />
          </div>
          <Input
            register={register}
            name="imageUrl"
            placeholder="Url do perfil"
            type="text"
            disabled={loading}
          />
        </form>
      </section>
    </>
  );
};

export default User;
