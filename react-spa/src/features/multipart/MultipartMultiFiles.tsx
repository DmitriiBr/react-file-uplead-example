import { Button } from "$/Button/Button";
import { Container } from "$/Container/Container";
import { InputFile } from "$/InputFile/InputFile";

import {
  ChangeEventHandler,
  FormEventHandler,
  Fragment,
  useState,
} from "react";

type Image = {
  src: string;
  isLoading: boolean;
};

export const MultipartMultiFiles = () => {
  const [files, setFiles] = useState<FileList>();
  const [images, setImages] = useState<Image[]>([]);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (event.target.files) {
      setFiles(event.target.files);
    }
  };

  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();

    const data = new FormData();

    if (files) {
      const filesArray = [...files];

      filesArray.forEach((file, index) => {
        data.append(`file-${index}`, file, file.name);
      });

      fetch("/req/upload-multiple", {
        method: "POST",
        body: data,
      }).then(() => {
        setImages((state) => {
          if (filesArray.length !== state.length) {
            return filesArray.map((file, index) => {
              const src = `/req/multiple-images/${file.name}`;

              if (!state[index] || src !== state[index].src) {
                return {
                  isLoading: true,
                  src,
                };
              }

              return {
                isLoading: false,
                src,
              };
            });
          }

          return state;
        });
      });
    }
  };

  const handleLoad = (index: number) => () =>
    setImages((state) =>
      state.with(index, { ...state[index], isLoading: false }),
    );

  console.log(images);

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
            multiple: true,
          }}
          id="inputFile"
          title="Upload your file"
        />
        <Button type="submit">Upload</Button>
      </form>
      {images.map(({ src, isLoading }, index) => {
        return (
          <Fragment key={`${src}-${index}`}>
            {isLoading && "Image is loading!!"}
            <img
              style={{ display: isLoading ? "none" : "block" }}
              alt="image"
              height="200px"
              width="200px"
              src={src}
              onLoad={handleLoad(index)}
            />
          </Fragment>
        );
      })}
    </Container>
  );
};
