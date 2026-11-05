# Public website and administrator controls

Styling changes must preserve these existing content connections. Public content is loaded from D1 by `getPublicContent`, passed into `AppProvider` during server rendering, and consumed by the public components below. Admin updates use the authenticated content APIs; no public editing endpoints are introduced.

| Administrator control | Public result |
| --- | --- |
| Website visuals → Homepage hero slides | `HomeHeroSlider` uses every published slide’s image, image description, small heading, main heading, description and button label/link. Multiple slides rotate every nine seconds, with manual selection and pause/play. An image-only slide remains image-only. |
| Events → Show popup | `EventPopup` on the homepage selects an upcoming event with `showPopup` enabled, opens after four seconds and can be dismissed for the current session. Past events never trigger it. Event title, description, picture, date, time and location come from the event record. |
| Website visuals → Website logo | Navbar uses the `brand-logo` assignment. Logo Text is shown if no logo is assigned. |
| Website visuals → Homepage learning section | `home-learning` appears in the learning/purpose section, independently of the hero. |
| Website visuals → About school team image | `about-leadership` appears on About with its assigned description and optional caption. |
| Website visuals → About mission and vision board | `about-mission-board` appears on About. |
| Website visuals → School life images 1–5 | Every assigned `activity-*` image appears in the homepage school-life gallery, in numeric slot order. Removing an assignment removes that picture. |
| Website settings → School-life headings | Gallery small heading, main heading and introduction appear with the assigned school-life images. |
| Website visuals → Individual class images | Each `class-{id}` remains visible in its corresponding class section, including PP2 and other classes combined under one learning-stage page. |
| Classes & leads | Name, age group, description, subjects, activities and selected lead teacher remain tied to each original class record within the five grouped learning stages. |
| Staff profiles | Portrait, name, role, biography, subjects and email appear publicly. Duplicate display profiles are merged without changing CMS IDs or class assignments. |
| Testimonials | Published quotation, name, role, portrait and rating appear in the testimonial section. No automatic rotation is required to read a review. |
| Blogs | Published articles drive the news directory, story detail, filters, metadata and sitemap. |
| Careers | Open, published vacancies drive listing/detail pages; closed vacancies cannot accept applications. |
| Parent downloads | Published PDF records appear in Parents Corner and relevant admissions downloads. Fees remain shared directly with families. |
| Website settings → Identity and contact | School name, motto, logo text, telephone, email, address, office hours, map and real social profile links remain configurable. Phone defaults to the confirmed `+254114813030`. |
| Dashboard bell and inbox counts | Pending admissions/applications and unread contact messages are staff-only alerts; they are separate from public event announcements. |

Removing the last hero slide removes its photograph and wording, leaving a simple school identity fallback. Removing all school-life assignments hides that gallery when no school-owned gallery records remain. No placeholder school photographs are added.

The five stage groupings, verified school history and general editorial copy are maintained in source; they are not represented as new admin controls. Class-level CMS records remain editable, despite the reduction in public page count.

Refresh the assistant knowledge snapshot after public text or route changes. Its static reference copy is separate from live CMS content.
