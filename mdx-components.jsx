export function useMDXComponents(components) {
  return {
    h1: ({ children }) => (
      <h1
        style={{
          fontFamily: "Georgia",
          fontSize: "40px",
          marginBottom: "40px",
        }}
      >
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2
        style={{
          fontFamily: "Georgia",
          fontSize: "30px",
          marginBottom: "30px",
          marginTop: "15px",
        }}
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3
        style={{
          fontFamily: "Georgia",
          fontSize: "23px",
          marginBottom: "23px",
          marginTop: "15px",
        }}
      >
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p
        style={{
          fontFamily: "Inter",
          fontSize: "18px",
          marginBottom: "18px",
          marginTop: "9px",
        }}
      >
        {children}
      </p>
    ),
    ...components,
  };
}
