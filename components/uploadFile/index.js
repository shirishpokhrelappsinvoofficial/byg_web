import React, { useState, useEffect } from "react";
import { uploadFile } from "react-s3";
import { toast } from "react-toastify";

function Upload({
  dataHandler,
  imager = "",
  multiple = false,
  multipleImager,
  clearImage,
  hideText = false,
}) {
  const [imge, setImge] = useState();
  const [multipleImage, setMultipleImage] = useState([]);
  const config = {
    bucketName: process.env.NEXT_PUBLIC_BUCKET_NAME,
    region: process.env.NEXT_PUBLIC_REGION,
    accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY,
  };

  useEffect(() => {
    setMultipleImage(multipleImager || []);
  }, [multipleImager]);

  useEffect(() => {
    if (clearImage) {
      setMultipleImage([]);
    }
  }, [clearImage]);

  const handleClick = async (event) => {
    if (event.target.multiple) {
      let files = event.target.files;
      if (
        Object.values(files).length <= 5 &&
        multipleImage.length + Object.values(files).length <= 5
      ) {
        let filePaths = await Promise.all(
          Object.values(files).map(async (element) => {
            return uploadFile(element, config).then(async (response) => {
              return response.location;
            });
          })
        );

        setMultipleImage([...multipleImage, ...filePaths]);
        dataHandler(filePaths);
      } else {
        toast.error("*You can upload mamimux 5 image.");
      }
    } else
      uploadFile(event.target.files[0], config).then((data) => {
        dataHandler(data);
        setImge(data.location);
      });
  };

  const handleRemoveItems = (index) => {
    setMultipleImage(multipleImage.filter((item, i) => i !== index));
    dataHandler(
      multipleImage.filter((item, i) => i !== index),
      "remove"
    );
  };

  return (
    <>
      <div class="upload-btn-wrapper upload-subcate-img">
        <button class="btn">
          <img
            alt=""
            // height="100%"
            // width="100%"
            src={imager ? imager : imge ? imge : "/assets/img/uploadimg.png"}
          />
          {hideText ? null : <p>Upload Image here</p>}
        </button>
        <input
          type="file"
          name="myfile"
          height="100%"
          width="100%"
          onChange={handleClick}
          multiple={multiple}
        />
      </div>
      <div class="product-thum-img">
        {multipleImage &&
          multipleImage.map((data, i) => {
            return (
              <span key={i} class="position-relative">
                <img src={data} class="thumb-img" alt="" />
                <button
                  type="button"
                  onClick={() => handleRemoveItems(i)}
                  href="#"
                  class="remove-thum-img"
                >
                  <img src="/assets/img/reject.png" alt="" />
                </button>
              </span>
            );
          })}
      </div>
    </>
  );
}

export default Upload;
