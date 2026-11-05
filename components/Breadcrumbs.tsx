import Link from 'next/link';

export function Breadcrumbs({ items }: { items: { name: string; href?: string }[] }) {
  return <nav aria-label="Breadcrumb" className="container-shell breadcrumbs"><ol><li><Link href="/">Home</Link></li>{items.map((item, index) => <li key={`${item.name}-${index}`}>{item.href ? <Link href={item.href}>{item.name}</Link> : <span aria-current="page">{item.name}</span>}</li>)}</ol></nav>;
}
