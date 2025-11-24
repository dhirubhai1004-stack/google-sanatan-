
import React, { useState, useEffect, useRef } from 'react';
import type { BookingDetails } from './types';
import { PoojaType } from './types';

// --- Icons ---
const OmLogo: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M36.31 64.25c-4.07-4.8-5.25-10.98-2.97-16.46C35.62 42.31 40.83 38.32 46.8 37.11c.79-.16 1.52.52 1.52 1.32 0 .5-.3.97-.77 1.21-4.89 2.5-7.5 7.57-6.11 12.78 1.4 5.21 6.2 8.91 11.5 8.91 3.5 0 6.7-1.5 8.9-4.1.49-.58 1.34-.68 1.98-.27.64.42.81 1.28.3 1.96-2.7 3.6-6.9 5.6-11.4 5.6-3.4 0-6.6-1.1-9.4-3zM69.37 34.42c-2.7-.4-4.8-2.6-4.8-5.3 0-3 2.4-5.4 5.4-5.4 1.7 0 3.3.8 4.3 2.1.3.4.9.5 1.3.2.4-.3.5-.9.2-1.3-1.3-1.7-3.3-2.7-5.5-2.7-3.9 0-7 3.1-7 7 0 3.5 2.5 6.5 6 6.9.5.1 1-.3 1-.8 0-.5-.4-.9-.9-1zM50 100C22.39 100 0 77.61 0 50S22.39 0 50 0s50 22.39 50 50-22.39 50-50 50zM50 5C25.15 5 5 25.15 5 50s20.15 45 45 45 45-20.15 45-45S74.85 5 50 5z"/>
  </svg>
);

const TempleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const StarIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

const WhatsAppIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const HeartIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

const BadgeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.791-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
);

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
);

const LocationIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
);

const PhoneIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
);

const EmailIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
);

const CloseIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const MoonIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
);


// --- Translations ---
const translations = {
  en: {
    nav: {
      pujas: "Pujas",
      astrology: "Astrology",
      gauSeva: "Gau Seva",
      offerings: "Offerings",
      specialPuja: "Special Puja",
      contactUs: "Contact Us",
      donate: "Donate",
      account: "Account",
      langBtn: "हिन्दी" 
    },
    hero: {
      title: "Sanatan Dham Kendra",
      subtitle: "Book Pujas, Sevas and Donations online. Connect with your faith, from anywhere.",
      cta: "Book a Puja"
    },
    pujas: {
      header: "Book a Puja",
      subheader: "Perform sacred pujas with experienced priests. Book online for a seamless devotional experience.",
      satyanarayan: {
        title: "Satyanarayan Puja",
        desc: "A sacred ritual to honor Lord Vishnu, this puja is performed to invite prosperity, happiness, and truth into one's life. It is often conducted on special occasions and is believed to remove obstacles."
      },
      grihaPravesh: {
        title: "Griha Pravesh Puja",
        desc: "Sanctify your new home with this essential ceremony. It purifies the space, creates a divine ambiance, and seeks blessings for peace, prosperity, and protection from negative energies."
      },
      vahana: {
        title: "Vahana Puja",
        desc: "Bless your new vehicle with this puja to ensure safety and protection during travel. This ritual seeks divine grace for a smooth journey, safeguarding the vehicle and its occupants from mishaps."
      },
      bookNow: "Book Now",
      participateNow: "Participate Now",
      seeAll: "See All Upcoming Pujas"
    },
    booking: {
      header: "Confirm Your Booking",
      subheader: "Please provide your details to finalize your puja reservation.",
      name: "Full Name",
      phone: "Phone Number",
      date: "Preferred Date",
      type: "Puja Type",
      special: "Special Requests",
      submit: "Confirm Booking",
      success: "Booking Request Sent Successfully!"
    },
    temples: {
      header: "Explore India's Divine Temples",
      subheader: "Discover the spiritual heritage of India through its 51 most magnificent temples. Click on a temple to know its history, beliefs and miracles.",
      details: {
        history: "History & Origin",
        beliefs: "Beliefs & Miracles",
        location: "Location"
      }
    },
    gauSeva: {
      title: "Gau Seva (Cow Service)",
      desc: "In Hinduism, the cow is revered as Gaumata (mother cow), a symbol of life, and a provider of nourishment. Participating in Gau Seva (serving a cow) or Gau Dan (donating a cow) is a sacred act believed to wash away sins, fulfill wishes, and grant immense spiritual merit.",
      cta: "Donate for Gau Seva"
    },
    offerings: {
      header: "Make an Offering (Chadava)",
      subheader: "Offer your devotion to the deities by contributing towards temple rituals, priestly services, and community welfare.",
      vastra: { title: "Vastra Daan", desc: "Offer new clothes to the deities and priests.", cta: "Offer Now" },
      deepam: { title: "Deepam Seva", desc: "Light lamps to dispel darkness and bring spiritual illumination.", cta: "Offer Now" },
      anna: { title: "Anna Daan", desc: "Distribute sacred food (prasad) to devotees and the needy.", cta: "Offer Now" }
    },
    special: {
      title: "Request a Special Puja",
      desc: "Can't find the puja you're looking for? Request a personalized puja tailored to your specific needs and intentions. Our experienced priests will perform the ritual on your behalf.",
      cta: "Request a Puja"
    },
    donation: {
      title: "Support Sanatan Dham",
      desc: "Your generous donations help us maintain the temple, perform daily pujas, and serve the community. Every contribution makes a difference.",
      placeholder: "Enter amount (₹)",
      cta: "Donate Now"
    },
    certificate: {
      title: "Certificate of Appreciation",
      desc: "As a token of our gratitude, every donation is honored with a personalized Certificate of Appreciation from Sanatan Dham Kendra. It is our way of acknowledging your invaluable support in our spiritual mission.",
      imageAlt: "An elegant certificate of appreciation with a golden border and traditional Indian design motifs, on a clean background."
    },
    astrologyPage: {
        hero: {
          title: "Talk to an Astrologer",
          subtitle: "Unlock the secrets of the cosmos and gain clarity on your life's path with our expert astrologers."
        },
        servicesHeader: "Astrology Consultations",
        servicesSubheader: "Whether you seek guidance on your career, relationships, or personal growth, our experienced astrologers are here to provide profound insights based on your unique birth chart.",
        services: [
          { title: "Birth Chart Analysis", desc: "Get a detailed analysis of your birth chart for insights into your personality, strengths, and weaknesses." },
          { title: "Career Consultation", desc: "Receive guidance on your career path, identifying opportunities and potential challenges." },
          { title: "Marriage Matching", desc: "Ensure compatibility with your partner through detailed horoscope matching for a harmonious life." },
          { title: "Vastu Consultation", desc: "Harmonize your home or office space for better energy flow, prosperity, and well-being." },
          { title: "Numerology Consultation", desc: "Discover the hidden meaning of numbers in your life and how they influence your destiny." },
          { title: "Palm Reading", desc: "Unveil your future and understand your character through the ancient art of palmistry." }
        ],
        bookBtn: "Book Consultation"
    },
    footer: {
      desc: "Book Pujas, Sevas and Donations online. Connect with your faith, from anywhere.",
      quickLinks: "Quick Links",
      legal: "Legal",
      follow: "Follow & Contact Us",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      refund: "Return and Refund Policy",
      contact: "Contact Us",
      address: "123 Spiritual Lane, Dev Nagar, Haridwar, India - 249401",
      copyright: "© 2025 Sanatan Dham Kendra. All Rights Reserved."
    }
  },
  hi: {
    nav: {
      pujas: "पूजा",
      astrology: "ज्योतिष",
      gauSeva: "गौ सेवा",
      offerings: "चढ़ावा",
      specialPuja: "विशेष पूजा",
      contactUs: "संपर्क करें",
      donate: "दान करें",
      account: "खाता",
      langBtn: "English"
    },
    hero: {
      title: "सनातन धाम केंद्र",
      subtitle: "पूजा, सेवा और दान ऑनलाइन बुक करें। अपनी आस्था से जुड़ें, कहीं से भी।",
      cta: "पूजा बुक करें"
    },
    pujas: {
      header: "पूजा बुक करें",
      subheader: "अनुभवी पंडितों के साथ पवित्र पूजा संपन्न करें। एक सहज भक्ति अनुभव के लिए ऑनलाइन बुक करें।",
      satyanarayan: {
        title: "सत्यनारायण पूजा",
        desc: "भगवान विष्णु के सम्मान में एक पवित्र अनुष्ठान, यह पूजा जीवन में सुख, समृद्धि और सत्य को आमंत्रित करने के लिए की जाती है। यह अक्सर विशेष अवसरों पर आयोजित की जाती है।"
      },
      grihaPravesh: {
        title: "गृह प्रवेश पूजा",
        desc: "इस आवश्यक समारोह के साथ अपने नए घर को पवित्र करें। यह स्थान को शुद्ध करता है, एक दिव्य वातावरण बनाता है, और शांति, समृद्धि और नकारात्मक ऊर्जा से सुरक्षा का आशीर्वाद मांगता है।"
      },
      vahana: {
        title: "वाहन पूजा",
        desc: "यात्रा के दौरान सुरक्षा सुनिश्चित करने के लिए अपने नए वाहन को इस पूजा से आशीर्वाद दें। यह अनुष्ठान एक सुगम यात्रा के लिए दिव्य कृपा चाहता है, वाहन और उसमें सवार लोगों की रक्षा करता है।",
      },
      bookNow: "अभी बुक करें",
      participateNow: "अभी भाग लें",
      seeAll: "सभी आगामी पूजा देखें"
    },
    booking: {
      header: "अपनी बुकिंग की पुष्टि करें",
      subheader: "कृपया अपनी पूजा आरक्षण को अंतिम रूप देने के लिए अपना विवरण प्रदान करें।",
      name: "पूरा नाम",
      phone: "फ़ोन नंबर",
      date: "पसंदीदा तारीख",
      type: "पूजा का प्रकार",
      special: "विशेष अनुरोध",
      submit: "बुकिंग की पुष्टि करें",
      success: "बुकिंग अनुरोध सफलतापूर्वक भेजा गया!"
    },
    temples: {
      header: "भारत के दिव्य मंदिरों का अन्वेषण करें",
      subheader: "भारत की आध्यात्मिक विरासत को इसके 51 सबसे शानदार मंदिरों के माध्यम से जानें। अधिक जानकारी के लिए मंदिर पर क्लिक करें।",
      details: {
        history: "इतिहास और उत्पत्ति",
        beliefs: "मान्यताएं और चमत्कार",
        location: "स्थान"
      }
    },
    gauSeva: {
      title: "गौ सेवा",
      desc: "हिंदू धर्म में, गाय को गौमाता (माता गाय) के रूप में पूजा जाता है, जो जीवन का प्रतीक है और पोषण प्रदान करती है। गौ सेवा (गाय की सेवा) में भाग लेना एक पवित्र कार्य है जिससे पाप धुल जाते हैं।",
      cta: "गौ सेवा के लिए दान करें"
    },
    offerings: {
      header: "चढ़ावा चढ़ाएं (चढ़ावा)",
      subheader: "मंदिर के अनुष्ठानों, पुरोहित सेवाओं और सामुदायिक कल्याण में योगदान देकर देवताओं के प्रति अपनी भक्ति अर्पित करें।",
      vastra: { title: "वस्त्र दान", desc: "देवताओं और पुजारियों को नए वस्त्र अर्पित करें।", cta: "अभी चढ़ाएं" },
      deepam: { title: "दीपम सेवा", desc: "अंधकार को दूर करने और आध्यात्मिक प्रकाश लाने के लिए दीपक जलाएं।", cta: "अभी चढ़ाएं" },
      anna: { title: "अन्न दान", desc: "भक्तों और जरूरतमंदों को पवित्र भोजन (प्रसाद) वितरित करें।", cta: "अभी चढ़ाएं" }
    },
    special: {
      title: "विशेष पूजा का अनुरोध करें",
      desc: "क्या आप वह पूजा नहीं ढूँढ पा रहे हैं जिसकी आपको तलाश है? अपनी विशिष्ट आवश्यकताओं और इरादों के अनुरूप व्यक्तिगत पूजा का अनुरोध करें। हमारे अनुभवी पंडित आपकी ओर से अनुष्ठान करेंगे।",
      cta: "पूजा का अनुरोध करें"
    },
    donation: {
      title: "सनातन धाम का समर्थन करें",
      desc: "आपके उदार दान हमें मंदिर के रखरखाव, दैनिक पूजा और समुदाय की सेवा करने में मदद करते हैं। हर योगदान मायने रखता है।",
      placeholder: "राशि दर्ज करें (₹)",
      cta: "अभी दान करें"
    },
    certificate: {
      title: "प्रशंसा प्रमाण पत्र",
      desc: "हमारे आभार के प्रतीक के रूप में, प्रत्येक दान को सनातन धाम केंद्र की ओर से एक व्यक्तिगत प्रशंसा प्रमाण पत्र के साथ सम्मानित किया जाता है। यह हमारे आध्यात्मिक मिशन में आपके अमूल्य समर्थन को स्वीकार करने का हमारा तरीका है।",
      imageAlt: "स्वच्छ पृष्ठभूमि पर सुनहरे बॉर्डर और पारंपरिक भारतीय डिजाइनों वाला एक सुंदर प्रशंसा प्रमाण पत्र।"
    },
    astrologyPage: {
        hero: {
          title: "ज्योतिष से बात करें",
          subtitle: "ब्रह्मांड के रहस्यों को अनलॉक करें और हमारे विशेषज्ञ ज्योतिषियों के साथ अपने जीवन के पथ पर स्पष्टता प्राप्त करें।"
        },
        servicesHeader: "ज्योतिष परामर्श",
        servicesSubheader: "चाहे आप अपने करियर, रिश्तों या व्यक्तिगत विकास पर मार्गदर्शन चाहते हों, हमारे अनुभवी ज्योतिषी आपकी अनूठी जन्म कुंडली के आधार पर गहन अंतर्दृष्टि प्रदान करने के लिए यहाँ हैं।",
        services: [
          { title: "जन्म कुंडली विश्लेषण", desc: "अपने व्यक्तित्व, ताकत और कमजोरियों के बारे में जानकारी के लिए अपनी जन्म कुंडली का विस्तृत विश्लेषण प्राप्त करें।" },
          { title: "कैरियर परामर्श", desc: "अपने करियर पथ पर मार्गदर्शन प्राप्त करें, अवसरों और संभावित चुनौतियों की पहचान करें।" },
          { title: "विवाह मिलान", desc: "सामंजस्यपूर्ण जीवन के लिए विस्तृत कुंडली मिलान के माध्यम से अपने साथी के साथ संगतता सुनिश्चित करें।" },
          { title: "वास्तु परामर्श", desc: "बेहतर ऊर्जा प्रवाह, समृद्धि और कल्याण के लिए अपने घर या कार्यालय स्थान को सामंजस्यपूर्ण बनाएं।" },
          { title: "अंक ज्योतिष परामर्श", desc: "अपने जीवन में संख्याओं के छिपे अर्थ को खोजें और वे आपके भाग्य को कैसे प्रभावित करते हैं।" },
          { title: "हस्तरेखा पढ़ना", desc: "अपने भविष्य का अनावरण करें और हस्तरेखा कला की प्राचीन कला के माध्यम से अपने चरित्र को समझें।" }
        ],
        bookBtn: "परामर्श बुक करें"
    },
    footer: {
      desc: "पूजा, सेवा और दान ऑनलाइन बुक करें। अपनी आस्था से जुड़ें, कहीं से भी।",
      quickLinks: "महत्वपूर्ण लिंक",
      legal: "कानूनी",
      follow: "फॉलो और संपर्क करें",
      privacy: "गोपनीयता नीति",
      terms: "सेवा की शर्तें",
      refund: "वापसी और धनवापसी नीति",
      contact: "संपर्क करें",
      address: "123 स्पिरिचुअल लेन, देव नगर, हरिद्वार, भारत - 249401",
      copyright: "© 2025 सनातन धाम केंद्र। सर्वाधिकार सुरक्षित।"
    }
  }
};

