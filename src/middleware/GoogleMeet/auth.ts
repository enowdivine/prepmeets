const fs = require("fs").promises;
const path = require("path");
const { authenticate } = require("@google-cloud/local-auth");
const { auth } = require("google-auth-library");
import { Response, Request, NextFunction } from "express";

const SCOPES = ["https://www.googleapis.com/auth/meetings.space.created"];

export interface AuthenticatedGoogleMeetRequest extends Request {
  googleAuthClient?: any;
}

const TOKEN_PATH = path.join(process.cwd(), "token.json");
const CREDENTIALS_PATH = path.join(process.cwd(), "credentials.json");

async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFile(TOKEN_PATH);
    const credentials = JSON.parse(content);
    return auth.fromJSON(credentials);
  } catch (err) {
    console.error("Error loading credentials:", err);
    return null;
  }
}

async function saveCredentials(client: any) {
  const content = await fs.readFile(CREDENTIALS_PATH);
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: "authorized_user",
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(TOKEN_PATH, payload);
}

async function authorize(req: Request, res: Response, next: NextFunction) {
  let client = await loadSavedCredentialsIfExist();
  if (client) {
    (req as AuthenticatedGoogleMeetRequest).googleAuthClient = client;
    next();
    return;
  }

  try {
    console.log("IgotHere");
    client = await authenticate({
      scopes: SCOPES,
      keyfilePath: CREDENTIALS_PATH,
    });
    console.log(client.credentials);
    if (client.credentials) {
      await saveCredentials(client);
    }
    (req as AuthenticatedGoogleMeetRequest).googleAuthClient = client;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    next(error);
  }
}

export default function (req: Request, res: Response, next: NextFunction) {
  authorize(req, res, next);
}
