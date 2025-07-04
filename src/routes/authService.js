import createAuth0Client from "@auth0/auth0-spa-js";
import { user, isAuthenticated, popupOpen } from "../store";
import config from "../auth_config";

async function createClient() {
  let auth0Client = await createAuth0Client({
    domain: "dev-g2330eh5q6g772ht.us.auth0.com",
    client_id: "SjjodmW8zqfj35GaR7tfiMf0edszr7Gd"
  });

  return auth0Client;
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

export default auth;