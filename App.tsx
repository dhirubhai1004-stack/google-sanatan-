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
      girlMarriage: "Marriage Support",
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
    paymentCard: {
        title: "Donation & Payments",
        subtitle: "Support sacred pujas, charity work, and Seva",
        bankTransfer: "Bank Transfer",
        accountNo: "Account No",
        upi: "UPI Payment",
        upiDesc: "Scan the QR code to donate securely via any UPI app like GPay, PhonePe, Paytm.",
        upiId: "UPI ID",
        payOnline: "Pay Online"
    },
    gauSevaPage: {
        heroTitle: "Gau Seva & Donation",
        heroSubtitle: "Serve the sacred Gaumata and earn divine blessings.",
        title: "Cow Donation (Gau Daan)",
        description: "Cow donation is considered one of the highest forms of donation in Hinduism. Through our organization, you can donate a healthy, gentle, and good-natured cow. The entire process of donation—selection of the cow, worship, rituals, and handover—is done according to scriptures.",
        benefitsTitle: "Benefits of Cow Donation:",
        benefits: [
          "Ancestral Peace (Pitra Tripti)",
          "Auspicious results, merit and peace",
          "Happiness and prosperity in the family",
          "Relief from planetary defects (Doshas)"
        ],
        fodderTitle: "Importance of Fodder Donation:",
        fodderPoints: [
          "Feeding a hungry cow is considered extremely meritorious.",
          "Increases peace, mental balance, and positive energy in life.",
          "Beneficial in planetary defects, especially Venus and Ketu."
        ],
        processTitle: "Gau-Puja and Ritual Process",
        processSteps: ["Bathing", "Decoration", "Roli, Turmeric", "Chanting", "Lamp Worship", "Donation Pledge"],
        contributionTitle: "How can you contribute?",
        contributionOptions: [
          { title: "1. Donate a Full Cow", desc: "Selection of a healthy cow and ritualistic donation in your name." },
          { title: "2. Gau-Seva / Monthly Fodder", desc: "Contribute to the fodder for one cow or the whole Gaushala for a month." },
          { title: "3. One-time Fodder Donation", desc: "Donate fodder, jaggery, grain on a special day or occasion." },
          { title: "4. Medical / Care Donation", desc: "Support for medicines and care of sick or injured cows." }
        ]
    },
    girlMarriagePage: {
        heroTitle: "Girl Marriage Support (Kanya Daan)",
        heroSubtitle: "Every daughter deserves to start her life with dignity and self-respect.",
        title: "Marriage Support for Needy Girls",
        description: "Organizing the marriage of daughters from poor families is often difficult due to financial reasons. Our organization understands this social challenge and helps those families with dignity and transparency so that the daughter's life can begin with respect.",
        whyTitle: "Why help?",
        whyPoints: [
            "Every daughter has the right to start life with respect.",
            "Financial aid reduces the burden on families.",
            "This service promotes equality and women's empowerment.",
            "Donors receive social merit and mental satisfaction."
        ],
        whatTitle: "What we provide",
        whatPoints: [
            "Financial Assistance - For essential wedding expenses.",
            "Clothes & Jewelry - Dignified attire for the bride.",
            "Rituals & Puja - Vedic ceremony and Priest arrangement.",
            "Ration/Essentials - Post-wedding household support."
        ],
        processTitle: "Process (How it works)",
        processSteps: [
            { t: "1. Application", d: "Request from family or village center." },
            { t: "2. Verification", d: "Team checks financial status & eligibility." },
            { t: "3. Package", d: "Support package decided (Basic/Standard)." },
            { t: "4. Ritual & Distribution", d: "Respectful transfer of aid on date." },
            { t: "5. Transparency", d: "Photos/Proof provided to donor." }
        ],
        contributionTitle: "How you can help",
        contributionOptions: [
            { title: "1. Financial Donation", desc: "One-time or Monthly support via Bank/UPI." },
            { title: "2. Material Donation", desc: "Donate Sarees, Utensils, or Ration for the wedding." },
            { title: "3. Full Sponsorship", desc: "Sponsor the entire wedding of one girl." },
            { title: "4. Volunteering", desc: "Help in verification, distribution or organizing." }
        ],
        emotionalNote: "A small help can completely change a daughter's life—giving her a chance to live with self-respect. Your donation is not just material, but a gift of a future.",
        cta: "Support a Marriage"
    },
    vastraPage: {
        heroTitle: "Vastra Daan",
        heroSubtitle: "Donate clothes, restore dignity.",
        quote: "\"Vastra Daan (Clothes Donation) is considered a highly meritorious service in Hinduism. Giving clothes to a needy person is not just charity—it is a medium to provide dignity, protection, and respect.\"",
        itemsTitle: "What clothes can you donate?",
        items: [
            "New Clothes",
            "Usable Clothes in Good Condition",
            "Warm Clothes (Sweaters, Jackets, Blankets)",
            "Bed sheets, Shawls, Quilts",
            "School Uniforms"
        ],
        note: "Note: We do not accept torn, damaged or dirty clothes — to maintain the dignity of the donation.",
        importanceTitle: "Importance of Vastra Daan",
        importanceSubtitle: "Clothes donation is considered extremely auspicious in Vedas and scriptures.",
        benefits: [
            "Positive energy in life",
            "Peace of mind and financial improvement",
            "Relief from planetary defects",
            "Happiness and prosperity in the family"
        ],
        processTitle: "Process of Vastra Daan",
        processSteps: [
            { t: "1. Preparation", d: "Prepare new or clean usable clothes." },
            { t: "2. Sorting & Packing", d: "Sorted by kids, women, and men." },
            { t: "3. Distribution", d: "Distributed to needy families & ashrams." },
            { t: "4. Blessings", d: "Blessings for health & prosperity." }
        ],
        contributionTitle: "How you can contribute?",
        contributionOptions: [
            { title: "1. Direct Clothes Donation", desc: "Your donated clothes will be delivered directly to the needy." },
            { title: "2. Buy New & Donate", desc: "Donate new clothes purchased through the temple/ashram." },
            { title: "3. Blanket / Woolens", desc: "The most useful service during winter months." },
            { title: "4. Financial Support", desc: "Donate money to purchase clothes in your name." }
        ]
    },
    annaPage: {
        heroTitle: "Anna Daan (Food Donation)",
        heroSubtitle: "\"Anadhanam Paramam Dhanam\" - Food donation is the supreme charity.",
        intro: "Anna Daan is considered the greatest and life-giving donation in Hinduism. Giving food to a hungry person is not just charity—it is giving life, hope, and strength.",
        itemsTitle: "What food can you donate?",
        items: [
            "Rice, Wheat, Pulses, Flour, Oil, Spices",
            "Sugar, Salt, Jaggery",
            "Cooked Food (Khichdi, Sabzi, Puri)",
            "Special Food Kits for Festivals"
        ],
        importanceTitle: "Importance of Anna Daan",
        benefits: [
            "Feeds the hungry",
            "Brings positive energy into your life",
            "Provides relief in planetary defects",
            "Brings ancestral peace (Pitra Tripti)"
        ],
        contributionTitle: "How can you contribute?",
        contributionOptions: [
            { title: "1. Direct Grain / Ration Donation", desc: "Delivered immediately to the needy." },
            { title: "2. Cooked Food Donation", desc: "Donate meals on auspicious occasions." },
            { title: "3. Monthly Ration Donation", desc: "Sponsor a family's ration for a month." },
            { title: "4. Financial Contribution", desc: "Donate money to purchase food in your name." }
        ]
    },
    deepamPage: {
        heroTitle: "Deepam Seva",
        heroSubtitle: "Dispelling darkness, inviting prosperity.",
        intro: "Deepam Seva is a sacred tradition—where lamps are lit to remember deities and seek blessings. It symbolizes the removal of darkness, positive energy, and the prosperity of the family.",
        importanceTitle: "Importance of Deepam Seva",
        importancePoints: [
            "Lighting a lamp symbolizes removing the darkness of ignorance.",
            "It is an act that brings auspiciousness, prosperity, and peace.",
            "Lamp donation has special significance on birthdays and anniversaries.",
            "Scriptures speak of mental peace and spiritual progress."
        ],
        typesTitle: "How can you contribute?",
        types: [
            { title: "1. Single Lamp Seva", desc: "In the name of a specific person/family." },
            { title: "2. Weekly/Monthly Seva", desc: "Regular lighting option for consistent blessings." },
            { title: "3. Special Occasion Seva", desc: "Birthdays, Weddings, Festivals." },
            { title: "4. Online Service (Proxy)", desc: "Light a lamp in your name even from afar." }
        ],
        processTitle: "Process (How it works)",
        processSteps: [
            { t: "1. Choose Service", d: "Single, Monthly or Special" },
            { t: "2. Provide Details", d: "Name, Intention and Date" },
            { t: "3. Contribution", d: "Cash or Online" },
            { t: "4. Ritual & Proof", d: "Chanting, Photo/Video & Blessings" }
        ],
        note: "Note: We use only pure ingredients (Ghee/Oil) and maintain transparency in rituals."
    },
    guptDaanPage: {
        heroTitle: "Gupt Daan (Secret Donation)",
        heroSubtitle: "\"Yatkarma guptam kurute, taddharmam paramam smritam\" - The charity which is kept secret is considered the highest.",
        title: "What is Gupt Daan?",
        intro: "Gupt Daan is a donation made silently, without any show, publicity, or revealing of one's name. In this, the donor does not seek credit, identity, or fame—the donation is made solely for the spirit of service and acquiring merit.",
        whyTitle: "Why perform Gupt Daan?",
        whyPoints: [
            "Mental peace and contentment",
            "Liberation from sins and negative karma",
            "Reduces ego and brings humility",
            "Considered the highest form of merit in scriptures"
        ],
        typesTitle: "Types of donations that can be done secretly",
        types: ["Anna Daan (Food)", "Vastra Daan (Clothes)", "Gau Seva (Cow Service)", "Education Support", "Medical Aid", "Marriage Support"],
        privacyTitle: "The Special Nature of Gupt Daan",
        privacyPoints: [
            "The donor never reveals their name.",
            "The organization keeps the donor's identity strictly confidential.",
            "The donation is considered to be made directly to the Divine."
        ],
        significanceTitle: "Scriptural Significance",
        significance: "According to the Gita and Puranas, Gupt Daan reduces negative karma, removes planetary defects (Graha Dosha), purifies the mind, and brings prosperity and peace to the family."
    },
    privacyPolicy: {
        title: "Privacy Policy",
        content: [
            { heading: "1. Information We Collect", text: "We may collect personal information such as your name, email, phone number, and payment details when you book a puja or make a donation." },
            { heading: "2. How We Use Information", text: "We use your information to process transactions, send booking confirmations, and provide customer support." },
            { heading: "3. Data Security", text: "We implement security measures to maintain the safety of your personal information." }
        ]
    },
    refundPolicy: {
        title: "Return and Refund Policy",
        intro: "We want you to be completely satisfied with our services.",
        content: [
            { heading: "1. Cancellations", text: "You may cancel a puja booking up to 48 hours before the scheduled time for a full refund." },
            { heading: "2. Refunds", text: "Refunds will be processed within 5-7 business days to the original payment method." },
            { heading: "3. Donations", text: "Donations are generally non-refundable. However, if you made an error in the amount, please contact us immediately." }
        ]
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
    girlMarriage: {
        title: "Girl Marriage Support",
        desc: "Support the marriage of daughters from underprivileged families. Your contribution helps provide dignity, financial aid, and essential items for a respectful beginning to their new life.",
        cta: "Support a Marriage"
    },
    guptDaan: {
        title: "Gupt Daan (Secret Donation)",
        desc: "Gupt Daan is the highest form of charity where the donor remains anonymous. It is done solely for spiritual merit, free from ego and publicity.",
        cta: "Donate Secretly"
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
      girlMarriage: "कन्या दान",
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
    paymentCard: {
        title: "दान एवं भुगतान (Donation & Payments)",
        subtitle: "पवित्र पूजा, धर्मार्थ कार्यों और सेवा का समर्थन करें",
        bankTransfer: "बैंक हस्तांतरण",
        accountNo: "खाता संख्या",
        upi: "UPI भुगतान",
        upiDesc: "GPay, PhonePe, Paytm जैसे किसी भी UPI ऐप के माध्यम से सुरक्षित रूप से दान करने के लिए QR कोड स्कैन करें।",
        upiId: "UPI आईडी",
        payOnline: "ऑनलाइन भुगतान करें"
    },
    gauSevaPage: {
        heroTitle: "गौ सेवा और दान",
        heroSubtitle: "पवित्र गौमाता की सेवा करें और दैवीय आशीर्वाद प्राप्त करें।",
        title: "गाय दान (Cow Donation)",
        description: "गाय दान हिन्दू धर्म में सबसे श्रेष्ठ दानों में माना गया है। आप हमारी संस्था के माध्यम से एक स्वस्थ, सौम्य और अच्छे स्वभाव वाली गाय दान कर सकते हैं। दान की पूरी प्रक्रिया—गाय का चयन, पूजा, अनुष्ठान और सुपुर्दगी—शास्त्र अनुसार की जाती है।",
        benefitsTitle: "गाय दान से मिलते हैं:",
        benefits: [
          "पितृ तृप्ति",
          "शुभ फल, पुण्य और शांति",
          "परिवार में सुख-समृद्धि",
          "गृह दोष और ग्रह बाधाओं में राहत"
        ],
        fodderTitle: "चारा दान का महत्व:",
        fodderPoints: [
          "भूखी गाय को भोजन कराना अत्यंत पुण्यदायी माना गया है",
          "जीवन में शांति, मानसिक संतुलन और सकारात्मक ऊर्जा बढ़ती है",
          "ग्रह दोषों में भी लाभकारी माना गया है, विशेषतः शुक्र और केतु दोष"
        ],
        processTitle: "गौ-पूजा और अनुष्ठान प्रक्रिया",
        processSteps: ["स्नान", "श्रृंगार", "रोली, हल्दी", "मंत्रोच्चार", "दीप-पूजन", "दान संकल्प"],
        contributionTitle: "आप कैसे योगदान कर सकते हैं?",
        contributionOptions: [
          { title: "1. पूरी गाय दान करना", desc: "आपके नाम से एक स्वस्थ गाय चयन की जाएगी और विधिपूर्वक दान करवाई जाएगी।" },
          { title: "2. गौ-सेवा / मासिक चारा-दान", desc: "आप किसी एक गाय या पूरी गौशाला के महीने भर के चारे में योगदान दे सकते हैं।" },
          { title: "3. एक-बार का चारा दान", desc: "दिन, सप्ताह या विशेष अवसर पर चारा, गुड़, दाना, भूसा का दान।" },
          { title: "4. गाय के चिकित्सा / देखभाल दान", desc: "आप बीमार या घायल गायों की दवाइयों और देखभाल हेतु भी सहयोग कर सकते हैं।" }
        ]
    },
    girlMarriagePage: {
        heroTitle: "गरीब घर की लड़कियों की शादी (कन्या दान)",
        heroSubtitle: "हर बेटी को सम्मान और स्वाभिमान के साथ जीवन शुरू करने का अधिकार है।",
        title: "सामाजिक सहायता — शादी सहयोग",
        description: "गरीब परिवारों की बेटियों की शादी करना कई बार आर्थिक वजहों से मुश्किल हो जाता है। हमारी संस्था इस सामाजिक चुनौती को समझती है — और गरिमा के साथ, पारदर्शिता के साथ उन परिवारों की मदद करती है ताकि बेटी का जीवन सम्मानपूर्वक शुरू हो सके।",
        whyTitle: "क्यों मदद करें",
        whyPoints: [
            "हर बेटी को सम्मान और स्वाभिमान के साथ जीवन शुरू करने का अधिकार है।",
            "आर्थिक मदद से परिवारों पर बोझ कम होता है और बाल-विवाह जैसी समस्याओं से बचाव होता है।",
            "यह सेवा समाज में बराबरी, शिक्षा और महिलाओं के सशक्तिकरण को बढ़ावा देती है।",
            "दाता को सामाजिक पुण्य और मानसिक संतोष मिलता है।"
        ],
        whatTitle: "हम क्या-क्या मदद करते हैं",
        whatPoints: [
            "वित्तीय सहायता — शादी के अनिवार्य खर्चों के लिए तय सहयोग।",
            "वस्त्र एवं आभूषण (हलके) — दुल्हन के लिए सादा और सम्मानजनक पोशाक, चादरें।",
            "पूजा-अनुष्ठान का प्रबंध — वैदिक रीति से सरलीकृत समारोह, पंडितजी की सुविधा।",
            "राशन/दरकार समान — विवाह के बाद शुरुआती घरेलू सामान या राशन सहायता।"
        ],
        processTitle: "प्रक्रिया",
        processSteps: [
            { t: "1. आवेदन / सुझाव", d: "गांव/केंद्र से अनुरोध आते हैं।" },
            { t: "2. जांच और सत्यापन", d: "घर की आर्थिक स्थिति व पात्रता की जाँच।" },
            { t: "3. सहमति व पैकेज", d: "परिवार और संस्था के बीच पैकेज निर्धारण।" },
            { t: "4. अनुष्ठान/वितरण", d: "तय तिथि पर सम्मानपूर्वक वितरण।" },
            { t: "5. ट्रांसपरेंसी", d: "फोटो/प्रमाण और रिपोर्ट दाता को दी जाती है।" }
        ],
        contributionTitle: "आप कैसे सहयोग कर सकते हैं",
        contributionOptions: [
            { title: "1. आर्थिक दान", desc: "सीधे बैंक/UPI/ऑनलाइन एकमुश्त या मासिक।" },
            { title: "2. वस्त्र/सामान दान", desc: "विवाह के लिये साड़ी, पोशाक, बर्तन या राशन।" },
            { title: "3. स्पॉन्सरशिप", desc: "किसी एक परिवार/लड़की की पूरी शादी स्पॉन्सर करें।" },
            { title: "4. स्वयंसेवी (Volunteering)", desc: "सत्यापन, वितरण या आयोजन में हाथ बटाएँ।" }
        ],
        emotionalNote: "एक छोटी सी मदद किसी बेटी की ज़िंदगी को पूरी तरह बदल सकती है — शिक्षा जारी रखने, आत्मसम्मान बनाने और समाज में सम्मान के साथ जीने का मौका। आपका दान सिर्फ सामग्री नहीं, बल्कि भविष्य का उपहार है।",
        cta: "शादी में सहयोग करें"
    },
    vastraPage: {
        heroTitle: "वस्त्र दान",
        heroSubtitle: "वस्त्र दान करें, गरिमा लौटाएं।",
        quote: "\"वस्त्र दान हिन्दू धर्म में अत्यंत पुण्यकारी सेवा मानी गई है। एक जरूरतमंद व्यक्ति को वस्त्र देना केवल दान नहीं — गरिमा, संरक्षण और सम्मान देने का माध्यम है।\"",
        itemsTitle: "आप क्या-क्या वस्त्र दान कर सकते हैं?",
        items: [
            "नए कपड़े",
            "अच्छी स्थिति वाले उपयोगयोग्य कपड़े",
            "गर्म कपड़े (स्वेटर, जैकेट, कंबल)",
            "चादरें, शॉल, रजाई",
            "विद्यालय के लिए यूनिफॉर्म"
        ],
        note: "नोट: हम फटे, खराब या गंदे कपड़े स्वीकार नहीं करते — ताकि दान का सम्मान बना रहे।",
        importanceTitle: "वस्त्र दान का महत्व",
        importanceSubtitle: "वेदों और शास्त्रों में वस्त्र दान को अत्यंत शुभ माना गया है।",
        benefits: [
            "जीवन में सकारात्मक ऊर्जा",
            "मन की शांति और आर्थिक सुधार",
            "ग्रह दोषों से राहत",
            "परिवार में सुख–समृद्धि"
        ],
        processTitle: "वस्त्र दान की प्रक्रिया",
        processSteps: [
            { t: "1. वस्त्र तैयार करना", d: "नए या साफ एवं उपयोगयोग्य कपड़े" },
            { t: "2. छंटाई व पैकिंग", d: "बच्चों, महिलाओं, पुरुषों के अनुसार अलग" },
            { t: "3. दान वितरण", d: "जरूरतमंदों व आश्रमों में वितरण" },
            { t: "4. आशीर्वाद", d: "सुख-समृद्धि का आशीर्वाद" }
        ],
        contributionTitle: "आप कैसे योगदान कर सकते हैं?",
        contributionOptions: [
            { title: "1. सीधे वस्त्र दान करें", desc: "आपके द्वारा दिए गए वस्त्र जरूरतमंदों तक पहुँचाए जाएंगे।" },
            { title: "2. नए वस्त्र खरीदकर दान करें", desc: "मंदिर/आश्रम के माध्यम से खरीदकर दान किए जा सकते हैं।" },
            { title: "3. कंबल / ऊनी वस्त्र दान", desc: "सर्दियों में सबसे अधिक उपयोगी सेवा मानी जाती है।" },
            { title: "4. आर्थिक सहयोग", desc: "आप चाहें तो राशि देकर भी वस्त्र खरीदवाकर आपके नाम से दान करवा सकते हैं।" }
        ]
    },
    annaPage: {
        heroTitle: "अन्न दान",
        heroSubtitle: "\"अन्नदानं परमं दानम्\" - अन्न दान ही महादान है।",
        intro: "अन्न दान हिन्दू धर्म में सबसे महान और जीवनदाता दान माना गया है। एक भूखे व्यक्ति को भोजन देना केवल दान नहीं — जीवन, आशा और शक्ति देने का माध्यम है।",
        itemsTitle: "आप क्या-क्या अन्न दान कर सकते हैं?",
        items: [
            "चावल, गेहूं, दालें, आटा, तेल, मसाले",
            "चीनी, नमक, गुड़",
            "तैयार भोजन (खिचड़ी, सब्ज़ी, पूड़ी, कढ़ी आदि)",
            "त्योहारों के लिए विशेष भोजन किट"
        ],
        importanceTitle: "अन्न दान का महत्व",
        benefits: [
            "भूखे को भोजन मिलता है",
            "आपके जीवन में सकारात्मक ऊर्जा आती है",
            "ग्रह दोषों में राहत मिलती है",
            "पितृ तृप्ति भी मानी गई है"
        ],
        contributionTitle: "आप कैसे योगदान कर सकते हैं?",
        contributionOptions: [
            { title: "1. सीधे अनाज / राशन दान", desc: "तुरंत जरूरतमंदों तक पहुँचाया जाएगा।" },
            { title: "2. तैयार भोजन दान", desc: "शुभ कार्य पर भोजन दान।" },
            { title: "3. मासिक राशन दान", desc: "एक परिवार का पूरा महीने का राशन।" },
            { title: "4. आर्थिक सहयोग", desc: "राशि देकर अन्न खरीदवाकर दान।" }
        ]
    },
    deepamPage: {
        heroTitle: "दीपम सेवा",
        heroSubtitle: "अंधकार मिटाएं, समृद्धि को आमंत्रित करें।",
        intro: "दीपम् सेवा एक पवित्र परंपरा है — जहाँ दीपक जलाकर देवी-देवताओं का स्मरण और आशीर्वाद माँगा जाता है। यह सेवा न केवल रोशनी पहुँचाती है बल्कि अंधकार से मुक्ति, सकारात्मक ऊर्जा और घर-परिवार की समृद्धि का प्रतीक भी है।",
        importanceTitle: "दीपम् सेवा का महत्व",
        importancePoints: [
            "दीपक जलाना अज्ञान के अंधकार को दूर करने का प्रतीक है।",
            "यह शुभता, समृद्धि और शांति लाने वाला कृत्य माना गया है।",
            "विशेष अवसरों (जन्मदिन, पुण्यतिथियाँ) पर दीपदान का विशेष महत्व है।",
            "शास्त्रों में दीपदान से मानसिक शांति और शुभ फल की बात कही गई है।"
        ],
        typesTitle: "आप कैसे योगदान कर सकते हैं?",
        types: [
            { title: "1. एकल दीप सेवा", desc: "किसी विशेष व्यक्ति/परिवार के नाम पर।" },
            { title: "2. सप्ताहिक/मासिक दीप सेवा", desc: "लगातार नियमित रूप से दीप जलवाने का विकल्प।" },
            { title: "3. विशेष अवसर दीप सेवा", desc: "जन्मदिन, पुण्यतिथि, विवाह या त्योहार के अवसर पर।" },
            { title: "4. ऑनलाइन् सेवा (प्रातिनिधिक)", desc: "आप दूर हों तो भी आपके नाम से दीप जलाया जाएगा।" }
        ],
        processTitle: "प्रक्रिया",
        processSteps: [
            { t: "1. सेवा चुनें", d: "एकल, मासिक या विशेष" },
            { t: "2. जानकारी दें", d: "नाम, इरादा और तिथि" },
            { t: "3. योगदान", d: "नगद या ऑनलाइन" },
            { t: "4. अनुष्ठान & प्रमाण", d: "मंत्रोच्चार, फोटो/वीडियो व आशीर्वाद" }
        ],
        note: "नोट: हम केवल शुद्ध सामग्री (घी/तेल और साफ दीये) का उपयोग करते हैं और पूजा विधियों में पारदर्शिता रखते हैं।"
    },
    guptDaanPage: {
        heroTitle: "गुप्त दान (Gupt Daan)",
        heroSubtitle: "\"यत्कर्म गुप्तं कुरुते, तद्धर्मं परमं स्मृतम्\" - जो दान गुप्त रखा जाए वह सबसे श्रेष्ठ माना गया है।",
        title: "गुप्त दान क्या होता है?",
        intro: "गुप्त दान वह दान होता है जिसे बिना किसी दिखावे, प्रचार या नाम बताए चुपचाप किया जाता है। इसमें दाता अपना नाम, पहचान या श्रेय नहीं लेता — दान केवल सच्ची भावना, सेवा और पुण्य के लिए किया जाता है।",
        whyTitle: "गुप्त दान क्यों किया जाता है?",
        whyPoints: [
            "मन की शांति और संतोष",
            "पापों से मुक्ति और अहंकार का नाश",
            "ईश्वर की कृपा और आशीर्वाद",
            "शास्त्रों में सबसे उच्च कोटि का दान"
        ],
        typesTitle: "किस प्रकार के दान गुप्त रूप से किए जा सकते हैं?",
        types: ["अन्न दान", "वस्त्र दान", "गौ सेवा", "शिक्षा सहायता", "दवाइयाँ / उपचार", "गरीब की शादी में सहयोग"],
        privacyTitle: "गुप्त दान की खास बात",
        privacyPoints: [
            "दाता अपना नाम नहीं बताता।",
            "संस्था भी दाता की पहचान को गोपनीय रखती है।",
            "दान केवल ईश्वर के नाम पर माना जाता है।"
        ],
        significanceTitle: "शास्त्रों में महत्व",
        significance: "गीता और पुराणों के अनुसार, गुप्त दान करने से नकारात्मक कर्म कम होते हैं, ग्रह दोष दूर होते हैं, मन में पवित्रता आती है और परिवार में शांति और समृद्धि बढ़ती है।"
    },
    privacyPolicy: {
        title: "गोपनीयता नीति",
        content: [
            { heading: "1. जानकारी जो हम एकत्र करते हैं", text: "जब आप पूजा बुक करते हैं या दान करते हैं तो हम आपका नाम, ईमेल, फोन नंबर और भुगतान विवरण जैसी व्यक्तिगत जानकारी एकत्र कर सकते हैं।" },
            { heading: "2. हम जानकारी का उपयोग कैसे करते हैं", text: "हम आपकी जानकारी का उपयोग लेनदेन को संसाधित करने, बुकिंग पुष्टिकरण भेजने और ग्राहक सहायता प्रदान करने के लिए करते हैं।" },
            { heading: "3. डेटा सुरक्षा", text: "हम आपकी व्यक्तिगत जानकारी की सुरक्षा बनाए रखने के लिए सुरक्षा उपाय लागू करते हैं।" }
        ]
    },
    refundPolicy: {
        title: "वापसी और धनवापसी नीति",
        intro: "हम चाहते हैं कि आप हमारी सेवाओं से पूरी तरह संतुष्ट हों।",
        content: [
            { heading: "1. रद्दीकरण", text: "आप पूर्ण धनवापसी के लिए निर्धारित समय से 48 घंटे पहले तक पूजा बुकिंग रद्द कर सकते हैं।" },
            { heading: "2. धनवापसी", text: "धनवापसी 5-7 व्यावसायिक दिनों के भीतर मूल भुगतान विधि में संसाधित की जाएगी।" },
            { heading: "3. दान", text: "दान आम तौर पर गैर-वापसी योग्य होते हैं। हालाँकि, यदि आपने राशि में कोई त्रुटि की है, तो कृपया हमसे तुरंत संपर्क करें।" }
        ]
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
    girlMarriage: {
        title: "कन्या दान (शादी सहयोग)",
        desc: "गरीब परिवारों की बेटियों की शादी में सहयोग करें। आपका योगदान उनके नए जीवन की सम्मानजनक शुरुआत के लिए गरिमा, आर्थिक सहायता और आवश्यक वस्तुएं प्रदान करने में मदद करता है।",
        cta: "शादी में सहयोग करें"
    },
    guptDaan: {
        title: "गुप्त दान",
        desc: "गुप्त दान सबसे श्रेष्ठ दान है जहाँ दाता की पहचान गोपनीय रहती है। यह बिना किसी दिखावे के केवल आत्म-कल्याण और पुण्य के लिए किया जाता है।",
        cta: "गुप्त दान करें"
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
type ViewState = 'home' | 'privacy' | 'refund' | 'upcoming' | 'astrology' | 'gauseva' | 'vastra' | 'anna' | 'deepam' | 'girlMarriage' | 'guptDaan';

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
  // ... (Abbreviated other temples for brevity, keeping logic same)
  ...Array.from({ length: 49 }).map((_, i) => ({
    id: `temple-${i + 2}`,
    name: `Sacred Temple ${i + 2}`,
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
    image: "https://picsum.photos/seed/tantra/600/400"
  },
  // ... (Abbreviated list for brevity)
  {
    title: "Amavasya Special: Tribhairav Shatru Vinash Raksha Kavach Mahapujan",
    desc: "Complete destruction of every enemy and obstacle.",
    date: "20 Nov",
    location: "Shri Batuk Bhairav Temple, Varanasi",
    image: "https://picsum.photos/seed/tribhairav/600/400",
    badge: "Amavasya Special"
  },
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

const BackButton = ({ onClick, className = '' }: { onClick: () => void, className?: string }) => (
    <button 
      onClick={onClick}
      className={`inline-flex items-center gap-2 px-5 py-2.5 bg-white/95 backdrop-blur-sm border border-gray-100 shadow-xl rounded-full text-gray-800 hover:text-saffron-600 hover:bg-white hover:scale-105 transition-all duration-300 font-bold text-sm z-30 group ${className}`}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
      <span>Back</span>
    </button>
  );

const PaymentCard: React.FC<{ t: any }> = ({ t }) => {
    const handleRazorpayPayment = () => {
        // Mock payment
        const options = {
            key: "YOUR_KEY_ID", // Enter the Key ID generated from the Dashboard
            amount: "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: "INR",
            name: "Sanatan Dham Kendra",
            description: "Donation",
            image: "https://example.com/your_logo",
            handler: function (response: any){
                alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
            },
            prefill: {
                name: "Devotee Name",
                email: "devotee@example.com",
                contact: "9999999999"
            },
            theme: {
                color: "#D35400"
            }
        };
        // In a real app, we would load the script and check window.Razorpay
        if ((window as any).Razorpay) {
             const rzp1 = new (window as any).Razorpay(options);
             rzp1.open();
        } else {
            alert("Razorpay SDK not loaded. In production this would work.");
        }
    };

    return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden mt-12 max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-6 text-white text-center">
             <h2 className="text-3xl font-bold font-devanagari">{t.paymentCard.title}</h2>
             <p className="text-gray-300 text-base mt-2">{t.paymentCard.subtitle}</p>
        </div>
        
        <div className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row gap-12 items-center justify-between">
                
                <div className="flex-1 space-y-8 w-full">
                    <div className="flex gap-6 p-6 bg-orange-50 rounded-xl border border-orange-100 items-start">
                        <div className="text-5xl">🕉️</div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{t.paymentCard.bankTransfer}</h3>
                            <p className="text-base text-gray-700 leading-relaxed font-medium">
                                Sanatan Dham Kendra Trust<br/>
                                <span className="text-gray-500 font-normal">{t.paymentCard.accountNo}:</span> 1234567890<br/>
                                <span className="text-gray-500 font-normal">IFSC:</span> SBIN0001234
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-6 p-6 bg-blue-50 rounded-xl border border-blue-100 items-start">
                         <div className="text-5xl">💳</div>
                        <div>
                             <h3 className="text-xl font-bold text-gray-900 mb-2">{t.paymentCard.payOnline}</h3>
                             <p className="text-sm text-gray-600 mb-3">Cards, Netbanking, Wallet</p>
                             <Button onClick={handleRazorpayPayment} className="w-full bg-blue-600 hover:bg-blue-700 text-white">{t.paymentCard.payOnline}</Button>
                        </div>
                    </div>
                </div>

                {/* QR Code Card */}
                <div className="flex flex-col items-center justify-center">
                    <div className="bg-white p-4 rounded-2xl shadow-[0_5px_30px_rgba(0,0,0,0.1)] border border-gray-100 relative group transform transition hover:scale-105 duration-300">
                         {/* QR Code */}
                         <img 
                            src="https://api.qrserver.com/v1/create-qr-code/?size=600x600&data=upi://pay?pa=sharmaanish043-2@okaxis&pn=Sanatan%20Dham%20Kendra&cu=INR" 
                            alt="UPI QR Code" 
                            className="w-64 h-64 mix-blend-multiply"
                         />
                         {/* Center Icon Overlay */}
                         <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                             <div className="bg-white p-1.5 rounded-full shadow-md">
                                 <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-green-500 flex items-center justify-center text-white text-xs font-bold">UPI</div>
                             </div>
                         </div>
                    </div>
                    <div className="mt-6 text-center">
                        <p className="text-xs text-gray-500 uppercase tracking-wide mb-2 font-bold">{t.paymentCard.upiId}</p>
                        <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg border border-gray-200">
                            <code className="text-lg font-bold text-gray-800 select-all">sharmaanish043-2@okaxis</code>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
    );
};

const PujaCard: React.FC<{
  title: string;
  description: string;
  image: string;
  btnText: string;
  onBook: () => void;
}> = ({ title, description, image, btnText, onBook }) => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-[1.02] border border-gray-100 flex flex-col h-full">
    <div className="h-48 overflow-hidden relative group">
      <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
    </div>
    <div className="p-6 flex flex-col flex-grow">
      <h3 className="text-xl font-bold font-devanagari mb-3 text-gray-900 line-clamp-2">{title}</h3>
      <p className="text-gray-600 mb-6 line-clamp-3 text-sm flex-grow">{description}</p>
      <Button onClick={onBook} className="w-full mt-auto">{btnText}</Button>
    </div>
  </div>
);


// --- FULL PAGE VIEWS ---

const GauSevaView: React.FC<{ t: any; onBack: () => void }> = ({ t, onBack }) => {
  useEffect(() => window.scrollTo(0, 0), []);
  const page = t.gauSevaPage;

  return (
    <div className="bg-white min-h-screen pb-20 font-sans">
      {/* Hero */}
      <div className="relative h-[60vh] flex items-center justify-center bg-green-900 overflow-hidden group">
         <BackButton onClick={onBack} className="absolute top-24 left-4 md:left-8 bg-white/90 text-gray-900 border-none shadow-2xl" />
         <img src="https://images.unsplash.com/photo-1545652579-247545931215?q=80&w=1920&auto=format&fit=crop" alt="Gau Seva" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-[2s]" />
         <div className="relative z-10 text-center px-4">
             <div className="inline-block p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6">
                 <span className="text-6xl">🐄</span>
             </div>
             <h1 className="text-5xl md:text-7xl font-bold text-white font-devanagari drop-shadow-lg mb-4">{page.heroTitle}</h1>
             <p className="text-xl md:text-2xl text-green-100 max-w-2xl mx-auto">{page.heroSubtitle}</p>
         </div>
      </div>

      <div className="container mx-auto px-4 -mt-20 relative z-20">
         {/* Main Content Card */}
         <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border-t-8 border-green-600">
             
             {/* Intro */}
             <div className="max-w-4xl mx-auto text-center mb-16">
                 <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-devanagari mb-6">{page.title}</h2>
                 <p className="text-lg text-gray-700 leading-loose">
                    {page.description}
                 </p>
             </div>

             {/* Benefits Grid */}
             <div className="grid md:grid-cols-2 gap-12 mb-16">
                 <div className="bg-orange-50 p-8 rounded-2xl border border-orange-100">
                     <h3 className="text-2xl font-bold text-saffron-900 mb-6 font-devanagari border-b border-orange-200 pb-4">{page.benefitsTitle}</h3>
                     <ul className="space-y-4 text-lg text-gray-900 font-medium">
                        {page.benefits.map((b: string, i: number) => (
                             <li key={i} className="flex items-center gap-3"><span className="text-saffron-500 text-2xl">✔</span> {b}</li>
                        ))}
                    </ul>
                 </div>
                 
                 <div className="bg-green-50 p-8 rounded-2xl border border-green-100">
                     <h3 className="text-2xl font-bold text-green-900 mb-6 font-devanagari border-b border-green-200 pb-4">{page.fodderTitle}</h3>
                     <ul className="space-y-4 text-lg text-gray-900 font-medium">
                        {page.fodderPoints.map((p: string, i: number) => (
                            <li key={i} className="flex items-start gap-3"><span className="text-green-600 text-xl mt-1">●</span> {p}</li>
                        ))}
                     </ul>
                 </div>
             </div>

             {/* Rituals & Process */}
             <div className="mb-16">
                 <h2 className="text-3xl font-bold text-center text-gray-900 mb-10 font-devanagari">{page.processTitle}</h2>
                 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                     {page.processSteps.map((step: string, i: number) => (
                         <div key={i} className="bg-white shadow-lg rounded-xl p-6 text-center border border-gray-100 hover:-translate-y-2 transition-transform duration-300">
                             <div className="text-3xl mb-2 text-purple-600">✨</div>
                             <div className="font-bold text-gray-800">{step}</div>
                         </div>
                     ))}
                 </div>
             </div>

             {/* Contribution Options */}
             <div>
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-10 font-devanagari">{page.contributionTitle}</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    {page.contributionOptions.map((opt: any, i: number) => (
                        <div key={i} className="bg-gray-50 p-6 rounded-xl border-l-4 border-saffron-500 hover:bg-saffron-50 transition-colors">
                            <h4 className="text-xl font-bold text-gray-900 mb-2">{opt.title}</h4>
                            <p className="text-gray-600">{opt.desc}</p>
                        </div>
                    ))}
                </div>
             </div>

             {/* Payment */}
             <PaymentCard t={t} />
         </div>
      </div>
    </div>
  );
};

const GuptDaanView: React.FC<{ t: any; onBack: () => void }> = ({ t, onBack }) => {
    useEffect(() => window.scrollTo(0, 0), []);
    const page = t.guptDaanPage;

    return (
        <div className="bg-white min-h-screen pb-20 font-sans">
            <div className="relative h-[60vh] flex items-center justify-center bg-indigo-950 overflow-hidden group">
                 <BackButton onClick={onBack} className="absolute top-24 left-4 md:left-8 bg-white/20 text-white border-none shadow-2xl backdrop-blur-md" />
                 {/* High quality spiritual/meditation background */}
                 <img src="https://images.unsplash.com/photo-1507692049790-de58293a469d?q=80&w=1920&auto=format&fit=crop" alt="Gupt Daan" className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-[2s]" />
                 <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-indigo-950/80" />
                 
                 <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                     <div className="inline-block p-5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 mb-6 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                         <span className="text-6xl filter drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]">🤫</span>
                     </div>
                     <h1 className="text-5xl md:text-7xl font-bold text-white font-devanagari drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)] mb-6">{page.heroTitle}</h1>
                     <p className="text-xl md:text-2xl text-indigo-100 italic font-medium">{page.heroSubtitle}</p>
                 </div>
            </div>

            <div className="container mx-auto px-4 -mt-20 relative z-20">
                <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border-t-8 border-indigo-700">
                    
                    {/* Intro */}
                    <div className="max-w-4xl mx-auto text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-devanagari mb-6">{page.title}</h2>
                        <p className="text-lg text-gray-700 leading-loose">
                           {page.intro}
                        </p>
                    </div>

                    {/* Why & Types Grid */}
                    <div className="grid md:grid-cols-2 gap-12 mb-16">
                        <div className="bg-indigo-50 p-8 rounded-2xl border border-indigo-100">
                            <h3 className="text-2xl font-bold text-indigo-900 mb-6 font-devanagari border-b border-indigo-200 pb-4">{page.whyTitle}</h3>
                            <ul className="space-y-4 text-lg text-gray-800 font-medium">
                               {page.whyPoints.map((b: string, i: number) => (
                                    <li key={i} className="flex items-start gap-3"><span className="text-indigo-600 text-xl">✨</span> {b}</li>
                               ))}
                           </ul>
                        </div>
                        
                        <div className="bg-purple-50 p-8 rounded-2xl border border-purple-100">
                            <h3 className="text-2xl font-bold text-purple-900 mb-6 font-devanagari border-b border-purple-200 pb-4">{page.typesTitle}</h3>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4 text-lg text-gray-800">
                               {page.types.map((p: string, i: number) => (
                                   <li key={i} className="flex items-center gap-3"><span className="text-purple-600 font-bold">●</span> {p}</li>
                               ))}
                            </ul>
                        </div>
                    </div>

                    {/* Privacy & Significance */}
                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        <div className="md:col-span-1 bg-gray-900 text-white p-8 rounded-2xl shadow-xl flex flex-col justify-center">
                            <div className="text-4xl mb-4 text-yellow-400">🔒</div>
                            <h3 className="text-2xl font-bold font-devanagari mb-4">{page.privacyTitle}</h3>
                            <ul className="space-y-3 text-gray-300">
                                {page.privacyPoints.map((p: string, i: number) => (
                                    <li key={i} className="flex gap-2"><span>✓</span> {p}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="md:col-span-2 bg-saffron-50 p-8 rounded-2xl border border-saffron-100 flex flex-col justify-center">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 bg-saffron-100 rounded-full text-saffron-600"><StarIcon className="w-8 h-8"/></div>
                                <h3 className="text-2xl font-bold font-devanagari text-gray-900">{page.significanceTitle}</h3>
                            </div>
                            <p className="text-lg text-gray-800 leading-relaxed italic">
                                "{page.significance}"
                            </p>
                        </div>
                    </div>

                    <PaymentCard t={t} />
                </div>
            </div>
        </div>
    );
};

const GirlMarriageView: React.FC<{ t: any; onBack: () => void }> = ({ t, onBack }) => {
    useEffect(() => window.scrollTo(0, 0), []);
    const page = t.girlMarriagePage;
  
    return (
      <div className="bg-white min-h-screen pb-20 font-sans">
        {/* Hero */}
        <div className="relative h-[60vh] flex items-center justify-center bg-rose-900 overflow-hidden group">
           <BackButton onClick={onBack} className="absolute top-24 left-4 md:left-8 bg-white/90 text-gray-900 border-none shadow-2xl" />
           <img src="https://images.unsplash.com/photo-1587271407850-8d43891882c0?q=80&w=1920&auto=format&fit=crop" alt="Indian Wedding" className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-[2s]" />
           <div className="relative z-10 text-center px-4">
               <div className="inline-block p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6">
                   <span className="text-6xl">👰‍♀️</span>
               </div>
               <h1 className="text-4xl md:text-6xl font-bold text-white font-devanagari drop-shadow-lg mb-4">{page.heroTitle}</h1>
               <p className="text-xl md:text-2xl text-rose-100 max-w-2xl mx-auto">{page.heroSubtitle}</p>
           </div>
        </div>
  
        <div className="container mx-auto px-4 -mt-20 relative z-20">
           {/* Main Content Card */}
           <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border-t-8 border-rose-500">
               
               {/* Intro */}
               <div className="max-w-4xl mx-auto text-center mb-16">
                   <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-devanagari mb-6">{page.title}</h2>
                   <p className="text-lg text-gray-700 leading-loose">
                      {page.description}
                   </p>
               </div>
  
               {/* Benefits & What we Provide Grid */}
               <div className="grid md:grid-cols-2 gap-12 mb-16">
                   <div className="bg-rose-50 p-8 rounded-2xl border border-rose-100">
                       <h3 className="text-2xl font-bold text-rose-900 mb-6 font-devanagari border-b border-rose-200 pb-4">{page.whyTitle}</h3>
                       <ul className="space-y-4 text-lg text-gray-900 font-medium">
                          {page.whyPoints.map((b: string, i: number) => (
                               <li key={i} className="flex items-start gap-3"><span className="text-rose-500 text-2xl">❤</span> {b}</li>
                          ))}
                      </ul>
                   </div>
                   
                   <div className="bg-orange-50 p-8 rounded-2xl border border-orange-100">
                       <h3 className="text-2xl font-bold text-orange-900 mb-6 font-devanagari border-b border-orange-200 pb-4">{page.whatTitle}</h3>
                       <ul className="space-y-4 text-lg text-gray-900 font-medium">
                          {page.whatPoints.map((p: string, i: number) => (
                              <li key={i} className="flex items-start gap-3"><span className="text-orange-600 text-xl">🎁</span> {p}</li>
                          ))}
                       </ul>
                   </div>
               </div>
  
               {/* Process */}
               <div className="mb-16">
                   <h2 className="text-3xl font-bold text-center text-gray-900 mb-10 font-devanagari">{page.processTitle}</h2>
                   <div className="grid md:grid-cols-5 gap-4">
                       {page.processSteps.map((step: any, i: number) => (
                           <div key={i} className="bg-white shadow-lg rounded-xl p-6 text-center border border-gray-100 relative">
                               <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center font-bold mx-auto mb-4">{i+1}</div>
                               <div className="font-bold text-gray-800 mb-2">{step.t}</div>
                               <div className="text-sm text-gray-600">{step.d}</div>
                           </div>
                       ))}
                   </div>
               </div>
  
               {/* Contribution Options */}
               <div>
                  <h2 className="text-3xl font-bold text-center text-gray-900 mb-10 font-devanagari">{page.contributionTitle}</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                      {page.contributionOptions.map((opt: any, i: number) => (
                          <div key={i} className="bg-gray-50 p-6 rounded-xl border-l-4 border-rose-500 hover:bg-rose-50 transition-colors">
                              <h4 className="text-xl font-bold text-gray-900 mb-2">{opt.title}</h4>
                              <p className="text-gray-600">{opt.desc}</p>
                          </div>
                      ))}
                  </div>
               </div>

                {/* Emotional Note */}
                <div className="mt-16 bg-gradient-to-r from-rose-50 to-orange-50 p-8 rounded-2xl border border-rose-100 text-center">
                    <p className="text-xl text-gray-800 italic font-medium leading-relaxed">
                        "{page.emotionalNote}"
                    </p>
                </div>
  
               {/* Payment */}
               <PaymentCard t={t} />
           </div>
        </div>
      </div>
    );
};

const VastraDaanView: React.FC<{ t: any; onBack: () => void }> = ({ t, onBack }) => {
  useEffect(() => window.scrollTo(0, 0), []);
  const page = t.vastraPage;

  return (
    <div className="bg-white min-h-screen pb-20 font-sans">
      <div className="relative h-[60vh] flex items-center justify-center bg-blue-900 overflow-hidden">
         <BackButton onClick={onBack} className="absolute top-24 left-4 md:left-8 bg-white/90 text-gray-900 border-none shadow-2xl" />
         <img src="https://images.unsplash.com/photo-1542060748-10c28b62716f?q=80&w=1600&auto=format&fit=crop" alt="Vastra Daan" className="absolute inset-0 w-full h-full object-cover opacity-40" />
         <div className="relative z-10 text-center px-4">
             <div className="inline-block p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6">
                 <span className="text-6xl">👕</span>
             </div>
             <h1 className="text-5xl md:text-7xl font-bold text-white font-devanagari drop-shadow-lg mb-4">{page.heroTitle}</h1>
             <p className="text-xl md:text-2xl text-blue-100 max-w-2xl mx-auto">{page.heroSubtitle}</p>
         </div>
      </div>

      <div className="container mx-auto px-4 -mt-20 relative z-20">
         <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border-t-8 border-blue-600">
             
             <div className="max-w-4xl mx-auto text-center mb-12">
                 <p className="text-xl text-gray-800 leading-loose font-medium">
                     {page.quote}
                 </p>
             </div>

             <div className="grid md:grid-cols-2 gap-12 mb-16">
                 <div className="bg-blue-50 p-8 rounded-2xl border border-blue-100">
                     <h3 className="text-2xl font-bold text-blue-900 mb-6 font-devanagari">{page.itemsTitle}</h3>
                     <ul className="space-y-3 text-lg text-gray-800">
                        {page.items.map((item: string, i: number) => (
                            <li key={i} className="flex gap-3"><span className="text-blue-600">✔</span> {item}</li>
                        ))}
                    </ul>
                    <div className="mt-6 p-4 bg-red-50 text-red-700 rounded-lg text-sm font-bold border border-red-100">
                        {page.note}
                    </div>
                 </div>

                 <div className="bg-saffron-50 p-8 rounded-2xl border border-saffron-100">
                    <h3 className="text-2xl font-bold text-saffron-900 mb-6 font-devanagari">{page.importanceTitle}</h3>
                    <p className="text-gray-700 mb-6 italic">{page.importanceSubtitle}</p>
                    <ul className="grid grid-cols-1 gap-3 text-lg text-gray-800">
                        {page.benefits.map((b: string, i: number) => (
                             <li key={i} className="flex gap-3"><span className="text-saffron-500">✨</span> {b}</li>
                        ))}
                    </ul>
                 </div>
             </div>

             <div className="mb-16">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-10 font-devanagari">{page.processTitle}</h2>
                <div className="grid gap-6 md:grid-cols-4 text-center">
                        {page.processSteps.map((item: any, i: number) => (
                            <div key={i} className="bg-white shadow-lg rounded-xl p-6 border border-gray-100 hover:-translate-y-2 transition-transform duration-300">
                                <div className="text-4xl text-blue-200 mb-4 font-bold">{i+1}</div>
                                <div className="font-bold text-blue-900 text-lg mb-2">{item.t}</div>
                                <div className="text-gray-600">{item.d}</div>
                            </div>
                        ))}
                </div>
            </div>

             {/* Contribution Options - Added */}
             <div>
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-10 font-devanagari">{page.contributionTitle}</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    {page.contributionOptions?.map((opt: any, i: number) => (
                        <div key={i} className="bg-gray-50 p-6 rounded-xl border-l-4 border-blue-600 hover:bg-blue-50 transition-colors">
                            <h4 className="text-xl font-bold text-gray-900 mb-2">{opt.title}</h4>
                            <p className="text-gray-600">{opt.desc}</p>
                        </div>
                    ))}
                </div>
             </div>
            
            <PaymentCard t={t} />
         </div>
      </div>
    </div>
  );
};

