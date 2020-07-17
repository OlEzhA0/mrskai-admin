import React, { useState } from "react";

interface Context {
  deletePopup: boolean;
  setDeletePopup: (status: boolean) => void;
  currentId: any;
  deletePopupOpen: (status: boolean, id: string) => void;
  checked: string[];
  setCheckedFn: (id: string) => void;
  clearAllChecked: () => void;
  bachgroundCover: boolean;
  setBackgroundCover: (status: boolean) => void;
}

export const AppContext = React.createContext<Context>({
  deletePopup: false,
  setDeletePopup: () => {},
  currentId: "",
  deletePopupOpen: () => {},
  checked: [],
  setCheckedFn: () => {},
  clearAllChecked: () => {},
  bachgroundCover: false,
  setBackgroundCover: () => {},
});

export const AppContextWrapper: React.FC = ({ children }) => {
  const [deletePopup, setDeletePopup] = useState(false);
  const [currentId, setCurrentId] = useState("");
  const [checked, setChecked] = useState<string[]>([]);
  const [bachgroundCover, setBackgroundCover] = useState(false);

  const deletePopupOpen = (status: boolean, id?: string) => {
    setDeletePopup(status);

    if (status && id) {
      setCurrentId(id);
    } else {
      setCurrentId("");
    }
  };

  const setCheckedFn = (id: string) => {
    if (checked.find(checkId => checkId === id)) {
      setChecked(checked.filter(checkId => checkId !== id));
    } else {
      setChecked([...checked, id]);
    }
  }

  const clearAllChecked = () => {
    setChecked([]);
  }

  return (
    <AppContext.Provider
      value={{
        deletePopup,
        setDeletePopup,
        currentId,
        deletePopupOpen,
        checked,
        setCheckedFn,
        clearAllChecked,
        bachgroundCover,
        setBackgroundCover
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
