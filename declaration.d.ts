declare module '*.scss' {
  const content: Record<string, string>;
  export default content;
}
declare module '*.css' {
  const content: Record<string, string>;
  export default content;
}
declare module 'node-fetch' {
  const fetch: GlobalFetch['fetch'];
  export default fetch;
}
declare module '*.module.css' {
  const content: Record<string, string>;
  export default content;
}
declare global {
  interface Window {
    initialPage: string;
  }
}
