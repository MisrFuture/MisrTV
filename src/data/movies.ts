import type { Movie, UserProfile } from "@/types/movie";

export const movies: Movie[] = [
  {
    id: "1",
    slug: "the-bridge-cairo",
    titleEn: "The Bridge: Cairo Nights",
    titleAr: "الجسر: ليالي القاهرة",
    overviewEn:
      "A gripping drama following three families across the Nile as Cairo transforms overnight. Critically acclaimed across MENA festivals.",
    overviewAr:
      "دراما مؤثرة تتابع ثلاث عائلات عبر النيل بينما تتحول القاهرة بين ليلة وضحاها. حازت إشادة في مهرجانات المنطقة.",
    poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1920&h=800&fit=crop",
    year: 2025,
    runtime: 142,
    genres: ["Drama", "Arab Cinema"],
    genresAr: ["دراما", "سينما عربية"],
    country: "Egypt",
    countryAr: "مصر",
    director: "Youssef Al-Rashid",
    directorAr: "يوسف الرشيد",
    cast: ["Mona Hassan", "Karim Saleh", "Layla Nour"],
    castAr: ["منى حسن", "كريم صالح", "ليلى نور"],
    ageRating: "PG-13",
    contentRating: "excellent",
    status: "released",
    releaseDate: "2025-01-15",
    financials: { budget: 12_000_000, boxOffice: 48_500_000, marketing: 3_200_000 },
    ratings: { imdb: 8.4, rottenTomatoes: 92, misrtv: 9.1, audience: 88 },
    tags: ["cairo", "drama", "arab"],
  },
  {
    id: "2",
    slug: "desert-horizon",
    titleEn: "Desert Horizon",
    titleAr: "أفق الصحراء",
    overviewEn:
      "Epic sci-fi adventure set in a near-future UAE where solar cities rise from the dunes. Blockbuster visuals meet Arab futurism.",
    overviewAr:
      "مغامرة خيال علمي ملحمية في إمارات المستقبل القريب حيث تنهض مدن شمسية من الرمال.",
    poster: "https://images.unsplash.com/photo-1594908900066-3ffed117c000?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=1920&h=800&fit=crop",
    year: 2025,
    runtime: 156,
    genres: ["Sci-Fi", "Action"],
    genresAr: ["خيال علمي", "أكشن"],
    country: "UAE",
    countryAr: "الإمارات",
    director: "Nadia Al-Farsi",
    directorAr: "نادية الفارسي",
    cast: ["Omar Khalil", "Sara Mansour"],
    castAr: ["عمر خليل", "سارة منصور"],
    ageRating: "PG-13",
    contentRating: "good",
    status: "released",
    releaseDate: "2025-02-20",
    financials: { budget: 95_000_000, boxOffice: 312_000_000, marketing: 40_000_000 },
    ratings: { imdb: 7.6, rottenTomatoes: 78, misrtv: 8.0, audience: 82 },
    tags: ["sci-fi", "blockbuster"],
  },
  {
    id: "3",
    slug: "midnight-beirut",
    titleEn: "Midnight Beirut",
    titleAr: "بيروت منتصف الليل",
    overviewEn:
      "A noir thriller through the alleys of Mar Mikhael. Raw, stylish, and unflinching — 18+ for mature themes.",
    overviewAr:
      "إثارة نوار في أزقة مار مخايل. جريئة وناضجة — للبالغين بسبب مواضيع حساسة.",
    poster: "https://images.unsplash.com/photo-1478720568477-152d9b164e63?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1517602306835-4fd2c838c8f6?w=1920&h=800&fit=crop",
    year: 2024,
    runtime: 118,
    genres: ["Thriller", "Crime"],
    genresAr: ["إثارة", "جريمة"],
    country: "Lebanon",
    countryAr: "لبنان",
    director: "Rami Haddad",
    directorAr: "رامي حداد",
    cast: ["Zeina Akar", "Fadi Rouhana"],
    castAr: ["زينة عقار", "فادي روحانا"],
    ageRating: "18+",
    contentRating: "good",
    status: "released",
    releaseDate: "2024-11-08",
    financials: { budget: 4_500_000, boxOffice: 11_200_000, marketing: 1_100_000 },
    ratings: { imdb: 7.9, rottenTomatoes: 85, misrtv: 8.3, audience: 79 },
    tags: ["thriller", "lebanon"],
  },
  {
    id: "4",
    slug: "golden-palm",
    titleEn: "Golden Palm",
    titleAr: "النخلة الذهبية",
    overviewEn:
      "Feel-good family comedy set in an oasis town — perfect for all ages. Critics call it charming if predictable.",
    overviewAr:
      "كوميديا عائلية دافئة في بلدة واحة — مناسبة لجميع الأعمار.",
    poster: "https://images.unsplash.com/photo-1524712245354-2c4e5e6841c9?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1518676590939-590466c3602b?w=1920&h=800&fit=crop",
    year: 2024,
    runtime: 98,
    genres: ["Comedy", "Family"],
    genresAr: ["كوميديا", "عائلي"],
    country: "Morocco",
    countryAr: "المغرب",
    director: "Fatima Bennani",
    directorAr: "فاطمة بناني",
    cast: ["Hassan Idrissi", "Amina Tazi"],
    castAr: ["حسن الإدريسي", "أمينة التازي"],
    ageRating: "PG",
    contentRating: "good",
    status: "released",
    releaseDate: "2024-08-12",
    financials: { budget: 6_000_000, boxOffice: 22_800_000, marketing: 2_000_000 },
    ratings: { imdb: 7.1, rottenTomatoes: 71, misrtv: 7.4, audience: 75 },
    tags: ["family", "comedy"],
  },
  {
    id: "5",
    slug: "echoes-of-petra",
    titleEn: "Echoes of Petra",
    titleAr: "أصداء البتراء",
    overviewEn:
      "Historical adventure uncovering lost Nabataean secrets. Stunning but overstuffed third act hurt box office.",
    overviewAr:
      "مغامرة تاريخية تكشف أسرار الأنباط. بصرياً مذهل لكن الفصل الثالث أضر بالإيرادات.",
    poster: "https://images.unsplash.com/photo-1574267432553-4b4628081c31?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1518670675725-1c2d7ec3a880?w=1920&h=800&fit=crop",
    year: 2024,
    runtime: 134,
    genres: ["Adventure", "History"],
    genresAr: ["مغامرة", "تاريخ"],
    country: "Jordan",
    countryAr: "الأردن",
    director: "Khaled Masri",
    directorAr: "خالد مصري",
    cast: ["Noor Saleem", "Tariq Omari"],
    castAr: ["نور سليم", "طارق عمري"],
    ageRating: "PG-13",
    contentRating: "mixed",
    status: "released",
    releaseDate: "2024-06-01",
    financials: { budget: 55_000_000, boxOffice: 41_000_000, marketing: 18_000_000 },
    ratings: { imdb: 6.4, rottenTomatoes: 58, misrtv: 6.2, audience: 61 },
    tags: ["history", "adventure"],
  },
  {
    id: "6",
    slug: "neon-damascus",
    titleEn: "Neon Damascus",
    titleAr: "دمشق النيون",
    overviewEn:
      "Cyberpunk anthology — bold vision, niche appeal. Expected to grow on streaming.",
    overviewAr:
      "أنولوجيا سايبربانك — رؤية جريئة وجمهور متخصص.",
    poster: "https://images.unsplash.com/photo-1616530940355-351b6023a0b6?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1535016120720-40c6464b4a31?w=1920&h=800&fit=crop",
    year: 2026,
    runtime: 128,
    genres: ["Sci-Fi", "Anthology"],
    genresAr: ["خيال علمي", "مختارات"],
    country: "Syria / International",
    countryAr: "سوريا / دولي",
    director: "Lina Karam",
    directorAr: "لينا كرم",
    cast: ["Various"],
    castAr: ["متعدد"],
    ageRating: "R",
    contentRating: "mixed",
    status: "upcoming",
    releaseDate: "2026-03-14",
    financials: { budget: 18_000_000, boxOffice: 0, marketing: 5_000_000 },
    ratings: { imdb: 0, rottenTomatoes: 0, misrtv: 7.5, audience: 0 },
    tags: ["cyberpunk", "upcoming"],
  },
  {
    id: "7",
    slug: "red-sea-legacy",
    titleEn: "Red Sea Legacy",
    titleAr: "إرث البحر الأحمر",
    overviewEn:
      "Saudi-produced action epic — massive regional premiere slated for Eid.",
    overviewAr:
      "ملحمة أكشن سعودية — عرض إقليمي ضخم متوقع في العيد.",
    poster: "https://images.unsplash.com/photo-1598899134739-0b265bd1a51b?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1515634928627-144a5873a0b0?w=1920&h=800&fit=crop",
    year: 2026,
    runtime: 148,
    genres: ["Action", "War"],
    genresAr: ["أكشن", "حرب"],
    country: "Saudi Arabia",
    countryAr: "السعودية",
    director: "Faisal Al-Dosari",
    directorAr: "فيصل الدوسري",
    cast: ["Bandar Al-Saud", "Reem Al-Ghamdi"],
    castAr: ["بندر السعود", "ريم الغامدي"],
    ageRating: "PG-13",
    contentRating: "excellent",
    status: "upcoming",
    releaseDate: "2026-06-20",
    financials: { budget: 120_000_000, boxOffice: 0, marketing: 35_000_000 },
    ratings: { imdb: 0, rottenTomatoes: 0, misrtv: 8.8, audience: 0 },
    tags: ["action", "saudi", "upcoming"],
  },
  {
    id: "8",
    slug: "studio-zero",
    titleEn: "Studio Zero",
    titleAr: "استوديو صفر",
    overviewEn:
      "Low-budget horror that became a cult disaster — fascinating flop case study.",
    overviewAr:
      "رعب منخفض الميزانية أصبح كارثة جماهيرية — دراسة فشل مثيرة.",
    poster: "https://images.unsplash.com/photo-1509281373149-e957c6296406?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=1920&h=800&fit=crop",
    year: 2023,
    runtime: 87,
    genres: ["Horror"],
    genresAr: ["رعب"],
    country: "Egypt",
    countryAr: "مصر",
    director: "Hani Mostafa",
    directorAr: "هاني مصطفى",
    cast: ["Unknown ensemble"],
    castAr: ["طاقم متنوع"],
    ageRating: "R",
    contentRating: "poor",
    status: "released",
    releaseDate: "2023-10-31",
    financials: { budget: 800_000, boxOffice: 210_000, marketing: 150_000 },
    ratings: { imdb: 3.2, rottenTomatoes: 12, misrtv: 2.8, audience: 25 },
    tags: ["horror", "flop"],
  },
];

