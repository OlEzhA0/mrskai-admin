import React, { useContext, useEffect, useState } from "react";
import { useMutation, useQuery } from "react-apollo";
import { Redirect, useLocation } from "react-router-dom";
import { AppContext } from "../../context/appContext";
import { EditingContext } from "../../context/editingContext";
import {
  DEFAULT_FIELDS_ERRORS,
  DEFAULT_FIELDS_PARAMS,
  deleteAllPhotosFromServer,
  deletePhotoS3,
  loadPhotos,
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
  UploadFile,
} from "../Editing";
import { ProdSpinner } from "../Spinners";
import "./EditingPage.scss";
import { productQuery } from "./query";

export const EditingPage: React.FC = () => {
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

  const { setBackgroundCover, bachgroundCover, userInfo } = useContext(
    AppContext
  );

  const location = useLocation();
  const isNewProduct = location.pathname.startsWith("/new");
  const prodId = location.pathname.split("/").filter((name) => name)[1];

  const { data } = useQuery(productQuery, { variables: { id: prodId } });
  const [addProduct] = useMutation(addProductMutation);
  const [updateProduct] = useMutation(updateProductMutation);

  const [photos, setPhotos] = useState<string[]>([]);
  const [cancelSuccess, setCancelSuccess] = useState(false);
  const [cancel, setCancel] = useState(false);
  const [timestamp, setTimestamp] = useState("");

  useEffect(() => {
    deleteAllPhotosFromServer(userInfo.id);
    return () => {
      deleteAllPhotosFromServer(userInfo.id);
    };
  }, [userInfo.id]);

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
        timestamp,
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

      setChoosenSizes(JSON.parse(sizes));
      setPhotos(photos);
      setFieldsParams(newParams);
      loadPhotos(photos, userInfo.id);
      setTimestamp(timestamp);
    }
  }, [data, isNewProduct, setChoosenSizes, setFieldsParams, userInfo.id]);

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
      const sizes = JSON.stringify(choosenSizes);
      setBackgroundCover(true);

      if (isNewProduct) {
        const variables: LocalProduct = {
          ...fieldsParams,
          sizes,
          photos,
          timestamp: `${new Date().getTime()}`,
        };
        addProd(variables);
      } else {
        const variables: Products = {
          ...fieldsParams,
          id: prodId,
          sizes,
          photos,
          timestamp,
        };
        updateProd(variables);
      }
    }
  };

  const handleCancel = () => {
    photos.forEach((photo) => deletePhotoS3(photo, userInfo.id));
    deleteAllPhotosFromServer(userInfo.id);
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
        deleteAllPhotosFromServer(userInfo.id);
      })
      .catch((err) => console.log("error cant to send", err));
  };

  const updateProd = async (variables: Products) => {
    await updateProduct({
      variables,
    })
      .then(() => {
        setCancelSuccess(true);
        deleteAllPhotosFromServer(userInfo.id);
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
      {bachgroundCover && <ProdSpinner />}
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
