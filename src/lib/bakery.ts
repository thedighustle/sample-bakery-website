export const PHONE = "123-456-7890";
export const PHONE_HREF = "tel:1234567890";
export const EMAIL = "Samplebakery@sampleemail.com";
export const ADDRESS = "1234 Sample Avenue, Sample City";
export const SOCIAL = "@samplesocialmediaaccount";
export const TAGLINE = "Fresh every morning. Family every visit.";
export const SHOWCASE_TAGLINE = "Sample Bakery to showcase Web Design Expertise";

// 0 = Sunday ... 6 = Saturday. Thursday (4) is closed.
export const HOURS: { day: string; idx: number; hours: string | null }[] = [
  { day: "Monday", idx: 1, hours: "7:00 AM - 7:00 PM" },
  { day: "Tuesday", idx: 2, hours: "7:00 AM - 7:00 PM" },
  { day: "Wednesday", idx: 3, hours: "7:00 AM - 7:00 PM" },
  { day: "Thursday", idx: 4, hours: null },
  { day: "Friday", idx: 5, hours: "7:00 AM - 7:00 PM" },
  { day: "Saturday", idx: 6, hours: "7:00 AM - 7:00 PM" },
  { day: "Sunday", idx: 0, hours: "7:00 AM - 7:00 PM" },
];

export function isClosedDay(dayIdx: number) {
  return dayIdx === 4;
}

export const TESTIMONIALS = [
  {
    quote: "Sample Bakery has a unique and professional website. Great quality.",
    name: "Satisfied Customer 1",
  },
  {
    quote:
      "The website for Sample Bakery displays a high level menu section which makes my mouth water.",
    name: "Satisfied Customer 2",
  },
  { quote: "Great website. Would love one as well", name: "Satisfied Customer 3" },
];

export const SHARED_LINE = "Baked fresh every morning.";
