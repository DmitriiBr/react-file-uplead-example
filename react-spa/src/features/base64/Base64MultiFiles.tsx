import { Button } from "$/Button/Button";
import { Container } from "$/Container/Container";
import { InputFile } from "$/InputFile/InputFile";

import {
  ChangeEventHandler,
  FormEventHandler,
  Fragment,
  useState,
} from "react";

type SaveB64ImageRequestDTO = {
  file: string;
  fileName: string;
};

type Image = {
  src: string;
  isLoading: boolean;
};

export const Base64MultiFiles = () => {
  const [files, setFiles] = useState<FileList>();
  const [images, setImages] = useState<Image[]>([]);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (event.target.files) {
      setFiles(event.target.files);
    }
  };

  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();

    if (files) {
      const filesArray = [...files];
      const data: SaveB64ImageRequestDTO[] = [];

      new Promise((resolve) => {
        filesArray.forEach((file, index, initArray) => {
          const reader = new FileReader();
          const fileName = file.name;

          reader.onload = () => {
            if (typeof reader.result === "string") {
              data.push({
                fileName,
                file: reader.result,
              });
            }

            if (index === initArray.length - 1) {
              resolve(data);
            }
          };

          reader.readAsDataURL(file);
        }, false);
      }).then((resultData) => {
        fetch("/req/b64-upload-multiple", {
          method: "POST",
          body: JSON.stringify(resultData),
          headers: {
            "Content-Type": "application/json",
          },
        }).then(() => {
          setImages((state) => {
            if (filesArray.length !== state.length) {
              return filesArray.map((file, index) => {
                const src = `/req/b64-multiple-images/${file.name}`;

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
      });
    }
  };

  const handleLoad = (index: number) => () =>
    setImages((state) =>
      state.with(index, { ...state[index], isLoading: false }),
    );

  return (
    <Container>
      <form
        onSubmit={handleSubmit}
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
