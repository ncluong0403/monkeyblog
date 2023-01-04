import { Button } from "components/button";
import { Radio } from "components/checkbox";
import { Dropdown } from "components/dropdown";
import { Field } from "components/field";
import ImageUpload from "components/image/ImageUpload";
import { Input } from "components/input";
import { Label } from "components/label";
import Toggle from "components/toggle/Toggle";
import { db } from "firebase-app/firebase-config";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import useFireBaseImage from "hooks/useFireBaseImage";
import DashboardHeading from "module/dashboard/DashboardHeading";
import React, { useMemo, useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { postStatus } from "utils/constants";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import ImageUploader from "quill-image-uploader";
import axios from "axios";
Quill.register("modules/imageUploader", ImageUploader);
const PostUpdate = () => {
  const {
    handleSubmit,
    control,
    watch,
    setValue,
    reset,
    getValues,
    formState: { isSubmitting },
  } = useForm({
    mode: "onChange",
  });

  const [param] = useSearchParams();
  const postId = param.get("id");
  const watchStatus = watch("status");
  const watchHot = watch("hot");
  const imageName = getValues("image_name");
  const imageUrl = getValues("image");
  const [categories, setCategories] = useState();
  const [selectCategory, setSelectCategory] = useState();
  const [content, setContent] = useState("");
  const { progress, image, handleDeleteImage, handleSelectImage, setImage } =
    useFireBaseImage(setValue, getValues, imageName, deletePostImage);
  async function deletePostImage() {
    const colRef = doc(db, "posts", postId);
    await updateDoc(colRef, {
      avatar: "",
    });
  }
  useEffect(() => {
    setImage(imageUrl);
  }, [imageUrl, setImage]);
  useEffect(() => {
    async function fetchDataUser() {
      if (!postId) return;
      const colRef = doc(db, "posts", postId);
      const docData = await getDoc(colRef);
      if (docData) {
        reset(docData.data());
        setSelectCategory(docData.data().category);
        setContent(docData.data().content);
      }
    }
    fetchDataUser();
  }, [postId, reset, setValue]);
  useEffect(() => {
    async function getData() {
      const colRef = collection(db, "categories");
      const q = query(colRef, where("status", "==", 1));
      const querySnapshot = await getDocs(q);
      let result = [];
      querySnapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setCategories(result);
    }
    getData();
  }, []);
  const handleClickOption = async (item) => {
    const colRef = doc(db, "categories", item.id);
    const docData = await getDoc(colRef);
    setValue("category", {
      id: docData.id,
      ...docData.data(),
    });
    setSelectCategory(item);
  };
  const handleUpdatePost = async (values) => {
    console.log("handleUpdatePost ~ values", values);
    const docRef = doc(db, "posts", postId);
    await updateDoc(docRef, {
      ...values,
      image,
      content,
    });
    toast.success("Update successfully!");
  };

  const modules = useMemo(
    () => ({
      toolbar: [
        ["bold", "italic", "underline", "strike"],
        ["blockquote"],
        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: "ordered" }, { list: "bullet" }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["link", "image"],
      ],
      imageUploader: {
        upload: async (file) => {
          const formData = new FormData();
          formData.append("image", file);
          const response = await axios({
            method: "post",
            url: "https://api.imgbb.com/1/upload?key=018b8e3c945ce52bd567593bdbf31d35",
            data: formData,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          console.log("upload: ~ response", response);
          return response.data.data.url;
        },
      },
    }),
    []
  );
  return (
    <div>
      <DashboardHeading title="Post" desc="Update your post"></DashboardHeading>
      <form onSubmit={handleSubmit(handleUpdatePost)}>
        <div className="grid grid-cols-2 gap-x-10 mb-10">
          <Field>
            <Label>Title</Label>
            <Input
              control={control}
              placeholder="Enter your title"
              name="title"
              required
            ></Input>
          </Field>
          <Field>
            <Label>Slug</Label>
            <Input
              control={control}
              placeholder="Enter your slug"
              name="slug"
            ></Input>
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-x-10 mb-10">
          <Field>
            <Label>Image</Label>
            <ImageUpload
              onChange={handleSelectImage}
              progress={progress}
              image={image}
              className="h-[250px]"
              handleDeleteImage={handleDeleteImage}
            ></ImageUpload>
          </Field>
          <Field>
            <Label>Category</Label>
            <Dropdown>
              <Dropdown.Select
                placeholder={"Please select category"}
              ></Dropdown.Select>
              <Dropdown.List>
                {categories?.length > 0 &&
                  categories?.map((item) => (
                    <Dropdown.Option
                      key={item.id}
                      onClick={() => handleClickOption(item)}
                    >
                      {item.name}
                    </Dropdown.Option>
                  ))}
              </Dropdown.List>
              {selectCategory?.name && (
                <span className="mt-5 inline-block bg-green-100 p-3 rounded-lg text-green-500 text-base font-medium absolute">
                  {selectCategory?.name}
                </span>
              )}
            </Dropdown>
          </Field>
        </div>
        <div className="mb-10">
          <Field>
            <Label>Content</Label>
            <div className="entry-content">
              <ReactQuill
                modules={modules}
                theme="snow"
                value={content}
                onChange={setContent}
              />
            </div>
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-x-10 mb-10">
          <Field>
            <Label>Status</Label>
            <div className="flex items-center gap-x-5">
              <Radio
                name="status"
                control={control}
                checked={+watchStatus === postStatus.APPROVED}
                onClick={() => setValue("status", "approved")}
                value={postStatus.APPROVED}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={+watchStatus === postStatus.PENDING}
                onClick={() => setValue("status", "pending")}
                value={postStatus.PENDING}
              >
                Pending
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={+watchStatus === postStatus.REJECTED}
                onClick={() => setValue("status", "reject")}
                value={postStatus.REJECTED}
              >
                Reject
              </Radio>
            </div>
          </Field>
          <Field>
            <Label>Feature Post</Label>
            <Toggle
              on={watchHot === true}
              onClick={() => setValue("hot", !watchHot)}
            ></Toggle>
          </Field>
        </div>
        <Button
          type="submit"
          className="mx-auto w-[250px]"
          isLoading={isSubmitting}
          disable={isSubmitting}
        >
          Update post
        </Button>
      </form>
    </div>
  );
};

export default PostUpdate;
