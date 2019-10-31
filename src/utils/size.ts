export const getFileSize = (bytes: number) =>
  bytes < 1000000
    ? `${Math.floor(bytes / 1000) || 1}KB`
    : `${Math.floor(bytes / 1000000)} MB`;
