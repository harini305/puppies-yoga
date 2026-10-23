// Verified content from docs/source-audit (03-content-inventory.md, faq-full.json).
// Disputed figures (adoption totals, donation totals, review counts, puppy counts,
// conflicting ticket prices) are deliberately left out of this demo.

export const LIVE_SITE = "https://www.puppiesyogabali.com";

export const contact = {
  whatsappDisplay: "+62 852 1545 0370",
  whatsappUrl: "https://wa.me/6285215450370",
  email: "puppyyogabali@hotmail.com",
  instagram: "https://www.instagram.com/puppy_yoga_bali",
  tiktok: "https://www.tiktok.com/@puppyyogabali",
  asemanWhatsappDisplay: "+62 813 3872 8364",
  asemanWhatsappUrl: "https://wa.me/6281338728364",
};

export const nav = [
  { href: "/sessions", label: "Sessions" },
  { href: "/locations", label: "Locations" },
  { href: "/private-puppy-yoga-bali", label: "Private & gifts" },
  { href: "/faq", label: "FAQ" },
  { href: "/faq#contact", label: "Contact" },
];

export const locations = [
  {
    id: "canggu",
    name: "Canggu",
    setting: "Poolside",
    venue: "Anginsepoi Hotel",
    address: "Banjar Pengembangan, Desa Pererenan, Mengwi, Canggu, Badung, Bali",
    mapUrl: "https://www.google.com/maps?q=-8.6523211,115.1241903",
    bookUrl: `${LIVE_SITE}/puppy-yoga-canggu`,
    arrival:
      "Someone from the team waits for you at the hotel entrance 5 minutes before the session starts.",
    extra: "Arriving early? You're welcome to use the hotel bar and swimming pool.",
    times: ["9:30 AM", "11:15 AM", "3:00 PM", "4:45 PM"],
    blurb:
      "Our original home: a calm hotel garden where you practise beside the pool and the puppies roam between the mats.",
    image: "canggu-stretch",
    gallery: ["pool-pack", "pool-hug"],
  },
  {
    id: "ubud",
    name: "Ubud",
    setting: "Jungle shala",
    venue: "K Club Ubud",
    address: "Jalan Raya Cebok, Kedisan, Tegallalang, Gianyar, Bali 80561",
    mapUrl: "https://maps.app.goo.gl/h46dnFSy6TSxajEz9",
    bookUrl: `${LIVE_SITE}/puppy-yoga-ubud`,
    arrival:
      "Go to the front desk 5 to 10 minutes before your session. Someone will guide you to the yoga shala.",
    extra: "Sessions here are released less often, so check dates early.",
    times: null,
    blurb:
      "An open-air wooden shala looking straight into the jungle canopy. Quieter, greener, and just as many puppy cuddles.",
    image: "ubud-shala",
    gallery: ["ubud-lunge", "ubud-play"],
  },
];

export const essentials = [
  { term: "60 minutes", detail: "A gentle, beginner-friendly flow with puppies all around you." },
  { term: "Everything provided", detail: "Yoga mat, welcome drink and towels if you need one." },
  { term: "Ages 16+", detail: "Puppies are wild. ID may be requested at the door." },
];

export const faqGroups = [
  {
    title: "Before you book",
    items: [
      {
        q: "Do I need to bring my own mat?",
        a: "Nope! We provide everything: yoga mat, welcome drink, towels if needed… and puppies. Just bring your best energy. A T-shirt is a good idea, as the puppies love climbing on your back.",
      },
      {
        q: "What's the minimum age?",
        a: "We love kids, but puppies being (crazy) puppies, the minimum age is 16 for safety and to comply with regulations. We may request ID, and there is no refund for underage guests.",
      },
      {
        q: "Can I bring my own dog?",
        a: "We love your pup already, but for safety reasons no outside dogs are allowed. All dogs present are part of our rescue partner programme with Aseman Bali Dog Association.",
      },
      {
        q: "Sessions are sold out. Is there a waiting list?",
        a: "Yes. Sessions usually sell out a few days in advance and new dates are released regularly. To join the waiting list, or to hear about new ticket drops early, send us a WhatsApp.",
        link: { href: contact.whatsappUrl, label: "Message us on WhatsApp" },
      },
      {
        q: "Do you offer private sessions?",
        a: "Yes! Private sessions are perfect for groups, birthdays, retreats or special moments, with extra time, pool access and up to 19 guests. Half of the profits go directly to Aseman Bali Dog Association.",
        link: { href: "/private-puppy-yoga-bali", label: "See private sessions" },
      },
    ],
  },
  {
    title: "The puppies",
    items: [
      {
        q: "Where do the puppies come from?",
        a: "Every puppy comes from Aseman Bali Dog Association, a family-run, cage-free rescue shelter in Bali. They were rescued from the streets or from unsafe homes. Our sessions help them rebuild trust, socialise, and find a forever family.",
      },
      {
        q: "What happens to the puppies after the sessions?",
        a: "Puppy Yoga Bali does not own the dogs. Aseman cares for them for life, from rescue until they find a family, including when they grow up. During their few hours with us, puppies learn to trust people and discover new places, which makes them far more likely to be adopted.",
      },
      {
        q: "Can I adopt a puppy?",
        a: "Yes, every puppy in our sessions is open for adoption. If you fall in love with one, contact us or Aseman directly. More than 350 rescue dogs at the shelter are waiting for a home.",
        link: { href: contact.asemanWhatsappUrl, label: `Aseman on WhatsApp: ${contact.asemanWhatsappDisplay}` },
      },
      {
        q: "Can I visit the rescue shelter?",
        a: "Absolutely. Aseman welcomes visitors, and volunteers for a day or more, to help feed, walk and care for the dogs. Contact them directly to arrange a visit.",
      },
      {
        q: "Is Puppy Yoga Bali ethical?",
        a: "We partner exclusively with a local non-profit rescue. The puppies are never bred or sold. They join sessions for only a few hours, always have water, breaks and gentle care, and every ticket helps fund food, vaccinations and care at the shelter.",
      },
    ],
  },
  {
    title: "Changes & refunds",
    items: [
      {
        q: "What's the refund policy?",
        a: "Cancel at least 48 hours before your session to get a refund or reschedule (once). If you booked through GetYourGuide or another app, please contact them directly. Refunds are processed within 10–12 business days.",
      },
    ],
  },
];
