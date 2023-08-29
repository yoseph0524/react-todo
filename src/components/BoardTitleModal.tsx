import { useForm } from "react-hook-form";
import { boardTitleModalState, boardTitleState, todosState } from "../atom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { saveTodoToLocalStorage } from "../utils/todo";
import StyledModal from "./common/StyledModal";
import { useCallback } from "react";

interface FormData {
  title: string;
}

const BoardTitleModal = () => {
  const { register, handleSubmit, getValues, setValue } = useForm<FormData>({
    mode: "onChange",
  });
  const [boardTitle, setBoardTitle] = useRecoilState<string>(boardTitleState);
  const [boardTitleModal, setBoardTitleModal] =
    useRecoilState<boolean>(boardTitleModalState);
  const setTodos = useSetRecoilState(todosState);

  const handleCloseModal = useCallback(() => {
    return setBoardTitleModal(false);
  }, [setBoardTitleModal]);

  const onValid = useCallback(() => {
    const { title } = getValues();
    setTodos((todos) => {
      const copiedTodos = { ...todos };
      const editingBoard = copiedTodos[boardTitle];
      delete copiedTodos[boardTitle];
      const result = { [title]: editingBoard, ...copiedTodos };
      saveTodoToLocalStorage(result);
      return result;
    });
    setBoardTitle("");
    setValue("title", "");
    handleCloseModal();
  }, [
    boardTitle,
    getValues,
    handleCloseModal,
    setBoardTitle,
    setTodos,
    setValue,
  ]);

  return (
    <StyledModal
      isOpen={boardTitleModal}
      onRequestClose={handleCloseModal}
      ariaHideApp={false}
      contentLabel="boardTitleModal"
    >
      <button type="button" onClick={handleCloseModal}>
        ✕
      </button>
      <form onSubmit={handleSubmit(onValid)}>
        <div>
          <h1>Board Edit</h1>
          <input
            {...register("title", { required: "Edit the Board" })}
            type="text"
            placeholder="Edit the Board"
          />
        </div>
      </form>
    </StyledModal>
  );
};

export default BoardTitleModal;
