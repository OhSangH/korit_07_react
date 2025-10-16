import HelloPorps from './types/types';

function HelloComponent({ name, age }: HelloPorps) {
  return (
    <>
      Hello, {name}, you are {age} years old!
    </>
  );
}

export default HelloComponent;
