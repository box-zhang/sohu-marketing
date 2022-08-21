import Mock from "mockjs";
import marketing from "./marketing.json";

Mock.mock("/mock/marketing", {
    code: 200,
    message: "成功",
    data: marketing
})