export const defaultUser: UserProfile = {
  id: "misrtv-user",
  name: "MisrTV Member",
  nameAr: "عضو مصر تي في",
  email: "member@misrtv.app",
  avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013b?w=200&h=200&fit=crop",
  bio: "Exploring Egyptian movies and TV on MisrTV.",
  bioAr: "أستكشف الأفلام والمسلسلات المصرية على مصر تي في.",
  region: "Egypt",
  regionAr: "مصر",
  joined: "2025-01-01",
  likedMovieIds: ["1", "2", "4"],
  watchlistIds: ["6", "7"],
};

export function getMovieBySlug(slug: string): Movie | undefined {
  return movies.find((m) => m.slug === slug);
}

export function getMovieById(id: string): Movie | undefined {
  return movies.find((m) => m.id === id);
}

export function getFinancialSummary(movie: Movie) {
  const { budget, boxOffice, marketing = 0 } = movie.financials;
  const totalCost = budget + marketing;
  const net = boxOffice - totalCost;
  const roi = totalCost > 0 ? ((boxOffice - totalCost) / totalCost) * 100 : 0;
  const status: "profit" | "loss" | "breakEven" =
    net > 1_000_000 ? "profit" : net < -1_000_000 ? "loss" : "breakEven";
  return { budget, boxOffice, marketing, totalCost, net, roi, status };
}

export function getTrendingMovies(): Movie[] {
  return [...movies]
    .filter((m) => m.status === "released")
    .sort((a, b) => b.ratings.misrtv - a.ratings.misrtv)
    .slice(0, 6);
}

export function getUpcomingMovies(): Movie[] {
  return movies.filter((m) => m.status === "upcoming");
}

export function getArabCinemaMovies(): Movie[] {
  return movies.filter(
    (m) =>
      m.tags.includes("arab") ||
      ["Egypt", "Lebanon", "Morocco", "Jordan", "UAE", "Saudi Arabia"].some(
        (c) => m.country.includes(c)
      )
  );
}
