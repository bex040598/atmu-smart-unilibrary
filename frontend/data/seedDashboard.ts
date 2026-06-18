export const studentDashboardStats = {
  active_loans: 3,
  due_soon: 1,
  reservations: 2,
  reading_room_bookings: 1,
  ai_recommendations: 5,
  notifications: 4,
  total_loans: 14,
};

export const teacherDashboardStats = {
  total_resources: 18,
  approved: 12,
  pending_review: 4,
  rejected: 1,
  needs_revision: 1,
  total_downloads: 326,
  total_views: 1204,
  saved_count: 84,
  average_rating: 4.7,
};

export const studentLoans = [
  {
    id: 1,
    book: { title: "Ma'lumotlar bazasi asoslari", author: "Elmasri R., Navathe S.", isbn: "978-0-13-468606-3", cover_color: "#0069A8" },
    borrowed_date: "12.06.2026",
    due_date: "26.06.2026",
    days_remaining: 8,
    is_overdue: false,
    status: "active",
  },
  {
    id: 2,
    book: { title: "Python dasturlash: amaliy qo'llanma", author: "Mark Lutz", isbn: "978-1-449-35573-9", cover_color: "#2563EB" },
    borrowed_date: "10.06.2026",
    due_date: "20.06.2026",
    days_remaining: 2,
    is_overdue: false,
    status: "due_soon",
  },
  {
    id: 3,
    book: { title: "Kompyuter tarmoqlari", author: "Tanenbaum A.", isbn: "978-0-13-212695-3", cover_color: "#7C3AED" },
    borrowed_date: "04.06.2026",
    due_date: "18.06.2026",
    days_remaining: 0,
    is_overdue: false,
    status: "due_today",
  },
];

export const reservations = [
  {
    id: 1,
    book: { title: "Sun'iy intellekt asoslari", author: "Russell S., Norvig P." },
    pickup_date: "19.06.2026",
    pickup_time: "10:00",
    status: "approved",
    qr_code: "QR-2026-0142-001",
  },
  {
    id: 2,
    book: { title: "Kiberxavfsizlik asoslari", author: "Stallings W." },
    pickup_date: "22.06.2026",
    pickup_time: "14:00",
    status: "pending",
    qr_code: null,
  },
];

export const readingRoomBookings = [
  {
    id: 1,
    room: "Asosiy o'quv zali",
    seat: "A-14",
    date: "19.06.2026",
    time_from: "14:00",
    time_to: "16:00",
    status: "pending",
  },
];

export const aiRecommendations = [
  {
    id: 1,
    title: "Ma'lumotlar bazasi laboratoriya ishlari",
    subject: "Ma'lumotlar bazasi",
    department: "Axborot texnologiyalari kafedrasi",
    type: "lab_work",
    match_percent: 96,
  },
  {
    id: 2,
    title: "SQL so'rovlar bo'yicha amaliy qo'llanma",
    subject: "Ma'lumotlar bazasi",
    department: "Axborot texnologiyalari kafedrasi",
    type: "guide",
    match_percent: 91,
  },
  {
    id: 3,
    title: "Python data analysis to'plami",
    subject: "Algoritmlar va ma'lumotlar tuzilmasi",
    department: "Axborot texnologiyalari kafedrasi",
    type: "practice",
    match_percent: 88,
  },
  {
    id: 4,
    title: "Tarmoqlar va protokollar: nazariy asoslar",
    subject: "Kompyuter tarmoqlari",
    department: "Axborot texnologiyalari kafedrasi",
    type: "lecture",
    match_percent: 84,
  },
  {
    id: 5,
    title: "Axborot xavfsizligi standartlari",
    subject: "Kiberxavfsizlik",
    department: "Kiberxavfsizlik kafedrasi",
    type: "textbook",
    match_percent: 79,
  },
];

export const teacherResources = [
  { id: 1, title: "SQL laboratoriya ishlari to'plami", type: "lab_work", type_label: "Laboratoriya ishi", subject: "Ma'lumotlar bazasi", date: "14.06.2026", status: "approved", views: 312, downloads: 128 },
  { id: 2, title: "HTML/CSS amaliy mashg'ulot", type: "practice", type_label: "Amaliy mashg'ulot", subject: "Web dasturlash", date: "12.06.2026", status: "pending_review", views: 45, downloads: 0 },
  { id: 3, title: "Algoritmlar bo'yicha testlar to'plami", type: "test", type_label: "Test", subject: "Algoritmlar", date: "10.06.2026", status: "needs_revision", views: 0, downloads: 0 },
  { id: 4, title: "Ma'lumotlar bazasi bo'yicha ma'ruzalar", type: "lecture", type_label: "Ma'ruza", subject: "Ma'lumotlar bazasi", date: "05.06.2026", status: "approved", views: 234, downloads: 87 },
  { id: 5, title: "JavaScript ES6+ asoslari", type: "lecture", type_label: "Ma'ruza", subject: "Web dasturlash", date: "01.06.2026", status: "approved", views: 187, downloads: 76 },
  { id: 6, title: "React.js qo'llanma", type: "guide", type_label: "Qo'llanma", subject: "Web dasturlash", date: "28.05.2026", status: "approved", views: 201, downloads: 35 },
];

export const teacherSubjects = [
  { id: 1, name: "Ma'lumotlar bazasi", course: "2-kurs", semester: "3-semestr", groups_count: 4 },
  { id: 2, name: "Web dasturlash", course: "2-kurs", semester: "4-semestr", groups_count: 3 },
  { id: 3, name: "Algoritmlar", course: "1-kurs", semester: "2-semestr", groups_count: 5 },
];