type Language = 'en' | 'hi';
type ViewState = 'home' | 'privacy' | 'refund' | 'upcoming' | 'astrology';

// --- Data Models ---
interface Temple {
  id: string;
  name: string;
  location: string;
  history: string;
  beliefs: string;
  description: string;
}

// Data for 51 Temples
const templesData: Temple[] = [
  {
    id: "kashi-vishwanath",
    name: "Kashi Vishwanath Temple",
    location: "Varanasi, Uttar Pradesh",
    description: "Dedicated to Lord Shiva, Kashi Vishwanath Temple is one of the most famous Hindu temples. It stands on the western bank of the holy river Ganges.",
    history: "Built in 1780 by the Maratha monarch, Maharani Ahilyabai Holkar of Indore. The temple has been destroyed and rebuilt several times in history. It is one of the twelve Jyotirlingas, the holiest of Shiva temples.",
    beliefs: "It is believed that a visit to the temple and a bath in the Ganges is the path to Moksha (liberation). Legend says that Lord Shiva himself blows the mantra of salvation into the ears of people who die here."
  },
  {
    id: "tirumala",
    name: "Tirumala Venkateswara",
    location: "Tirumala, Andhra Pradesh",
    description: "A landmark Vaishnavite temple situated in the hill town of Tirumala. It is dedicated to Lord Venkateswara, an incarnation of Vishnu.",
    history: "The temple's history dates back to 300 AD, with contributions from Pallavas, Cholas, and Vijayanagara kings. Sri Krishnadevaraya was a major benefactor. It is a masterpiece of Dravidian architecture.",
    beliefs: "Devotees donate hair (Mokku) as an offering. It is believed that Lord Venkateswara took a loan from Kubera for his wedding, and devotees help him repay it. The idol is said to sweat, and the back of the idol remains moist."
  },
  {
    id: "kedarnath",
    name: "Kedarnath Temple",
    location: "Kedarnath, Uttarakhand",
    description: "Located in the Garhwal Himalayas, Kedarnath is one of the holiest Hindu shrines dedicated to Lord Shiva.",
    history: "Believed to be built by the Pandavas and revived by Adi Shankaracharya in the 8th century. The structure is built of massive stone slabs over a large rectangular platform.",
    beliefs: "It is part of the Char Dham Yatra. The temple survived the devastating 2013 floods, which devotees consider a miracle of Lord Shiva. The temple opens only for 6 months a year due to extreme weather."
  },
  {
    id: "somnath",
    name: "Somnath Temple",
    location: "Veraval, Gujarat",
    description: "The Somnath temple is first among the twelve Aadi Jyotirlingas of India. It is located on the western coast of Gujarat.",
    history: "Known as the 'Shrine Eternal', it has been destroyed 17 times and rebuilt each time. The current structure was built in 1951 in the Chalukya style of architecture.",
    beliefs: "It is believed that the Moon God (Soma) built the temple in gold to worship Shiva and get cured of a curse. The Shivalinga is said to be self-manifested (Swayambhu)."
  },
  {
    id: "golden-temple",
    name: "Golden Temple (Harmandir Sahib)",
    location: "Amritsar, Punjab",
    description: "The holiest Gurdwara of Sikhism, located in the city of Amritsar. It is an open house of worship for all men and women.",
    history: "Guru Arjan Sahib, the Fifth Nanak, conceived the idea of creating a central place of worship. The foundation was laid by a Muslim saint, Hazrat Mian Mir, in 1588. Maharaja Ranjit Singh covered the upper floors with gold in the 19th century.",
    beliefs: "The Sarovar (pool) surrounding the temple is believed to have healing powers. The concept of Langar (community kitchen) here serves over 100,000 people daily, symbolizing equality and service."
  },
  {
    id: "meenakshi",
    name: "Meenakshi Amman Temple",
    location: "Madurai, Tamil Nadu",
    description: "A historic Hindu temple located on the southern bank of the Vaigai River. It is dedicated to Meenakshi, a form of Parvati, and her consort, Sundareshwar.",
    history: "The current structure was built between 1623 and 1655 CE by Tirumala Nayak. It houses 14 gopurams (gateway towers), ranging from 45–50m in height.",
    beliefs: "The marriage of Meenakshi and Sundareshwar is celebrated annually as the 'Meenakshi Thirukalyanam'. It is believed that the Goddess rules the city of Madurai."
  },
  {
    id: "jagannath",
    name: "Jagannath Temple",
    location: "Puri, Odisha",
    description: "Dedicated to Lord Jagannath, a form of Vishnu. The temple is famous for its annual Ratha Yatra, or chariot festival.",
    history: "Built in the 12th century by King Anantavarman Chodaganga Deva. The main temple represents the Kalinga style of architecture.",
    beliefs: "Several mysteries surround the temple: the flag flows opposite to the wind, no birds fly over the dome, and the food cooked in the temple never goes to waste. The idols are made of wood and replaced every 12 or 19 years."
  },
  {
    id: "vaishno-devi",
    name: "Vaishno Devi Temple",
    location: "Katra, Jammu & Kashmir",
    description: "A holy cave shrine dedicated to Goddess Vaishno Devi, located in the Trikuta Mountains.",
    history: "The geological study indicates the cave is a million years old. It was mentioned in the Mahabharata. The shrine is maintained by the Shri Mata Vaishno Devi Shrine Board.",
    beliefs: "It is believed that the Goddess calls her devotees ('Bulawa'). No one can visit unless she wills it. The shrine contains three natural rock formations called Pindies."
  },
  {
    id: "siddhivinayak",
    name: "Siddhivinayak Temple",
    location: "Mumbai, Maharashtra",
    description: "Dedicated to Lord Ganesha. It is one of the richest temples in India and a popular destination for celebrities and politicians.",
    history: "Built in 1801 by Laxman Vithu and Deubai Patil. The original structure was a small 3.6m x 3.6m shrine.",
    beliefs: "Ganesha here is known as 'Navasacha Ganapati' (Ganapati who grants a wish). The trunk of the idol tilts to the right, which is rare and considered very powerful."
  },
  {
    id: "badrinath",
    name: "Badrinath Temple",
    location: "Badrinath, Uttarakhand",
    description: "Dedicated to Lord Vishnu. It is one of the Char Dhams and is situated along the banks of the Alaknanda River.",
    history: "Established by Adi Shankaracharya in the 8th century. The temple has undergone several renovations due to avalanches and earthquakes.",
    beliefs: "It is believed that Vishnu meditated here for thousands of years. To protect him from the sun, Goddess Lakshmi turned into a Badri (berry) tree."
  },
  {
    id: "ramanathaswamy",
    name: "Ramanathaswamy Temple",
    location: "Rameswaram, Tamil Nadu",
    description: "Dedicated to Lord Shiva. It is one of the twelve Jyotirlingas and possesses the longest corridor among all Hindu temples in India.",
    history: "Expanded during the 12th century by Pandya Dynasty. The current structure is largely the work of the Sethupathis of Ramnad.",
    beliefs: "Legend says Lord Rama worshipped Shiva here to absolve the sin of killing Ravana. There are 22 holy water wells (Theerthams) within the temple complex."
  },
  {
    id: "konark",
    name: "Sun Temple",
    location: "Konark, Odisha",
    description: "A 13th-century temple dedicated to the Sun God, Surya. It is a UNESCO World Heritage Site.",
    history: "Built by King Narasimhadeva I of the Eastern Ganga Dynasty in 1250 CE. Designed as a gigantic chariot with 24 wheels and 7 horses.",
    beliefs: "The wheels are actually sundials that can calculate time accurately to the minute. It is believed the temple originally had a massive magnet that caused ships to run aground."
  },
  {
    id: "akshardham",
    name: "Akshardham Temple",
    location: "Delhi",
    description: "A spiritual-cultural campus displaying millennia of traditional Hindu and Indian culture, spirituality, and architecture.",
    history: "Opened in 2005, built by BAPS Swaminarayan Sanstha. Constructed from pink sandstone and Italian marble without using support from steel or concrete.",
    beliefs: "Dedicated to Swaminarayan. It showcases the essence of India's ancient art, traditions, and wisdom. The Sahaj Anand Water Show depicts a story from the Kena Upanishad."
  },
  {
    id: "shirdi",
    name: "Shirdi Sai Baba Temple",
    location: "Shirdi, Maharashtra",
    description: "The temple complex dedicated to Shirdi Sai Baba, a saint revered by both Hindu and Muslim devotees.",
    history: "Built over the Samadhi of Sai Baba. The temple construction began in 1915. Baba took Mahasamadhi in 1918.",
    beliefs: "Sai Baba's teaching 'Sabka Malik Ek' (One God governs all) resonates here. Devotees believe the sacred ash (Udi) from the dhuni (fire) has healing properties."
  },
  {
    id: "dwarkadhish",
    name: "Dwarkadhish Temple",
    location: "Dwarka, Gujarat",
    description: "Dedicated to Lord Krishna, who is worshipped here as the 'King of Dwarka'. It is one of the Char Dham pilgrimage sites.",
    history: "The original temple was believed to be built by Krishna's grandson, Vajranabha. The current structure dates back to the 16th century.",
    beliefs: "Dwarka is believed to be the ancient kingdom of Krishna that was submerged in the sea. The flag atop the temple is changed 5 times a day."
  },
  // ... generating generic entries for the rest to reach 51 for the code structure
  ...Array.from({ length: 36 }).map((_, i) => ({
    id: `temple-${i + 16}`,
    name: [
      "Padmanabhaswamy Temple", "Amarnath Cave", "Mahakaleshwar", "Kamakhya Temple", "Virupaksha Temple",
      "Khajuraho", "Sanchi Stupa", "Gomateshwara", "Ranakpur Jain", "Krishna Janmabhoomi",
      "Banke Bihari", "Yamunotri", "Gangotri", "Kanchipuram", "Murudeshwar",
      "Sri Ranganathaswamy", "Belur Chennakeshava", "Hoysaleswara", "Nataraja Chidambaram", "Arunachaleswarar",
      "Ekambareswarar", "Jambukeswarar", "Kailasanathar", "Shore Temple", "Sabarimala",
      "Guruvayur", "Chottanikkara", "Vadakkunnathan", "Dakshineswar Kali", "Kalighat Kali",
      "Tarapith", "Baidyanath", "Mahabodhi", "Birla Mandir", "Iskcon Bangalore", "Lotus Temple"
    ][i] || `Sacred Temple ${i + 16}`,
    location: "India",
    description: "A significant spiritual site known for its divine atmosphere and architectural beauty.",
    history: "Constructed centuries ago, this temple stands as a testament to India's rich cultural and spiritual heritage. Kings and sages have contributed to its development over eras.",
    beliefs: "Devotees flock here seeking peace and blessings. It is believed that sincere prayers offered here are always answered. The temple is a center of positive energy and devotion."
  }))
];

