export function PageIntro({ eyebrow, title, children }: { eyebrow: string; title: string; children?: React.ReactNode }) {
  return <header className="page-intro"><p className="eyebrow">{eyebrow}</p><h1 className="editorial-title">{title}</h1>{children && <div className="intro-copy">{children}</div>}</header>;
}
