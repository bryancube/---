import { createAuth0Client } from "@auth0/auth0-spa-js";
import { user, isAuthenticated, popupOpen } from "./store";
import config from "$lib/auth_config";
let auth0ClientInstance;
async function createClient() {
  if (auth0ClientInstance) {
    return auth0ClientInstance;
  }

  console.log("Auth0 클라이언트 생성 시도...");
  console.log("설정 Domain:", config.domain);
  console.log("설정 Client ID:", config.clientId); // 이 값이 잘 출력됨

  if (!config.domain || !config.clientId) {
    console.error("Auth0 설정 (domain 또는 clientId)이 누락되었습니다. auth_config.js 파일을 확인하세요.");
    throw new Error("Auth0 설정이 불완전합니다.");
  }

  const redirectUri = window.location.origin;
  console.log("사용되는 Redirect URI:", redirectUri);

  try {
    auth0ClientInstance = await createAuth0Client({
      domain: config.domain,
      clientId: config.clientId, // 여기에 client_id가 명확히 전달됨
      redirect_uri: redirectUri,
    });
    console.log("Auth0 클라이언트 생성 완료:", auth0ClientInstance);
    return auth0ClientInstance;
  } catch (error) {
    console.error("Auth0 클라이언트 생성 중 오류 발생:", error);
    throw error;
  }
}

async function loginWithPopup(client, options) {
  popupOpen.set(true);
  try {
    await client.loginWithPopup(options);

    user.set(await client.getUser());
    isAuthenticated.set(true);
  } catch (e) {
    // eslint-disable-next-line
    console.error(e);
  } finally {
    popupOpen.set(false);
  }
}

function logout(client) {
  return client.logout();
}

const auth = {
  createClient,
  loginWithPopup,
  logout
};
export { createClient };
export default auth;