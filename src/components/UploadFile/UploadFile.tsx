import React, { useState } from "react";
import "./UploadFile.scss";
import { getPhotos, postData, deleteFromServer } from "../../helpers";
import cn from "classnames";
import { SpinnerPhotoLoader } from "../SpinnerPhotoLoader";

interface Props {
  photos: string[];
  setPhotos: (photos: string[]) => void;
  previewPhoto: string;
  setValues: (value: string, name: string) => void;
  name: string;
  previewError: boolean;
  setError: (value: boolean, name: string) => void;
}

export const UploadFile: React.FC<Props> = ({
  photos,
  setPhotos,
  previewPhoto,
  setValues,
  name,
  previewError,
  setError,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [disabledButton, setDisabledButton] = useState(false);
  const handleLoadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    e.preventDefault();
    if (files && files[0]) {
      setFile(files[0]);
    }
  };

  const getData = () => {
    setPhotos([]);
    getPhotos().then((photos) => {
      setPhotos(photos);
    });
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    setDisabledButton(true);
    const formData = new FormData();
    formData.set("photo", file!);
    postData(formData).then(
      (res) => {
        setValues("", name);
        setError(true, name);
        setPhotos([...res]);
        setFile(null);
        setDisabledButton(false);
      },
      (err) => {
        setDisabledButton(false);
        console.log(err);
      }
    );
  };

  const setPreviewPhoto = (photo: string) => {
    setValues(photo, name);
    setError(false, name);
  };

  const deletePhotoFromForm = (photo: string) => {
    setValues("", name);
    setError(true, name);
    setPhotos(photos.filter((photoToDel) => photoToDel !== photo));
    deleteFromServer(photo);
  };

  return (
    <>
      <div className="UploadFile__Wrap">
        <div className="UploadFile__Wrapper">
          <form
            encType="multipart/form-data"
            onSubmit={handleSend}
            action="/upload"
            method="post"
            className="UploadFile"
          >
            <label htmlFor="filedata">
              <input
                type="file"
                name="uploaded_file"
                id="filedata"
                onChange={handleLoadFile}
                className="UploadFile__Input"
              />
              <span
                className={cn({
                  UploadFile__Custom: true,
                  "UploadFile__Custom--error":
                    (previewError && !previewPhoto && !photos.length) ||
                    (!previewPhoto && photos.length),
                  "UploadFile__Custom--success":
                    !previewError && previewPhoto && photos.length,
                })}
                data-title={`${[
                  photos.length && !previewPhoto
                    ? "Выберите фото для превью или загрузите еще"
                    : file?.name || "Загрузите ваше фото",
                ]}`}
              />
            </label>
            <button
              className="UploadFile__Button"
              type="submit"
              onClick={handleSend}
              disabled={!file || disabledButton}
            >
              Добавить фото
            </button>
          </form>
        </div>
        {photos.length === 0 && (
          <div className="UploadFile__Stub">
            <img src="images/edit/emptyPhotos.svg" alt="" />
          </div>
        )}
        {photos.length > 0 && (
          <>
            <ul className="UploadFile__List">
              {photos.map((photo) => (
                <li
                  key={photo}
                  className={cn({
                    UploadFile__Item: true,
                    "UploadFile__Item--preview": previewPhoto === photo,
                  })}
                  onClick={() => setPreviewPhoto(photo)}
                >
                  <img
                    src={photo}
                    alt="model"
                    className="UploadFile__Photo"
                    onError={getData}
                  />
                  <img
                    src="images/edit/edit.svg"
                    alt="delete"
                    className="UploadFile__Delete"
                    onClick={() => deletePhotoFromForm(photo)}
                  />
                </li>
              ))}
              {disabledButton && (
                <li className="UploadFile__Item">
                  <SpinnerPhotoLoader />
                </li>
              )}
            </ul>
          </>
        )}
      </div>
    </>
  );
};
