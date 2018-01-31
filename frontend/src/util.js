export function load(component) {
  // '@' is aliased to src/components
  return () =>
    import (`@/${component}.vue`)
}
