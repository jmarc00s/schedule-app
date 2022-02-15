import { createContext, ReactNode, useState } from 'react';
import { useAxios } from '../hooks/useAxios';
import { UserModel } from '../models/user.model';
import useConfirmation from '../hooks/useConfirmation';
import md5 from 'md5';
import { useNavigate } from 'react-router-dom';

interface AuthContextProps {
  logout: () => void;
  login: (username: string, password: string) => Promise<void>;
  loading: boolean;
  isAuthenticated: boolean;
  user?: UserModel;
}

const AuthContext = createContext<AuthContextProps>({
  loading: true,
  login: async () => {},
  logout: () => {},
  isAuthenticated: false,
});

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserModel | undefined>();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const { request, loading } = useAxios<UserModel[]>();
  const { openDialog } = useConfirmation();

  async function login(username: string, password: string) {
    const user = await request({
      url: `/users?login=${username}&password=${md5(password)}`,
    });

    if (user?.length) {
      setUser(user[0]);
      setIsAuthenticated(true);
    }
  }

  function logout() {
    const confirmation = openDialog('Deseja realmente sair da aplicação ?');

    if (confirmation) {
      setUser(undefined);
      setIsAuthenticated(false);
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