const AnnaDaanView: React.FC<{ t: any; onBack: () => void }> = ({ t, onBack }) => {
  useEffect(() => window.scrollTo(0, 0), []);
  const page = t.annaPage;

  return (
    <div className="bg-white min-h-screen pb-20 font-sans">
      <div className="relative h-[60vh] flex items-center justify-center bg-amber-800 overflow-hidden">
         <BackButton onClick={onBack} className="absolute top-24 left-4 md:left-8 bg-white/90 text-gray-900 border-none shadow-2xl" />
         <img src="https://images.unsplash.com/photo-1596450523090-09292d3c9058?q=80&w=1600&auto=format&fit=crop" alt="Anna Daan" className="absolute inset-0 w-full h-full object-cover opacity-40" />
         <div className="relative z-10 text-center px-4">
             <div className="inline-block p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6">
                 <span className="text-6xl">🍚</span>
             </div>
             <h1 className="text-5xl md:text-7xl font-bold text-white font-devanagari drop-shadow-lg mb-4">{page.heroTitle}</h1>
             <p className="text-xl md:text-2xl text-amber-100 max-w-2xl mx-auto">{page.heroSubtitle}</p>
         </div>
      </div>

      <div className="container mx-auto px-4 -mt-20 relative z-20">
         <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border-t-8 border-amber-600">
             
             <div className="max-w-4xl mx-auto text-center mb-16">
                 <p className="text-xl text-gray-800 leading-loose">
                    {page.intro}
                 </p>
             </div>

             <div className="grid md:grid-cols-2 gap-12 mb-16">
                 <div className="bg-amber-50 p-8 rounded-2xl border border-amber-100">
                    <h3 className="text-2xl font-bold text-amber-900 mb-6 font-devanagari">{page.itemsTitle}</h3>
                    <ul className="grid grid-cols-1 gap-3 text-lg text-gray-900 font-medium">
                        {page.items.map((item: string, i: number) => (
                             <li key={i} className="flex gap-3"><span className="text-amber-600">✔</span> {item}</li>
                        ))}
                    </ul>
                 </div>

                 <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 font-devanagari">{page.importanceTitle}</h3>
                    <ul className="grid grid-cols-1 gap-3 text-lg text-gray-700">
                        {page.benefits.map((b: string, i: number) => (
                             <li key={i} className="flex gap-3"><span className="text-saffron-500">✨</span> {b}</li>
                        ))}
                    </ul>
                 </div>
             </div>

             <div className="mb-12">
                 <h2 className="text-3xl font-bold text-center text-gray-900 mb-8 font-devanagari">{page.contributionTitle}</h2>
                 <div className="grid sm:grid-cols-2 gap-6">
                    {page.contributionOptions.map((opt: any, i: number) => (
                        <div key={i} className="bg-gray-50 p-6 rounded-xl border-l-4 border-amber-600 hover:bg-amber-50 transition-colors">
                            <h4 className="text-xl font-bold text-gray-900 mb-2">{opt.title}</h4>
                            <p className="text-gray-600">{opt.desc}</p>
                        </div>
                    ))}
                 </div>
             </div>

            <PaymentCard t={t} />
         </div>
      </div>
    </div>
  );
};