// New Data for Upcoming Pujas
const upcomingPujasList = [
  {
    title: "Tantra Baadha Mukti Bhairav Mahasuraksha Yagya",
    desc: "For freedom from all negative energies and protection.",
    date: "20 Nov",
    location: "Vikrant Bhairav Mandir, Ujjain",
    image: "https://picsum.photos/seed/tantra/400/300"
  },
  {
    title: "Amavasya Special: Tribhairav Shatru Vinash Raksha Kavach Mahapujan",
    desc: "Complete destruction of every enemy and obstacle.",
    date: "20 Nov",
    location: "Shri Batuk Bhairav Temple, Varanasi",
    image: "https://picsum.photos/seed/tribhairav/400/300",
    badge: "Amavasya Special"
  },
  {
    title: "Prem Prapti Aur Sarv Vashikaran Mahatantrik Bhairav Puja",
    desc: "For arrival of love in life and desired relationship.",
    date: "20 Nov",
    location: "Vikrant Bhairav Mandir, Ujjain",
    image: "https://picsum.photos/seed/prem/400/300"
  },
  {
    title: "Amavasya Special: Shatru Vinashak Kaalratri Aur Kaalbhairav Mahapuja",
    desc: "For protection from negative energies and enemies.",
    date: "20 Nov",
    location: "Kaalbhairav And Kaalratri Temple, Varanasi",
    image: "https://picsum.photos/seed/kaalratri/400/300",
    badge: "Amavasya Special"
  },
  {
    title: "Amavasya Vishesh Kamna Siddhi Puja",
    desc: "Manifest your desires with the powerful Kamtanath Puja.",
    date: "20 Nov",
    location: "Kamatanath Temple, Chitrakoot",
    image: "https://picsum.photos/seed/kamna/400/300"
  },
  {
    title: "Mahabhairav Aapda Haran Yagya",
    desc: "For end of all troubles and sorrows.",
    date: "20 Nov",
    location: "Vikrant Bhairav Mandir, Ujjain",
    image: "https://picsum.photos/seed/aapda/400/300"
  },
  {
    title: "Guru-Rahu Nasha Vimukti Puja",
    desc: "A Spiritual Solution for Addiction Relief.",
    date: "20 Nov",
    location: "Shree Guru Brihaspati Temple, Varanasi",
    image: "https://picsum.photos/seed/nasha/400/300"
  },
  {
    title: "Maa Baglamukhi Mahapuja",
    desc: "Protects from enemies, black magic, and legal issues.",
    date: "20 Nov",
    location: "Maa Baglamukhi Dham, Ujjain",
    image: "https://picsum.photos/seed/baglamukhi/400/300"
  },
  {
    title: "Shatru Vinashak Tantrik Mahapuja",
    desc: "To get rid of enemies, black-magic and negativity.",
    date: "20 Nov",
    location: "Maa Baglamukhi Dham, Ujjain",
    image: "https://picsum.photos/seed/shatru/400/300",
    badge: "Amavasya Special"
  },
  {
    title: "Baglamukhi Lakshmi Dhanvarsha Puja",
    desc: "For the attainment of wealth and success.",
    date: "21 Nov",
    location: "Maa Baglamukhi Dham, Ujjain",
    image: "https://picsum.photos/seed/dhanvarsha/400/300"
  },
  {
    title: "Ishti Vishesh: Devi Kamakhya Ichhapurti Mahapuja",
    desc: "Blessings of wish fulfillment and all success.",
    date: "21 Nov",
    location: "Kamakhya Devi Mandir, Haldwani, Uttarakhand",
    image: "https://picsum.photos/seed/kamakhya/400/300"
  },
  {
    title: "11,000 Shukra Mantra Jaap & Mangala Gauri Mahapuja",
    desc: "Win Your Soulmate's Heart!",
    date: "21 Nov",
    location: "Navagraha Temple & Maa Mangala Gauri Temple",
    image: "https://picsum.photos/seed/shukra/400/300"
  },
  {
    title: "Dhanadhipati Kuber Rajyog Prapti Puja",
    desc: "A powerful ritual to awaken Rajyog.",
    date: "21 Nov",
    location: "Jageshwar Kuber Mandir, Almora, Uttarakhand",
    image: "https://picsum.photos/seed/kuber/400/300"
  },
  {
    title: "Ishti Vishesh: Mahalakshmi Kuber Mahadhan Prapti Puja",
    desc: "With the divine blessings of Mahalakshmi.",
    date: "21 Nov",
    location: "Shakti Peeth Maa Mahalakshmi Ambabai Temple",
    image: "https://picsum.photos/seed/mahalakshmi/400/300"
  },
  {
    title: "Nakshatra Vishesh: Rahu-Ketu-Shani Shanti Puja",
    desc: "For relief from planetary doshas and mental stress.",
    date: "22 Nov",
    location: "Navgraha Temple, Varanasi",
    image: "https://picsum.photos/seed/rahuketu/400/300"
  },
  {
    title: "Shani Saade Saati Nivaran Mahapuja",
    desc: "Protection from Shani’s harsh gaze and troubles.",
    date: "22 Nov",
    location: "Navgraha Temple, Varanasi",
    image: "https://picsum.photos/seed/shani/400/300"
  },
  {
    title: "Shani Kripa Prapti Mahapujan",
    desc: "With the blessings of Shani Dev, sorrows vanish.",
    date: "22 Nov",
    location: "Shani Navgrah Mandir, Ujjain",
    image: "https://picsum.photos/seed/shanikripa/400/300"
  },
  {
    title: "Swarn Akarshan Bhairav Yagya",
    desc: "To attract immense wealth and prosperity.",
    date: "23 Nov",
    location: "Vikrant Bhairav Mandir, Ujjain",
    image: "https://picsum.photos/seed/swarn/400/300"
  },
  {
    title: "Pashupatinath Vishesh Prem Prapti Puja",
    desc: "For the arrival of love in life.",
    date: "24 Nov",
    location: "Pashupatinath Teerth Kshetra, Nepal",
    image: "https://picsum.photos/seed/pashu1/400/300",
    badge: "Pashupatinath Special"
  },
  {
    title: "Prem Vivah Pashupatinath Puja",
    desc: "For the end of obstacles in Love marriage.",
    date: "24 Nov",
    location: "Pashupatinath Teerth Kshetra, Nepal",
    image: "https://picsum.photos/seed/pashu2/400/300"
  },
  {
    title: "Santaan Prapti Pashupatinath Puja",
    desc: "For Childbirth and Calming an Aggressive Child.",
    date: "24 Nov",
    location: "Pashupatinath Teerth Kshetra, Nepal",
    image: "https://picsum.photos/seed/pashu3/400/300"
  },
  {
    title: "Rinmukteshwar Mahadev Puja",
    desc: "To get rid of debt.",
    date: "25 Nov",
    location: "Rin Mukteshwar Mahadev Temple, Ujjain",
    image: "https://picsum.photos/seed/rin1/400/300"
  },
  {
    title: "Rin Mukti Puja",
    desc: "To Get Rid of Debt.",
    date: "25 Nov",
    location: "Rin Mukteshwar Mahadev Temple, Ujjain",
    image: "https://picsum.photos/seed/rin2/400/300"
  },
  {
    title: "18000 Mool Mantra Jaap Aur Rahu Shanti Mahayagya",
    desc: "To eliminate obstacles in job and work.",
    date: "26 Nov",
    location: "Rahu Temple, Paithani, Uttarakhand",
    image: "https://picsum.photos/seed/rahu2/400/300"
  }
];

