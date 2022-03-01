import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from './useToast';

axios.defaults.baseURL = 'http://localhost:4000';

export function useAxios<T>() {
  const [data, setData] = useState<T | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const { showWarningToast } = useToast();
  const navigate = useNavigate();

  function handleResponseError(status: number) {
    if (status === 404) {
      showWarningToast('Não foi possível acessar o recurso no servidor.');
      return;
    }

    if (status === 401) {
      showWarningToast('Sua sessão expirou. Realize o login novamente');
      navigate('/login');
      return;
    }

    showWarningToast('Não foi possível realizar a ação.');
  }

  const request = async (options: AxiosRequestConfig): Promise<T | undefined> => {
    setError('');

    try {
      setLoading(true);
      const { data } = await axios(options);
      setData(data);
      return data;
    } catch (error: any) {
      const { response } = error;
      if (response) {
        handleResponseError(response.status);
      }
    } finally {
      setLoading(false);
    }
  };

  const requestWithResponse = async (
    options: AxiosRequestConfig
  ): Promise<AxiosResponse | undefined> => {
    setError('');

    try {
      setLoading(true);
      const response = await axios(options);
      setData(response.data);
      return response;
    } catch (error: any) {
      const { response } = error;
      if (response) {
        handleResponseError(response.status);
      }
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, request, requestWithResponse };
}
