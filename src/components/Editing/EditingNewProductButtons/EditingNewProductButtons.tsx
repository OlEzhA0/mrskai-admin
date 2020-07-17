import React from "react";
import "./EditingNewProductButtons.scss";

interface Props {
  isOk: () => void;
  handleCancel: () => void;
}

export const EditingNewProductButtons: React.FC<Props> = ({
  isOk,
  handleCancel,
}) => (
  <div className="EditingPage__Buttons">
    <button
      className="EditingPage__Button EditingPage__Button--add"
      onClick={isOk}
    >
      Добавить
    </button>

    <button
      className="EditingPage__Button EditingPage__Button--cancel"
      onClick={handleCancel}
    >
      Отмена
    </button>
  </div>
);
