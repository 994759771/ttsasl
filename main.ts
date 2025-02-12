
import { fetchHttpData } from "./httpUtils.ts";
import { Application, Router } from "https://deno.land/x/oak/mod.ts";

// 创建路由实例
const router = new Router();

// 定义第一个接口 GET /
router.get("/", (context) => {
  context.response.body = "Hello, World!";
});

// 定义第二个接口 GET /0821
router.get("/0821", async (context) => {
  try {
    const data = await fetchHttpData("https://raw.githubusercontent.com/qist/tvbox/refs/heads/master/0821.json");
    context.response.body = data;
  } catch (error) {
    context.response.status = 500;
    context.response.body = "Failed to fetch data";
  }
});

// 创建应用实例
const app = new Application();

// 使用路由中间件
app.use(router.routes());
app.use(router.allowedMethods());

// 启动服务器
let port = 80;
console.log("Listening on http://0.0.0.0:",port);
await app.listen({ port: port });
