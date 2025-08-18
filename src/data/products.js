const SAMPLE_PRODUCTS = [
  {
    id: 1,
    name: "Algebra va Analiz",
    nameRu: "Алгебра и анализ",
    price: 45000,
    image: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg",
    category: "Matematika kitobi",
    categoryRu: "Книга по математике",
    description: "Oliy matematika bo'yicha to'liq qo'llanma",
    descriptionRu: "Полное руководство по высшей математики",
    type: "book",
    isNew: true,
    discount: 0
  },
  {
    id: 2,
    name: "Fizika asoslari",
    nameRu: "Основы физики",
    price: 38000,
    image: "https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg",
    category: "Fizika kitobi",
    categoryRu: "Книга по физике",
    description: "Fizikaning asosiy qonunlari va ularning hayotdagi qo‘llanilishi haqida batafsil",
    descriptionRu: "Основные законы физики и их применение в повседневной жизни",
    type: "book",
    isNew: false,
    discount: 10
  },
];

const generateBooks = () => {
  const categories = ["Matematika", "Fizika", "Kimyo", "Biologiya", "Tarix"];
  const bookTypes = ["Darsligi", "Qo'llanma", "Ensiklopediya", "Lug'at"];
  const authors = ["A.Qodiriy", "G'.G'ulom", "O'.Hoshimov", "T.Malik"];
  const books = [];

  for (let i = 3; i <= 3002; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const bookType = bookTypes[Math.floor(Math.random() * bookTypes.length)];
    const author = authors[Math.floor(Math.random() * authors.length)];
    const isNew = Math.random() < 0.15;
    const discount = Math.random() < 0.2 ? [5, 10, 15, 20][Math.floor(Math.random() * 4)] : 0;

    books.push({
      id: i,
      name: `${category} ${bookType}`,
      nameRu: `${category} ${bookType} (RU)`,
      price: Math.floor(Math.random() * 80000) + 20000,
      image: `https://picsum.photos/seed/book${i}/400/500`,
      category: `${category} kitobi`,
      categoryRu: `Книга по ${category.toLowerCase()}`,
      description: `${author} tomonidan yozilgan ${category.toLowerCase()} bo'yicha ${bookType.toLowerCase()}`,
      descriptionRu: `${author} — ${bookType.toLowerCase()} по ${category.toLowerCase()}`,
      author,
      type: "book",
      isNew,
      discount,
    });
  }
  return books;
};

const generateSupplies = (startId = 3003) => {
  const supplyTypes = ["Ruchka", "Qalam", "Daftar", "O‘chirg‘ich", "Chizg‘ich", "Marker", "Kley", "Papka", "Bo‘yoq", "Qaychi"];
  const brands = ["Stabilo", "Faber-Castell", "Pilot", "Parker", "Luxor"];
  const materials = ["plastik", "metal", "yog‘och", "qog‘oz"];
  const supplies = [];

  for (let i = 0; i < 3000; i++) {
    const supplyType = supplyTypes[Math.floor(Math.random() * supplyTypes.length)];
    const brand = brands[Math.floor(Math.random() * brands.length)];
    const material = materials[Math.floor(Math.random() * materials.length)];
    const id = startId + i;
    const isNew = Math.random() < 0.15;
    const discount = Math.random() < 0.2 ? [5, 10, 15, 25][Math.floor(Math.random() * 4)] : 0;

    supplies.push({
      id,
      name: `${supplyType} (${brand})`,
      nameRu: `${supplyType} (${brand}) (RU)`,
      price: Math.floor(Math.random() * 50000) + 5000,
      image: `https://picsum.photos/seed/supply${id}/400/400`,
      category: "O‘quv qurollari",
      categoryRu: "Учебные принадлежности",
      description: `${material} materialdan yasalgan ${supplyType.toLowerCase()}, ${brand} brendi.`,
      descriptionRu: `${supplyType.toLowerCase()} из материала: ${material}, бренд ${brand}.`,
      brand,
      type: "supply",
      isNew,
      discount,
    });
  }
  return supplies;
};

const ALL = [
  ...SAMPLE_PRODUCTS,
  ...generateBooks(),
  ...generateSupplies(),
];

export const ALL_PRODUCTS = ALL;

export const getBooks = () => ALL.filter(p => p.type === "book");
export const getSupplies = () => ALL.filter(p => p.type === "supply");
export const getNewProducts = () => ALL.filter(p => p.isNew);
export const getDiscountProducts = () => ALL.filter(p => p.discount && p.discount > 0);