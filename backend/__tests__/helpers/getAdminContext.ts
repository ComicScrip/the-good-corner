import getAdminJWT from "./getAdminJWT";

export default async function getAdminContext() {
  const { JWT } = await getAdminJWT();
  return { req: { headers: { authorization: `Bearer ${JWT}` } } };
}
