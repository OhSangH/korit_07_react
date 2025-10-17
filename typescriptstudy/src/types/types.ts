type HelloPorps = {
  name: string;
  age?: number;
  fn?: () => void;
  fn2?: (msg: string) => void;
};

export default HelloPorps;

// 여기 내에 모든 type들을 다 모아두는 편입니다.
