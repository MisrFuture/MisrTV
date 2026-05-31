import type { Movie, UserProfile } from "@/types/movie";

function m(
  id: string,
  slug: string,
  titleEn: string,
  titleAr: string,
  overviewEn: string,
  overviewAr: string,
  posterId: string,
  backdropId: string,
  year: number,
  runtime: number,
  genres: string[],
  genresAr: string[],
  country: string,
  countryAr: string,
  director: string,
  directorAr: string,
  cast: string[],
  castAr: string[],
  ageRating: Movie["ageRating"],
  contentRating: Movie["contentRating"],
  status: Movie["status"],
  releaseDate: string,
  budget: number,
  boxOffice: number,
  marketing: number,
  imdb: number,
  rt: number,
  misrtv: number,
  audience: number,
  tags: string[]
): Movie {
  return {
    id, slug, titleEn, titleAr, overviewEn, overviewAr,
    poster: `https://images.unsplash.com/${posterId}?w=400&h=600&fit=crop`,
    backdrop: `https://images.unsplash.com/${backdropId}?w=1920&h=800&fit=crop`,
    year, runtime, genres, genresAr, country, countryAr,
    director, directorAr, cast, castAr,
    ageRating, contentRating, status, releaseDate,
    financials: { budget, boxOffice, marketing },
    ratings: { imdb, rottenTomatoes: rt, misrtv, audience }, tags,
  };
}

