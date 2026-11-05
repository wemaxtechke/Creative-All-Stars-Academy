import assert from 'node:assert/strict';
import test from 'node:test';
import { learningStages, findLearningStage, admissionGradeFromQuery } from '../lib/learning-stages.ts';
import { uniqueTeachers, schoolSocialLinks, officialPhone, schoolPhone, safeWebsiteHref } from '../lib/public-content.ts';

test('five learning stages cover all ten existing classes exactly once', () => {
  assert.equal(learningStages.length, 5);
  const classes = learningStages.flatMap(stage => [...stage.classIds]);
  assert.equal(classes.length, 10);
  assert.equal(new Set(classes).size, 10);
  const expected = { playgroup: 'playgroup', pp1: 'pre-primary', pp2: 'pre-primary', grade1: 'lower-primary', grade2: 'lower-primary', grade3: 'lower-primary', grade4: 'upper-primary', grade5: 'upper-primary', grade6: 'upper-primary', juniorschool: 'junior-school' };
  for (const [id, canonical] of Object.entries(expected)) assert.equal(findLearningStage(id)?.id, canonical);
  for (const stage of learningStages) assert.equal(findLearningStage(stage.id)?.id, stage.id);
  assert.equal(findLearningStage('unknown'), undefined);
});

test('class enquiries select the exact requested grade without a Grade 1 default', () => {
  assert.equal(admissionGradeFromQuery('juniorschool'), 'Grade 7 — Junior School');
  assert.equal(admissionGradeFromQuery('pp2'), 'PP2');
  assert.equal(admissionGradeFromQuery('grade5'), 'Grade 5');
  assert.equal(admissionGradeFromQuery(null), '');
  assert.equal(admissionGradeFromQuery('unrecognised'), '');
});

test('duplicate teacher cards merge in either order without losing rich content or distinct people', () => {
  const full = { id: 'collins', name: 'Collins Wainaina', role: 'Grade 7 Class Teacher' };
  const legacy = { id: 'old-collins', name: 'Mr. Collins Wainaina', role: 'Grade 7 Class Teacher', image: '/media/portrait.jpg', bio: 'Approved biography' };
  for (const inputs of [[full, legacy], [legacy, full]]) {
    const profiles = uniqueTeachers([...inputs, { id: 'other', name: 'Esther Muhemo', role: 'Playgroup Class Teacher' }]);
    assert.equal(profiles.length, 2);
    const teacher = profiles.find(profile => profile.name === 'Collins Wainaina');
    assert.equal(teacher.id, 'collins');
    assert.equal(teacher.image, '/media/portrait.jpg');
    assert.equal(teacher.bio, 'Approved biography');
  }
  assert.equal(uniqueTeachers([{ id: 'old', name: 'Madam Viola', role: 'Grade 4' }, { id: 'new', name: 'Viola Minayo', role: 'Grade 4' }]).length, 1);
});

test('generic platform homepages are hidden while actual school profile links remain', () => {
  assert.deepEqual(schoolSocialLinks({ facebook: 'https://facebook.com/', twitter: '', instagram: 'https://instagram.com', youtube: 'invalid' }), []);
  const links = schoolSocialLinks({ facebook: 'https://facebook.com/creativeallstars', twitter: '', instagram: '', youtube: 'https://youtube.com/@creativeallstars' });
  assert.deepEqual(links.map(link => link.name), ['Facebook', 'YouTube']);
  assert.equal(officialPhone, '+254114813030');
});

test('administrator contact changes stay usable while the official number remains the default', () => {
  assert.deepEqual(schoolPhone(''), { href: '+254114813030', display: '+254 114 813 030' });
  assert.deepEqual(schoolPhone('254-1148-13-030'), { href: '+254114813030', display: '+254 114 813 030' });
  assert.deepEqual(schoolPhone('+254 700 000 000'), { href: '+254700000000', display: '+254 700 000 000' });
});

test('hero button links accept real destinations and reject executable schemes', () => {
  for (const href of ['/admissions#enquiry', '/classes/pre-primary', 'https://example.com/school', 'mailto:office@example.com', 'tel:+254114813030']) assert.equal(safeWebsiteHref(href), href);
  for (const href of ['javascript:alert(1)', 'data:text/html,test', '//example.com', '', 'not a link']) assert.equal(safeWebsiteHref(href), undefined);
});
