import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MultipartSingleFile } from "./features/multipart/MultipartSingleFile";
import { Navigation } from "./Navigation";
import { MultipartMultiFiles } from "./features/multipart/MultipartMultiFiles";
import { Base64SingleFile } from "./features/base64/Base64SingleFile";
import { Base64MultiFiles } from "./features/base64/Base64MultiFiles";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Navigation />} path="/" />
        <Route element={<MultipartSingleFile />} path="/multipart-single" />
        <Route element={<MultipartMultiFiles />} path="/multipart-multi" />
        <Route element={<Base64SingleFile />} path="/base64-single" />
        <Route element={<Base64MultiFiles />} path="/base64-multi" />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
