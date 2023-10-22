import { TUser } from "../../users-data";

const url = "http://localhost:3004";
const resource = "/users";

enum METHOD {
  DELETE = "DELETE",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  GET = "GET",
}

function CRUDUsers(userId: number): Promise<TUser>;
function CRUDUsers(): Promise<TUser[]>;
function CRUDUsers(userId: number, method: METHOD): Promise<TUser[]>;
function CRUDUsers(userId?: number, method?: METHOD): Promise<TUser[] | TUser> {
  const httpMethod = method ? method : METHOD.GET;
  const uri = userId ? `${url + resource}/${userId}` : url + resource;
  console.log(`uri: ${uri}`);
  return fetch(uri, { method: httpMethod }).then((r) => {
    return r.ok ? r.json() : r.status;
  });
}

export function GETUsers(): Promise<TUser[]> {
  return CRUDUsers();
}

export function GETUser(id: number): Promise<TUser> {
  return CRUDUsers(id);
}

export function CreateUser(userPayload: unknown) {
  const body = JSON.stringify(userPayload);
  return fetch(url + resource, {
    method: METHOD.POST,
    headers: {
      "Content-Type": "application/json",
    },
    body,
  }).then((r) => r.json());
}

export function DeleteUser(userId: number) {
  return CRUDUsers(userId, METHOD.DELETE);
}

export function PatchUser(id: number, user: Partial<TUser>) {
  const body = JSON.stringify(user);
  const uri = `${url + resource}/${id}`;
  return fetch(uri, {
    method: METHOD.PATCH,
    headers: {
      "Content-Type": "application/json",
    },
    body,
  }).then((r) => r.json());
}

export function FullEditUser(id: number, user: TUser) {
  const body = JSON.stringify(user);
  const uri = `${url + resource}/${id}`;
  return fetch(uri, {
    method: METHOD.PUT,
    headers: {
      "Content-Type": "application/json",
    },
    body,
  }).then((r) => r.json());
}
