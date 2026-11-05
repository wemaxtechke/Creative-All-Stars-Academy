import Link from 'next/link';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { PageIntro } from '@/components/PageIntro';
import { pageMetadata } from '@/lib/seo';
import { displayPhone, officialPhone } from '@/lib/public-content';

export const metadata = pageMetadata('Website privacy notice', 'How information submitted through the Creative All Stars Academy website is used.', '/privacy');

export default function Privacy() {
  return <div className="public-page"><Breadcrumbs items={[{ name: 'Privacy notice' }]} /><article className="container-shell"><PageIntro eyebrow="Your information" title="Website privacy notice."><p>This notice explains the information collected through this website. It covers website enquiries, job applications and the school assistant.</p></PageIntro><div className="privacy-copy">
    <section><h2>Enquiries and applications</h2><p>When you send an admission enquiry, we collect the child’s name, the class you are considering and the parent or guardian’s contact details. General contact messages include the information you enter in the contact form. We use these details to review and respond to your request.</p><p>If you apply for a vacancy, we collect your contact details, the selected vacancy and the PDF you choose to upload. Candidate documents are available through the protected staff workspace.</p><p>Please avoid including medical details, identity documents, payment information or other sensitive information in general messages or chat. The admissions team will explain how to provide any documents needed later.</p></section>
    <section><h2>Public comments</h2><p>If you post a comment on a school story, your name, comment and the date are shown publicly. Do not include contact details or sensitive information in a comment.</p></section>
    <section><h2>The school assistant</h2><p>The assistant sends your question and relevant school information to OpenAI to prepare an answer. The website does not save chat transcripts in the school’s enquiry inbox. If you choose to submit the separate admission form offered in chat, those details are saved as an admission enquiry.</p><p>AI answers can contain mistakes. Confirm class availability, fees and admission decisions directly with the school.</p></section>
    <section><h2>Website services</h2><p>The website uses Cloudflare for hosting, storage and abuse prevention, including the security check on public forms. These services process requests to operate and protect the website. The Contact page embeds Google Maps; opening or loading the map connects to Google.</p><p>Submitted enquiries and applications are stored for the school team in a protected administrator workspace. Links to other services are governed by those services’ own privacy notices.</p></section>
    <section><h2>Questions about your information</h2><p>For questions about information you have submitted, how long it is kept, or a request to access, correct or remove it, contact the school at <a href="mailto:info@creativeallstarsacademy.sc.ke">info@creativeallstarsacademy.sc.ke</a> or <a href={`tel:${officialPhone}`}>{displayPhone}</a>. Please identify the enquiry or application so the school can locate it.</p><p><Link href="/contact#contact-form">Contact our team</Link></p></section>
  </div></article></div>;
}