// --- Shared Layout Components ---
const Section: React.FC<{ id: string; className?: string; children: React.ReactNode }> = ({ id, className = '', children }) => (
  <section id={id} className={`py-16 ${className}`}>
    <div className="container mx-auto px-4 md:px-6 lg:px-8">
      {children}
    </div>
  </section>
);

const SectionHeader: React.FC<{ title: string; subtitle?: string; icon?: React.ReactNode }> = ({ title, subtitle, icon }) => (
  <div className="text-center mb-12">
    {icon && <div className="flex justify-center mb-4 text-saffron-500">{icon}</div>}
    <h2 className="text-4xl font-devanagari text-gray-900 mb-4">{title}</h2>
    {subtitle && <p className="text-gray-600 max-w-2xl mx-auto">{subtitle}</p>}
  </div>
);

const Button: React.FC<{ children: React.ReactNode; onClick?: () => void; primary?: boolean; className?: string; type?: "button" | "submit" | "reset" }> = ({ children, onClick, primary = true, className = '', type = "button" }) => (
  <button 
    type={type}
    onClick={onClick} 
    className={`px-6 py-2.5 rounded-md font-semibold transition-all duration-300 ${
      primary 
        ? 'bg-saffron-500 text-white hover:bg-saffron-700 shadow-md hover:shadow-lg' 
        : 'bg-transparent border border-saffron-500 text-saffron-500 hover:bg-saffron-50'
    } ${className}`}
  >
    {children}
  </button>
);

// --- Puja Card Component ---
const PujaCard: React.FC<{ 
  title: string; 
  description: string; 
  image: string; 
  onBook: () => void; 
  btnText: string;
  date?: string; 
  location?: string;
  badge?: string;
}> = ({ title, description, image, onBook, btnText, date, location, badge }) => (
  <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300 flex flex-col h-full relative group">
    
    {/* Date Badge */}
    {date && (
       <div className="absolute top-3 right-3 bg-white rounded-lg shadow-md p-2 text-center min-w-[60px] z-10 border border-gray-100">
          <span className="block text-lg font-bold text-purple-800 leading-none">{date.split(' ')[0]}</span>
          <span className="block text-xs font-medium text-gray-500 uppercase">{date.split(' ')[1]}</span>
       </div>
    )}
    
    {/* Special Badge */}
    {badge && (
        <div className="absolute top-3 left-0 bg-white/90 backdrop-blur-sm text-purple-800 text-xs font-bold px-3 py-1 rounded-r-full shadow-sm z-10 uppercase tracking-wide border-l-4 border-purple-600">
            {badge}
        </div>
    )}
    
    <div className="h-48 overflow-hidden relative">
        <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
    </div>
    <div className="p-5 flex-grow flex flex-col">
      <h3 className="text-lg font-bold font-devanagari text-gray-900 mb-2 leading-snug line-clamp-2" title={title}>{title}</h3>
      
      {location && (
          <div className="flex items-start text-xs text-gray-500 mb-3">
              <LocationIcon className="w-3.5 h-3.5 mr-1.5 mt-0.5 flex-shrink-0 text-gray-400" />
              <span className="line-clamp-1">{location}</span>
          </div>
      )}

      <p className="text-gray-600 text-sm mb-6 flex-grow leading-relaxed line-clamp-3">{description}</p>
      
      <Button 
        onClick={onBook} 
        className={`w-full ${date ? 'bg-purple-800 hover:bg-purple-900 text-white border-none' : ''}`}
      >
        {btnText}
      </Button>
    </div>
  </div>
);

