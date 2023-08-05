import request from "@/utils/request";
import { authApi } from "@/api/apiMap";
import {
  listParams,
  ListResponse,
  apiResponse,
  CertificateParams,
} from "@/types";
export function getStrongList(
  data: listParams,
): Promise<ListResponse & apiResponse> {
  return request({
    url: authApi.getStrongList,
    method: "post",
    params: data,
  });
}
export function getMyOrderList(
  data: listParams,
): Promise<ListResponse & apiResponse> {
  return request({
    url: authApi.getMyOrder,
    method: "get",
    params: data,
  });
}
export function getOrderState(): Promise<apiResponse> {
  return request({
    url: authApi.getOrderState,
    method: "get",
  });
}
export function getAssociateType(): Promise<apiResponse> {
  return request({
    url: authApi.getAssociateType,
    method: "get",
  });
}
export function submitCertificate(
  params: CertificateParams,
): Promise<apiResponse> {
  return request({
    url: authApi.submitCertificate,
    method: "get",
    params,
  });
}
export function grabOrder(id: string | number): Promise<apiResponse> {
  return request({
    url: authApi.grabOrder,
    method: "post",
    params: { id },
  });
}
