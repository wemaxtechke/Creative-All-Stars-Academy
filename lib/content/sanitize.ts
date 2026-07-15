import sanitizeHtml from "sanitize-html";

export function sanitizeRichText(html: string) {
  return sanitizeHtml(html, {
    allowedTags: [
      "p", "br", "h2", "h3", "h4", "strong", "em", "u", "s", "blockquote",
      "ul", "ol", "li", "a", "figure", "figcaption", "hr", "code", "pre",
    ],
    allowedAttributes: { a: ["href", "target", "rel"] },
    allowedSchemes: ["http", "https", "mailto", "tel"],
    allowProtocolRelative: false,
    transformTags: {
      a: (_tag, attributes) => ({
        tagName: "a",
        attribs: attributes.target === "_blank"
          ? { ...attributes, rel: "noopener noreferrer" }
          : attributes,
      }),
    },
  });
}
