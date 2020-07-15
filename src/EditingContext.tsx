import React, { useState } from "react";

interface FieldsParams {
  title: string;
  descr: string;
  color: string;
  price: string;
  modelParam: string;
  composition: string;
  lastPrice: string;
  type: string;
  previewPhoto: string;
  care: string;
  [key: string]: string;
}

interface ErrorsField {
  title: boolean;
  descr: boolean;
  color: boolean;
  price: boolean;
  modelParam: boolean;
  composition: boolean;
  lastPrice: boolean;
  sizes: boolean;
  type: boolean;
  care: boolean;
  previewPhoto: boolean;
  [key: string]: boolean;
}

interface Context {
  fieldsParams: FieldsParams;
  errorsField: ErrorsField;
  handleChangeFields: (value: string, name: string) => void;
  handleError: (value: boolean, name: string) => void;
  validation: (field: string) => void;
  setFieldsParams: (params: FieldsParams) => void;
  setSizes: (size: string) => void;
  choosenSizes: string[];
  setChoosenSizes: (size: string[]) => void;
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
  validation: () => {},
  setFieldsParams: () => {},
  setSizes: () => {},
  choosenSizes: [],
  setChoosenSizes: () => {},
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
    if (fieldsParams[name].trim().length < 3) {
      setErrorsField({ ...errorsField, [name]: true });
    }
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
      }}
    >
      {children}
    </EditingContext.Provider>
  );
};
