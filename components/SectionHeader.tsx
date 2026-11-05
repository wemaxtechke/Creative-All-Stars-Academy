export function SectionHeader({ title, as: Heading = 'h2', subtitle, badge, centered = true }: { title: string; as?: 'h1' | 'h2'; subtitle?: string; badge?: string; centered?: boolean }) {
  return <div className={`mb-8 max-w-3xl ${centered ? 'mx-auto text-center' : ''}`}>{badge && <p className="eyebrow">{badge}</p>}<Heading className="section-title">{title}</Heading>{subtitle && <p className="mt-4 text-sm leading-7 text-slate-600">{subtitle}</p>}</div>;
}
