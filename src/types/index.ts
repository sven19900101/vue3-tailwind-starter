interface apiResponse {
  code: number;
  data?: any;
  msg: string;
}
interface loginResponse {
  token: string;
}
interface ListResponse {
  rows: [];
  total: number;
}

interface loginValue {
  username: string;
  password: string;
  code?: string;
  uuid?: string;
}
interface listParams {
  pageSize: number;
  pageNum: number;
}

interface orderStates {
  code: string;
  name: string;
}
interface CertificateParams {
  id: string;
  img: string;
}
export {
  apiResponse,
  ListResponse,
  loginResponse,
  loginValue,
  listParams,
  orderStates,
  CertificateParams,
};
