import HelloPorps from './types/types';

function ByeComponent({ name }: HelloPorps) {
  return (
    <>
      <h1>Bye {name}!</h1>
    </>
  );
}

export default ByeComponent;
