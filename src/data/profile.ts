/**
 * Public identity and contact details. Everything here is shown on the site.
 * Only owner-approved methods belong here; leave a field undefined to hide it.
 */

export interface ContactMethod {
  id: 'email' | 'github' | 'linkedin' | 'x' | 'phone';
  label: string;
  value: string;
  href: string;
}

export const profile = {
  name: 'Olamide Fadahunsi',
  fullName: 'Olamide Victor Fadahunsi',
  title: 'AI/ML & Backend Engineer',
  location: 'Nigeria',
  email: 'midefadahunsi@gmail.com',
  /** E.164 for the tel: link, plus a readable form. */
  phone: { e164: '+2349132585172', display: '+234 913 258 5172' },
  github: 'https://github.com/AI-MLGuru',
  linkedin: 'https://www.linkedin.com/in/olamide-fadahunsi-05044a385',
  x: 'https://x.com/OlamideFad46736',
  /** Optional hosted résumé; hidden when undefined. */
  resume: undefined as string | undefined,
} as const;

function handleFromUrl(url: string): string {
  return new URL(url).pathname.replace(/^\/+|\/+$/g, '').replace(/^in\//, '');
}

export const contactMethods: ContactMethod[] = [
  { id: 'email', label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
  { id: 'github', label: 'GitHub', value: handleFromUrl(profile.github), href: profile.github },
  ...(profile.linkedin
    ? [
        {
          id: 'linkedin',
          label: 'LinkedIn',
          value: handleFromUrl(profile.linkedin),
          href: profile.linkedin,
        } as const,
      ]
    : []),
  ...(profile.x
    ? [{ id: 'x', label: 'X', value: `@${handleFromUrl(profile.x)}`, href: profile.x } as const]
    : []),
  { id: 'phone', label: 'Phone', value: profile.phone.display, href: `tel:${profile.phone.e164}` },
];
