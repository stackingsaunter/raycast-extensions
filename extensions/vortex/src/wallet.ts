import { getPreferenceValues } from "@raycast/api";
import "websocket-polyfill";
import { webcrypto } from "crypto";

// Ensure WebCrypto is available for NWC/nostr tooling in the Raycast runtime.
if (!globalThis.crypto || typeof globalThis.crypto.getRandomValues !== "function") {
  globalThis.crypto = webcrypto as Crypto;
}

// Function to connect the wallet using the NWC URL components
export const connectWallet = async (): Promise<import("@getalby/sdk/webln").NostrWebLNProvider> => {
  try {
    const preferences = getPreferenceValues<Preferences>();
    const nwcUrl = preferences.nwcurl;

    const { NostrWebLNProvider } = await import("@getalby/sdk/webln");
    const nwc = new NostrWebLNProvider({
      nostrWalletConnectUrl: nwcUrl,
    });

    await nwc.enable(); // Establish the connection with the wallet
    return nwc; // Return the connected wallet instance for further operations
  } catch (error) {
    console.error("Failed to connect wallet:", error);
    throw error;
  }
};