const DeepamSevaView: React.FC<{ t: any; onBack: () => void }> = ({ t, onBack }) => {
  useEffect(() => window.scrollTo(0, 0), []);
  const page = t.deepamPage;

  return (
    <div className="bg-white min-h-screen pb-20 font-sans">
      <div className="relative h-[60vh] flex items-center justify-center bg-orange-900 overflow-hidden">
         <BackButton onClick={onBack} className="absolute top-24 left-4 md:left-8 bg-white/90 text-gray-900 border-none shadow-2xl" />
         <img src="https://images.unsplash.com/photo-1603986224097-909d023b692f?q=80&w=1600&auto=format&fit=crop" alt="Deepam Seva" className="absolute inset-0 w-full h-full object-cover opacity-50" />
         <div className="relative z-10 text-center px-4">
             <div className="inline-block p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6">
                 <span className="text-6xl">🪔</span>
             </div>
             <h1 className="text-5xl md:text-7xl font-bold text-white font-devanagari drop-shadow-lg mb-4">{page.heroTitle}</h1>
             <p className="text-xl md:text-2xl text-orange-100 max-w-2xl mx-auto">{page.heroSubtitle}</p>
         </div>
      </div>

      <div className="container mx-auto px-4 -mt-20 relative z-20">
         <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border-t-8 border-orange-600">
             
             {/* Intro */}
             <div className="max-w-4xl mx-auto text-center mb-16">
                 <p className="text-xl text-gray-800 leading-loose">
                    {page.intro}
                 </p>
             </div>

             {/* Importance Grid (Single Col here but styled nicely) */}
             <div className="bg-orange-50 p-10 rounded-3xl border border-orange-100 mb-16">
                 <h3 className="text-3xl font-bold text-orange-900 mb-8 font-devanagari text-center">{page.importanceTitle}</h3>
                 <div className="grid md:grid-cols-2 gap-8 text-lg text-gray-800 font-medium">
                    {page.importancePoints.map((p: string, i: number) => (
                        <div key={i} className="flex items-start gap-4"><span className="text-orange-500 text-2xl">●</span> {p}</div>
                    ))}
                 </div>
             </div>

             {/* Process Grid */}
             <div className="mb-16">
                 <h2 className="text-3xl font-bold text-center text-gray-900 mb-10 font-devanagari">{page.processTitle}</h2>
                 <div className="grid md:grid-cols-4 gap-6">
                     {page.processSteps.map((item: any, i: number) => (
                         <div key={i} className="bg-white shadow-lg rounded-xl p-6 text-center border border-gray-100 hover:-translate-y-2 transition-transform duration-300">
                             <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold mx-auto mb-4 text-xl">{i+1}</div>
                             <div className="font-bold text-gray-900 text-lg mb-2">{item.t}</div>
                             <div className="text-gray-600">{item.d}</div>
                         </div>
                     ))}
                 </div>
             </div>
            
             {/* Contribution Options / Types Grid */}
             <div>
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-10 font-devanagari">{page.typesTitle}</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    {page.types.map((type: any, i: number) => (
                        <div key={i} className="bg-gray-50 p-6 rounded-xl border-l-4 border-orange-500 hover:bg-orange-50 transition-colors">
                            <h4 className="text-xl font-bold text-gray-900 mb-2">{type.title}</h4>
                            <p className="text-gray-600">{type.desc}</p>
                        </div>
                    ))}
                </div>
             </div>

             <p className="text-center text-gray-500 italic bg-gray-50 p-4 rounded-lg border border-gray-100 mt-12 max-w-3xl mx-auto">
                {page.note}
             </p>

            <PaymentCard t={t} />
         </div>
      </div>
    </div>
  );
};

