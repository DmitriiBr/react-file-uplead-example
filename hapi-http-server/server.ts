import Koa from "koa";
import KoaRouter from "koa-router";
import KoaBody from "koa-body";
import Fs from "fs";

const PORT = 40741;

const app = new Koa();
const router = new KoaRouter();

let image = "";

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

app.use(KoaBody({ multipart: true }));
app.use(router.routes());
app.use(router.allowedMethods());

app.use(async (ctx, next) => {
  if (ctx.request.method === "GET") {
    console.log(ctx.request.path);

    // timeout to test image loading handling
    await new Promise((r) => setTimeout(r, 2000));

    ctx.body = Fs.createReadStream(image);
    ctx.response.status = 200;
  } else {
    next();
  }
});

app.listen(PORT, "localhost", 0, () => {
  console.log("Running on http://localhost:" + PORT);
});
