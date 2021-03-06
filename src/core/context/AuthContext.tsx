import { createContext, ReactNode, useState } from 'react';
import { useAxios } from '../hooks/useAxios';
import { UserModel } from '../models/user.model';
import useConfirmation from '../hooks/useConfirmation';
import md5 from 'md5';
import { useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { useLocation, useNavigate } from 'react-router-dom';

interface AuthContextProps {
  logout: () => void;
  login: (username: string, password: string) => Promise<boolean>;
  loading: boolean;
  isAuthenticated: boolean;
  user?: UserModel;
  updateUser: (user: UserModel) => void;
}

const AuthContext = createContext<AuthContextProps>({
  loading: true,
  login: async () => false,
  logout: () => {},
  isAuthenticated: false,
  updateUser: (user: UserModel) => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserModel | undefined>();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const { request, loading } = useAxios<UserModel[]>();
  const { setItem, getItem } = useLocalStorage('user');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const user = getItem();
    const { pathname } = location;

    if (user) {
      setUser(user);
      setIsAuthenticated(true);
      navigate(pathname);
    }
  }, []);

  async function login(username: string, password: string): Promise<boolean> {
    const user = await request({
      url: `/users?login=${username}&password=${md5(password)}`,
    });

    if (user?.length) {
      console.log(user);
      const { id, name, lastname, email, imageUrl } = user[0];
      setUser(user[0]);
      setIsAuthenticated(true);
      setItem(JSON.stringify({ id, name, lastname, email, imageUrl }));
      return true;
    }

    return false;
  }

  function logout() {
    setUser(undefined);
    setIsAuthenticated(false);
    setItem(undefined);
  }

  function updateUser(user: UserModel) {
    setUser(user);
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, login, logout, isAuthenticated, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
