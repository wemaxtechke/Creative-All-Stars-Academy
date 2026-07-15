export function mediaUrl(key: string) {
  return `/media/${key.split("/").map(encodeURIComponent).join("/")}`;
}