export const movies: Movie[] = [
  // === ARAB CINEMA ===
  m("1","el-warsha","El Warsha","الورشة",
    "A gritty drama inside a Cairo metal workshop where three brothers fight to keep their father's legacy alive amid economic collapse.",
    "دراما قاسية داخل ورشة معادن في القاهرة حيث ثلاثة إخوة يقاتلون للحفاظ على إرث والدهم amid الانهيار الاقتصادي.",
    "photo-1536440136628-849c177e76a1","photo-1489599849927-2ee91cede3ba",
    2025,142,["Drama","Arab Cinema"],["دراما","سينما عربية"],
    "Egypt","مصر","Mariam Abou Ouf","مريم أبو عوف",
    ["Ahmed Helmy","Karim Abdel Aziz","Yousra"],["أحمد حلمي","كريم عبد العزيز","يسرا"],
    "PG-13","excellent","released","2025-01-15",12e6,48.5e6,3.2e6,8.4,92,9.1,88,["cairo","drama","arab","egypt"]),

  m("2","desert-horizon","Desert Horizon","أفق الصحراء",
    "Epic sci-fi adventure set in a near-future UAE where solar cities rise from the dunes. Blockbuster visuals meet Arab futurism.",
    "مغامرة خيال علمي ملحمية في إمارات المستقبل القريب حيث تنهض مدن شمسية من الرمال.",
    "photo-1594908900066-3ffed117c000","photo-1440404653325-ab127d49abc1",
    2025,156,["Sci-Fi","Action"],["خيال علمي","أكشن"],
    "UAE","الإمارات","Nadia Al-Farsi","نادية الفارسي",
    ["Omar Khalil","Sara Mansour"],["عمر خليل","سارة منصور"],
    "PG-13","good","released","2025-02-20",95e6,312e6,40e6,7.6,78,8.0,82,["sci-fi","blockbuster","arab"]),

  m("3","midnight-beirut","Midnight Beirut","بيروت منتصف الليل",
    "A noir thriller through the alleys of Mar Mikhael. Raw, stylish, and unflinching.",
    "إثارة نوار في أزقة مار مخايل. جريئة وناضجة.",
    "photo-1478720568477-152d9b164e63","photo-1517602306835-4fd2c838c8f6",
    2024,118,["Thriller","Crime"],["إثارة","جريمة"],
    "Lebanon","لبنان","Rami Haddad","رامي حداد",
    ["Zeina Akar","Fadi Rouhana"],["زينة عقار","فادي روحانا"],
    "18+","good","released","2024-11-08",4.5e6,11.2e6,1.1e6,7.9,85,8.3,79,["thriller","lebanon","arab"]),

  m("4","golden-palm","Golden Palm","النخلة الذهبية",
    "Feel-good family comedy set in an oasis town — perfect for all ages.",
    "كوميديا عائلية دافئة في بلدة واحة.",
    "photo-1524712245354-2c4e5e6841c9","photo-1518676590939-590466c3602b",
    2024,98,["Comedy","Family"],["كوميديا","عائلي"],
    "Morocco","المغرب","Fatima Bennani","فاطمة بناني",
    ["Hassan Idrissi","Amina Tazi"],["حسن الإدريسي","أمينة التازي"],
    "PG","good","released","2024-08-12",6e6,22.8e6,2e6,7.1,71,7.4,75,["family","comedy","arab"]),

  m("5","echoes-of-petra","Echoes of Petra","أصداء البتراء",
    "Historical adventure uncovering lost Nabataean secrets. Stunning but overstuffed third act hurt box office.",
    "مغامرة تاريخية تكشف أسرار الأنباط. بصرياً مذهل لكن الفصل الثالث أضر بالإيرادات.",
    "photo-1574267432553-4b4628081c31","photo-1518670675725-1c2d7ec3a880",
    2024,134,["Adventure","History"],["مغامرة","تاريخ"],
    "Jordan","الأردن","Khaled Masri","خالد مصري",
    ["Noor Saleem","Tariq Omari"],["نور سليم","طارق عمري"],
    "PG-13","mixed","released","2024-06-01",55e6,41e6,18e6,6.4,58,6.2,61,["history","adventure","arab"]),

  m("6","neon-damascus","Neon Damascus","دمشق النيون",
    "Cyberpunk anthology — bold vision, niche appeal. Expected to grow on streaming.",
    "أنولوجيا سايبربانك — رؤية جريئة وجمهور متخصص.",
    "photo-1616530940355-351b6023a0b6","photo-1535016120720-40c6464b4a31",
    2026,128,["Sci-Fi","Anthology"],["خيال علمي","مختارات"],
    "Syria / International","سوريا / دولي","Lina Karam","لينا كرم",
    ["Various"],["متعدد"],"R","mixed","upcoming","2026-03-14",18e6,0,5e6,0,0,7.5,0,["cyberpunk","upcoming","arab"]),

  m("7","red-sea-legacy","Red Sea Legacy","إرث البحر الأحمر",
    "Saudi-produced action epic — massive regional premiere slated for Eid.",
    "ملحمة أكشن سعودية — عرض إقليمي ضخم متوقع في العيد.",
    "photo-1598899134739-0b265bd1a51b","photo-1515634928627-144a5873a0b0",
    2026,148,["Action","War"],["أكشن","حرب"],
    "Saudi Arabia","السعودية","Faisal Al-Dosari","فيصل الدوسري",
    ["Bandar Al-Saud","Reem Al-Ghamdi"],["بندر السعود","ريم الغامدي"],
    "PG-13","excellent","upcoming","2026-06-20",120e6,0,35e6,0,0,8.8,0,["action","saudi","upcoming","arab"]),

  m("8","studio-zero","Studio Zero","استوديو صفر",
    "Low-budget horror that became a cult disaster — fascinating flop case study.",
    "رعب منخفض الميزانية أصبح كارثة جماهيرية.",
    "photo-1509281373149-e957c6296406","photo-1517604931442-7e0c8ed2963c",
    2023,87,["Horror"],["رعب"],"Egypt","مصر","Hani Mostafa","هاني مصطفى",
    ["Unknown ensemble"],["طاقم متنوع"],"R","poor","released","2023-10-31",0.8e6,0.21e6,0.15e6,3.2,12,2.8,25,["horror","flop","arab"]),

  // === INTERNATIONAL BLOCKBUSTERS ===
  m("9","oppenheimer","Oppenheimer","أوبنهايمر",
    "The story of J. Robert Oppenheimer and the atomic bomb. Nolan's masterpiece swept the Oscars.",
    "قصة ج. روبرت أوبنهايمر والقنبلة الذرية. تحفة نولان اكتسحت الأوسكار.",
    "photo-1440404653325-ab127d49abc1","photo-1489599849927-2ee91cede3ba",
    2023,180,["Biography","Drama","History"],["سيرة ذاتية","دراما","تاريخ"],
    "USA / UK","الولايات المتحدة / بريطانيا","Christopher Nolan","كريستوفر نولان",
    ["Cillian Murphy","Robert Downey Jr.","Emily Blunt"],["كيليان مورفي","روبرت داوني جونيور","إيميلي بلانت"],
    "R","excellent","released","2023-07-21",100e6,975e6,65e6,8.4,93,9.5,90,["oscar","biopic","blockbuster"]),

  m("10","dune-part-two","Dune: Part Two","كثيب: الجزء الثاني",
    "Paul Atreides unites with the Fremen to seek revenge against those who destroyed his family.",
    "يتحد بول أتريديز مع الفريمن للانتقام من أولئك الذين دمروا عائلته.",
    "photo-1536440136628-849c177e76a1","photo-1517602306835-4fd2c838c8f6",
    2024,166,["Sci-Fi","Adventure"],["خيال علمي","مغامرة"],
    "USA / Canada","الولايات المتحدة / كندا","Denis Villeneuve","دينيس فيلنوف",
    ["Timothée Chalamet","Zendaya","Rebecca Ferguson"],["تيموثي شالاماي","زيندايا","ريبيكا فيرغسون"],
    "PG-13","excellent","released","2024-03-01",190e6,714e6,80e6,8.6,92,9.3,89,["sci-fi","epic","blockbuster"]),

  m("11","the-batman","The Batman","باتمان",
    "When a serial killer targets Gotham's elite, Batman uncovers a web of corruption.",
    "عندما يستهدف قاتل متسلسل نخبة جوثام، يكشف باتمان شبكة فساد.",
    "photo-1594908900066-3ffed117c000","photo-1440404653325-ab127d49abc1",
    2022,176,["Action","Crime","Drama"],["أكشن","جريمة","دراما"],
    "USA","الولايات المتحدة","Matt Reeves","مات ريفز",
    ["Robert Pattinson","Zoë Kravitz","Paul Dano"],["روبرت باتينسون","زوي كرافيتز","بول دانو"],
    "PG-13","excellent","released","2022-03-04",200e6,772e6,80e6,7.8,85,8.5,83,["superhero","noir","blockbuster"]),

  m("12","everything-everywhere","Everything Everywhere All at Once","كل شيء في كل مكان دفعة واحدة",
    "An aging Chinese immigrant gets swept up in an insane adventure where she alone can save the world.",
    "مُهاجرة صينية مسنة تجد نفسها في مغامرة لا تصدق حيث يمكنها وحدها إنقاذ العالم.",
    "photo-1524712245354-2c4e5e6841c9","photo-1518676590939-590466c3602b",
    2022,139,["Action","Adventure","Comedy"],["أكشن","مغامرة","كوميديا"],
    "USA","الولايات المتحدة","Daniel Kwan & Daniel Scheinert","دانييل كوان ودانييل شاينرت",
    ["Michelle Yeoh","Ke Huy Quan","Stephanie Hsu"],["ميشيل يوه","كي هوي كوان","ستيفاني هسو"],
    "R","excellent","released","2022-03-25",25e6,143e6,10e6,7.8,93,8.9,86,["oscar","indie","multiverse"]),

  m("13","spider-verse","Spider-Man: Across the Spider-Verse","الرجل العنكبوت: عبر عالم العنكبوت",
    "Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People.",
    "ينطلق مايلز موراليس عبر الأكوان المتعددة حيث يواجه فريقاً من أناس العنكبوت.",
    "photo-1616530940355-351b6023a0b6","photo-1535016120720-40c6464b4a31",
    2023,140,["Animation","Action","Adventure"],["رسوم متحركة","أكشن","مغامرة"],
    "USA","الولايات المتحدة","Joaquim Dos Santos","جواكيم دوس سانتوس",
    ["Shameik Moore","Hailee Steinfeld","Oscar Isaac"],["شاميك مور","هايلي ستاينفيلد","أوسكار إسحاق"],
    "PG","excellent","released","2023-06-02",100e6,690e6,60e6,8.7,96,9.4,91,["animation","superhero","blockbuster"]),

  m("14","top-gun-maverick","Top Gun: Maverick","توب غان: مافريك",
    "After 30 years as a top naval aviator, Maverick confronts ghosts of his past while training a new squad.",
    "بعد 30 عاماً كطيار بحري نخبة، يواجه مافريك أشباح ماضيه أثناء تدريب فريق جديد.",
    "photo-1478720568477-152d9b164e63","photo-1489599849927-2ee91cede3ba",
    2022,130,["Action","Drama"],["أكشن","دراما"],
    "USA","الولايات المتحدة","Joseph Kosinski","جوزيف كوسينسكي",
    ["Tom Cruise","Miles Teller","Jennifer Connelly"],["توم كروز","مايلز تيلر","جينيفر كونلي"],
    "PG-13","excellent","released","2022-05-27",170e6,1.496e9,70e6,8.3,96,9.2,94,["aviation","sequel","blockbuster"]),

  m("15","parasite","Parasite","طفيلي",
    "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
    "الجشع والتمييز الطبقي يهددان العلاقة التكافلية بين عائلة بارك الثرية وعائلة كيم المعدمة.",
    "photo-1509281373149-e957c6296406","photo-1518676590939-590466c3602b",
    2019,132,["Drama","Thriller","Comedy"],["دراما","إثارة","كوميديا"],
    "South Korea","كوريا الجنوبية","Bong Joon-ho","بونغ جون هو",
    ["Song Kang-ho","Lee Sun-kyun","Cho Yeo-jeong"],["سونغ كانغ هو","لي سون كيون","تشو ييو جيونغ"],
    "R","excellent","released","2019-05-30",11e6,262e6,5e6,8.5,98,9.0,89,["oscar","korean","masterpiece"]),

  m("16","interstellar","Interstellar","بين النجوم",
    "When Earth becomes uninhabitable, a team of explorers travels through a wormhole in search of a new home.",
    "عندما تصبح الأرض غير صالحة للسكن، يسافر فريق عبر ثقب دودي للبحث عن وطن جديد.",
    "photo-1491841573634-28140fc7ced7","photo-1517604931442-7e0c8ed2963c",
    2014,169,["Sci-Fi","Adventure","Drama"],["خيال علمي","مغامرة","دراما"],
    "USA / UK","الولايات المتحدة / بريطانيا","Christopher Nolan","كريستوفر نولان",
    ["Matthew McConaughey","Anne Hathaway","Jessica Chastain"],["ماثيو ماكونهي","آن هاثاواي","جيسيكا شاستين"],
    "PG-13","excellent","released","2014-11-07",165e6,773e6,50e6,8.7,87,9.4,88,["space","nolan","masterpiece"]),

  m("17","the-dark-knight","The Dark Knight","فارس الظلام",
    "When a menace known as the Joker wreaks havoc on Gotham, Batman must accept one of the greatest tests.",
    "عندما يسبب الجوكر الفوضى في جوثام، على باتمان مواجهة أحد أعظم اختباراته.",
    "photo-1598899134739-0b265bd1a51b","photo-1440404653325-ab127d49abc1",
    2008,152,["Action","Crime","Drama"],["أكشن","جريمة","دراما"],
    "USA / UK","الولايات المتحدة / بريطانيا","Christopher Nolan","كريستوفر نولان",
    ["Christian Bale","Heath Ledger","Aaron Eckhart"],["كريستيان بيل","هيث ليدجر","آرون إيكهارت"],
    "PG-13","excellent","released","2008-07-18",185e6,1.006e9,60e6,9.0,94,9.7,93,["superhero","nolan","masterpiece"]),

  m("18","inception","Inception","استهلال",
    "A thief who steals corporate secrets through dream-sharing technology is given the task of planting an idea.",
    "لص يسرق أسرار الشركات عبر تقنية مشاركة الأحلام يُكلف بمهمة زرع فكرة.",
    "photo-1594908900066-3ffed117c000","photo-1535016120720-40c6464b4a31",
    2010,148,["Action","Adventure","Sci-Fi"],["أكشن","مغامرة","خيال علمي"],
    "USA / UK","الولايات المتحدة / بريطانيا","Christopher Nolan","كريستوفر نولان",
    ["Leonardo DiCaprio","Joseph Gordon-Levitt","Elliot Page"],["ليوناردو دي كابريو","جوزيف غوردون ليفيت","إليوت بيج"],
    "PG-13","excellent","released","2010-07-16",160e6,839e6,50e6,8.8,87,9.5,89,["dreams","nolan","masterpiece"]),

  m("19","the-matrix","The Matrix","ماتريكس",
    "A computer hacker learns about the true nature of his reality and his role in the war against its controllers.",
    "هاكر كمبيوتر يكتشف الحقيقة حول واقعه ودوره في الحرب ضد المسيطرين.",
    "photo-1536440136628-849c177e76a1","photo-1489599849927-2ee91cede3ba",
    1999,136,["Action","Sci-Fi"],["أكشن","خيال علمي"],
    "USA","الولايات المتحدة","The Wachowskis","الأخوات واتشوسكي",
    ["Keanu Reeves","Laurence Fishburne","Carrie-Anne Moss"],["كيلو ريفز","لورنس فيشبورن","كاري آن موس"],
    "R","excellent","released","1999-03-31",63e6,467e6,30e6,8.7,87,9.3,88,["sci-fi","cult","masterpiece"]),

  // === ARAB CLASSICS & REGIONAL HITS ===
  m("20","the-night-akbar","The Night of Akbar's Death","ليلة موت أكبر",
    "A powerful Egyptian drama about family secrets and betrayal set in 1960s Alexandria.",
    "دراما مصرية قوية عن أسرار العائلة والخيانة في إسكندرية الستينيات.",
    "photo-1524712245354-2c4e5e6841c9","photo-1515634928627-144a5873a0b0",
    2023,135,["Drama","Mystery"],["دراما","غموض"],
    "Egypt","مصر","Marwan Hamed","مروان حامد",
    ["Yehia El-Fakharany","Nabila Ebeid"],["يحيى الفخراني","نبيلة عبيد"],
    "PG-13","excellent","released","2023-04-12",8e6,25e6,2.5e6,8.2,88,8.8,84,["egypt","drama","classic"]),

  m("21","al-risala","Al-Risala (The Message)","الرسالة",
    "Epic historical drama about the birth of Islam directed by the legendary Moustapha Akkad.",
    "دراما تاريخية ملحمية عن نشأة الإسلام من إخراج الأسطوري مصطفى العقاد.",
    "photo-1574267432553-4b4628081c31","photo-1518670675725-1c2d7ec3a880",
    1976,177,["History","Drama"],["تاريخ","دراما"],
    "Lebanon / Libya","لبنان / ليبيا","Moustapha Akkad","مصطفى العقاد",
    ["Anthony Quinn","Irene Papas","Michael Ansara"],["أنتوني كوين","إيرين باباس","مايكل أنصارا"],
    "PG","excellent","released","1976-07-31",10e6,0,0,8.3,90,9.1,87,["classic","islamic","history"]),

  m("22","yomeddine","Yomeddine","يوم الدين",
    "A Coptic leper journeys from his colony to his hometown with a young Nubian boy. Egypt's submission for the Oscars.",
    "أبرص قبطي يرحل من مستعمرته لبلده مع صبي نوبي. ترشيح مصر للأوسكار.",
    "photo-1509281373149-e957c6296406","photo-1517602306835-4fd2c838c8f6",
    2018,97,["Drama","Adventure"],["دراما","مغامرة"],
    "Egypt","مصر","Abu Bakr Shawky","أبو بكر شوقي",
    ["Rady Gamal","Ahmed Abdelhafiz","Shahira Fahmy"],["راضي جمال","أحمد عبد الحفيظ","شهيرة فهمي"],
    "PG-13","good","released","2018-12-12",1.5e6,3.5e6,0.5e6,7.4,79,7.8,76,["egypt","drama","festival"]),

  m("23","cairo-conspiracy","Cairo Conspiracy","مؤامرة القاهرة",
    "A Swedish-Egyptian thriller set inside Cairo's Al-Azhar University. Won Best Screenplay at Cannes.",
    "إثارة سويدية مصرية داخل جامعة الأزهر. فاز بجائزة أفضل سيناريو في كان.",
    "photo-1616530940355-351b6023a0b6","photo-1517604931442-7e0c8ed2963c",
    2022,126,["Thriller","Drama"],["إثارة","دراما"],
    "Egypt / Sweden","مصر / السويد","Tarik Saleh","طارق صالح",
    ["Tawfeek Barhom","Fares Fares","Mohammad Bakri"],["توفيق برهوم","فارس فارس","محمد بكري"],
    "R","excellent","released","2022-05-20",3e6,5.5e6,1e6,7.5,83,8.1,78,["cairo","thriller","festival"]),

  // === UPCOMING RELEASES ===
  m("24","the-scorpion-king-2026","Scorpion King: Awakening","صحن العقرب: اليقظة",
    "The iconic Egyptian warrior returns in a prequel set during the unification of Upper and Lower Egypt.",
    "المحارب المصري الأسطوري يعود في برقول عن توحيد مصر العليا والسفلى.",
    "photo-1598899134739-0b265bd1a51b","photo-1440404653325-ab127d49abc1",
    2026,155,["Action","Fantasy","History"],["أكشن","فنتازيا","تاريخ"],
    "Egypt / USA","مصر / الولايات المتحدة","Khaled Youssef","خالد يوسف",
    ["Mohamed Mamdouh","Asser Yassin"],["محمد ممدوح","آسر ياسين"],
    "PG-13","good","upcoming","2026-09-15",85e6,0,30e6,0,0,8.2,0,["egypt","epic","upcoming","arab"]),

  m("25","mars-2126","Mars 2126","المريخ 2126",
    "The first Arab mission to Mars encounters an alien civilization beneath the red planet's surface.",
    "أول مهمة عربية للمريخ تصادف حضارة فضائية تحت سطح الكوكب الأحمر.",
    "photo-1491841573634-28140fc7ced7","photo-1489599849927-2ee91cede3ba",
    2026,168,["Sci-Fi","Thriller"],["خيال علمي","إثارة"],
    "UAE / Egypt","الإمارات / مصر","Ali F. Mostafa","علي ف. مصطفى",
    ["Adele", "Zayed Al-Hussein"],["عادل","زايد الحسين"],
    "PG-13","excellent","upcoming","2026-11-05",150e6,0,50e6,0,0,9.0,0,["sci-fi","space","upcoming","arab"]),

  m("26","the-walls-of-jerash","Walls of Jerash","أسوار جرش",
    "Roman-era epic filmed entirely in Jordan. A centurion's redemption story.",
    "ملحمة رومانية تُصور بالكامل في الأردن. قصة خلاص قائد سنتيريون.",
    "photo-1478720568477-152d9b164e63","photo-1535016120720-40c6464b4a31",
    2026,142,["Action","History"],["أكشن","تاريخ"],
    "Jordan","الأردن","Amin Matalqa","أمين مطالقة",
    ["Ali Suliman","Nadine Labaki"],["علي سليمان","نادين لبكي"],
    "PG-13","good","upcoming","2026-08-01",45e6,0,12e6,0,0,7.8,0,["jordan","history","upcoming","arab"]),

  // === POPULAR INTERNATIONAL ===
  m("27","gladiator-2","Gladiator II","الجلاد 2",
    "Years after the death of Maximus, Lucius must fight for Rome's future in the Colosseum.",
    "بعد سنوات من موت ماكسيموس، على لوسيوس القتال من أجل مستقبل روما في الكولوسيوم.",
    "photo-1594908900066-3ffed117c000","photo-1517602306835-4fd2c838c8f6",
    2024,148,["Action","Adventure","Drama"],["أكشن","مغامرة","دراما"],
    "USA / UK","الولايات المتحدة / بريطانيا","Ridley Scott","ريدلي سكوت",
    ["Paul Mescal","Denzel Washington","Pedro Pascal"],["بول ميسكال","دينزل واشنطن","بيدرو باسكال"],
    "R","good","released","2024-11-22",250e6,410e6,100e6,7.0,71,7.5,75,["epic","sequel","blockbuster"]),

  m("28","wicked","Wicked","شريرة",
    "The untold story of the witches of Oz. One born with emerald-green skin has yet to discover her power.",
    "القصة غير المروية لساحرات أوز. واحدة مولودة ببشرة خضراء زمردية لم تكتشف قوتها بعد.",
    "photo-1524712245354-2c4e5e6841c9","photo-1518676590939-590466c3602b",
    2024,160,["Musical","Fantasy"],["موسيقي","فنتازيا"],
    "USA","الولايات المتحدة","Jon M. Chu","جون إم تشو",
    ["Cynthia Erivo","Ariana Grande","Jonathan Bailey"],["سينثيا إريفو","أريانا غراندي","جوناثان بيلي"],
    "PG","excellent","released","2024-11-27",145e6,682e6,75e6,8.2,90,8.7,87,["musical","fantasy","blockbuster"]),

  m("29","deadpool-wolverine","Deadpool & Wolverine","ديدبول وولفرين",
    "The merc with a mouth teams up with the clawed mutant for a multiverse-spanning adventure.",
    "المرتزق ثرثار يتعاون مع المتحول المخالب لمغامرة عبر الأكوان.",
    "photo-1616530940355-351b6023a0b6","photo-1440404653325-ab127d49abc1",
    2024,128,["Action","Comedy","Adventure"],["أكشن","كوميديا","مغامرة"],
    "USA","الولايات المتحدة","Shawn Levy","شون ليفي",
    ["Ryan Reynolds","Hugh Jackman","Emma Corrin"],["ريان رينولدز","هيو جاكمان","إيما كورين"],
    "R","good","released","2024-07-26",200e6,1.338e9,80e6,7.7,78,8.1,83,["superhero","marvel","comedy"]),

  m("30","dune-part-three","Dune: Part Three (Messiah)","كثيب: الجزء الثالث (المسيح)",
    "Paul Atreides faces the consequences of his jihad as the universe descends into chaos.",
    "يواجه بول أتريديس عواقب جهاده بينما ينزلق الكون في الفوضى.",
    "photo-1536440136628-849c177e76a1","photo-1517604931442-7e0c8ed2963c",
    2026,175,["Sci-Fi","Drama"],["خيال علمي","دراما"],
    "USA / Canada","الولايات المتحدة / كندا","Denis Villeneuve","دينيس فيلنوف",
    ["Timothée Chalamet","Zendaya","Anya Taylor-Joy"],["تيموثي شالاماي","زيندايا","أنيا تايلور جوي"],
    "PG-13","excellent","upcoming","2026-12-18",220e6,0,80e6,0,0,9.2,0,["sci-fi","epic","upcoming","blockbuster"]),

  // === MORE ARAB CINEMA ===
  m("31","blue-elephant","The Blue Elephant","الفيل الأزرق",
    "A psychiatrist discovers dark secrets when he takes a job at a mental institution where his ex-wife is a patient.",
    "طبيب نفسي يكتشف أسراراً مظلمة في مصحة عقلية حيث مطلقته مريضة.",
    "photo-1509281373149-e957c6296406","photo-1489599849927-2ee91cede3ba",
    2014,160,["Thriller","Drama","Horror"],["إثارة","دراما","رعب"],
    "Egypt","مصر","Marwan Hamed","مروان حامد",
    ["Karim Abdel Aziz","Nelly Karim","Sherif Mounir"],["كريم عبد العزيز","نيللي كريم","شريف منير"],
    "PG-13","excellent","released","2014-06-15",5e6,22e6,2e6,8.1,85,8.6,82,["egypt","thriller","bestseller"]),

  m("32","blue-elephant-2","The Blue Elephant 2","الفيل الأزرق 2",
    "Dr. Yehia returns to face new terrors inside the Abbasiya mental hospital.",
    "الدكتور يحيى يعود لمواجهة أهوال جديدة داخل مستشفى العباسية للأمراض العقلية.",
    "photo-1478720568477-152d9b164e63","photo-1518670675725-1c2d7ec3a880",
    2019,165,["Thriller","Drama","Horror"],["إثارة","دراما","رعب"],
    "Egypt","مصر","Marwan Hamed","مروان حامد",
    ["Karim Abdel Aziz","Nelly Karim","Hend Sabry"],["كريم عبد العزيز","نيللي كريم","هند صبري"],
    "PG-13","good","released","2019-08-15",8e6,30e6,3e6,7.6,75,8.1,79,["egypt","thriller","sequel"]),

  m("33","asphalt-flowers","Asphalt Flowers","زهور الأسفلت",
    "A heart-wrenching drama about street children in Cairo. Won multiple awards at Carthage Film Festival.",
    "دراما مفجعة عن أطفال الشوارع في القاهرة. فاز بعدة جوائز في مهرجان قرطاج.",
    "photo-1574267432553-4b4628081c31","photo-1515634928627-144a5873a0b0",
    2023,112,["Drama","Social"],["دراما","اجتماعي"],
    "Tunisia / Egypt","تونس / مصر","Kaouther Ben Hania","كوثر بن هنية",
    ["Hend Sabry","Dhaffer L'Abidine"],["هند صبري","ظافر العابدين"],
    "PG-13","good","released","2023-02-10",2e6,8e6,0.8e6,7.8,82,8.3,80,["tunisia","drama","social"]),

  m("34","wadjda","Wadjda","وجدة",
    "The first feature film shot entirely in Saudi Arabia. A young girl dreams of owning a bicycle.",
    "أول فيلم روائي يُصور بالكامل في السعودية. فتاة صغيرة تحلم بامتلاك دراجة.",
    "photo-1598899134739-0b265bd1a51b","photo-1517602306835-4fd2c838c8f6",
    2012,98,["Drama","Comedy"],["دراما","كوميديا"],
    "Saudi Arabia / Germany","السعودية / ألمانيا","Haifaa Al-Mansour","هيفاء المنصور",
    ["Waad Mohammed","Reem Abdullah","Abdullrahman Al Gohani"],["وعد محمد","ريم عبد الله","عبد الرحمن الجهني"],
    "PG","excellent","released","2012-09-01",3e6,15e6,1e6,8.1,91,8.7,85,["saudi","pioneer","festival"]),

  m("35","cairo-station","Cairo Station","باب الحديد",
    "A classic Egyptian film by Youssef Chahine about a newspaper seller obsessed with a lemonade girl.",
    "فيلم مصري كلاسيكي ليوسف شاهين عن بائع صحف مهووس بفتاة عصير الليمون.",
    "photo-1491841573634-28140fc7ced7","photo-1440404653325-ab127d49abc1",
    1958,77,["Drama","Thriller","Classic"],["دراما","إثارة","كلاسيكي"],
    "Egypt","مصر","Youssef Chahine","يوسف شاهين",
    ["Farid Shawqi","Hind Rostom","Youssef Chahine"],["فريد شوقي","هند رستم","يوسف شاهين"],
    "PG","excellent","released","1958-01-04",0.1e6,0,0,8.5,96,9.3,90,["classic","egypt","masterpiece"]),

  // === MORE INTERNATIONAL HITS ===
  m("36","avatar-2","Avatar: The Way of Water","أفاتار: طريق الماء",
    "Jake Sully lives with his newfound family on the planet Pandora. When an old threat returns, he must fight again.",
    "جيك سولي يعيش مع عائلته على كوكب باندورا. عندما يعود تهديد قديم، عليه القتال مجدداً.",
    "photo-1594908900066-3ffed117c000","photo-1535016120720-40c6464b4a31",
    2022,192,["Action","Adventure","Fantasy"],["أكشن","مغامرة","فنتازيا"],
    "USA","الولايات المتحدة","James Cameron","جيمس كاميرون",
    ["Sam Worthington","Zoe Saldaña","Kate Winslet"],["سام ورذنغتون","زوي سالدانا","كيت وينسليت"],
    "PG-13","excellent","released","2022-12-16",460e6,2.32e9,150e6,7.6,78,8.3,82,["cameron","sequel","blockbuster"]),

  m("37","godzilla-minus-one","Godzilla Minus One","غودزيلا مينوس ون",
    "Post-war Japan faces a new menace in this Oscar-winning kaiju masterpiece.",
    "اليابان ما بعد الحرب تواجه تهديداً جديداً في تحفة الكايجو الحائزة على أوسكار.",
    "photo-1524712245354-2c4e5e6841c9","photo-1518676590939-590466c3602b",
    2023,124,["Action","Sci-Fi","Drama"],["أكشن","خيال علمي","دراما"],
    "Japan","اليابان","Takashi Yamazaki","تاكاشي يامازاكي",
    ["Ryunosuke Kamiki","Minami Hamabe"],["ريونوسوكي كاميكي","مينامي هامابي"],
    "PG-13","excellent","released","2023-12-01",15e6,115e6,5e6,7.9,98,8.6,90,["japan","kaiju","oscar"]),

  m("38","spirited-away","Spirited Away","المخطوفة",
    "A young girl wanders into a world of gods and spirits. Studio Ghibli's Oscar-winning masterpiece.",
    "فتاة صغيرة تتوه في عالم الآلهة والأرواح. تحفة استوديو غيبلي الحائزة على أوسكار.",
    "photo-1616530940355-351b6023a0b6","photo-1489599849927-2ee91cede3ba",
    2001,125,["Animation","Adventure","Family"],["رسوم متحركة","مغامرة","عائلي"],
    "Japan","اليابان","Hayao Miyazaki","هاياو ميازاكي",
    ["Rumi Hiiragi","Miyu Irino","Mari Natsuki"],["رومي هيراغي","ميو إيرينو","ماري ناتسوكي"],
    "PG","excellent","released","2001-07-20",19e6,396e6,8e6,8.6,96,9.4,91,["ghibli","japan","masterpiece"]),

  m("39","the-godfather","The Godfather","العراب",
    "The aging patriarch of an organized crime dynasty transfers control to his reluctant son.",
    "زعيم عائلة جريمة منظمة ينقل السيطرة لابنه المتردد.",
    "photo-1536440136628-849c177e76a1","photo-1517604931442-7e0c8ed2963c",
    1972,175,["Crime","Drama"],["جريمة","دراما"],
    "USA","الولايات المتحدة","Francis Ford Coppola","فرانسيس فورد كوبولا",
    ["Marlon Brando","Al Pacino","James Caan"],["مارلون براندو","آل باتشينو","جيمس كان"],
    "R","excellent","released","1972-03-24",6e6,270e6,1e6,9.2,98,9.7,95,["classic","mafia","masterpiece"]),

  m("40","shawshank","The Shawshank Redemption","الخلاص من شوشانك",
    "A banker is sentenced to life in Shawshank prison for a crime he didn't commit.",
    "موظف بنك يُحكم بالسجن مدى الحياة في سجن شوشانك لجريمة لم يرتكبها.",
    "photo-1478720568477-152d9b164e63","photo-1440404653325-ab127d49abc1",
    1994,142,["Drama"],["دراما"],
    "USA","الولايات المتحدة","Frank Darabont","فرانك دارابونت",
    ["Tim Robbins","Morgan Freeman","Bob Gunton"],["تيم روبنز","مورغان فريمان","بوب غنتون"],
    "R","excellent","released","1994-10-14",25e6,58e6,8e6,9.3,90,9.8,94,["classic","prison","masterpiece"]),

  m("41","pulp-fiction","Pulp Fiction","الخيال الرخيص",
    "The lives of two mob hitmen, a boxer, a gangster, and his wife intertwine in Tarantino's classic.",
    "حياة قاتلي مافيا وملاكم ورجل عصابات وزوجته تتشابك في كلاسيكية تارانتينو.",
    "photo-1509281373149-e957c6296406","photo-1517602306835-4fd2c838c8f6",
    1994,154,["Crime","Drama"],["جريمة","دراما"],
    "USA","الولايات المتحدة","Quentin Tarantino","كوينتن تارانتينو",
    ["John Travolta","Uma Thurman","Samuel L. Jackson"],["جون ترافولتا","يوما ثورمان","صامويل إل جاكسون"],
    "R","excellent","released","1994-10-21",8e6,214e6,3e6,8.9,94,9.5,91,["tarantino","cult","masterpiece"]),

  m("42","lotr-return","The Lord of the Rings: The Return of the King","سيد الخواتم: عودة الملك",
    "The final battle for Middle-earth. Won 11 Oscars including Best Picture.",
    "المعركة النهائية للأرض الوسطى. فاز بـ 11 أوسكار بما فيها أفضل فيلم.",
    "photo-1598899134739-0b265bd1a51b","photo-1515634928627-144a5873a0b0",
    2003,201,["Action","Adventure","Fantasy"],["أكشن","مغامرة","فنتازيا"],
    "New Zealand / USA","نيوزيلندا / الولايات المتحدة","Peter Jackson","بيتر جاكسون",
    ["Elijah Wood","Viggo Mortensen","Ian McKellen"],["إليجاه وود","فيجو مورتينسين","إيان ماكيلين"],
    "PG-13","excellent","released","2003-12-17",94e6,1.146e9,30e6,8.9,93,9.6,94,["fantasy","epic","oscar"]),

  m("43","the-lion-king","The Lion King","الأسد الملك",
    "A lion prince flees his kingdom only to learn the true meaning of responsibility and bravery.",
    "أمير أسد يهرب من مملكته ليتعلم معنى المسؤولية والشجاعة.",
    "photo-1524712245354-2c4e5e6841c9","photo-1489599849927-2ee91cede3ba",
    1994,88,["Animation","Adventure","Family"],["رسوم متحركة","مغامرة","عائلي"],
    "USA","الولايات المتحدة","Roger Allers & Rob Minkoff","روجر أليرز وروب مينكوف",
    ["Matthew Broderick","Jeremy Irons","James Earl Jones"],["ماثيو بروديريك","جيرمي أيرونز","جيمس إيرل جونز"],
    "G","excellent","released","1994-06-24",45e6,1.083e9,15e6,8.5,93,9.3,92,["disney","animation","classic"]),

  // === COMING SOON 2026-2027 ===
  m("44","avatar-3","Avatar: Fire & Ash","أفاتار: النار والرماد",
    "The third chapter in Cameron's epic saga. New bioluminescent landscapes, new Na'vi clans.",
    "الفصل الثالث من ملحمة كاميرون. مناظر متوهجة جديدة وعشائر نافي جديدة.",
    "photo-1491841573634-28140fc7ced7","photo-1517604931442-7e0c8ed2963c",
    2026,200,["Action","Adventure","Fantasy"],["أكشن","مغامرة","فنتازيا"],
    "USA","الولايات المتحدة","James Cameron","جيمس كاميرون",
    ["Sam Worthington","Zoe Saldaña","Kate Winslet"],["سام ورذنغتون","زوي سالدانا","كيت وينسليت"],
    "PG-13","excellent","upcoming","2026-12-19",500e6,0,200e6,0,0,9.1,0,["cameron","sequel","upcoming"]),

  m("45","superman-legacy","Superman: Legacy","سوبرمان: الإرث",
    "New chapter for the Man of Steel in James Gunn's revitalized DC Universe.",
    "فصل جديد لرجل الفولاذ في عالم دي سي المُعاد إحياؤه لجيمس غان.",
    "photo-1594908900066-3ffed117c000","photo-1440404653325-ab127d49abc1",
    2025,145,["Action","Adventure","Sci-Fi"],["أكشن","مغامرة","خيال علمي"],
    "USA","الولايات المتحدة","James Gunn","جيمس غان",
    ["David Corenswet","Rachel Brosnahan","Nicholas Hoult"],["ديفيد كورينسويت","ريتشل بروسناهان","نيكولاس هولت"],
    "PG-13","good","upcoming","2025-07-11",270e6,0,100e6,0,0,8.0,0,["superhero","dc","upcoming"]),

  m("46","fantastic-four","The Fantastic Four","أربعة المذهلون",
    "Marvel's First Family enters the MCU in this 1960s retro-futuristic reboot.",
    "عائلة مارفل الأولى تدخل عالم مارفل السينمائي في إعادة إطلاق مستقبلية بأسلوب الستينيات.",
    "photo-1616530940355-351b6023a0b6","photo-1535016120720-40c6464b4a31",
    2025,135,["Action","Sci-Fi","Adventure"],["أكشن","خيال علمي","مغامرة"],
    "USA","الولايات المتحدة","Matt Shakman","مات شاكمان",
    ["Pedro Pascal","Vanessa Kirby","Joseph Quinn"],["بيدرو باسكال","فانيسا كيربي","جوزيف كوين"],
    "PG-13","good","upcoming","2025-08-01",200e6,0,75e6,0,0,8.2,0,["marvel","superhero","upcoming"]),

  m("47","nour-ayman","Nour & Ayman","نور وأيمن",
    "A romantic Egyptian comedy about two neighbors in Alexandria who can't stand each other.",
    "كوميديا رومانسية مصرية عن جارين في الإسكندرية لا يطيقان بعضهما.",
    "photo-1574267432553-4b4628081c31","photo-1517602306835-4fd2c838c8f6",
    2025,110,["Romance","Comedy"],["رومانسية","كوميديا"],
    "Egypt","مصر","Tamer Mohsen","تامر محسن",
    ["Mohamed Henedi","Menna Shalabi"],["محمد هنيدي","منى شلبي"],
    "PG","good","upcoming","2025-03-20",3e6,0,1e6,0,0,7.5,0,["egypt","comedy","upcoming","arab"]),

  m("48","the-cairo-job","The Cairo Job","مهمة القاهرة",
    "An international heist thriller set across the rooftops and tunnels of Cairo.",
    "إثارة سرقة دولية على أسطح وأنفاق القاهرة.",
    "photo-1536440136628-849c177e76a1","photo-1518670675725-1c2d7ec3a880",
    2025,138,["Action","Thriller"],["أكشن","إثارة"],
    "Egypt / France","مصر / فرنسا","Sandra Nashaat","ساندرا نشأت",
    ["Amr Waked","Yousra","Asser Yassin"],["عمرو واكد","يسرا","آسر ياسين"],
    "PG-13","good","upcoming","2025-06-05",15e6,0,5e6,0,0,8.0,0,["egypt","action","upcoming","arab"]),
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