const PrivacyPolicyView: React.FC<{ t: any; onBack: () => void }> = ({ t, onBack }) => {
  useEffect(() => window.scrollTo(0, 0), []);
  const policy = t.privacyPolicy;
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl bg-white min-h-screen">
      <div className="mb-8">
          <BackButton onClick={onBack} />
      </div>
      <h1 className="text-3xl font-bold mb-6 text-gray-900">{policy.title}</h1>
      <div className="prose prose-lg text-gray-700">
        {policy.content.map((section: any, i: number) => (
            <div key={i}>
                <h3 className="text-xl font-bold mt-6 mb-3 text-gray-900">{section.heading}</h3>
                <p>{section.text}</p>
            </div>
        ))}
      </div>
    </div>
  );
};

const RefundPolicyView: React.FC<{ t: any; onBack: () => void }> = ({ t, onBack }) => {
  useEffect(() => window.scrollTo(0, 0), []);
  const policy = t.refundPolicy;
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl bg-white min-h-screen">
      <div className="mb-8">
          <BackButton onClick={onBack} />
      </div>
      <h1 className="text-3xl font-bold mb-6 text-gray-900">{policy.title}</h1>
      <div className="prose prose-lg text-gray-700">
        <p>{policy.intro}</p>
        {policy.content.map((section: any, i: number) => (
            <div key={i}>
                <h3 className="text-xl font-bold mt-6 mb-3 text-gray-900">{section.heading}</h3>
                <p>{section.text}</p>
            </div>
        ))}
      </div>
    </div>
  );
};

