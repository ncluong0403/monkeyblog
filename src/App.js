import CategoryAddNew from "module/category/CategoryAddNew";
import CategoryManage from "module/category/CategoryManage";
import CategoryUpdate from "module/category/CategoryUpdate";
import PostAddNew from "module/post/PostAddNew";
import PostDetailsPage from "module/post/PostDetailsPage";
import PostManage from "module/post/PostManage";
import PostUpdate from "module/post/PostUpdate";
import UserAddNew from "module/user/UserAddNew";
import UserManage from "module/user/UserManage";
import UserProfile from "module/user/UserProfile";
import UserUpdate from "module/user/UserUpdate";
import PageNotFound from "pages/PageNotFound";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/auth-context";
import DashboardLayout from "./module/dashboard/DashboardLayout";
import DashboardPage from "./pages/DashboardPage";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import "./styles/index.scss";
function App() {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/sign-up" element={<SignUpPage></SignUpPage>}></Route>
          <Route path="/sign-in" element={<SignInPage></SignInPage>}></Route>
          <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
          <Route
            path="/:slug"
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
            <Route path="/manage/category" element={<CategoryManage />}></Route>
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
            <Route path="/manage/update-user" element={<UserUpdate />}></Route>
            <Route path="/profile" element={<UserProfile />}></Route>
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