// --- Privacy Policy Component ---
const PrivacyPolicyView: React.FC<{ t: any }> = ({ t }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="bg-gray-50 py-12 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="bg-white shadow-2xl rounded-2xl overflow-hidden max-w-4xl mx-auto border-t-4 border-saffron-500">
          
          {/* Header Section of Policy */}
          <div className="bg-saffron-50 p-8 text-center border-b border-saffron-100 relative">
             <div className="flex justify-center items-center space-x-3 mb-4">
                <div className="text-saffron-500"><OmLogo className="w-8 h-8" /></div>
                <h1 className="text-3xl md:text-4xl font-devanagari font-bold text-gray-800">Privacy Policy</h1>
                <div className="text-saffron-500"><OmLogo className="w-8 h-8" /></div>
             </div>
             <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-white p-1 rounded-full shadow-sm">
                <div className="w-3 h-3 bg-saffron-500 rounded-full"></div>
             </div>
          </div>

          {/* Content */}
          <div className="p-8 md:p-12 text-gray-700 space-y-8 leading-relaxed font-sans text-justify">
            
            <div className="text-sm text-gray-500 italic border-l-4 border-saffron-300 pl-4 bg-saffron-50/50 py-2">
              <p>This document is published in accordance with the provisions of Rule 3 (1) of the Information Technology (Intermediaries Guidelines) Rules, 2011 which requires publishing the Privacy Policy for the access or usage of our platform.</p>
            </div>

            <p>
              This Privacy Policy covers the use of the website and the app, including providing you the information of our policies regarding the collection, use and disclosure of Personal Information when you use our service. <strong>Sanatan Dham Kendra</strong>, hereinafter referred to as "we", "our team", "us" is concerned about the privacy of the users, hereinafter referred to as "you", "your" or "user" of website and app and have provided this privacy policy to familiarize you with the manner in which we collect, use and disclose your information.
            </p>
            <p>We will not use or share your information with anyone except as described in this Privacy Policy.
            </p>
            <p>We use your Personal Information for providing and improving the services offered by us. By using the service, you agree to the collection and use of information in accordance with this policy.</p>
            
            {/* Section 1 */}
            <section>
              <h2 className="text-xl font-bold text-saffron-700 mb-4 border-b border-gray-100 pb-2">1. What information do we collect?</h2>
              <p className="mb-3">
                We collect information from you when you register/login on the app/website. While registering, we may ask you for your name, phone number, email, location or address, Date of Birth, Place of Birth. However, you may visit the app/website anonymously without logging in.
              </p>
              <p className="mb-3">
                When you create an account, you will provide information that could be personally identifiable information, such as your first name, last name, email, mobile number, location or address, Date of Birth, Place of Birth. We may use your contact information to send you information about our services, but only in accordance with your contact preferences. Regardless of your contact preferences, we reserve the right to contact you when we believe it is necessary, such as for account recovery purposes.
              </p>
              <p className="mb-3">
                  All information provided by you on the app/website may be retained by us indefinitely, even after you terminate your Account. We may continue to disclose such content to third parties in a manner that does not reveal personally identifiable information, as described in this Privacy Policy.
              </p>
              <p className="mb-3">
                  If you choose to share Sanatan Dham Kendra posts with your friends on social media channels such as Facebook, Whatsapp, we would also display our app install link on your social media channels.
              </p>
              <p className="mb-3">
                  In addition to the usage of analytics, the app/website automatically collects usage information, such as the number and frequency of visitors to the app/website. We may use this data in aggregate form, that is, as a statistical measure, but not in a manner that would identify you personally. This type of aggregated data enables us to figure out how often individuals use part of the services so that we can analyse, improve our services and provide better experience to our users.
              </p>
              <p>
                Some users such as temple administrators and pandits need to post content on Sanatan Dham Kendra app/website. For posting the content on the app/website, these users are required to grant the permission to Sanatan Dham Kendra app/website to access photos, media and files or access camera on their devices.
              </p>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-xl font-bold text-saffron-700 mb-4 border-b border-gray-100 pb-2">2. How do we use and share your information?</h2>
              <p className="mb-3">We share your information with third parties when we believe that the sharing is permitted by you, sharing is reasonably necessary to offer our services, or when legally required to do so. We use the information we collect to try to provide our users an efficient and customized experience. We use the information provided by you in the following manner to provide you with the best possible experience.</p>
              <ul className="list-none pl-2 space-y-3">
                <li>
                    <strong>To manage and improve the service:</strong> We use the information we collect to provide our services and features to you, to analyze and improve those services and features, and to provide you with reliable customer support in a short time. To provide customized experience: We endeavour to provide customized experience to each user and this data helps us in making that possible.
                </li>
                <li>
                    <strong>To contact you:</strong> We may contact you in order to obtain feedback on our services and notify you with new features from time to time. Notifications: We may send you notifications from time to time as and when new content is posted on the app/website and when we introduce new features on the app/ website.
                </li>
                <li>
                     <strong>To share the content:</strong> We use our social media plugins inside the app/website to let you post the app content on social media channels. To post content: Some users need to grant permission to app/website to allow access of photos, media and files or access camera on their devices to post the content on the app/website.
                </li>
                <li>
                    <strong>To respond to legal requests and prevent harm:</strong> We may disclose information pursuant to subpoenas, court orders, or other requests (including criminal and civil matters) if we have a good faith belief that the response is required by law.
                </li>
              </ul>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-xl font-bold text-saffron-700 mb-4 border-b border-gray-100 pb-2">3. How do we protect visitor information?</h2>
              <p>
                We implement a variety of security measures to maintain the safety of your personal information. Your Personal Information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems and are required to keep the information confidential.
              </p>
            </section>

            {/* Section 4 */}
             <section>
              <h2 className="text-xl font-bold text-saffron-700 mb-4 border-b border-gray-100 pb-2">4. Public Information about your Activity on the Website/App</h2>
              <p>
                If you choose to provide any personally identifiable information using certain public features of the app/website, then that information is governed by the privacy settings of those particular features and may be publicly available. Individuals reading such information may use or disclose it to other individuals or entities without our control and without your knowledge, and search engines may index that information.
              </p>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-xl font-bold text-saffron-700 mb-4 border-b border-gray-100 pb-2">5. Do we disclose the information we collect to outside parties?</h2>
              <p className="mb-3">
                We do not sell, trade, or otherwise transfer your personally identifiable information to third parties, unless we provide you with advance notice in relation to the same. The term "outside parties" does not include website hosting partners, our technology partners and other parties who assist us in operating the app/website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.
              </p>
              <p className="mb-3">
                We may also release your information, when we believe that release is appropriate to comply with the law, enforce our app/website policies, or protect ours or others' rights, property or safety.
              </p>
              <p>
                Non-personally identifiable visitor information may be provided to other parties for marketing, advertising, benchmarking and internal quality control measures for improving experience for our uses.
              </p>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-xl font-bold text-saffron-700 mb-4 border-b border-gray-100 pb-2">6. Third party links</h2>
              <p>
                In an attempt to provide you our service with increased value, we may include third party links/integration on our app/website. These linked apps/websites have separate and independent privacy policies. We therefore have no responsibility or liability for the content and activities of these linked apps/websites. Nonetheless, we seek to protect the integrity of our app/website and welcome any feedback about these linked apps/websites.
              </p>
            </section>

             {/* Section 7 */}
             <section>
              <h2 className="text-xl font-bold text-saffron-700 mb-4 border-b border-gray-100 pb-2">7. Changes to our policy</h2>
              <p>
                If we decide to change our Privacy Policy, we will post those changes on this page. Policy changes will apply only to information collected after the date of the change. We recommend you to visit this page on a regular basis to stay updated on changes we make from time to time.
              </p>
            </section>

             {/* Section 8 & 9 */}
             <section>
              <h2 className="text-xl font-bold text-saffron-700 mb-4 border-b border-gray-100 pb-2">8. Online Policy only</h2>
              <p className="mb-6">This online Privacy Policy Applies only to information collected through our app/website.</p>
              
              <h2 className="text-xl font-bold text-saffron-700 mb-4 border-b border-gray-100 pb-2">9. Your consent</h2>
              <p>By using our app/website, you consent to our Privacy Policy.</p>
            </section>

            {/* Disclaimer */}
            <div className="bg-red-50 border border-red-100 p-6 rounded-lg text-sm text-red-800 mt-8">
               <h3 className="font-bold text-base mb-2 uppercase tracking-wide">Disclaimer</h3>
               <p>The information contained in this app/website is for general information purposes only. While we endeavour to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability or availability of the content on the app/website. Any reliance you place on such information is at your own risk. In no event, we will be liable for any loss or damage including without limitation, indirect or consequential loss or damage arising from loss of data or profits arising out of it.</p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

// --- Refund Policy Component ---
const RefundPolicyView: React.FC<{ t: any }> = ({ t }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="bg-gray-50 py-12 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="bg-white shadow-2xl rounded-2xl overflow-hidden max-w-4xl mx-auto border-t-4 border-saffron-500">
          
          {/* Header Section */}
          <div className="bg-saffron-50 p-8 text-center border-b border-saffron-100 relative">
             <div className="flex justify-center items-center space-x-3 mb-4">
                <div className="text-saffron-500"><OmLogo className="w-8 h-8" /></div>
                <h1 className="text-3xl md:text-4xl font-devanagari font-bold text-gray-800">Refund Policy</h1>
                <div className="text-saffron-500"><OmLogo className="w-8 h-8" /></div>
             </div>
             <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-white p-1 rounded-full shadow-sm">
                <div className="w-3 h-3 bg-saffron-500 rounded-full"></div>
             </div>
          </div>

          {/* Content */}
          <div className="p-8 md:p-12 text-gray-700 space-y-8 leading-relaxed font-sans text-justify">
            
            <section>
              <h2 className="text-xl font-bold text-saffron-700 mb-4 border-b border-gray-100 pb-2">Returns & Refunds</h2>
              <p className="mb-3">
                You agree to pay all amounts due on Your Billing Account against devotional service availed by you on Sanatan Dham Kendra Platform. Any service order placed through the Website/App for availing any of the Devotional Services such as online puja, prasad, religious tourism package, cannot be cancelled and any payment once made will not be refunded.
              </p>
              <p className="mb-3">
                The date selected for the pooja(s) or offering(s) cannot be changed after making the payment. However, if the temple due to reasons best known to them, does decide to cancel a Puja or an event scheduled by You, an alternative date will be provided for the same. The processing fees or transaction costs, if any, should be borne by the card holder and may be charged extra with the pujas and offerings rate.
              </p>
              <p className="mb-3">
                If you want to transfer the Puja service in benefit of some other person, you will need to contact us at <a href="mailto:contact@sanatandham.com" className="text-saffron-600 hover:underline">contact@sanatandham.com</a>, at least two days prior to the Puja.
              </p>
              <p className="mb-3">
                As, Prasad that is delivered from the Temple to your home address, could be a perishable food item, which has been offered to deity during Puja, Prasadam couldn’t be returned to Sanatan Dham Kendra or Temple once it has been ordered by the Devotee.
              </p>
              <p className="mb-3">
                For non-perishable items such as religious merchandise, our policy lasts 15 days. If 15 days have gone by since your purchase, unfortunately we can’t offer you a refund or exchange. To be eligible for a return, your item must be unused and in the same condition that you received it. It must also be in the original packaging.
              </p>
              <p className="mb-3">
                Several types of goods are exempt from being returned. Perishable goods such as food, flowers, downloadable software services cannot be returned.
              </p>
              <p className="mb-3">
                To complete your return, we require a receipt or proof of purchase.
              </p>
              <p className="mb-3">
                Once your return is received and inspected, we will send you an email to notify you that we have received your returned item. We will also notify you of the approval or rejection of your refund.
              </p>
              <p>
                If you are approved, then your refund will be processed, and a credit will automatically be applied to your card or original method of payment, within 7 business days.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-saffron-700 mb-4 border-b border-gray-100 pb-2">Late or missing refunds (if applicable)</h2>
              <p className="mb-3">
                If you haven’t received a refund yet, first check your bank account again. Then contact your card company, it may take some time before your refund is officially posted.
              </p>
              <p>
                There is often some processing time before a refund is posted. If you’ve done all of this and you still have not received your refund yet, please contact us at <a href="mailto:contact@sanatandham.com" className="text-saffron-600 hover:underline">contact@sanatandham.com</a>.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-saffron-700 mb-4 border-b border-gray-100 pb-2">Exchanges (if applicable)</h2>
              <p>
                We only replace items if they are defective or damaged. If you need to exchange it for the same item, send us an email at <a href="mailto:contact@sanatandham.com" className="text-saffron-600 hover:underline">contact@sanatandham.com</a> and send your item to Sanatan Dham Kendra registered office address as mentioned in the website.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-saffron-700 mb-4 border-b border-gray-100 pb-2">Gifts</h2>
              <p>
                If the item was marked as a gift when purchased and shipped directly to you, you’ll receive a gift credit for the value of your return. Once the returned item is received, a gift certificate will be mailed to you. If the item wasn’t marked as a gift when purchased, or the gift giver had the order shipped to themselves to give to you later, we will send a refund to the gift giver and he will find out about your return.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-saffron-700 mb-4 border-b border-gray-100 pb-2">Shipping</h2>
              <p>
                To return your product, you should mail your product to registered office address as mentioned in the website. You will be responsible for paying for your own shipping costs for returning your item. Shipping costs are non-refundable. If you receive a refund, the cost of return shipping will be deducted from your refund. Depending on where you live, the time it may take for your exchanged product to reach you, may vary.
              </p>
            </section>

          </div>
        </div>
      </div>
    </section>
  );
}

