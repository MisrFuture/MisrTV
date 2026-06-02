export interface Person {
  id: string;
  name: string;
  nameAr: string;
  image: string;
  role: "actor" | "director";
  bio: string;
  bioAr: string;
  knownFor: string[];
}

export const people: Person[] = [
  {
    id: "p1",
    name: "Karim Abdel Aziz",
    nameAr: "كريم عبد العزيز",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    role: "actor",
    bio: "One of Egypt's most popular actors, known for The Blue Elephant series.",
    bioAr: "أحد أشهر الممثلين في مصر، اشتهر بسلسلة الفيل الأزرق.",
    knownFor: ["31", "32", "55"],
  },
  {
    id: "p2",
    name: "Ahmed Ezz",
    nameAr: "أحمد عز",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
    role: "actor",
    bio: "Leading Egyptian actor known for action and drama films.",
    bioAr: "ممثل مصري رائد يشتهر بأفلام الأكشن والدراما.",
    knownFor: ["53", "56", "57"],
  },
  {
    id: "p3",
    name: "Marwan Hamed",
    nameAr: "مروان حامد",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
    role: "director",
    bio: "Award-winning Egyptian director of The Blue Elephant and The Night of Akbar's Death.",
    bioAr: "مخرج مصري حائز على جوائز عن الفيل الأزرق وليلة موت أكبر.",
    knownFor: ["20", "31", "32"],
  },
];
