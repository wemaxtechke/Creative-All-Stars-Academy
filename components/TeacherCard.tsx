import Image from 'next/image';
import type { Teacher } from '@/types';

export function TeacherCard({ teacher }: { teacher: Teacher }) {
  return <article className="teacher-card">
    {teacher.image && <Image src={teacher.image} alt={teacher.name} width={80} height={80} className="teacher-portrait" />}
    <h3>{teacher.name}</h3><p>{teacher.role}</p>{teacher.bio && <p>{teacher.bio}</p>}
    {teacher.subjects && teacher.subjects.length > 0 && <p>{teacher.subjects.join(' · ')}</p>}
    {teacher.email && <a href={`mailto:${teacher.email}`}>{teacher.email}</a>}
  </article>;
}
