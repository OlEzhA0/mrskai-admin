import React, { useState, useEffect, useContext } from "react";
import "./EditingPage.scss";
import { useLocation, Link, Redirect } from "react-router-dom";
import { useQuery, useMutation } from "react-apollo";
import { productQuery } from "./query";
import { EditingInput } from "../EditingInput";
import { EditingContext } from "../../EditingContext";
import { EditingSelect } from "../EditingSelect";
import { UploadFile } from "../UploadFile";
import { EditingPrices } from "../EditingPrices";
import { EditingSizes } from "../EditingSizes";
import { EditingColros } from "../EditingColors";
import { EditingText } from "../EditingText";
import { addProductMutation } from "../../mutation";
import { deleteFromServer } from "../../helpers";

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
  } = useContext(EditingContext);

  const prodId = location.pathname.split("/").filter((name) => name)[1];
  const { data } = useQuery(productQuery, { variables: { id: prodId } });
  const [photos, setPhotos] = useState<string[]>([]);
  const [addProduct] = useMutation(addProductMutation);
  const [cancelSuccess, setCancelSuccess] = useState(false);
  const [cancel, setCancel] = useState(false);

  const clearServerPhotos = () => {
    fetch(`${process.env.REACT_APP_CLEAR_PHOTOS}`);
  };

  useEffect(() => {
    // clearServerPhotos();
  }, [])

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
      console.log(care);
      const newSizes = sizes.split(",");
      setChoosenSizes(newSizes);
      setPhotos(photos);
      setFieldsParams(newParams);
    }
  }, [data]);

  const isOk = async () => {
    let error = false;

    Object.keys(fieldsParams).forEach((key) => {
      validation(key);
    });

    Object.keys(errorsField).forEach((key) => {
      if (errorsField[key]) {
        error = true;
        return;
      }
    });

    if (!photos.length) {
      error = true;
    }

    if (!choosenSizes.length) {
      error = true;
    }

    if (error) {
      return;
    } else {
      const sizes = choosenSizes.join(",");

      if (isNewProduct) {
        await addProduct({
          variables: {
            title: fieldsParams.title,
            descr: fieldsParams.descr,
            color: fieldsParams.color,
            price: fieldsParams.price,
            modelParam: fieldsParams.modelParam,
            composition: fieldsParams.composition,
            sizes,
            lastPrice: fieldsParams.lastPrice,
            type: fieldsParams.type,
            photos,
            care: fieldsParams.care,
            previewPhoto: fieldsParams.previewPhoto,
          },
          refetchQueries: [
            {
              query: productQuery,
            },
          ],
        })
          .then(() => {
            setCancelSuccess(true);
            clearServerPhotos();
          })
          .catch(() => console.log("error"));
      }
    }
  };

  return (
    <>
      {cancel && <Redirect to="/products" />}
      {cancelSuccess && (
        <div className="EditingPage__Success">
          <p className="EditingPage__SuccessText">Товар добавлен</p>
          <Link to="/products">Обратно к списку</Link>
        </div>
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
          <div className="EditingPage__Buttons">
            <button
              className="EditingPage__Button EditingPage__Button--add"
              onClick={isOk}
            >
              Добавить
            </button>

            <button
              className="EditingPage__Button EditingPage__Button--cancel"
              onClick={() => setCancel(true)}
            >
              Отмена
            </button>
          </div>
        )}
        {!isNewProduct && (
          <>
            <div className="EditingPage__Buttons">
              <button className="EditingPage__Button EditingPage__Button--add">
                Сохранить
              </button>
              <button className="EditingPage__Button EditingPage__Button--delete">
                Удалить товар
              </button>
            </div>
            <button
              className="EditingPage__Button EditingPage__Button--cancel EditingPage__Button--cancelN"
              onClick={() => {
                setCancel(true);
                clearServerPhotos();
              }}
            >
              Отмена
            </button>
          </>
        )}
      </div>
    </>
  );
};
