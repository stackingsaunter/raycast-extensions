import { defineConfig } from "eslint/config";
import raycastConfig from "@raycast/eslint-config";

const config = Array.isArray(raycastConfig) ? raycastConfig.flat() : [raycastConfig];

export default defineConfig(config);

