import React, { useState } from "react";

interface Context {
  fieldsParams: FieldsParams;
  errorsField: ErrorsField;
  handleChangeFields: (value: string, name: string) => void;
  handleError: (value: boolean, name: string) => void;
  validation: (field: string) => boolean;
  setFieldsParams: (params: FieldsParams) => void;
  setSizes: (size: string) => void;
  choosenSizes: string[];
  setChoosenSizes: (size: string[]) => void;
  setErrorsField: (fields: ErrorsField) => void;
}

export const EditingContext = React.createContext<Context>({
  fieldsParams: {
    title: "",
    descr: "",
    color: "",
    price: "",
    modelParam: "",
    composition: "",
    lastPrice: "",
    type: "",
    care: "",
    previewPhoto: "",
  },
  errorsField: {
    title: false,
    descr: false,
    color: false,
    price: false,
    modelParam: false,
    composition: false,
    lastPrice: false,
    sizes: false,
    type: false,
    care: false,
    previewPhoto: false,
  },
  handleChangeFields: () => {},
  handleError: () => {},
  validation: () => false,
  setFieldsParams: () => {},
  setSizes: () => {},
  choosenSizes: [],
  setChoosenSizes: () => {},
  setErrorsField: () => {},
});

export const EditingContextWrapper: React.FC = ({ children }) => {
  const [fieldsParams, setFieldsParams] = useState<FieldsParams>({
    title: "",
    descr: "",
    color: "",
    price: "",
    modelParam: "",
    composition: "",
    lastPrice: "",
    type: "",
    care: "",
    previewPhoto: "",
  });

  const [errorsField, setErrorsField] = useState<ErrorsField>({
    title: false,
    descr: false,
    color: false,
    price: false,
    modelParam: false,
    composition: false,
    lastPrice: false,
    sizes: false,
    type: false,
    care: false,
    previewPhoto: false,
  });

  const [choosenSizes, setChoosenSizes] = useState<string[]>([]);

  const setSizes = (size: string) => {
    if (choosenSizes.find((sizes) => sizes === size)) {
      setChoosenSizes(choosenSizes.filter((sizes) => sizes !== size));
    } else {
      setChoosenSizes([...choosenSizes, size]);
    }
  };

  const handleChangeFields = (value: string, name: string) => {
    setFieldsParams({ ...fieldsParams, [name]: value });
  };

  const handleError = (value: boolean, name: string) => {
    setErrorsField({ ...errorsField, [name]: value });
  };

  const validation = (name: string) => {
    if (fieldsParams[name].length < 3) {
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
      }}
    >
      {children}
    </EditingContext.Provider>
  );
};
