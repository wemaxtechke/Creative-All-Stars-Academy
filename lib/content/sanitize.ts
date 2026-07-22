import sanitizeHtml from "sanitize-html";

export function sanitizeRichText(html: string) {
  return sanitizeHtml(html, {
    allowedTags: [
      "p", "br", "h2", "h3", "h4", "strong", "em", "u", "s", "blockquote",
      "ul", "ol", "li", "a", "figure", "figcaption", "img", "div", "hr", "code", "pre",
    ],
    allowedAttributes: {
      a: ["href", "target", "rel"],
      img: ["src", "alt", "title", "loading"],
      div: ["style"], p: ["style"], h2: ["style"], h3: ["style"], h4: ["style"],
      figure: ["style"],
    },
    allowedStyles: {
      "*": { "text-align": [/^(?:left|center|right|justify)$/] },
    },
    allowedSchemes: ["http", "https", "mailto", "tel"],
    allowProtocolRelative: false,
    transformTags: {
      b: "strong",
      i: "em",
      a: (_tag, attributes) => ({
        tagName: "a",
        attribs: /^https?:\/\//i.test(attributes.href ?? "")
          ? { ...attributes, target: "_blank", rel: "noopener noreferrer" }
          : attributes,
      }),
      img: (_tag, attributes) => ({
        tagName: "img",
        attribs: { ...attributes, loading: "lazy" },
      }),
    },
    exclusiveFilter: (frame) => frame.tag === "img" && !String(frame.attribs.src ?? "").startsWith("/media/"),
  });
}
