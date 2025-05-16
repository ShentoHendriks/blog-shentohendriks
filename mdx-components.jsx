export function useMDXComponents(components) {
  return {
    h1: ({ children }) => (
      <h1 style={{ fontFamily: "Georgia", fontSize: "40px" }}>{children}</h1>
    ),
    ...components,
  };
}
