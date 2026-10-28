const API_VERSION = "2025-01";

type TokenCache = {
  accessToken: string;
  expiresAt: number;
};

let tokenCache: TokenCache | null = null;

function getStoreDomain() {
  return process.env.SHOPIFY_STORE_DOMAIN?.replace(/^https?:\/\//, "").replace(
    /\/$/,
    "",
  );
}

/** Legacy permanent Admin token (shpat_) if still available */
function getLegacyAdminToken() {
  return process.env.SHOPIFY_ADMIN_ACCESS_TOKEN?.trim() || "";
}

function getClientCredentials() {
  const clientId = process.env.SHOPIFY_CLIENT_ID?.trim() || "";
  const clientSecret = process.env.SHOPIFY_CLIENT_SECRET?.trim() || "";
  if (!clientId || !clientSecret) return null;
  return { clientId, clientSecret };
}

export function getShopifyConfig() {
  const storeDomain = getStoreDomain();
  if (!storeDomain) return null;

  const legacy = getLegacyAdminToken();
  const client = getClientCredentials();
  if (!legacy && !client) return null;

  return { storeDomain, legacy, client };
}

async function getAccessToken(): Promise<
  { ok: true; token: string } | { ok: false; error: string }
> {
  const config = getShopifyConfig();
  if (!config) {
    return {
      ok: false,
      error:
        "Shopify is not configured. Set SHOPIFY_STORE_DOMAIN and either SHOPIFY_CLIENT_ID + SHOPIFY_CLIENT_SECRET, or SHOPIFY_ADMIN_ACCESS_TOKEN.",
    };
  }

  if (config.legacy) {
    return { ok: true, token: config.legacy };
  }

  if (tokenCache && Date.now() < tokenCache.expiresAt - 60_000) {
    return { ok: true, token: tokenCache.accessToken };
  }

  const client = config.client!;
  const res = await fetch(
    `https://${config.storeDomain}/admin/oauth/access_token`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: client.clientId,
        client_secret: client.clientSecret,
      }),
      cache: "no-store",
    },
  );

  const data = (await res.json().catch(() => ({}))) as {
    access_token?: string;
    expires_in?: number;
    error?: string;
    error_description?: string;
  };

  if (!res.ok || !data.access_token) {
    return {
      ok: false,
      error:
        data.error_description ||
        data.error ||
        `Could not get Shopify access token (${res.status})`,
    };
  }

  tokenCache = {
    accessToken: data.access_token,
    expiresAt: Date.now() + (data.expires_in ?? 86399) * 1000,
  };

  return { ok: true, token: data.access_token };
}

export async function shopifyAdminFetch<T>(
  path: string,
  init?: RequestInit,
): Promise<{ ok: true; data: T } | { ok: false; status: number; error: string }> {
  const config = getShopifyConfig();
  if (!config) {
    return {
      ok: false,
      status: 500,
      error:
        "Shopify is not configured. Set SHOPIFY_STORE_DOMAIN and SHOPIFY_CLIENT_ID + SHOPIFY_CLIENT_SECRET.",
    };
  }

  const tokenResult = await getAccessToken();
  if (!tokenResult.ok) {
    return { ok: false, status: 500, error: tokenResult.error };
  }

  const url = `https://${config.storeDomain}/admin/api/${API_VERSION}${path}`;
  const res = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": tokenResult.token,
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  });

  const text = await res.text();
  let json: unknown = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    json = { raw: text };
  }

  if (!res.ok) {
    const errObj = json as { errors?: unknown; error?: string } | null;
    const error =
      typeof errObj?.error === "string"
        ? errObj.error
        : errObj?.errors
          ? JSON.stringify(errObj.errors)
          : `Shopify API error (${res.status})`;
    return { ok: false, status: res.status, error };
  }

  return { ok: true, data: json as T };
}
