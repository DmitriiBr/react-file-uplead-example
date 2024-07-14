import { Button } from "$/Button/Button";
import { Container } from "$/Container/Container";
import { InputFile } from "$/InputFile/InputFile";

import { ChangeEventHandler, FormEventHandler, useState } from "react";

type SaveB64ImageRequestDTO = {
  file: string;
  fileName: string;
};

export const Base64SingleFile = () => {
  const [files, setFiles] = useState<FileList>();
  const [image, setImage] = useState({ isLoading: true, src: "" });

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (event.target.files) {
      setFiles(event.target.files);
    }
  };

  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();

    if (files) {
      const fileName = files[0].name;
      const reader = new FileReader();
      const data: SaveB64ImageRequestDTO = {
        file: "",
        fileName,
      };

      reader.readAsDataURL(files[0]);
      reader.onload = () => {
        if (typeof reader.result === "string") {
          data.file = reader.result;
        }

        fetch("/req/b64-upload", {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }).then(() => {
          let isLoading = false;
          const src = `/req/b64-single-image/${files[0].name}`;

          if (image.src !== src) {
            isLoading = true;
          }

          setImage({
            isLoading,
            src,
          });
        });
      };
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
