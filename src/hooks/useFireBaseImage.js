import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { set } from "lodash";
import { useState } from "react";
export default function useFireBaseImage(
  setValue,
  getValues,
  imageName = null,
  cb = null
) {
  const storage = getStorage();
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState("");
  if (!setValue || !getValues) {
    throw new Error(
      "Please enter two params setValue and getValues to use hook useFireBaseImage"
    );
  }
  const handleSelectImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setValue("image_name", file.name);
    handleUploadImage(file);
  };

  const handleDeleteImage = () => {
    const desertRef = ref(
      storage,
      "images/" + (imageName || getValues("image_name"))
    );
    deleteObject(desertRef)
      .then(() => {
        console.log("Remove image successfully");
        setImage("");
        setProgress(0);
        cb && cb();
      })
      .catch((error) => {
        console.log("Can't remove image");
        setImage("");
      });
  };
  const handleUploadImage = (file) => {
    const storageRef = ref(storage, "images/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);
    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progressPercent =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progressPercent);
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            console.log("Nothing at all");
        }
      },
      (error) => {
        console.log("Errors");
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setImage(downloadURL);
        });
      }
    );
  };
  const handleResetUpload = () => {
    setImage("");
    setProgress(0);
  };
  return {
    progress,
    image,
    handleResetUpload,
    handleSelectImage,
    handleDeleteImage,
    setProgress,
    setImage,
  };
}
