function MyForm() {
  //form이 제출 될 때 호출 될 수 있도록 작성

  const handleSubmit = (event) => {
    event.preventDefault();
    // 그러면 onSubmit에 딸려 있는 default는 뭐냐면 양식 제출입니다. -> DB나 백엔드로
    alert("제출 시에 나오는 경고창입니다.");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="submit" value="제출!" />
      </form>
    </>
  );
}

export default MyForm;
