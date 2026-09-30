declare module '*.yaml' {
  const data: unknown
  export default data
}
declare module 'virtual:mdx-raw' {
  const raw: Record<string, string>
  export default raw
}
