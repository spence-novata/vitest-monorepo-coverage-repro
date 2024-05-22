import { getConfig, NUMBER_REGEX } from "@demo/config";

export const config = {
  port: parseInt(getConfig("PORT", NUMBER_REGEX)),
};
