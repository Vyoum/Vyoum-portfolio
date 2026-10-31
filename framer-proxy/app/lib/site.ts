export const SITE = {
  name: "Vyoum Agarwaal",
  role: "AI Engineer",
  location: "Noida, India",
  email: "vyoumagarwal@gmail.com",
  linkedin: "https://www.linkedin.com/in/vyoum-agarwaal",
  github: "https://github.com/Vyoum",
  url: "https://vyoum-portfolio.vercel.app",
} as const;

export const EMAIL_HREF = `mailto:${SITE.email}`;

/** Swap for a Cal.com / Calendly link once booking is set up. */
export const BOOK_CALL_HREF = `mailto:${SITE.email}?subject=${encodeURIComponent(
  "Book a call"
)}`;

export const PROJECT_INQUIRY_HREF = `mailto:${SITE.email}?subject=${encodeURIComponent(
  "Project inquiry"
)}`;
