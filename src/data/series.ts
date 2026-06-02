import type { TVSeries } from "@/types/movie";

export const series: TVSeries[] = [
  {
    id: "s1",
    titleEn: "Grand Hotel",
    titleAr: "جراند أوتيل",
    overviewEn: "A mystery drama set in a luxurious hotel on the Egyptian coast.",
    overviewAr: "دراما غموض تدور في فندق فاخر على الساحل المصري.",
    poster:
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&h=600&fit=crop",
    year: 2016,
    seasons: 1,
    episodes: 30,
    genres: ["Drama", "Mystery"],
    genresAr: ["دراما", "غموض"],
    status: "ended",
    rating: 8.5,
    tags: ["egypt", "drama", "tv"],
  },
  {
    id: "s2",
    titleEn: "Al-Embrator",
    titleAr: "الإمبراطور",
    overviewEn:
      "A biographical series about the life of an Egyptian business tycoon.",
    overviewAr: "مسلسل سيرة ذاتية عن حياة أحد أباطرة الأعمال المصريين.",
    poster:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
    year: 2024,
    seasons: 1,
    episodes: 30,
    genres: ["Drama", "Biography"],
    genresAr: ["دراما", "سيرة ذاتية"],
    status: "ended",
    rating: 8.2,
    tags: ["egypt", "drama", "tv"],
  },
  {
    id: "s3",
    titleEn: "Exceptional",
    titleAr: "استثنائي",
    overviewEn:
      "A talented doctor with autism navigates life and medicine.",
    overviewAr: "طبيب موهوب مصاب بالتوحد يجتاز الحياة والطب.",
    poster:
      "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=400&h=600&fit=crop",
    year: 2024,
    seasons: 1,
    episodes: 15,
    genres: ["Drama", "Medical"],
    genresAr: ["دراما", "طبي"],
    status: "ongoing",
    rating: 8.7,
    tags: ["egypt", "drama", "tv"],
  },
];
