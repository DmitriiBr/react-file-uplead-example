import { Button } from "$/Button/Button";
import { Container } from "$/Container/Container";
import { InputFile } from "$/InputFile/InputFile";

import { ChangeEventHandler, FormEventHandler, useState } from "react";

const App = () => {
  const [files, setFiles] = useState<FileList>();
  const [image, setImage] = useState({ isLoading: true, src: "" });

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (event.target.files) {
      setFiles(event.target.files);
    }
  };

  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();

    const data = new FormData();

    if (files) {
      data.append("file", files[0]);
      data.append("file-name", files[0].name);

      fetch("/req/upload", {
        method: "POST",
        body: data,
      }).then(() => {
        let isLoading = false;

        if (image.src !== `/req/images/${files[0].name}`) {
          isLoading = true;
        }

        setImage({
          isLoading,
          src: `/req/images/${files[0].name}`,
        });
      });
    }
  };

  const handleLoad = () =>
    setImage((state) => ({ ...state, isLoading: false }));

  return (
    <Container>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "1rem",
          width: "100%",
        }}
      >
        <InputFile
          inputProps={{
            onChange: handleChange,
          }}
          id="inputFile"
          title="Upload your file"
        />
        <Button type="submit">Upload</Button>
      </form>
      {image.isLoading && image.src && "Image is loading!!"}
      {image.src && (
        <img
          style={{
            display: image.isLoading ? "none" : "block",
          }}
          alt="image"
          height="200px"
          width="200px"
          src={image.src}
          onLoad={handleLoad}
        />
      )}
    </Container>
  );
};

export default App;