// --- Upcoming Pujas Component (NEW) ---
const UpcomingPujasView: React.FC<{ t: any, onBook: () => void }> = ({ t, onBook }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <section className="bg-gray-50 py-12 min-h-screen">
            <div className="container mx-auto px-4">
                <SectionHeader 
                    title="Upcoming Sacred Pujas" 
                    subtitle="Participate in these auspicious events and seek divine blessings."
                />
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {upcomingPujasList.map((puja, index) => (
                        <PujaCard 
                            key={index}
                            title={puja.title}
                            description={puja.desc}
                            image={puja.image}
                            date={puja.date}
                            location={puja.location}
                            badge={puja.badge}
                            btnText={t.pujas.participateNow}
                            onBook={onBook}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

// --- Astrology Component (NEW) ---
const AstrologyView: React.FC<{ t: any, onBook: () => void }> = ({ t, onBook }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const ZODIAC_SYMBOLS = ["♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐", "♑", "♒", "♓"];

    const services = t.astrologyPage.services.map((service: any, index: number) => ({
      ...service,
      image: [
        "https://picsum.photos/seed/astro1/500/350", // Birth Chart (Will be replaced by animation)
        "https://picsum.photos/seed/astro2/500/350", // Career
        "https://picsum.photos/seed/astro3/500/350", // Marriage
        "https://picsum.photos/seed/astro4/500/350", // Vastu
        "https://picsum.photos/seed/astro5/500/350", // Numerology
        "https://picsum.photos/seed/astro6/500/350", // Palm
      ][index]
    }));

    return (
      <div className="bg-slate-50 min-h-screen font-sans">
        <style>{`
            @keyframes spin-slow {
                from { transform: translate(-50%, -50%) rotate(0deg); }
                to { transform: translate(-50%, -50%) rotate(360deg); }
            }
            @keyframes twinkle {
                0%, 100% { opacity: 0.3; transform: scale(0.8); }
                50% { opacity: 1; transform: scale(1.2); }
            }
            .astro-wheel {
                animation: spin-slow 60s linear infinite;
            }
            .astro-wheel-fast {
                animation: spin-slow 30s linear infinite;
            }
        `}</style>

        {/* Hero Section - Updated with Gold/Fire theme elements */}
        <section className="relative bg-[#0f0c29] bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white py-32 px-4 overflow-hidden">
             
             {/* Background Effects */}
             <div className="absolute inset-0 pointer-events-none">
                {/* Stars */}
                {[...Array(60)].map((_, i) => (
                    <div 
                        key={i}
                        className="absolute bg-yellow-100 rounded-full opacity-0 shadow-[0_0_2px_#fff]"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            width: `${Math.random() * 2 + 1}px`,
                            height: `${Math.random() * 2 + 1}px`,
                            animation: `twinkle ${Math.random() * 3 + 2}s ease-in-out infinite`,
                            animationDelay: `${Math.random() * 5}s`
                        }}
                    ></div>
                ))}
                
                {/* Giant Zodiac Wheel in Background */}
                <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] md:w-[1000px] md:h-[1000px] border border-amber-500/20 rounded-full astro-wheel origin-center opacity-40">
                    <div className="absolute inset-0 rounded-full border border-amber-500/10 m-32"></div>
                    <div className="absolute inset-0 rounded-full border-2 border-dashed border-amber-500/10 m-4"></div>
                    {ZODIAC_SYMBOLS.map((sign, i) => (
                        <div 
                            key={i}
                            className="absolute text-6xl md:text-8xl text-amber-500/20 font-serif top-1/2 left-1/2"
                            style={{
                                transform: `translate(-50%, -50%) rotate(${i * 30}deg) translate(0, -460px) rotate(90deg)`
                            }}
                        >
                            {sign}
                        </div>
                    ))}
                </div>
             </div>

             <div className="container mx-auto text-center relative z-10">
                 <div className="flex justify-center mb-6">
                    <div className="p-4 rounded-full bg-amber-900/30 backdrop-blur-sm border border-amber-500/30 shadow-[0_0_30px_rgba(245,158,11,0.3)] animate-pulse">
                        <MoonIcon className="w-16 h-16 text-amber-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.6)]" />
                    </div>
                 </div>
                 <h1 className="text-5xl md:text-7xl font-bold font-devanagari mb-6 text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200 drop-shadow-sm">
                    {t.astrologyPage.hero.title}
                 </h1>
                 <p className="text-xl text-amber-100/80 max-w-2xl mx-auto leading-relaxed">
                   {t.astrologyPage.hero.subtitle}
                 </p>
             </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 bg-slate-50">
            <div className="container mx-auto px-4">
                 <div className="text-center mb-16">
                     <h2 className="text-3xl md:text-4xl font-bold font-devanagari text-gray-900 mb-4">{t.astrologyPage.servicesHeader}</h2>
                     <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        {t.astrologyPage.servicesSubheader}
                     </p>
                 </div>

                 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                     {services.map((service: any, index: number) => (
                         <div key={index} className="bg-white border border-gray-100 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col group hover:-translate-y-2">
                             
                             {/* Card Image Header */}
                             <div className="h-64 overflow-hidden relative bg-slate-900 flex items-center justify-center">
                                 {index === 0 ? (
                                     // ANIMATED BIRTH CHART CARD HEADER
                                     <div className="relative w-full h-full overflow-hidden bg-[#1a1a2e]">
                                         <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1a1a2e]/90 z-10"></div>
                                          {/* Small Stars */}
                                         {[...Array(15)].map((_, i) => (
                                            <div key={`s-${i}`} className="absolute bg-yellow-200 rounded-full animate-pulse"
                                                style={{ top: `${Math.random()*100}%`, left: `${Math.random()*100}%`, width: '1px', height: '1px' }}></div>
                                         ))}
                                         
                                         {/* Rotating Wheel in Box */}
                                         <div className="absolute top-1/2 left-1/2 w-[280px] h-[280px] border border-amber-500/30 rounded-full astro-wheel-fast">
                                             <div className="absolute inset-0 rounded-full border border-amber-500/10 m-8"></div>
                                             <div className="absolute inset-0 rounded-full border border-amber-500/10 m-16"></div>
                                             {ZODIAC_SYMBOLS.map((sign, i) => (
                                                <div key={i} className="absolute text-xl text-amber-500/70 font-serif top-1/2 left-1/2"
                                                    style={{ transform: `translate(-50%, -50%) rotate(${i * 30}deg) translate(0, -125px) rotate(90deg)` }}>
                                                    {sign}
                                                </div>
                                            ))}
                                            {/* Inner Geometry */}
                                            <div className="absolute top-1/2 left-1/2 w-32 h-32 -translate-x-1/2 -translate-y-1/2 border border-amber-300/20 rotate-45"></div>
                                            <div className="absolute top-1/2 left-1/2 w-32 h-32 -translate-x-1/2 -translate-y-1/2 border border-amber-300/20"></div>
                                         </div>

                                         {/* Center Icon */}
                                         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                                             <div className="bg-amber-500/10 p-3 rounded-full backdrop-blur-md border border-amber-500/30">
                                                <BadgeIcon className="w-8 h-8 text-amber-400" />
                                             </div>
                                         </div>
                                     </div>
                                 ) : (
                                     // Standard Image for other cards
                                     <>
                                        <img src={service.image} alt={service.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                                     </>
                                 )}
                             </div>

                             <div className="p-6 flex flex-col flex-grow relative">
                                 <div className={`absolute -top-8 right-6 w-14 h-14 rounded-full flex items-center justify-center text-white text-2xl shadow-lg border-4 border-white ${index === 0 ? 'bg-amber-600' : 'bg-indigo-600'}`}>
                                     {ZODIAC_SYMBOLS[index]}
                                 </div>
                                 <h3 className="text-xl font-bold text-gray-900 mb-3 font-devanagari pt-2">{service.title}</h3>
                                 <p className="text-gray-600 mb-6 flex-grow leading-relaxed text-sm">
                                     {service.desc}
                                 </p>
                                 <button 
                                    onClick={onBook}
                                    className={`w-full py-3 font-bold rounded-lg transition-all duration-300 ${
                                        index === 0 
                                        ? 'bg-amber-50 text-amber-700 hover:bg-amber-600 hover:text-white' 
                                        : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-600 hover:text-white'
                                    }`}
                                 >
                                     {t.astrologyPage.bookBtn}
                                 </button>
                             </div>
                         </div>
                     ))}
                 </div>
            </div>
        </section>
      </div>
    );
}

// --- Components ---

const Header: React.FC<{ lang: Language; toggleLang: () => void; t: typeof translations['en']; onNavigate: (view: ViewState) => void }> = ({ lang, toggleLang, t, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const navLinks = [
    { name: t.nav.pujas, href: "pujas", view: 'home' },
    { name: t.nav.astrology, href: "astrology", view: 'astrology' }, 
    { name: t.nav.gauSeva, href: "gauseva", view: 'home' },
    { name: t.nav.offerings, href: "offerings", view: 'home' },
    { name: t.nav.specialPuja, href: "special-puja", view: 'home' },
    { name: t.nav.contactUs, href: "contact", view: 'home' },
  ];

  const handleNavClick = (e: React.MouseEvent, link: {href: string, view: string}) => {
    e.preventDefault();
    onNavigate(link.view as ViewState);
    
    if (link.view === 'home') {
        // Wait for render
        setTimeout(() => {
            const el = document.getElementById(link.href);
            if (el) el.scrollIntoView({behavior: 'smooth'});
        }, 100);
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40 font-sans">
      <div className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        
        {/* Left: Logo */}
        <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className="flex items-center space-x-2 flex-shrink-0 mr-4 cursor-pointer">
          <OmLogo className="w-8 h-8 text-saffron-500" />
          <span className="text-xl font-bold text-gray-900 font-devanagari">Sanatan Dham Kendra</span>
        </a>
        
        {/* Center: Nav & Donate - Visible on Desktop, Centered via flex-1 */}
        <nav className="hidden lg:flex items-center justify-center space-x-4 xl:space-x-8 flex-1">
          {navLinks.map(link => (
            <a 
                key={link.name} 
                href={`#${link.href}`} 
                onClick={(e) => handleNavClick(e, link)}
                className="text-gray-700 hover:text-saffron-500 font-medium transition text-sm uppercase tracking-wide whitespace-nowrap cursor-pointer"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#donation" 
            onClick={(e) => { e.preventDefault(); onNavigate('home'); setTimeout(() => document.getElementById('donation')?.scrollIntoView({behavior:'smooth'}), 100); }}
            className="bg-saffron-500 text-white px-5 py-2 rounded hover:bg-saffron-700 transition font-semibold text-sm uppercase tracking-wide whitespace-nowrap shadow-sm"
          >
            {t.nav.donate}
          </a>
        </nav>

        {/* Right: Language & Profile */}
        <div className="flex items-center space-x-4 flex-shrink-0 ml-4">
             {/* Desktop Icons */}
            <div className="hidden lg:flex items-center space-x-6 text-gray-600">
               <button onClick={toggleLang} className="flex items-center space-x-1 hover:text-saffron-500 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                  </svg>
                  <span className="font-medium text-sm">{t.nav.langBtn}</span>
               </button>
               <button className="hover:text-saffron-500 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                  </svg>
               </button>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="lg:hidden flex items-center space-x-3">
               <a href="#donation" onClick={(e) => { e.preventDefault(); onNavigate('home'); setTimeout(() => document.getElementById('donation')?.scrollIntoView({behavior:'smooth'}), 100); }} className="bg-saffron-500 text-white px-3 py-1.5 rounded text-xs font-bold uppercase">{t.nav.donate}</a>
               <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
               </button>
            </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg">
          <div className="px-4 py-2 space-y-2">
             {navLinks.map(link => (
              <a 
                key={link.name} 
                href={`#${link.href}`}
                onClick={(e) => handleNavClick(e, link)}
                className="block py-2 text-gray-700 hover:text-saffron-500 font-medium border-b border-gray-50 last:border-none"
              >
                {link.name}
              </a>
            ))}
             <div className="py-4 flex items-center justify-between text-gray-600 border-t border-gray-100 mt-2">
              <button onClick={toggleLang} className="flex items-center space-x-2"><span className="text-lg">🌐</span> <span>{t.nav.langBtn}</span></button>
              <button className="flex items-center space-x-2"><span>{t.nav.account}</span> <span className="text-lg">👤</span></button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

const HeroSection: React.FC<{ t: typeof translations['en'] }> = ({ t }) => (
  <section className="relative h-[500px] md:h-[600px] flex items-center justify-center bg-gray-800 text-white text-center overflow-hidden">
    <div className="absolute inset-0 bg-gray-900">
        <div className="absolute inset-0 bg-black/40"></div>
    </div>
    
    <div className="relative z-10 container mx-auto px-4">
      <h1 className="text-5xl md:text-6xl font-devanagari mb-6 font-bold text-white drop-shadow-lg">
        {t.hero.title}
      </h1>
      <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-3xl mx-auto leading-relaxed">
        {t.hero.subtitle}
      </p>
      <Button onClick={() => document.getElementById('pujas')?.scrollIntoView({behavior: 'smooth'})} className="text-lg px-8 py-3">
        {t.hero.cta}
      </Button>
    </div>
  </section>
);

const PujasSection: React.FC<{ t: typeof translations['en'], onSeeAll: () => void }> = ({ t, onSeeAll }) => {
    const pujas = [
        {
            title: t.pujas.satyanarayan.title,
            description: t.pujas.satyanarayan.desc,
            image: "https://picsum.photos/seed/satyanarayan/400/300",
            type: PoojaType.SATYANARAYAN
        },
        {
            title: t.pujas.grihaPravesh.title,
            description: t.pujas.grihaPravesh.desc,
            image: "https://picsum.photos/seed/grihapravesh/400/300",
            type: PoojaType.GRIHA_PRAVESH
        },
        {
            title: t.pujas.vahana.title,
            description: t.pujas.vahana.desc,
            image: "https://picsum.photos/seed/vahana/400/300",
            type: PoojaType.VAHANA
        }
    ];

    return (
        <Section id="pujas" className="bg-white">
            <SectionHeader 
                title={t.pujas.header}
                subtitle={t.pujas.subheader} 
            />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {pujas.map((puja, index) => (
                    <PujaCard 
                        key={index} 
                        title={puja.title} 
                        description={puja.description} 
                        image={puja.image}
                        btnText={t.pujas.bookNow}
                        onBook={() => {
                            document.getElementById('booking')?.scrollIntoView({behavior: 'smooth'});
                        }}
                    />
                ))}
            </div>
            <div className="text-center">
                <Button onClick={onSeeAll} className="px-8">{t.pujas.seeAll}</Button>
            </div>
        </Section>
    );
};

const BookingFormSection: React.FC<{ t: typeof translations['en'] }> = ({ t }) => {
  const [formData, setFormData] = useState<Partial<BookingDetails>>({
    poojaType: PoojaType.SATYANARAYAN,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(t.booking.success);
    setFormData({ poojaType: PoojaType.SATYANARAYAN });
  };

  return (
    <Section id="booking" className="bg-saffron-100">
      <SectionHeader title={t.booking.header} subtitle={t.booking.subheader} />
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.booking.name}</label>
              <input 
                type="text" 
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-saffron-500 focus:border-saffron-500"
                onChange={e => setFormData({...formData, name: e.target.value})}
                value={formData.name || ''}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.booking.phone}</label>
              <input 
                type="tel" 
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-saffron-500 focus:border-saffron-500"
                onChange={e => setFormData({...formData, phone: e.target.value})}
                value={formData.phone || ''}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.booking.date}</label>
              <input 
                type="date" 
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-saffron-500 focus:border-saffron-500"
                onChange={e => setFormData({...formData, date: e.target.value})}
                value={formData.date || ''}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.booking.type}</label>
              <select 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-saffron-500 focus:border-saffron-500"
                onChange={e => setFormData({...formData, poojaType: e.target.value as PoojaType})}
                value={formData.poojaType}
              >
                {Object.values(PoojaType).map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t.booking.special}</label>
            <textarea 
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-saffron-500 focus:border-saffron-500"
              onChange={e => setFormData({...formData, specialRequests: e.target.value})}
              value={formData.specialRequests || ''}
            />
          </div>

          <Button type="submit" className="w-full py-3 text-lg">{t.booking.submit}</Button>
        </form>
      </div>
    </Section>
  );
};

// Detailed Modal Component
const TempleDetailsModal: React.FC<{ temple: Temple | null; onClose: () => void; t: typeof translations['en'] }> = ({ temple, onClose, t }) => {
  if (!temple) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white w-full max-w-4xl rounded-xl shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-start bg-gray-50 sticky top-0 z-10">
           <div>
              <h2 className="text-3xl font-bold font-devanagari text-gray-900">{temple.name}</h2>
              <p className="text-gray-600 flex items-center mt-2">
                <LocationIcon className="w-4 h-4 mr-1" /> {temple.location}
              </p>
           </div>
           <button onClick={onClose} className="text-gray-400 hover:text-red-500 transition p-2">
             <CloseIcon className="w-8 h-8" />
           </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 md:p-8 space-y-8">
          
          {/* 3 HQ Images Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-96 md:h-80">
             <div className="md:col-span-2 h-full rounded-lg overflow-hidden shadow-sm">
                <img 
                  src={`https://picsum.photos/seed/${temple.id}_main/1200/800`} 
                  alt={temple.name} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
             </div>
             <div className="flex flex-col gap-4 h-full">
                <div className="h-1/2 rounded-lg overflow-hidden shadow-sm">
                   <img 
                    src={`https://picsum.photos/seed/${temple.id}_2/600/400`} 
                    alt={temple.name} 
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                   />
                </div>
                <div className="h-1/2 rounded-lg overflow-hidden shadow-sm">
                   <img 
                    src={`https://picsum.photos/seed/${temple.id}_3/600/400`} 
                    alt={temple.name} 
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                   />
                </div>
             </div>
          </div>

          {/* Description */}
          <div className="bg-saffron-100/50 p-6 rounded-lg border-l-4 border-saffron-500">
             <p className="text-lg text-gray-800 leading-relaxed italic">"{temple.description}"</p>
          </div>

          {/* History Section */}
          <div>
             <div className="flex items-center mb-4">
                <div className="p-2 bg-golden-light/30 rounded-full text-golden-dark mr-3">
                   <BadgeIcon className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 font-devanagari">{t.temples.details.history}</h3>
             </div>
             <p className="text-gray-700 leading-7 text-lg pl-2 border-l border-gray-200">{temple.history}</p>
          </div>

          {/* Beliefs Section */}
          <div>
             <div className="flex items-center mb-4">
                <div className="p-2 bg-red-100 rounded-full text-red-600 mr-3">
                   <StarIcon className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 font-devanagari">{t.temples.details.beliefs}</h3>
             </div>
             <p className="text-gray-700 leading-7 text-lg pl-2 border-l border-gray-200">{temple.beliefs}</p>
          </div>

        </div>
      </div>
    </div>
  );
};

const TemplesSection: React.FC<{ t: typeof translations['en'] }> = ({ t }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [selectedTemple, setSelectedTemple] = useState<Temple | null>(null);
    const [itemsPerScreen, setItemsPerScreen] = useState(1);

    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth >= 1024) setItemsPerScreen(3);
        else if (window.innerWidth >= 768) setItemsPerScreen(2);
        else setItemsPerScreen(1);
      };
      handleResize(); // Init
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Auto-scroll logic: moves one by one every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((current) => (current + 1) % templesData.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <Section id="temples" className="bg-ivory relative">
            <SectionHeader 
                title={t.temples.header} 
                subtitle={t.temples.subheader}
                icon={<TempleIcon className="w-10 h-10"/>}
            />
            
            {/* Carousel Container */}
            <div className="relative overflow-hidden py-4">
               <div 
                 className="flex transition-transform duration-700 ease-in-out"
                 style={{ transform: `translateX(-${activeIndex * (100 / itemsPerScreen)}%)` }}
               >
                 {templesData.map((temple) => (
                    <div 
                      key={temple.id} 
                      className="flex-shrink-0 px-3"
                      style={{ width: `${100 / itemsPerScreen}%` }}
                    >
                      <div 
                        onClick={() => setSelectedTemple(temple)}
                        className="group relative h-96 rounded-xl overflow-hidden shadow-lg cursor-pointer bg-white hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                      >
                          <img 
                            src={`https://picsum.photos/seed/${temple.id}_cover/400/600`} 
                            alt={temple.name} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          {/* Overlay Gradient */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6 text-white">
                              <h3 className="text-xl font-bold font-devanagari mb-1 group-hover:text-saffron-300 transition-colors">{temple.name}</h3>
                              <p className="text-sm text-gray-300 flex items-center mb-2">
                                  <LocationIcon className="w-4 h-4 mr-1 inline" />
                                  {temple.location}
                              </p>
                              <p className="text-xs text-gray-400 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                                {temple.description}
                              </p>
                              <span className="mt-3 text-xs font-bold uppercase tracking-wider text-saffron-400 border-b border-transparent group-hover:border-saffron-400 inline-block w-max">
                                Click for Details &rarr;
                              </span>
                          </div>
                      </div>
                    </div>
                 ))}
               </div>
            </div>

            {/* Progress / Navigation Indicators */}
            <div className="flex justify-center mt-8">
                <div className="w-64 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-saffron-500 transition-all duration-500" 
                      style={{ width: `${((activeIndex + 1) / templesData.length) * 100}%` }}
                    />
                </div>
            </div>

            {/* Modal */}
            <TempleDetailsModal 
              temple={selectedTemple} 
              onClose={() => setSelectedTemple(null)} 
              t={t} 
            />

        </Section>
    );
};

const GauSevaSection: React.FC<{ t: typeof translations['en'] }> = ({ t }) => (
    <Section id="gauseva" className="bg-white">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden flex flex-col lg:flex-row">
            <div className="lg:w-1/2 h-64 lg:h-auto">
                <img src="https://picsum.photos/seed/indiancow/800/600" alt="Gau Seva" className="w-full h-full object-cover"/>
            </div>
            <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                <h2 className="text-3xl md:text-4xl font-devanagari font-bold text-gray-900 mb-6">{t.gauSeva.title}</h2>
                <p className="text-gray-600 leading-relaxed mb-8">
                    {t.gauSeva.desc}
                </p>
                <div>
                    <Button className="bg-gray-100 hover:bg-gray-200 text-gray-800 border-none px-8">{t.gauSeva.cta}</Button>
                </div>
            </div>
        </div>
    </Section>
);

const OfferingsSection: React.FC<{ t: typeof translations['en'] }> = ({ t }) => (
    <Section id="offerings" className="bg-ivory">
        <SectionHeader 
            title={t.offerings.header}
            subtitle={t.offerings.subheader}
        />
        
        <div className="space-y-12 max-w-5xl mx-auto">
            {/* Vastra Daan */}
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col md:flex-row items-center gap-8">
                <div className="w-full md:w-1/2 h-64 bg-gray-100 rounded-md overflow-hidden relative">
                     <img src="https://picsum.photos/seed/vastra/600/400" alt="Vastra Daan" className="w-full h-full object-cover"/>
                </div>
                <div className="w-full md:w-1/2">
                    <h3 className="text-2xl font-bold font-devanagari text-gray-900 mb-3">{t.offerings.vastra.title}</h3>
                    <p className="text-gray-600 mb-6">{t.offerings.vastra.desc}</p>
                    <Button>{t.offerings.vastra.cta}</Button>
                </div>
            </div>

            {/* Deepam Seva */}
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col md:flex-row items-center gap-8">
                <div className="w-full md:w-1/2 h-64 bg-gray-100 rounded-md overflow-hidden relative">
                     <img src="https://picsum.photos/seed/deepam/600/400" alt="Deepam Seva" className="w-full h-full object-cover"/>
                </div>
                <div className="w-full md:w-1/2">
                    <h3 className="text-2xl font-bold font-devanagari text-gray-900 mb-3">{t.offerings.deepam.title}</h3>
                    <p className="text-gray-600 mb-6">{t.offerings.deepam.desc}</p>
                    <Button>{t.offerings.deepam.cta}</Button>
                </div>
            </div>

             {/* Anna Daan - Updated Layout */}
             <div className="bg-white p-6 rounded-lg shadow-md flex flex-col md:flex-row items-center gap-8">
                <div className="w-full md:w-1/2 h-64 bg-gray-100 rounded-md overflow-hidden relative">
                    <img src="https://picsum.photos/seed/annadaan/600/400" alt="Anna Daan" className="w-full h-full object-cover"/>
                </div>
                <div className="w-full md:w-1/2">
                    <h3 className="text-2xl font-bold font-devanagari text-gray-900 mb-3">{t.offerings.anna.title}</h3>
                    <p className="text-gray-600 mb-6">{t.offerings.anna.desc}</p>
                    <Button>{t.offerings.anna.cta}</Button>
                </div>
            </div>
        </div>
    </Section>
);

const SpecialPujaSection: React.FC<{ t: typeof translations['en'] }> = ({ t }) => (
    <Section id="special-puja" className="bg-white">
        <div className="text-center max-w-3xl mx-auto">
            <div className="text-saffron-500 flex justify-center mb-4">
               <StarIcon className="w-12 h-12" />
            </div>
            <h2 className="text-4xl font-devanagari font-bold text-gray-900 mb-6">{t.special.title}</h2>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                {t.special.desc}
            </p>
            <Button onClick={() => document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'})}>{t.special.cta}</Button>
        </div>
    </Section>
);

const DonationSection: React.FC<{ t: typeof translations['en'] }> = ({ t }) => (
  <Section id="donation" className="bg-gray-50">
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 text-center border border-gray-100">
        <div className="text-saffron-500 flex justify-center mb-4">
          <HeartIcon className="w-12 h-12" />
        </div>
        <h2 className="text-3xl md:text-4xl font-devanagari font-bold text-gray-900 mb-4">{t.donation.title}</h2>
        <p className="text-gray-600 mb-8 leading-relaxed max-w-xl mx-auto">
          {t.donation.desc}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <input 
              type="number" 
              placeholder={t.donation.placeholder} 
              className="w-full sm:w-64 px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-saffron-500 outline-none"
            />
            <Button className="w-full sm:w-auto py-3">{t.donation.cta}</Button>
        </div>
      </div>
    </div>
  </Section>
);

const CertificateSection: React.FC<{ t: typeof translations['en'] }> = ({ t }) => (
  <Section id="certificate" className="bg-ivory">
    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
      {/* Left Text */}
      <div className="lg:w-1/2">
         <div className="text-saffron-500 mb-4">
           <BadgeIcon className="w-10 h-10" />
         </div>
         <h2 className="text-3xl md:text-4xl font-devanagari font-bold text-gray-900 mb-6">
           {t.certificate.title}
         </h2>
         <p className="text-gray-600 text-lg leading-relaxed">
           {t.certificate.desc}
         </p>
      </div>
      
      {/* Right Image - Clean background, white card effect */}
      <div className="lg:w-1/2 w-full">
         <div className="bg-white p-2 rounded-lg shadow-md">
            <div className="aspect-[4/3] bg-gray-50 border-8 border-double border-golden/20 relative flex items-center justify-center p-8">
               {/* Placeholder for certificate visual to match screenshot */}
               <div className="text-center">
                   <div className="border-2 border-golden/40 p-8 inline-block bg-white">
                       <h3 className="font-serif text-golden-dark text-xl mb-2 uppercase tracking-widest border-b border-golden pb-2">Certificate</h3>
                       <p className="text-xs text-gray-400 mt-2">Sanatan Dham Kendra</p>
                   </div>
                   <p className="mt-4 text-sm text-gray-500 italic">{t.certificate.imageAlt}</p>
               </div>
            </div>
         </div>
      </div>
    </div>
  </Section>
);

const Footer: React.FC<{ t: typeof translations['en']; onNavigate: (view: ViewState) => void }> = ({ t, onNavigate }) => {
  
  const handlePrivacyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate('privacy');
  };

  const handleRefundClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate('refund');
  };

  const handleLinkClick = (e: React.MouseEvent, id: string, view: ViewState = 'home') => {
    e.preventDefault();
    onNavigate(view);
    if(view === 'home') {
        setTimeout(() => {
            const el = document.getElementById(id);
            if (el) el.scrollIntoView({behavior: 'smooth'});
        }, 100);
    }
  };

  return (
  <footer id="contact" className="bg-white border-t border-gray-100 pt-16 pb-8 font-sans text-gray-600">
    <div className="container mx-auto px-4 md:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        {/* Col 1: Brand */}
        <div>
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className="flex items-center space-x-2 mb-6 cursor-pointer">
            <OmLogo className="w-8 h-8 text-saffron-500" />
            <span className="text-xl font-bold text-gray-900 font-devanagari">Sanatan Dham Kendra</span>
          </a>
          <p className="leading-relaxed text-sm mb-6">
            {t.footer.desc}
          </p>
        </div>

        {/* Col 2: Quick Links */}
        <div>
           <h3 className="text-gray-900 font-bold mb-6 font-devanagari text-lg">{t.footer.quickLinks}</h3>
           <ul className="space-y-3 text-sm">
             <li><a href="#pujas" onClick={(e) => handleLinkClick(e, 'pujas')} className="hover:text-saffron-500 transition">{t.nav.pujas}</a></li>
             <li><a href="#astrology" onClick={(e) => handleLinkClick(e, 'astrology', 'astrology')} className="hover:text-saffron-500 transition">{t.nav.astrology}</a></li>
             <li><a href="#gauseva" onClick={(e) => handleLinkClick(e, 'gauseva')} className="hover:text-saffron-500 transition">{t.nav.gauSeva}</a></li>
             <li><a href="#offerings" onClick={(e) => handleLinkClick(e, 'offerings')} className="hover:text-saffron-500 transition">{t.nav.offerings}</a></li>
           </ul>
        </div>

        {/* Col 3: Legal */}
        <div>
           <h3 className="text-gray-900 font-bold mb-6 font-devanagari text-lg">{t.footer.legal}</h3>
           <ul className="space-y-3 text-sm">
             <li>
                <a href="#" onClick={handlePrivacyClick} className="hover:text-saffron-500 transition cursor-pointer">
                    {t.footer.privacy}
                </a>
             </li>
             <li><a href="#" className="hover:text-saffron-500 transition">{t.footer.terms}</a></li>
             <li>
                <a href="#" onClick={handleRefundClick} className="hover:text-saffron-500 transition cursor-pointer">
                    {t.footer.refund}
                </a>
             </li>
             <li><a href="#contact" onClick={(e) => handleLinkClick(e, 'contact')} className="hover:text-saffron-500 transition">{t.footer.contact}</a></li>
           </ul>
        </div>

        {/* Col 4: Follow & Contact */}
        <div>
           <h3 className="text-gray-900 font-bold mb-6 font-devanagari text-lg">{t.footer.follow}</h3>
           <div className="flex space-x-4 mb-6">
              <a href="#" className="text-gray-400 hover:text-saffron-500 transition"><TwitterIcon className="w-5 h-5"/></a>
              <a href="#" className="text-gray-400 hover:text-saffron-500 transition"><FacebookIcon className="w-5 h-5"/></a>
              <a href="#" className="text-gray-400 hover:text-saffron-500 transition"><InstagramIcon className="w-5 h-5"/></a>
           </div>
           <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-3">
                 <LocationIcon className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0"/>
                 <span>{t.footer.address}</span>
              </li>
              <li className="flex items-center space-x-3">
                 <PhoneIcon className="w-5 h-5 text-gray-400 flex-shrink-0"/>
                 <span>+91 900 900 9009</span>
              </li>
              <li className="flex items-center space-x-3">
                 <EmailIcon className="w-5 h-5 text-gray-400 flex-shrink-0"/>
                 <span>contact@sanatandham.com</span>
              </li>
           </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-100 pt-8 text-center text-sm text-gray-500">
        <p>{t.footer.copyright}</p>
      </div>
    </div>
  </footer>
  );
};

// --- Main App ---
export default function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const t = translations[language];

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'hi' : 'en');
  };

  const navigateTo = (view: ViewState) => {
      setCurrentView(view);
      window.scrollTo(0, 0);
  };
  
  const handleBookFromList = () => {
      setCurrentView('home');
      setTimeout(() => {
         document.getElementById('booking')?.scrollIntoView({behavior: 'smooth'});
      }, 100);
  };

  return (
    <div className="bg-gray-50 font-sans text-gray-900">
      <Header lang={language} toggleLang={toggleLanguage} t={t} onNavigate={navigateTo} />
      <main>
        {currentView === 'home' && (
            <>
                <HeroSection t={t} />
                <PujasSection t={t} onSeeAll={() => navigateTo('upcoming')} />
                <BookingFormSection t={t} />
                <TemplesSection t={t} />
                <GauSevaSection t={t} />
                <OfferingsSection t={t} />
                <SpecialPujaSection t={t} />
                <DonationSection t={t} />
                <CertificateSection t={t} />
            </>
        )}
        {currentView === 'privacy' && <PrivacyPolicyView t={t} />}
        {currentView === 'refund' && <RefundPolicyView t={t} />}
        {currentView === 'upcoming' && <UpcomingPujasView t={t} onBook={handleBookFromList} />}
        {currentView === 'astrology' && <AstrologyView t={t} onBook={handleBookFromList} />}
      </main>
      <Footer t={t} onNavigate={navigateTo} />
      
      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/919876543210" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all transform hover:scale-110 z-50"
        aria-label="Chat on WhatsApp"
      >
        <WhatsAppIcon className="w-8 h-8" />
      </a>
    </div>
  );
}
