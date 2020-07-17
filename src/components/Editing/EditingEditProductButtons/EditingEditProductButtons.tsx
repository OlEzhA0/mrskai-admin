import React, { useContext } from "react";
import "./EditingEditProductButtons.scss";
import { AppContext } from "../../../appContext";
import { deleteAllPhotosFromServer } from "../../../helpers";

interface Props {
  isOk: () => void;
  prodId: string;
  setCancel: (status: boolean) => void;
}

export const EditingEditProductButtons: React.FC<Props> = ({
  isOk,
  prodId,
  setCancel,
}) => {
  const { deletePopupOpen, setBackgroundCover } = useContext(AppContext);
  return (
    <>
      <div className="EditingPage__Buttons">
        <button
          className="EditingPage__Button EditingPage__Button--add"
          onClick={isOk}
        >
          Сохранить
        </button>
        <button
          className="EditingPage__Button EditingPage__Button--delete"
          onClick={() => {
            deletePopupOpen(true, prodId);
            setBackgroundCover(true);
          }}
        >
          Удалить товар
        </button>
      </div>
      <button
        className="EditingPage__Button EditingPage__Button--cancel EditingPage__Button--cancelN"
        onClick={() => {
          setCancel(true);
          deleteAllPhotosFromServer();
        }}
      >
        Отмена
      </button>
    </>
  );
};
