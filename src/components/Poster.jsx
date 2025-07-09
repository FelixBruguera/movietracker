const Poster = ({ src, alt, size = "s" }) => {
  const onImageError = (element) => {
    element.onerror = null
    size === "s"
      ? element.classList.add("brokenImage")
      : element.classList.add("brokenImageLarge")
  }
  return (
    <img
      src={src}
      alt={alt}
      title={alt}
      onError={(e) => onImageError(e.target)}
      className="max-h-full max-w-full shadow-md rounded-sm m-auto"
    />
  )
}

export default Poster
