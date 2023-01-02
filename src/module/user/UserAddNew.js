import { Button } from "components/button";
import { Radio } from "components/checkbox";
import { Field, FieldCheckboxes } from "components/field";
import ImageUpload from "components/image/ImageUpload";
import { Input } from "components/input";
import { Label } from "components/label";
import DashboardHeading from "module/dashboard/DashboardHeading";
import { userRole, userStatus } from "utils/constants";
import React from "react";
import { useForm } from "react-hook-form";
import useFireBaseImage from "hooks/useFireBaseImage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "firebase-app/firebase-config";
import slugify from "slugify";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
const UserAddNew = () => {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { isSubmitting, isValid },
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      username: "",
      avatar: "",
      status: userStatus.ACTIVE,
      role: userRole.USER,
      createdAt: new Date().toLocaleDateString(),
    },
  });
  const {
    progress,
    image,
    handleDeleteImage,
    handleSelectImage,
    handleResetUpload,
  } = useFireBaseImage(setValue, getValues);
  const handleCreateUser = async (values) => {
    if (!isValid) return;
    await addDoc(collection(db, "users"), {
      fullname: values.fullname,
      email: values.email,
      password: values.password,
      username: slugify(values.username || values.fullname, {
        lower: true,
        trim: true,
        replacement: " ",
      }),
      avatar: image,
      status: Number(values.status),
      role: Number(values.role),
      createdAt: serverTimestamp(),
    });
    createUserWithEmailAndPassword(auth, values.email, values.password);
    reset({
      fullname: "",
      email: "",
      password: "",
      username: "",
      avatar: "",
      status: userStatus.ACTIVE,
      role: userRole.USER,
      createdAt: new Date().toLocaleDateString(),
    });
    handleResetUpload();
    toast.success(
      `Create new user with name email: ${values.email} successfully!`
    );
  };
  const watchStatusUser = watch("status");
  const watchRoleUser = watch("role");

  return (
    <div>
      <DashboardHeading
        title="New user"
        desc="Add new user to system"
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleCreateUser)} autoComplete="off">
        <div className="w-[200px] h-[200px] mx-auto mb-10 rounded-full">
          <ImageUpload
            className="!rounded-full h-full"
            image={image}
            onChange={handleSelectImage}
            handleDeleteImage={handleDeleteImage}
            progress={progress}
            roundedFull={"rounded-full"}
          ></ImageUpload>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Fullname</Label>
            <Input
              name="fullname"
              placeholder="Enter your fullname"
              control={control}
            ></Input>
          </Field>
          <Field>
            <Label>Username</Label>
            <Input
              name="username"
              placeholder="Enter your username"
              control={control}
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Email</Label>
            <Input
              name="email"
              placeholder="Enter your email"
              control={control}
              type="email"
            ></Input>
          </Field>
          <Field>
            <Label>Password</Label>
            <Input
              name="password"
              placeholder="Enter your password"
              control={control}
              type="password"
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Status</Label>
            <FieldCheckboxes>
              <Radio
                name="status"
                control={control}
                checked={+watchStatusUser === userStatus.ACTIVE}
                value={userStatus.ACTIVE}
              >
                Active
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={+watchStatusUser === userStatus.PENDING}
                value={userStatus.PENDING}
              >
                Pending
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={+watchStatusUser === userStatus.BAN}
                value={userStatus.BAN}
              >
                Banned
              </Radio>
            </FieldCheckboxes>
          </Field>
          <Field>
            <Label>Role</Label>
            <FieldCheckboxes>
              <Radio
                name="role"
                control={control}
                checked={+watchRoleUser === userRole.ADMIN}
                value={userRole.ADMIN}
              >
                Admin
              </Radio>
              <Radio
                name="role"
                control={control}
                checked={+watchRoleUser === userRole.MOD}
                value={userRole.MOD}
              >
                Moderator
              </Radio>
              <Radio
                name="role"
                control={control}
                checked={+watchRoleUser === userRole.USER}
                value={userRole.USER}
              >
                User
              </Radio>
            </FieldCheckboxes>
          </Field>
        </div>
        <Button kind="primary" type="submit" className="mx-auto w-[200px]">
          Add new user
        </Button>
      </form>
    </div>
  );
};

export default UserAddNew;
