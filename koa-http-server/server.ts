import Koa from "koa";
import KoaRouter from "koa-router";
import KoaBody from "koa-body";
import Fs from "fs";

const PORT = 40741;

const app = new Koa();
const router = new KoaRouter();

let image = "";
let b64Image = "";

const multipleImages: Record<string, string> = {};
const b64MultipleImages: Record<string, string> = {};

router.post("/upload", async (ctx) => {
  if (ctx.request.files) {
    if (!Array.isArray(ctx.request.files.file)) {
      console.log("Filename: ", ctx.request.files.file.originalFilename);
      console.log("Filepath: ", ctx.request.files.file.filepath);

      image = ctx.request.files.file.filepath;
    }
  }

  ctx.response.status = 200;
});

router.post("/upload-multiple", async (ctx) => {
  if (ctx.request.files) {
    Object.values(ctx.request.files).forEach((file, index) => {
      if (!Array.isArray(file)) {
        console.log("Filename: ", index, file.originalFilename);
        console.log("Filepath: ", index, file.filepath);

        const { originalFilename, filepath } = file;

        if (originalFilename) {
          multipleImages[originalFilename] = filepath;
        }
      }
    });
  }

  ctx.response.status = 200;
});

type B64FileUploadBody = {
  file: string;
  fileName: string;
};

router.post("/b64-upload", async (ctx) => {
  if (ctx.request.body) {
    const body: B64FileUploadBody = ctx.request.body;

    console.log("Filename: ", body.fileName);
    console.log("Filepath: ", body.file);

    b64Image = body.file;
  }

  ctx.response.status = 200;
});

router.post("/b64-upload-multiple", async (ctx) => {
  if (ctx.request.body) {
    const body: B64FileUploadBody[] = ctx.request.body;

    body.forEach(({ fileName, file }, index) => {
      if (!Array.isArray(file)) {
        console.log("Filename: ", index, fileName);
        console.log("Filepath: ", index, file);

        b64MultipleImages[fileName] = file;
      }
    });
  }

  ctx.response.status = 200;
});

app.use(KoaBody({ multipart: true, jsonLimit: "200mb" }));
app.use(router.routes());
app.use(router.allowedMethods());

app.use(async (ctx, next) => {
  if (ctx.request.method === "GET") {
    const splitPath = ctx.request.path.split("/");
    const kind = splitPath[1];
    const fileName = splitPath[2];

    let status = 400;
    let body;

    // timeout to test image loading handling
    await new Promise((r) => setTimeout(r, 2000));

    if (kind === "single-image" && image) {
      body = Fs.createReadStream(image);
      status = 200;
    }

    if (kind === "multiple-images" && multipleImages[fileName]) {
      body = Fs.createReadStream(multipleImages[fileName]);
      status = 200;
    }

    if (kind === "b64-single-image" && b64Image) {
      const resultImage = b64Image.split(";base64,").pop();

      if (resultImage) {
        body = Buffer.from(resultImage, "base64");
        status = 200;
      }
    }

    if (kind === "b64-multiple-images" && b64MultipleImages[fileName]) {
      const resultImage = b64MultipleImages[fileName].split(";base64,").pop();

      if (resultImage) {
        body = Buffer.from(resultImage, "base64");
        status = 200;
      }
    }

    ctx.body = body;
    ctx.response.status = status;
  } else {
    next();
  }
});

app.on("error", (err) => {
  console.log(err);
});

app.listen(PORT, "localhost", 0, () => {
  console.log("Running on http://localhost:" + PORT);
});
