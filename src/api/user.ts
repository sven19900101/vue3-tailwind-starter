import request from "@/utils/request";
import { normalApi } from "@/api/apiMap";
import { loginValue, apiResponse, loginResponse } from "@/types/index";
export function handleLogin(
  data: loginValue,
): Promise<loginResponse & apiResponse> {
  return request({
    url: normalApi.login,
    method: "post",
    data: data,
  });
}
