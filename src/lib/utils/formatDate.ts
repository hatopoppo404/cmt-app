export const formatDate = (
  date: string,
) => {
  return date
    .slice(5)
    .replace("-", "/")
}