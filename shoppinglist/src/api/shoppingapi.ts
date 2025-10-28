import axios, { AxiosRequestConfig } from 'axios';
import { AccountCredentials, ShoppingItem, ShoppingItemEntry } from '../types';

const BASE_URL = `${import.meta.env.VITE_BASE_URL}`;

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  (respose) => respose,
  (err) => {
    console.log('API Error : ', err.response || err.message || err);
    return Promise.reject(err.response?.data || new Error(err.message || '예상 못한 에러 발생'));
  }
);

const getRequestConfig = (): AxiosRequestConfig => {
  const token = sessionStorage.getItem('jwt');
  if (token) {
    return {
      headers: { Authorization: token },
    };
  }
  return {};
};

export const login = async (creds: AccountCredentials): Promise<string> => {
  try {
    const response = await apiClient.post('/login', creds);
    const jwtToken = response.headers.authorization;
    if (!jwtToken) {
      throw new Error('JWT 토큰이 headers에 담겨있지 않습니다.');
    }
    return jwtToken;
  } catch (err) {
    console.log('username / password가 틀렸습니다.');
    // error 객체가 AxiosError 인스턴스인지 확인하는 과정 작성
    if (axios.isAxiosError(err) && err.response) {
      throw new Error(err.response.data?.message || err.response.data?.err || `Login 실패 (${err.response.status})`);
    } else if (err instanceof Error) {
      throw err;
    } else {
      throw new Error('예측 불가능한 오류가 로그인상에서 발생하였습니다.');
    }
  }
};

export const getItem = async (): Promise<ShoppingItem[]> => {
  const response = await apiClient.get('/api/items', getRequestConfig());
  return response.data;
};

export const addItem = async (item: ShoppingItemEntry): Promise<ShoppingItem> => {
  const response = await apiClient.post('/api/items', item, getRequestConfig());
  return response.data;
};

export const updateItem = async (id: number, itemUpdate: ShoppingItemEntry): Promise<ShoppingItem> => {
  const response = await apiClient.put(`api/items/${id}`, itemUpdate, getRequestConfig());
  return response.data;
};

export const deleteItem = async (id: number): Promise<void> => {
  await apiClient.delete(`/api/items/${id}`, getRequestConfig());
};

// Google ID 토큰 백엔드 전송 및 JWT 수신 관련 함수
/*
  Google ID 토큰을 백엔드로 보낸 다음 검증하고, 앱의 JWT를 받아옵니다.
  @param id Token - Google 로그인 성공 시 받은 ID 토큰
  @returns - 백엔드에서 발급한 JWT
*/
export const authenticateWithGoogleToken = async (idToken: string): Promise<string> => {
  console.log('Google ID 토큰을 백엔드로 전송합니다.', idToken.substring(0, 30) + '...');
  try {
    // 백엔드에 구현한 Google 토큰 검증 엔드 포인트를 호출 할 겁니다.
    const response = await apiClient.post('/api/auth/google', { idToken });
    const backendJwt = response.data.token; // 백엔드에서 token field에 JWT를 담아서 반환
    if (!backendJwt) {
      throw new Error('백엔드에서 JWT 토큰을 보내지 않았습니다.');
    }
    console.log('JWT가 백엔드로부터 전성됨 : ', backendJwt.substring(0, 15) + '...');
    return backendJwt; // 'Bearer <token>' 형태로 return
  } catch (err) {
    console.log('Backend Google Auth Error' + err);
    if (axios.isAxiosError(err) && err.response) {
      throw new Error(
        err.response.data?.message || err.response.data?.err || `백엔드 구글 인증 실패 (${err.response.status})`
      );
    } else if (err instanceof Error) {
      throw err;
    } else {
      throw new Error('예측 불가능한 오류가 구글 인증 시에 발생하였습니다.');
    }
  }
};
