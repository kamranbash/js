import { GatewayUrls } from "../types";

/**
 * @internal
 */
export const DEFAULT_GATEWAY_URLS: GatewayUrls = {
  // Note: Gateway URLs should have trailing slashes (we clean this on user input)
  "ipfs://": [
    // "http://127.0.0.1:8787/ipfs/", // TODO: Remove this before merging to main
    "https://ipfs.thirdwebcdn.com/ipfs/",
    "https://cloudflare-ipfs.com/ipfs/",
    "https://ipfs.io/ipfs/",
  ],
};

/**
 * @internal
 */
export const TW_IPFS_SERVER_URL = "https://upload.nftlabs.co";

/**
 * @internal
 */
// export const TW_IPFS_SERVER_V2_URL = `http://localhost:3001/uploads`; // TODO: Remove this before merging to main
export const TW_IPFS_SERVER_V2_URL = `https://storage-server-babv.zeet-nftlabs.zeet.app/uploads`; // TODO: Use correct URL for production

/**
 * @internal
 */
export const PINATA_IPFS_URL = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

/**
 * @internal
 */
export const IPFS_UPLOAD_GATEWAYS = [
  TW_IPFS_SERVER_V2_URL,
  PINATA_IPFS_URL
]

/**
 * @internal
 */
export function parseGatewayUrls(
  gatewayUrls?: GatewayUrls | string[],
): GatewayUrls {
  if (Array.isArray(gatewayUrls)) {
    return {
      "ipfs://": gatewayUrls,
    };
  }

  return gatewayUrls || {};
}

/**
 * @internal
 */
export function prepareGatewayUrls(gatewayUrls?: GatewayUrls): GatewayUrls {
  const allGatewayUrls = {
    ...gatewayUrls,
    ...DEFAULT_GATEWAY_URLS,
  };

  for (const key of Object.keys(DEFAULT_GATEWAY_URLS)) {
    if (gatewayUrls && gatewayUrls[key]) {
      // Make sure that all user gateway URLs have trailing slashes
      const cleanedGatewayUrls = gatewayUrls[key].map(
        (url) => url.replace(/\/$/, "") + "/",
      );
      allGatewayUrls[key] = [
        ...cleanedGatewayUrls,
        ...DEFAULT_GATEWAY_URLS[key],
      ];
    }
  }

  return allGatewayUrls;
}
