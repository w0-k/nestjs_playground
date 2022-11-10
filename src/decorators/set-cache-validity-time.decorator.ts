import { SetMetadata } from "@nestjs/common";

export const SetCacheValidityTime = (validityTime: number) => SetMetadata("cacheValidityTime", validityTime);