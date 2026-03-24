export function defineCustomElement(
  tag: string,
  element: CustomElementConstructor
) {
  if (!customElements.get(tag)) {
    customElements.define(tag, element);
  }
}
