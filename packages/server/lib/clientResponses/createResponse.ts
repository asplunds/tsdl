import { ResponseOptions, TsDLResponse } from "@tsdl/types";

/** @internal */
export default function createResponse<T>(
  config: ResponseOptions<T>
): TsDLResponse<T> {
  return {
    ...config,
    ok: config.code ? config.code >= 200 && config.code < 400 : true,
  };
}
