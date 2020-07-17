import React, { useContext, useEffect, useState } from "react";
import { useMutation, useQuery } from "react-apollo";
import { Redirect, useLocation } from "react-router-dom";
import { AppContext } from "../../appContext";
import { EditingContext } from "../../EditingContext";
import {
  DEFAULT_FIELDS_ERRORS,
  DEFAULT_FIELDS_PARAMS,
  deleteAllPhotosFromServer,
  deletePhotoS3,
  loadPhotos
} from "../../helpers";
import { addProductMutation, updateProductMutation } from "../../mutation";
import {
  EditingColros,
  EditingEditProductButtons,
  EditingInput,
  EditingNewProductButtons,
  EditingPrices,
  EditingSelect,
  EditingSizes,
  EditingText,
  PopupSuccessNew,
  UploadFile
} from "../Editing";
import "./EditingPage.scss";
import { productQuery } from "./query";

export const EditingPage: React.FC = () => {
  const location = useLocation();
  const isNewProduct = location.pathname.startsWith("/new");
  const {
    fieldsParams,
    errorsField,
    handleChangeFields,
    handleError,
    validation,
    setFieldsParams,
    choosenSizes,
    setChoosenSizes,
    setErrorsField,
  } = useContext(EditingContext);
  const { setBackgroundCover } = useContext(AppContext);
  const prodId = location.pathname.split("/").filter((name) => name)[1];
  const { data } = useQuery(productQuery, { variables: { id: prodId } });
  const [photos, setPhotos] = useState<string[]>([]);
  const [addProduct] = useMutation(addProductMutation);
  const [updateProduct] = useMutation(updateProductMutation);
  const [cancelSuccess, setCancelSuccess] = useState(false);
  const [cancel, setCancel] = useState(false);

  useEffect(() => {
    deleteAllPhotosFromServer();

    return () => {
      deleteAllPhotosFromServer();
    };
  }, []);

  useEffect(() => {
    if (!isNewProduct && data && data.product) {
      const {
        title,
        descr,
        color,
        price,
        modelParam,
        composition,
        sizes,
        lastPrice,
        type,
        photos,
        previewPhoto,
        care,
      } = data.product;

      const newParams = {
        title,
        descr,
        color,
        price,
        modelParam,
        composition,
        lastPrice,
        care,
        type,
        previewPhoto,
      };

      const newSizes = sizes.split(",");
      setChoosenSizes(newSizes);
      setPhotos(photos);
      setFieldsParams(newParams);
      loadPhotos(photos);
    }
  }, [data]);

  const isOk = () => {
    let isError = false;
    const errors: ErrorsField = {
      title: validation("title"),
      descr: validation("descr"),
      color: validation("color"),
      price: validation("price"),
      modelParam: validation("modelParam"),
      composition: validation("composition"),
      lastPrice: false,
      type: validation("type"),
      care: validation("care"),
      previewPhoto: fieldsParams.previewPhoto.length === 0,
      sizes: choosenSizes.length === 0,
    };

    setErrorsField(errors);

    Object.keys(errors).forEach((key) => {
      if (errors[key]) {
        isError = true;
        return;
      }
    });

    if (!photos.length) {
      isError = true;
    }

    if (isError) {
      console.log("error");
      return;
    } else {
      const sizes = choosenSizes.join(",");
      setBackgroundCover(true);

      if (isNewProduct) {
        const variables: LocalProduct = {
          ...fieldsParams,
          sizes,
          photos,
        };
        addProd(variables);
      } else {
        const variables: Products = {
          ...fieldsParams,
          id: prodId,
          sizes,
          photos,
        };
        updateProd(variables);
      }
    }
  };

  const handleCancel = () => {
    photos.forEach((photo) => deletePhotoS3(photo));
    deleteAllPhotosFromServer();
    setCancel(true);
  };

  const addProd = async (variables: LocalProduct) => {
    await addProduct({
      variables,
      refetchQueries: [
        {
          query: productQuery,
        },
      ],
    })
      .then(() => {
        setCancelSuccess(true);
        deleteAllPhotosFromServer();
      })
      .catch((err) => console.log("error cant to send", err));
  };

  const updateProd = async (variables: Products) => {
    await updateProduct({
      variables,
    })
      .then(() => {
        setCancelSuccess(true);
        deleteAllPhotosFromServer();
      })
      .catch(() => console.log("err"))
      .finally(() => console.log("finnaly"));
  };

  const addMore = () => {
    setBackgroundCover(false);
    setCancelSuccess(false);
    setPhotos([]);
    setChoosenSizes([]);
    setErrorsField(DEFAULT_FIELDS_ERRORS);
    setFieldsParams(DEFAULT_FIELDS_PARAMS);
  };

  const continueEdit = () => {
    setBackgroundCover(false);
    setCancelSuccess(false);
  };

  return (
    <>
      {cancel && <Redirect to="/products" />}
      {isNewProduct && cancelSuccess && (
        <PopupSuccessNew
          addMore={addMore}
          title="Товар успешно добавлен"
          buttonText="Добавить еще"
          link="/new"
        />
      )}
      {!isNewProduct && cancelSuccess && (
        <>
          <PopupSuccessNew
            addMore={continueEdit}
            title="Товар успешно изменен"
            buttonText="Ок"
            link={location.pathname}
          />
        </>
      )}
      <div className="EditingPage Pages__Wrap">
        <p className="Pages__Title">
          {isNewProduct ? "Добавление товара" : "Редактирование товара"}
        </p>
        <div className="EditingPage__Fields">
          <EditingInput
            placeholder="Название"
            value={fieldsParams.title}
            setValue={handleChangeFields}
            name="title"
            error={errorsField.title}
            setError={handleError}
            validation={validation}
          />
          <EditingSelect
            currentValue={fieldsParams.type}
            name="type"
            error={errorsField.type}
            setValue={handleChangeFields}
            setError={handleError}
          />
          <UploadFile
            photos={photos}
            setPhotos={setPhotos}
            previewPhoto={fieldsParams.previewPhoto}
            setValues={handleChangeFields}
            name="previewPhoto"
            previewError={errorsField.previewPhoto}
            setError={handleError}
          />
          <EditingPrices
            price={fieldsParams.price}
            lastPrice={fieldsParams.lastPrice}
            namePrice="price"
            nameLastPrice="lastPrice"
            setValues={handleChangeFields}
            setError={handleError}
            errorPrice={errorsField.price}
          />
          <EditingColros
            currentColor={fieldsParams.color}
            setValue={handleChangeFields}
            setError={handleError}
            error={errorsField.color}
            name="color"
          />
          <EditingSizes
            name="sizes"
            setError={handleError}
            error={errorsField.sizes}
          />
          <EditingText
            placeholder="Описание"
            value={fieldsParams.descr}
            name="descr"
            setValue={handleChangeFields}
            setError={handleError}
            error={errorsField.descr}
            validation={validation}
          />
          <EditingText
            placeholder="Параметры модели"
            value={fieldsParams.modelParam}
            name="modelParam"
            setValue={handleChangeFields}
            setError={handleError}
            error={errorsField.modelParam}
            validation={validation}
          />
          <EditingText
            placeholder="Уход за изделием"
            value={fieldsParams.care}
            name="care"
            setValue={handleChangeFields}
            setError={handleError}
            error={errorsField.care}
            validation={validation}
          />
          <EditingText
            placeholder="Состав"
            value={fieldsParams.composition}
            name="composition"
            setValue={handleChangeFields}
            setError={handleError}
            error={errorsField.composition}
            validation={validation}
          />
        </div>
        {isNewProduct && (
          <EditingNewProductButtons isOk={isOk} handleCancel={handleCancel} />
        )}
        {!isNewProduct && (
          <EditingEditProductButtons
            isOk={isOk}
            prodId={prodId}
            setCancel={setCancel}
          />
        )}
      </div>
    </>
  );
};
