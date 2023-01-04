import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/auth-context";
import "./styles/index.scss";
const UserAddNew = React.lazy(() => import("module/user/UserAddNew")); // Lazy-loaded
const UserManage = React.lazy(() => import("module/user/UserManage"));
const UserProfile = React.lazy(() => import("module/user/UserProfile"));
const UserUpdate = React.lazy(() => import("module/user/UserUpdate"));
const HomePage = React.lazy(() => import("./pages/HomePage"));
const PageNotFound = React.lazy(() => import("pages/PageNotFound"));
const SignInPage = React.lazy(() => import("./pages/SignInPage"));
const SignUpPage = React.lazy(() => import("./pages/SignUpPage"));
const PostAddNew = React.lazy(() => import("module/post/PostAddNew"));
const PostDetailsPage = React.lazy(() => import("module/post/PostDetailsPage"));
const PostManage = React.lazy(() => import("module/post/PostManage"));
const PostUpdate = React.lazy(() => import("module/post/PostUpdate"));
const CategoryAddNew = React.lazy(() =>
  import("module/category/CategoryAddNew")
);
const CategoryManage = React.lazy(() =>
  import("module/category/CategoryManage")
);
const CategoryUpdate = React.lazy(() =>
  import("module/category/CategoryUpdate")
);
const DashboardLayout = React.lazy(() =>
  import("./module/dashboard/DashboardLayout")
);
const DashboardPage = React.lazy(() => import("./pages/DashboardPage"));
function App() {
  return (
    <div>
      <AuthProvider>
        <Suspense>
          <Routes>
            <Route path="/" element={<HomePage></HomePage>}></Route>
            <Route path="/sign-up" element={<SignUpPage></SignUpPage>}></Route>
            <Route path="/sign-in" element={<SignInPage></SignInPage>}></Route>
            <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
            <Route
              path="/:slug"
              element={<PostDetailsPage></PostDetailsPage>}
            ></Route>
            <Route
              path="/category/:slug"
              element={<PostDetailsPage></PostDetailsPage>}
            ></Route>
            <Route element={<DashboardLayout></DashboardLayout>}>
              <Route
                path="/dashboard"
                element={<DashboardPage></DashboardPage>}
              ></Route>
              <Route
                path="/manage/posts"
                element={<PostManage></PostManage>}
              ></Route>
              <Route
                path="/manage/add-post"
                element={<PostAddNew></PostAddNew>}
              ></Route>
              <Route
                path="/manage/update-post"
                element={<PostUpdate></PostUpdate>}
              ></Route>
              <Route
                path="/manage/category"
                element={<CategoryManage />}
              ></Route>
              <Route
                path="/manage/add-category"
                element={<CategoryAddNew />}
              ></Route>
              <Route
                path="/manage/update-category"
                element={<CategoryUpdate />}
              ></Route>
              <Route path="/manage/user" element={<UserManage />}></Route>
              <Route path="/manage/add-user" element={<UserAddNew />}></Route>
              <Route
                path="/manage/update-user"
                element={<UserUpdate />}
              ></Route>
              <Route path="/profile" element={<UserProfile />}></Route>
            </Route>
          </Routes>
        </Suspense>
      </AuthProvider>
    </div>
  );
}

export default App;
