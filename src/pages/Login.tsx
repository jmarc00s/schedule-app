import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Button from 'src/components/Button';
import Input from 'src/components/Input';
import useAuth from 'src/core/hooks/useAuth';
import { useToast } from 'src/core/hooks/useToast';

interface LoginFormData {
  username: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const { showErrorToast } = useToast();
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: { username: '', password: '' },
  });

  async function onSubmit({ username, password }: LoginFormData) {
    if (!username || !password) return;

    const isAuthenticated = await login(username, password);

    if (!isAuthenticated) {
      showErrorToast('Não foi possível acessar a aplicação!');
      return;
    }

    navigate('/');
    return;
  }

  return (
    <section className="h-full w-full bg-indigo-200 flex items-center justify-center">
      <div className="w-1/5 h-1/2 bg-gray-100 rounded shadow-md p-8">
        <div className="pt-2 pb-8">
          <h1 className="font-bold text-indigo-600 text-3xl text-center">ScheduleApp</h1>
          <p className="font-medium text-indigo-400 text-md text-center mt-3">
            Realiza o login para acessar a aplicação
          </p>
        </div>
        <div className="w-full flex flex-1 flex-col items-between ">
          <div className="mb-4">
            <Input
              required
              placeholder="Usuário"
              defaultValue={''}
              register={register}
              name="username"
              errors={errors.username}
              validation={{ required: true }}
            />
          </div>
          <div className="mb-4">
            <Input
              type="password"
              placeholder="Senha"
              name="password"
              register={register}
              errors={errors.password}
              validation={{ required: true }}
            />
          </div>
          <Button
            label="Acessar"
            handleClick={handleSubmit(onSubmit)}
            color="Dark indigo"
          ></Button>
        </div>
      </div>
    </section>
  );
};

export default Login;
