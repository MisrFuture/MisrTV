export type Locale = "en" | "ar";

export const locales: Locale[] = ["en", "ar"];

export const defaultLocale: Locale = "en";

export function isRtl(locale: Locale): boolean {
  return locale === "ar";
}

export const translations = {
  en: {
    brand: "MisrTV",
    tagline: "Egyptian movies & TV. Smarter than IMDB.",
    nav: {
      home: "Home",
      movies: "Movies",
      upcoming: "Upcoming",
      ai: "AI Assistant",
      profile: "Profile",
      compare: "Compare",
    },
    hero: {
      title: "Discover films that matter",
      subtitle:
        "Box office insights, bilingual reviews, AI recommendations — built for Arab audiences.",
      search: "Search movies, actors, directors...",
      explore: "Explore trending",
    },
    sections: {
      trending: "Trending now",
      topRated: "Top rated",
      upcoming: "Coming soon",
      arabCinema: "Arab cinema spotlight",
    },
    movie: {
      overview: "Overview",
      analysis: "Financial analysis",
      ratings: "Ratings",
      cast: "Cast",
      budget: "Budget",
      boxOffice: "Box office",
      profit: "Net profit",
      loss: "Net loss",
      roi: "Return on investment",
      ageRating: "Age rating",
      contentRating: "Quality verdict",
      watchTrailer: "Watch trailer",
      addLike: "Add to liked",
      removeLike: "Remove from liked",
      addWatchlist: "Watchlist",
      aiInsight: "AI insight",
    },
    ageRatings: {
      G: "General audiences",
      PG: "Parental guidance",
      "PG-13": "Teens 13+",
      R: "Restricted 17+",
      "18+": "Adults only",
      NR: "Not rated",
    },
    contentRatings: {
      excellent: "Must watch",
      good: "Worth it",
      mixed: "Mixed reviews",
      poor: "Skip it",
    },
    profile: {
      title: "Your profile",
      liked: "Liked movies",
      watchlist: "Watchlist",
      stats: "Your stats",
      moviesLiked: "Movies liked",
      memberSince: "Member since",
      editBio: "About you",
    },
    ai: {
      title: "MisrTV AI",
      subtitle: "Ask for recommendations, plot summaries, or box office takes.",
      placeholder: "e.g. Best Egyptian drama from 2024? Is Dune 3 worth it?",
      send: "Ask",
      thinking: "Thinking...",
      suggestions: [
        "Recommend an Arabic comedy for family night",
        "Which upcoming Marvel film has the best ROI potential?",
        "Summarize the financial performance of Oppenheimer",
      ],
    },
    filters: {
      all: "All",
      excellent: "Must watch",
      good: "Good",
      upcoming: "Upcoming only",
    },
    compare: {
      title: "Compare movies",
      subtitle: "Select two movies to compare their ratings, financials, and details side by side.",
      selectFirst: "Select first movie",
      selectSecond: "Select second movie",
      ratings: "Ratings",
      financials: "Financials",
      details: "Details",
      year: "Year",
      runtime: "Runtime",
      genre: "Genre",
      director: "Director",
      ageRating: "Age Rating",
      quality: "Quality",
      budget: "Budget",
      boxOffice: "Box Office",
      profit: "Net Profit",
      roi: "ROI",
      vs: "VS",
      startOver: "Start over",
    },
    footer: {
      made: "Made for Arab cinema lovers",
    },
    status: {
      profit: "Profitable",
      loss: "Loss",
      breakEven: "Break even",
    },
  },
  ar: {
    brand: "مصر تي في",
    tagline: "أفلام ومسلسلات مصرية. أذكى من آي إم دي بي.",
    nav: {
      home: "الرئيسية",
      movies: "الأفلام",
      upcoming: "قريباً",
      ai: "المساعد الذكي",
      profile: "الملف الشخصي",
      compare: "مقارنة",
    },
    hero: {
      title: "اكتشف أفلاماً تستحق وقتك",
      subtitle:
        "تحليلات الإيرادات، مراجعات ثنائية اللغة، توصيات ذكية — مصممة للجمهور العربي.",
      search: "ابحث عن أفلام، ممثلين، مخرجين...",
      explore: "استكشف الرائج",
    },
    sections: {
      trending: "الرائج الآن",
      topRated: "الأعلى تقييماً",
      upcoming: "يعرض قريباً",
      arabCinema: "أضواء السينما العربية",
    },
    movie: {
      overview: "نبذة",
      analysis: "التحليل المالي",
      ratings: "التقييمات",
      cast: "طاقم التمثيل",
      budget: "الميزانية",
      boxOffice: "إيرادات شباك التذاكر",
      profit: "صافي الربح",
      loss: "صافي الخسارة",
      roi: "العائد على الاستثمار",
      ageRating: "التصنيف العمري",
      contentRating: "حكم الجودة",
      watchTrailer: "شاهد الإعلان",
      addLike: "أضف للمفضلة",
      removeLike: "إزالة من المفضلة",
      addWatchlist: "قائمة المشاهدة",
      aiInsight: "رؤية ذكية",
    },
    ageRatings: {
      G: "لجميع الأعمار",
      PG: "بإرشاد الوالدين",
      "PG-13": "من 13 سنة فأكثر",
      R: "مقيد 17+",
      "18+": "للبالغين فقط",
      NR: "غير مصنف",
    },
    contentRatings: {
      excellent: "لا يُفوَّت",
      good: "يستحق المشاهدة",
      mixed: "آراء متباينة",
      poor: "يمكن تخطيه",
    },
    profile: {
      title: "ملفك الشخصي",
      liked: "الأفلام المفضلة",
      watchlist: "قائمة المشاهدة",
      stats: "إحصائياتك",
      moviesLiked: "أفلام أعجبتك",
      memberSince: "عضو منذ",
      editBio: "نبذة عنك",
    },
    ai: {
      title: "مصر تي في الذكي",
      subtitle: "اطلب توصيات، ملخصات، أو تحليلات إيرادات.",
      placeholder: "مثال: أفضل دراما مصرية 2024؟ هل يستحق مشاهدة Dune 3؟",
      send: "إرسال",
      thinking: "جاري التفكير...",
      suggestions: [
        "اقترح كوميديا عربية ليلة عائلية",
        "أي فيلم مارفل قادم له أفضل عائد استثماري؟",
        "لخص الأداء المالي لفيلم Oppenheimer",
      ],
    },
    filters: {
      all: "الكل",
      excellent: "لا يُفوَّت",
      good: "جيد",
      upcoming: "قادم فقط",
    },
    compare: {
      title: "مقارنة الأفلام",
      subtitle: "اختر فيلمين للمقارنة جنباً إلى جنب في التقييمات والإيرادات والتفاصيل.",
      selectFirst: "اختر الفيلم الأول",
      selectSecond: "اختر الفيلم الثاني",
      ratings: "التقييمات",
      financials: "الإيرادات",
      details: "التفاصيل",
      year: "السنة",
      runtime: "المدة",
      genre: "النوع",
      director: "المخرج",
      ageRating: "التصنيف العمري",
      quality: "الجودة",
      budget: "الميزانية",
      boxOffice: "الإيرادات",
      profit: "صافي الربح",
      roi: "العائد",
      vs: "مقابل",
      startOver: "ابدأ من جديد",
    },
    footer: {
      made: "صُنع لعشاق السينما العربية",
    },
    status: {
      profit: "مربح",
      loss: "خسارة",
      breakEven: "تعادل",
    },
  },
} as const;

export type TranslationKey =
  (typeof translations)[keyof typeof translations];

export function t(locale: Locale): TranslationKey {
  return translations[locale];
}

export function movieTitle(movie: { titleEn: string; titleAr: string }, locale: Locale) {
  return locale === "ar" ? movie.titleAr : movie.titleEn;
}

export function movieOverview(
  movie: { overviewEn: string; overviewAr: string },
  locale: Locale
) {
  return locale === "ar" ? movie.overviewAr : movie.overviewEn;
}
