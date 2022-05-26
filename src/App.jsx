import { Navigate, Route, Routes } from "react-router-dom";
import { ProtectedRoute, RedirectLoggedInUser } from "./helpers";
import "./index.css";
import {
  Bookmarks,
  ErrorPage,
  Explore,
  Feed,
  Login,
  MainContainer,
  People,
  Signup,
  SinglePost,
  UserProfile,
} from "./pages";

function App() {
  return (
    <Routes>
      <Route
        path="login"
        element={
          <RedirectLoggedInUser>
            <Login />
          </RedirectLoggedInUser>
        }
      />
      <Route
        path="signup"
        element={
          <RedirectLoggedInUser>
            <Signup />
          </RedirectLoggedInUser>
        }
      />
      <Route path="/" element={<Navigate to={"feed"} />} />
      <Route
        path="feed"
        element={
          <ProtectedRoute>
            <MainContainer>
              <Feed />
            </MainContainer>
          </ProtectedRoute>
        }
      />
      <Route
        path="explore"
        element={
          <ProtectedRoute>
            <MainContainer>
              <Explore />
            </MainContainer>
          </ProtectedRoute>
        }
      />
      <Route
        path="bookmarks"
        element={
          <ProtectedRoute>
            <MainContainer>
              <Bookmarks />
            </MainContainer>
          </ProtectedRoute>
        }
      />
      <Route
        path="people"
        element={
          <ProtectedRoute>
            <MainContainer>
              <People />
            </MainContainer>
          </ProtectedRoute>
        }
      />
      <Route
        path="profile/:profileId"
        element={
          <ProtectedRoute>
            <MainContainer>
              <UserProfile />
            </MainContainer>
          </ProtectedRoute>
        }
      />
      <Route
        path="post/:postId"
        element={
          <ProtectedRoute>
            <MainContainer>
              <SinglePost />
            </MainContainer>
          </ProtectedRoute>
        }
      ></Route>
      <Route path="invalid" element={<ErrorPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
