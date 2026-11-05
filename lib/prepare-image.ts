/** Reduce large website photographs before uploading; PDFs and unsupported formats pass through. */
export async function prepareImageForUpload(file: File): Promise<File> {
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type) || typeof createImageBitmap !== 'function') return file;
  let bitmap: ImageBitmap | undefined;
  try {
    bitmap = await createImageBitmap(file);
    const maximum = 1920;
    if (Math.max(bitmap.width, bitmap.height) <= maximum && file.size < 350_000) return file;
    const scale = Math.min(1, maximum / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(bitmap.width * scale));
    canvas.height = Math.max(1, Math.round(bitmap.height * scale));
    const context = canvas.getContext('2d');
    if (!context) return file;
    context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise<Blob | null>(resolve => canvas.toBlob(resolve, 'image/webp', .84));
    if (!blob || blob.size >= file.size || blob.type !== 'image/webp') return file;
    return new File([blob], `${file.name.replace(/\.[^.]+$/, '')}.webp`, { type: 'image/webp', lastModified: file.lastModified });
  } catch { return file; }
  finally { bitmap?.close(); }
}
