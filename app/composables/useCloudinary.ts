interface UseCloudinaryReturn {
  cloudinaryUrl: (_path: string) => string
  resolveImageSrc: (_src: string) => string
}

export default function useCloudinary(): UseCloudinaryReturn {
  const { cloudinaryCloudName } = useRuntimeConfig().public

  function cloudinaryUrl(path: string): string {
    return `https://res.cloudinary.com/${cloudinaryCloudName}/image/upload/${path}`
  }

  // Locale files mix both: `/images/...` is a file in public/, anything else a Cloudinary path
  function resolveImageSrc(src: string): string {
    return src.startsWith('/') ? src : cloudinaryUrl(src)
  }

  return {
    cloudinaryUrl,
    resolveImageSrc,
  }
}
