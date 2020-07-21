import React, { useState } from "react";
import { DEFAULT_FIELDS_ERRORS, DEFAULT_FIELDS_PARAMS } from "./helpers";

interface Context {
  fieldsParams: FieldsParams;
  errorsField: ErrorsField;
  handleChangeFields: (value: string, name: string) => void;
  handleError: (value: boolean, name: string) => void;
  validation: (field: string) => boolean;
  setFieldsParams: (params: FieldsParams) => void;
  setSizes: (size: string) => void;
  choosenSizes: Sizes[];
  setChoosenSizes: (size: Sizes[]) => void;
  setErrorsField: (fields: ErrorsField) => void;
  changeArticul: (size: string, articul: string) => void;
  validationChoosenSizesArticul: (size: string) => void;
  choosenSizesError: string[];
}

export const EditingContext = React.createContext<Context>({
  fieldsParams: DEFAULT_FIELDS_PARAMS,
  errorsField: DEFAULT_FIELDS_ERRORS,
  handleChangeFields: () => {},
  handleError: () => {},
  validation: () => false,
  setFieldsParams: () => {},
  setSizes: () => {},
  choosenSizes: [],
  setChoosenSizes: () => {},
  setErrorsField: () => {},
  changeArticul: () => {},
  validationChoosenSizesArticul: () => {},
  choosenSizesError: [],
});

export const EditingContextWrapper: React.FC = ({ children }) => {
  const [fieldsParams, setFieldsParams] = useState<FieldsParams>(
    DEFAULT_FIELDS_PARAMS
  );

  const [errorsField, setErrorsField] = useState<ErrorsField>(
    DEFAULT_FIELDS_ERRORS
  );

  const [choosenSizes, setChoosenSizes] = useState<Sizes[]>([]);
  const [choosenSizesError, setChoosenSizesError] = useState<string[]>([]);

  const setSizes = (size: string) => {
    if (choosenSizes.find((sizes) => sizes.size === size)) {
      setChoosenSizes(choosenSizes.filter((sizes) => sizes.size !== size));
      setChoosenSizesError(
        choosenSizesError.filter((choosenSize) => choosenSize !== size)
      );
    } else {
      setChoosenSizes([...choosenSizes, { size, articul: "", stock: "0" }]);
    }
  };

  const changeArticul = (modifySize: string, value: string) => {
    const checkedValue = value.replace(/\D/g, "");
    setChoosenSizes(
      choosenSizes.map((choosenSize) => {
        if (choosenSize.size === modifySize) {
          return { ...choosenSize, articul: checkedValue };
        } else {
          return choosenSize;
        }
      })
    );
  };

  const validationChoosenSizesArticul = (size: string) => {
    const articul =
      choosenSizes.find((choosenSize) => choosenSize.size === size)?.articul ||
      "";

    if (articul?.trim().length < 5) {
      if (!choosenSizesError.some((choosenSize) => choosenSize === size)) {
        setChoosenSizesError([...choosenSizesError, size]);
      }

      handleError(true, "sizes");
    } else {
      setChoosenSizesError(
        choosenSizesError.filter((choosenSize) => choosenSize !== size)
      );
    }
  };

  const handleChangeFields = (value: string, name: string) => {
    setFieldsParams({ ...fieldsParams, [name]: value });
  };

  const handleError = (value: boolean, name: string) => {
    setErrorsField({ ...errorsField, [name]: value });
  };

  const validation = (name: string) => {
    if (fieldsParams[name].length < 2) {
      handleError(true, name);

      return true;
    }

    return false;
  };

  return (
    <EditingContext.Provider
      value={{
        fieldsParams,
        errorsField,
        handleChangeFields,
        validation,
        handleError,
        setFieldsParams,
        choosenSizes,
        setSizes,
        setChoosenSizes,
        setErrorsField,
        changeArticul,
        choosenSizesError,
        validationChoosenSizesArticul,
      }}
    >
      {children}
    </EditingContext.Provider>
  );
};
