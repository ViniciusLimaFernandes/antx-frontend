export default function If ({ test, children }) {
  if (test) { return children }
  return null
}