const UpcomingPujasView: React.FC<{ t: any, onBook: () => void, onBack: () => void }> = ({ t, onBook, onBack }) => {
  useEffect(() => window.scrollTo(0, 0), []);
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
       <Section id="upcoming-list" className="bg-gray-50">
           <div className="mb-6">
              <BackButton onClick={onBack} />
           </div>
           <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.pujas.seeAll}</h2>
              <p className="text-gray-600">Join upcoming community pujas and events.</p>
           </div>
           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingPujasList.map((puja, i) => (
                 <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
                    <div className="h-48 relative">
                       <img src={puja.image} alt={puja.title} className="w-full h-full object-cover" />
                       {puja.badge && (
                           <span className="absolute top-4 right-4 bg-saffron-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                               {puja.badge}
                           </span>
                       )}
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                       <div className="flex justify-between items-start mb-2">
                           <span className="text-sm font-bold text-saffron-600 bg-saffron-50 px-2 py-1 rounded">{puja.date}</span>
                       </div>
                       <h3 className="text-xl font-bold text-gray-900 mb-2">{puja.title}</h3>
                       <p className="text-gray-600 text-sm mb-4 flex-grow">{puja.desc}</p>
                       <p className="text-gray-500 text-xs mb-4 flex items-center">
                           <LocationIcon className="w-4 h-4 mr-1" /> {puja.location}
                       </p>
                       <Button onClick={onBook} className="w-full mt-auto">{t.pujas.participateNow}</Button>
                    </div>
                 </div>
              ))}
           </div>
       </Section>
    </div>
  );
};

