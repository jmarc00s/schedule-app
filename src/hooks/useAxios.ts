import axios, { AxiosRequestConfig } from 'axios';
import React from 'react';

axios.defaults.baseURL = 'http://localhost:4000';

export function useAxios<T>() {
  const [data, setData] = React.useState<T | undefined>(undefined);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>('');

  const request = async (options: AxiosRequestConfig): Promise<T | undefined> => {
    setError('');

    try {
      setLoading(true);
      const { data } = await axios(options);
      setData(data);
      return data;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, request };
}
