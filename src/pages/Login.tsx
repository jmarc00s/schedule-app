import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'src/components/Button';
import Input from 'src/components/Input';
import useAuth from 'src/core/hooks/useAuth';
import { useToast } from 'src/core/hooks/useToast';

const Login = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();
  const { showErrorToast } = useToast();

  const { login } = useAuth();

  function cleanUpForm() {
    setUsername('');
    setPassword('');
  }

  async function handleSubmit() {
    const isAuthenticated = await login(username, password);

    if (!isAuthenticated) {
      showErrorToast('Não foi possível acessar a aplicação!');
      cleanUpForm();
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
        <div className="w-full flex flex-1 flex-col items-between gap-3">
          <Input
            placeHolder="Usuário"
            value={username}
            setValue={(value) => setUsername(value)}
            disabled={false}
          />
          <Input
            type="password"
            placeHolder="Senha"
            value={password}
            setValue={(value) => setPassword(value)}
            disabled={false}
          />
          <Button label="Acessar" handleClick={handleSubmit} color="Dark indigo"></Button>
        </div>
      </div>
    </section>
  );
};

export default Login;