const AstrologyView: React.FC<{ t: any, onBook: () => void, onBack: () => void }> = ({ t, onBook, onBack }) => {
    useEffect(() => window.scrollTo(0, 0), []);
    const { hero, servicesHeader, servicesSubheader, services, bookBtn } = t.astrologyPage;
  
    return (
      <div className="bg-white pb-20 min-h-screen">
         {/* Updated Hero Section */}
         <div className="relative h-[70vh] flex items-center justify-center overflow-hidden bg-indigo-950">
             
             {/* Background Image */}
             <img 
                src="https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1920&auto=format&fit=crop" 
                alt="Cosmic Background" 
                className="absolute inset-0 w-full h-full object-cover opacity-60"
             />
             
             {/* Gradient Overlay for better text readability */}
             <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-indigo-950/60 to-indigo-900/90"></div>

             <BackButton onClick={onBack} className="absolute top-24 left-4 md:left-8 bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-md" />
             
             <div className="absolute inset-0 pointer-events-none">
                {/* Zodiac Wheel Animation - keeping existing logic but adjusting opacity */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-20 animate-spin-slow mix-blend-screen">
                    <svg viewBox="0 0 100 100" className="w-full h-full text-white fill-current">
                        <path d="M50 0 L52 10 L50 12 L48 10 Z" transform="rotate(0 50 50)" />
                        <path d="M50 0 L52 10 L50 12 L48 10 Z" transform="rotate(30 50 50)" />
                        <path d="M50 0 L52 10 L50 12 L48 10 Z" transform="rotate(60 50 50)" />
                        <path d="M50 0 L52 10 L50 12 L48 10 Z" transform="rotate(90 50 50)" />
                        <path d="M50 0 L52 10 L50 12 L48 10 Z" transform="rotate(120 50 50)" />
                        <path d="M50 0 L52 10 L50 12 L48 10 Z" transform="rotate(150 50 50)" />
                        <path d="M50 0 L52 10 L50 12 L48 10 Z" transform="rotate(180 50 50)" />
                        <path d="M50 0 L52 10 L50 12 L48 10 Z" transform="rotate(210 50 50)" />
                        <path d="M50 0 L52 10 L50 12 L48 10 Z" transform="rotate(240 50 50)" />
                        <path d="M50 0 L52 10 L50 12 L48 10 Z" transform="rotate(270 50 50)" />
                        <path d="M50 0 L52 10 L50 12 L48 10 Z" transform="rotate(300 50 50)" />
                        <path d="M50 0 L52 10 L50 12 L48 10 Z" transform="rotate(330 50 50)" />
                        <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" />
                        <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="0.5" />
                    </svg>
                </div>
             </div>
             
             <div className="relative z-10 px-4 text-center max-w-4xl mx-auto">
                 <div className="mb-8 flex justify-center">
                    <div className="p-4 rounded-full bg-indigo-500/20 backdrop-blur-lg border border-indigo-300/30 shadow-[0_0_30px_rgba(99,102,241,0.3)]">
                        <MoonIcon className="w-16 h-16 text-yellow-300 drop-shadow-[0_0_15px_rgba(253,224,71,0.8)]" />
                    </div>
                 </div>
                 
                 <h1 className="text-5xl md:text-7xl font-bold mb-6 font-devanagari text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] tracking-wide">
                    {hero.title}
                 </h1>
                 
                 <p className="text-xl md:text-2xl text-indigo-100 font-light tracking-wide leading-relaxed drop-shadow-md">
                    {hero.subtitle}
                 </p>
                 
                 <div className="mt-10">
                    <Button onClick={onBook} className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-10 py-4 rounded-full text-lg shadow-[0_0_20px_rgba(99,102,241,0.5)] border border-indigo-400/30">
                        {bookBtn}
                    </Button>
                 </div>
             </div>
         </div>
  
         <div className="container mx-auto px-4 py-16 -mt-10 relative z-20">
             <div className="text-center mb-16">
                 <h2 className="text-3xl font-bold text-gray-900 mb-4">{servicesHeader}</h2>
                 <p className="text-gray-600 max-w-2xl mx-auto">{servicesSubheader}</p>
             </div>
  
             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                 {/* Birth Chart Analysis - Special Animated Card */}
                 <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all hover:-translate-y-1 text-center flex flex-col items-center relative overflow-hidden group">
                     <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-white opacity-50"></div>
                     <div className="w-32 h-32 mb-6 relative z-10">
                        {/* Rotating ring */}
                        <div className="absolute inset-0 rounded-full border-2 border-dashed border-indigo-200 animate-spin-slow"></div>
                         <div className="absolute inset-2 rounded-full border border-indigo-100"></div>
                         <div className="absolute inset-0 flex items-center justify-center text-4xl">🔮</div>
                     </div>
                     <h3 className="text-xl font-bold text-indigo-900 mb-3 relative z-10">{services[0].title}</h3>
                     <p className="text-gray-600 mb-6 flex-grow relative z-10">{services[0].desc}</p>
                     <Button onClick={onBook} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white border-none relative z-10">{bookBtn}</Button>
                 </div>

                 {services.slice(1).map((service: any, index: number) => (
                     <div key={index} className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow text-center flex flex-col items-center group">
                         <div className="w-16 h-16 bg-indigo-50 group-hover:bg-indigo-100 transition-colors rounded-full flex items-center justify-center mb-6 text-indigo-600 text-2xl font-bold">
                             {['♉','♊','♋','♌','♍'][index % 5]}
                         </div>
                         <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                         <p className="text-gray-600 mb-6 flex-grow">{service.desc}</p>
                         <Button onClick={onBook} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white border-none">{bookBtn}</Button>
                     </div>
                 ))}
             </div>
         </div>
         
         <style>{`
            @keyframes spin-slow {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
            .animate-spin-slow {
                animation: spin-slow 60s linear infinite;
            }
         `}</style>
      </div>
    );
};


// --- Components ---

const Header: React.FC<{ lang: Language; toggleLang: () => void; t: typeof translations['en']; onNavigate: (view: ViewState) => void }> = ({ lang, toggleLang, t, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const navLinks = [
    { name: t.nav.pujas, href: "pujas", view: 'home' },
    { name: t.nav.astrology, href: "astrology", view: 'astrology' }, 
    { name: t.nav.gauSeva, href: "gauseva", view: 'gauseva' },
    { name: t.nav.girlMarriage, href: "girlmarriage", view: 'girlMarriage' },
    { name: t.nav.offerings, href: "offerings", view: 'home' },
    { name: t.nav.specialPuja, href: "special-puja", view: 'home' },
    { name: t.nav.contactUs, href: "contact", view: 'home' },
  ];

  const handleNavClick = (e: React.MouseEvent, link: {href: string, view: string}) => {
    e.preventDefault();
    onNavigate(link.view as ViewState);
    
    if (link.view === 'home') {
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
            image: "https://picsum.photos/seed/satyanarayan/600/400", // Increased resolution
            type: PoojaType.SATYANARAYAN
        },
        {
            title: t.pujas.grihaPravesh.title,
            description: t.pujas.grihaPravesh.desc,
            image: "https://picsum.photos/seed/grihapravesh/600/400",
            type: PoojaType.GRIHA_PRAVESH
        },
        {
            title: t.pujas.vahana.title,
            description: t.pujas.vahana.desc,
            image: "https://picsum.photos/seed/vahana/600/400",
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
                            src={`https://picsum.photos/seed/${temple.id}_cover/800/1200`} 
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

const GuptDaanSection: React.FC<{ t: typeof translations['en']; onView: () => void }> = ({ t, onView }) => {
    return (
        <Section id="guptdaan" className="bg-indigo-50/50">
            <div className="bg-white rounded-xl shadow-xl overflow-hidden flex flex-col lg:flex-row-reverse border border-indigo-100">
                <div className="lg:w-1/2 h-64 lg:h-auto">
                     <img src="https://images.unsplash.com/photo-1629814144383-a0e281577740?q=80&w=1200&auto=format&fit=crop" alt="Gupt Daan" className="w-full h-full object-cover"/>
                </div>
                <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                    <h2 className="text-3xl md:text-4xl font-devanagari font-bold text-gray-900 mb-6 text-indigo-900">{t.guptDaan.title}</h2>
                    <p className="text-gray-600 leading-relaxed mb-8">
                        {t.guptDaan.desc}
                    </p>
                    <div>
                        <Button 
                            onClick={onView}
                            className="bg-indigo-100 hover:bg-indigo-200 text-indigo-900 border-none px-8"
                        >
                            {t.guptDaan.cta}
                        </Button>
                    </div>
                </div>
            </div>
        </Section>
    )
}

const GauSevaSection: React.FC<{ t: typeof translations['en']; onView: () => void }> = ({ t, onView }) => {
    return (
        <Section id="gauseva" className="bg-white">
            <div className="bg-white rounded-xl shadow-xl overflow-hidden flex flex-col lg:flex-row">
                <div className="lg:w-1/2 h-64 lg:h-auto">
                    <img src="https://images.unsplash.com/photo-1545652579-247545931215?q=80&w=1200&auto=format&fit=crop" alt="Gau Seva" className="w-full h-full object-cover"/>
                </div>
                <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                    <h2 className="text-3xl md:text-4xl font-devanagari font-bold text-gray-900 mb-6">{t.gauSeva.title}</h2>
                    <p className="text-gray-600 leading-relaxed mb-8">
                        {t.gauSeva.desc}
                    </p>
                    <div>
                        <Button 
                            onClick={onView}
                            className="bg-gray-100 hover:bg-gray-200 text-gray-800 border-none px-8"
                        >
                            {t.gauSeva.cta}
                        </Button>
                    </div>
                </div>
            </div>
        </Section>
    );
};

const GirlMarriageSection: React.FC<{ t: typeof translations['en']; onView: () => void }> = ({ t, onView }) => {
    return (
        <Section id="girlmarriage" className="bg-rose-50/50">
            <div className="bg-white rounded-xl shadow-xl overflow-hidden flex flex-col lg:flex-row-reverse border border-rose-100">
                <div className="lg:w-1/2 h-64 lg:h-auto">
                    <img src="https://images.unsplash.com/photo-1587271407850-8d43891882c0?q=80&w=1200&auto=format&fit=crop" alt="Girl Marriage Support" className="w-full h-full object-cover"/>
                </div>
                <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                    <h2 className="text-3xl md:text-4xl font-devanagari font-bold text-gray-900 mb-6 text-rose-800">{t.girlMarriage.title}</h2>
                    <p className="text-gray-600 leading-relaxed mb-8">
                        {t.girlMarriage.desc}
                    </p>
                    <div>
                        <Button 
                            onClick={onView}
                            className="bg-rose-100 hover:bg-rose-200 text-rose-900 border-none px-8"
                        >
                            {t.girlMarriage.cta}
                        </Button>
                    </div>
                </div>
            </div>
        </Section>
    );
};

const OfferingsSection: React.FC<{ t: typeof translations['en']; onNavigate: (view: ViewState) => void }> = ({ t, onNavigate }) => {

    return (
        <Section id="offerings" className="bg-ivory">
            <SectionHeader 
                title={t.offerings.header}
                subtitle={t.offerings.subheader}
            />
            
            <div className="space-y-12 max-w-5xl mx-auto">
                {/* Vastra Daan */}
                <div className="bg-white p-6 rounded-lg shadow-md flex flex-col md:flex-row items-center gap-8">
                    <div className="w-full md:w-1/2 h-64 bg-gray-100 rounded-md overflow-hidden relative">
                        <img src="https://images.unsplash.com/photo-1542060748-10c28b62716f?q=80&w=800&auto=format&fit=crop" alt="Vastra Daan" className="w-full h-full object-cover"/>
                    </div>
                    <div className="w-full md:w-1/2">
                        <h3 className="text-2xl font-bold font-devanagari text-gray-900 mb-3">{t.offerings.vastra.title}</h3>
                        <p className="text-gray-600 mb-6">{t.offerings.vastra.desc}</p>
                        <Button onClick={() => onNavigate('vastra')}>{t.offerings.vastra.cta}</Button>
                    </div>
                </div>

                {/* Deepam Seva */}
                <div className="bg-white p-6 rounded-lg shadow-md flex flex-col md:flex-row items-center gap-8">
                    <div className="w-full md:w-1/2 h-64 bg-gray-100 rounded-md overflow-hidden relative">
                        <img src="https://images.unsplash.com/photo-1603986224097-909d023b692f?q=80&w=800&auto=format&fit=crop" alt="Deepam Seva" className="w-full h-full object-cover"/>
                    </div>
                    <div className="w-full md:w-1/2">
                        <h3 className="text-2xl font-bold font-devanagari text-gray-900 mb-3">{t.offerings.deepam.title}</h3>
                        <p className="text-gray-600 mb-6">{t.offerings.deepam.desc}</p>
                        <Button onClick={() => onNavigate('deepam')}>{t.offerings.deepam.cta}</Button>
                    </div>
                </div>

                {/* Anna Daan */}
                <div className="bg-white p-6 rounded-lg shadow-md flex flex-col md:flex-row items-center gap-8">
                    <div className="w-full md:w-1/2 h-64 bg-gray-100 rounded-md overflow-hidden relative">
                        <img src="https://images.unsplash.com/photo-1596450523090-09292d3c9058?q=80&w=800&auto=format&fit=crop" alt="Anna Daan" className="w-full h-full object-cover"/>
                    </div>
                    <div className="w-full md:w-1/2">
                        <h3 className="text-2xl font-bold font-devanagari text-gray-900 mb-3">{t.offerings.anna.title}</h3>
                        <p className="text-gray-600 mb-6">{t.offerings.anna.desc}</p>
                        <Button onClick={() => onNavigate('anna')}>{t.offerings.anna.cta}</Button>
                    </div>
                </div>
            </div>
        </Section>
    );
};

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
             <li><a href="#gauseva" onClick={(e) => handleLinkClick(e, 'gauseva', 'gauseva')} className="hover:text-saffron-500 transition">{t.nav.gauSeva}</a></li>
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

  const handleBackToHome = () => {
      navigateTo('home');
  }

  return (
    <div className="bg-gray-50 font-sans text-gray-900">
      <Header lang={language} toggleLang={toggleLanguage} t={t} onNavigate={navigateTo} />
      <main>
        {currentView === 'home' && (
            <>
                <HeroSection t={t} />
                <PujasSection t={t} onSeeAll={() => navigateTo('upcoming')} />
                <SpecialPujaSection t={t} />
                <BookingFormSection t={t} />
                <GuptDaanSection t={t} onView={() => navigateTo('guptDaan')} />
                <GauSevaSection t={t} onView={() => navigateTo('gauseva')} />
                <GirlMarriageSection t={t} onView={() => navigateTo('girlMarriage')} />
                <OfferingsSection t={t} onNavigate={navigateTo} />
                <TemplesSection t={t} />
                <DonationSection t={t} />
                <CertificateSection t={t} />
            </>
        )}
        {currentView === 'privacy' && <PrivacyPolicyView t={t} onBack={handleBackToHome} />}
        {currentView === 'refund' && <RefundPolicyView t={t} onBack={handleBackToHome} />}
        {currentView === 'upcoming' && <UpcomingPujasView t={t} onBook={handleBookFromList} onBack={handleBackToHome} />}
        {currentView === 'astrology' && <AstrologyView t={t} onBook={handleBookFromList} onBack={handleBackToHome} />}
        
        {/* NEW LANDING PAGE VIEWS */}
        {currentView === 'gauseva' && <GauSevaView t={t} onBack={handleBackToHome} />}
        {currentView === 'girlMarriage' && <GirlMarriageView t={t} onBack={handleBackToHome} />}
        {currentView === 'vastra' && <VastraDaanView t={t} onBack={handleBackToHome} />}
        {currentView === 'anna' && <AnnaDaanView t={t} onBack={handleBackToHome} />}
        {currentView === 'deepam' && <DeepamSevaView t={t} onBack={handleBackToHome} />}
        {currentView === 'guptDaan' && <GuptDaanView t={t} onBack={handleBackToHome} />}
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