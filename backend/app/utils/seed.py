"""Seed database with initial data."""
from sqlmodel import Session, select
from app.core.database import engine
from app.core.security import get_password_hash
from app.models.user import User, UserRoleEnum
from app.models.faculty import Faculty
from app.models.department import Department
from app.models.subject import Subject
from app.models.book import Book, BookCopy
from app.models.resource import DepartmentResource, ResourceStatus, MaterialType
from app.models.reading_room import ReadingRoom, Seat
from app.models.announcement import Announcement
from datetime import datetime


def seed():
    with Session(engine) as session:
        # Users
        users_data = [
            {"email": "admin@atmu.uz", "full_name": "Admin Adminov", "password": "Admin123!", "role": UserRoleEnum.admin},
            {"email": "student@atmu.uz", "full_name": "Aziz Karimov", "password": "Student123!", "role": UserRoleEnum.student, "student_id": "AT-21-001", "course": 3, "semester": 5},
            {"email": "teacher@atmu.uz", "full_name": "Dr. Nodira Yusupova", "password": "Teacher123!", "role": UserRoleEnum.teacher},
            {"email": "librarian@atmu.uz", "full_name": "Malika Toshmatova", "password": "Librarian123!", "role": UserRoleEnum.librarian},
            {"email": "department@atmu.uz", "full_name": "Prof. Behruz Rahimov", "password": "Department123!", "role": UserRoleEnum.department_head},
        ]
        created_users = {}
        for ud in users_data:
            existing = session.exec(select(User).where(User.email == ud["email"])).first()
            if not existing:
                u = User(
                    email=ud["email"],
                    full_name=ud["full_name"],
                    hashed_password=get_password_hash(ud["password"]),
                    role=ud["role"],
                    student_id=ud.get("student_id"),
                    course=ud.get("course"),
                    semester=ud.get("semester"),
                    is_active=True,
                )
                session.add(u)
                session.commit()
                session.refresh(u)
                created_users[ud["email"]] = u
            else:
                created_users[ud["email"]] = existing

        # Faculties
        faculties_data = [
            {"name_uz": "Raqamli texnologiyalar fakulteti", "name_ru": "Факультет цифровых технологий", "name_en": "Faculty of Digital Technologies", "name_tr": "Dijital Teknolojiler Fakültesi", "slug": "raqamli-texnologiyalar"},
            {"name_uz": "Ijtimoiy fanlar fakulteti", "name_ru": "Факультет социальных наук", "name_en": "Faculty of Social Sciences", "name_tr": "Sosyal Bilimler Fakültesi", "slug": "ijtimoiy-fanlar"},
        ]
        created_faculties = {}
        for fd in faculties_data:
            existing = session.exec(select(Faculty).where(Faculty.slug == fd["slug"])).first()
            if not existing:
                f = Faculty(**fd)
                session.add(f)
                session.commit()
                session.refresh(f)
                created_faculties[fd["slug"]] = f
            else:
                created_faculties[fd["slug"]] = existing

        f1_id = created_faculties["raqamli-texnologiyalar"].id
        f2_id = created_faculties["ijtimoiy-fanlar"].id

        # Departments
        departments_data = [
            {
                "faculty_id": f1_id,
                "name_uz": "Axborot texnologiyalari kafedrasi",
                "name_ru": "Кафедра информационных технологий",
                "name_en": "Department of Information Technologies",
                "name_tr": "Bilgi Teknolojileri Bölümü",
                "slug": "axborot-texnologiyalari",
                "description_uz": "Zamonaviy axborot texnologiyalari, dasturlash, sun'iy intellekt va ma'lumotlar bazasi sohalari bo'yicha oliy ta'lim beruvchi kafedra.",
                "head_name": "Prof. Behruz Rahimov",
                "head_title": "Kafedra mudiri, t.f.d.",
                "icon": "💻",
                "color": "#1457A8",
                "teacher_count": 12,
                "subject_count": 18,
                "resource_count": 145,
            },
            {
                "faculty_id": f1_id,
                "name_uz": "Matematika kafedrasi",
                "name_ru": "Кафедра математики",
                "name_en": "Department of Mathematics",
                "name_tr": "Matematik Bölümü",
                "slug": "matematika",
                "description_uz": "Oliy matematika, diskret matematika, ehtimollar nazariyasi va matematik statistika fanlari.",
                "head_name": "Dos. Sarvar Mirzayev",
                "head_title": "Kafedra mudiri, f-m.f.n.",
                "icon": "📐",
                "color": "#008C95",
                "teacher_count": 8,
                "subject_count": 12,
                "resource_count": 89,
            },
            {
                "faculty_id": f1_id,
                "name_uz": "Iqtisodiyot kafedrasi",
                "name_ru": "Кафедра экономики",
                "name_en": "Department of Economics",
                "name_tr": "İktisat Bölümü",
                "slug": "iqtisodiyot",
                "description_uz": "Mikroiqtisodiyot, makroiqtisodiyot, moliya va bank ishi, menejment fanlari.",
                "head_name": "Prof. Dilnoza Hasanova",
                "head_title": "Kafedra mudiri, i.f.d.",
                "icon": "📊",
                "color": "#0E9F6E",
                "teacher_count": 10,
                "subject_count": 15,
                "resource_count": 112,
            },
            {
                "faculty_id": f2_id,
                "name_uz": "Filologiya kafedrasi",
                "name_ru": "Кафедра филологии",
                "name_en": "Department of Philology",
                "name_tr": "Filoloji Bölümü",
                "slug": "filologiya",
                "description_uz": "O'zbek tili va adabiyoti, xorijiy tillar, tilshunoslik va adabiyotshunoslik fanlari.",
                "head_name": "Dos. Muazzam Nazarova",
                "head_title": "Kafedra mudiri, fil.f.n.",
                "icon": "📚",
                "color": "#D6A84F",
                "teacher_count": 9,
                "subject_count": 14,
                "resource_count": 78,
            },
            {
                "faculty_id": f2_id,
                "name_uz": "Tarix kafedrasi",
                "name_ru": "Кафедра истории",
                "name_en": "Department of History",
                "name_tr": "Tarih Bölümü",
                "slug": "tarix",
                "description_uz": "O'zbekiston tarixi, jahon tarixi, arxeologiya va etnologiya fanlari.",
                "head_name": "Prof. Alisher Toshmatov",
                "head_title": "Kafedra mudiri, t.f.d.",
                "icon": "🏛️",
                "color": "#8B5CF6",
                "teacher_count": 7,
                "subject_count": 11,
                "resource_count": 65,
            },
            {
                "faculty_id": f2_id,
                "name_uz": "Pedagogika kafedrasi",
                "name_ru": "Кафедра педагогики",
                "name_en": "Department of Pedagogy",
                "name_tr": "Pedagoji Bölümü",
                "slug": "pedagogika",
                "description_uz": "Ta'lim texnologiyalari, pedagogika va psixologiya, maktabgacha ta'lim fanlari.",
                "head_name": "Dos. Gulnora Yusupova",
                "head_title": "Kafedra mudiri, p.f.n.",
                "icon": "🎓",
                "color": "#EF4444",
                "teacher_count": 6,
                "subject_count": 10,
                "resource_count": 54,
            },
        ]
        created_depts = {}
        for dd in departments_data:
            existing = session.exec(select(Department).where(Department.slug == dd["slug"])).first()
            if not existing:
                d = Department(**dd)
                session.add(d)
                session.commit()
                session.refresh(d)
                created_depts[dd["slug"]] = d
            else:
                created_depts[dd["slug"]] = existing

        at_dept_id = created_depts["axborot-texnologiyalari"].id

        # Update teacher department
        teacher = created_users.get("teacher@atmu.uz")
        if teacher and teacher.department_id is None:
            teacher.department_id = at_dept_id
            session.add(teacher)
            session.commit()

        dept_head = created_users.get("department@atmu.uz")
        if dept_head and dept_head.department_id is None:
            dept_head.department_id = at_dept_id
            session.add(dept_head)
            session.commit()

        student = created_users.get("student@atmu.uz")
        if student and student.department_id is None:
            student.department_id = at_dept_id
            session.add(student)
            session.commit()

        # Subjects
        subjects_data = [
            {"department_id": at_dept_id, "name_uz": "Ma'lumotlar bazasi", "name_en": "Database", "code": "CS201", "course": 2, "semester": 3, "credits": 3},
            {"department_id": at_dept_id, "name_uz": "Algoritm va ma'lumotlar tuzilmasi", "name_en": "Algorithms & Data Structures", "code": "CS202", "course": 2, "semester": 4, "credits": 3},
            {"department_id": at_dept_id, "name_uz": "Dasturlash tillari", "name_en": "Programming Languages", "code": "CS101", "course": 1, "semester": 1, "credits": 4},
            {"department_id": at_dept_id, "name_uz": "Kompyuter tarmog'i", "name_en": "Computer Networks", "code": "CS301", "course": 3, "semester": 5, "credits": 3},
            {"department_id": at_dept_id, "name_uz": "Sun'iy intellekt", "name_en": "Artificial Intelligence", "code": "CS401", "course": 4, "semester": 7, "credits": 4},
            {"department_id": at_dept_id, "name_uz": "Kiberxavfsizlik", "name_en": "Cybersecurity", "code": "CS402", "course": 4, "semester": 7, "credits": 3},
            {"department_id": at_dept_id, "name_uz": "Web dasturlash", "name_en": "Web Development", "code": "CS203", "course": 2, "semester": 3, "credits": 3},
            {"department_id": at_dept_id, "name_uz": "Mobil dasturlash", "name_en": "Mobile Development", "code": "CS302", "course": 3, "semester": 6, "credits": 3},
        ]
        created_subjects = []
        for sd in subjects_data:
            existing = session.exec(select(Subject).where(Subject.code == sd["code"])).first()
            if not existing:
                s = Subject(**sd)
                session.add(s)
                session.commit()
                session.refresh(s)
                created_subjects.append(s)
            else:
                created_subjects.append(existing)

        # Resources
        if created_subjects and teacher:
            resources_data = [
                {
                    "department_id": at_dept_id,
                    "subject_id": created_subjects[0].id,
                    "uploader_id": teacher.id,
                    "title": "Ma'lumotlar bazasi: To'liq kurs",
                    "description": "PostgreSQL, MySQL va NoSQL ma'lumotlar bazalari bo'yicha to'liq o'quv qo'llanma.",
                    "author": "Dr. Nodira Yusupova",
                    "material_type": MaterialType.textbook,
                    "language": "uz",
                    "course": 2,
                    "semester": 3,
                    "academic_year": "2024-2025",
                    "tags": "database,sql,postgresql,nosql",
                    "status": ResourceStatus.approved,
                    "view_count": 342,
                    "download_count": 128,
                    "file_format": "pdf",
                    "download_allowed": True,
                    "published_at": datetime.utcnow(),
                },
                {
                    "department_id": at_dept_id,
                    "subject_id": created_subjects[2].id,
                    "uploader_id": teacher.id,
                    "title": "Python dasturlash: Amaliy qo'llanma",
                    "description": "Python dasturlash tilini noldan professional darajagacha o'rgatuvchi qo'llanma.",
                    "author": "Dr. Nodira Yusupova",
                    "material_type": MaterialType.study_guide,
                    "language": "uz",
                    "course": 1,
                    "semester": 1,
                    "academic_year": "2024-2025",
                    "tags": "python,programming,beginner",
                    "status": ResourceStatus.approved,
                    "view_count": 567,
                    "download_count": 234,
                    "file_format": "pdf",
                    "download_allowed": True,
                    "published_at": datetime.utcnow(),
                },
                {
                    "department_id": at_dept_id,
                    "subject_id": created_subjects[4].id,
                    "uploader_id": teacher.id,
                    "title": "Sun'iy intellekt va Machine Learning asoslari",
                    "description": "ML algoritmlar, neural networks va deep learning bo'yicha ma'ruzalar to'plami.",
                    "author": "Prof. Behruz Rahimov",
                    "material_type": MaterialType.lecture,
                    "language": "uz",
                    "course": 4,
                    "semester": 7,
                    "academic_year": "2024-2025",
                    "tags": "ai,ml,neural-network,deep-learning",
                    "status": ResourceStatus.approved,
                    "view_count": 289,
                    "download_count": 97,
                    "file_format": "pdf",
                    "download_allowed": True,
                    "published_at": datetime.utcnow(),
                },
                {
                    "department_id": at_dept_id,
                    "subject_id": created_subjects[3].id,
                    "uploader_id": teacher.id,
                    "title": "Kompyuter tarmoqlari: Laboratoriya ishlari",
                    "description": "TCP/IP, routing, switching va network security bo'yicha laboratoriya topshiriqlari.",
                    "author": "Dr. Nodira Yusupova",
                    "material_type": MaterialType.lab_work,
                    "language": "uz",
                    "course": 3,
                    "semester": 5,
                    "academic_year": "2024-2025",
                    "tags": "network,tcp,routing,lab",
                    "status": ResourceStatus.approved,
                    "view_count": 198,
                    "download_count": 76,
                    "file_format": "pdf",
                    "download_allowed": True,
                    "published_at": datetime.utcnow(),
                },
                {
                    "department_id": at_dept_id,
                    "subject_id": created_subjects[5].id,
                    "uploader_id": teacher.id,
                    "title": "Kiberxavfsizlik asoslari",
                    "description": "Axborot xavfsizligi, kriptografiya, ethical hacking va network security.",
                    "author": "Dr. Bobur Mirzayev",
                    "material_type": MaterialType.textbook,
                    "language": "uz",
                    "course": 4,
                    "semester": 7,
                    "academic_year": "2024-2025",
                    "tags": "cybersecurity,hacking,cryptography",
                    "status": ResourceStatus.pending_review,
                    "view_count": 45,
                    "download_count": 12,
                    "file_format": "pdf",
                    "download_allowed": False,
                    "submitted_at": datetime.utcnow(),
                },
            ]
            for rd in resources_data:
                existing = session.exec(
                    select(DepartmentResource).where(DepartmentResource.title == rd["title"])
                ).first()
                if not existing:
                    r = DepartmentResource(**rd)
                    session.add(r)
            session.commit()

        # Books
        books_data = [
            {
                "title": "Algoritm va dasturlash",
                "author": "Karimov A.K., Toshmatov B.S.",
                "department_id": at_dept_id,
                "publisher": "ATMU nashriyoti",
                "year": 2023,
                "language": "uz",
                "category": "Dasturlash",
                "description": "Algoritmlar va dasturlash asoslarini o'rgatuvchi darslik.",
                "total_copies": 5,
                "available_copies": 3,
                "shelf_location": "A-101",
            },
            {
                "title": "Ma'lumotlar bazasini loyihalash",
                "author": "Rahimov B.N.",
                "department_id": at_dept_id,
                "publisher": "Fan nashriyoti",
                "year": 2022,
                "language": "uz",
                "category": "Ma'lumotlar bazasi",
                "description": "Ma'lumotlar bazasini loyihalash va boshqarish asoslari.",
                "total_copies": 8,
                "available_copies": 5,
                "shelf_location": "A-102",
            },
            {
                "title": "Компьютерные сети",
                "author": "Таненбаум Э.",
                "department_id": at_dept_id,
                "publisher": "Питер",
                "year": 2021,
                "language": "ru",
                "category": "Tarmoqlar",
                "description": "Kompyuter tarmoqlari bo'yicha klassik darslik.",
                "total_copies": 3,
                "available_copies": 1,
                "shelf_location": "B-201",
            },
            {
                "title": "Introduction to Algorithms",
                "author": "Cormen T.H., Leiserson C.E.",
                "department_id": at_dept_id,
                "isbn": "978-0-262-03384-8",
                "publisher": "MIT Press",
                "year": 2022,
                "language": "en",
                "category": "Algoritmlar",
                "description": "CLRS - algoritmlarning klassik qo'llanmasi.",
                "total_copies": 2,
                "available_copies": 2,
                "shelf_location": "B-202",
            },
            {
                "title": "Kiberxavfsizlik: Nazariya va amaliyot",
                "author": "Mirzayev D.A., Nazarov S.K.",
                "department_id": at_dept_id,
                "publisher": "TATU nashriyoti",
                "year": 2024,
                "language": "uz",
                "category": "Kiberxavfsizlik",
                "description": "Axborot xavfsizligining nazariy asoslari va amaliy mashqlar.",
                "total_copies": 4,
                "available_copies": 4,
                "shelf_location": "C-301",
            },
        ]
        for bd in books_data:
            existing = session.exec(select(Book).where(Book.title == bd["title"])).first()
            if not existing:
                b = Book(**bd)
                session.add(b)
                session.commit()
                session.refresh(b)
                for i in range(bd["total_copies"]):
                    copy = BookCopy(
                        book_id=b.id,
                        barcode=f"ATMU-{b.id:04d}-{i+1:03d}",
                        shelf_location=bd["shelf_location"],
                        status="available" if i < bd["available_copies"] else "borrowed",
                    )
                    session.add(copy)
                session.commit()

        # Reading rooms
        rooms_data = [
            {
                "name": "Asosiy o'quv zali (1-qavat)",
                "floor": 1,
                "capacity": 40,
                "description": "Umumiy foydalanish o'quv zali, Wi-Fi va elektr ulash imkoni mavjud.",
                "opens_at": "08:00",
                "closes_at": "20:00",
                "has_wifi": True,
                "has_power": True,
                "has_projector": True,
            },
            {
                "name": "Kompyuter o'quv zali (2-qavat)",
                "floor": 2,
                "capacity": 25,
                "description": "Kompyuterli o'quv zali, dasturlash va tadqiqot uchun.",
                "opens_at": "09:00",
                "closes_at": "18:00",
                "has_wifi": True,
                "has_power": True,
                "has_projector": False,
            },
            {
                "name": "Jim o'quv zali (3-qavat)",
                "floor": 3,
                "capacity": 20,
                "description": "Imtihonga tayyorlanish uchun jim o'quv zali.",
                "opens_at": "08:00",
                "closes_at": "22:00",
                "has_wifi": True,
                "has_power": True,
                "has_projector": False,
            },
        ]
        for rd in rooms_data:
            existing = session.exec(select(ReadingRoom).where(ReadingRoom.name == rd["name"])).first()
            if not existing:
                room = ReadingRoom(**rd)
                session.add(room)
                session.commit()
                session.refresh(room)
                # Create seats
                rows = rd["capacity"] // 5
                for row in range(rows):
                    for col in range(5):
                        seat = Seat(
                            reading_room_id=room.id,
                            seat_number=f"{chr(65+row)}{col+1}",
                            row=row,
                            col=col,
                            has_power=(col < 3),
                            is_window=(col == 0 or col == 4),
                        )
                        session.add(seat)
                session.commit()

        # Announcements
        announcements_data = [
            {
                "title_uz": "ATMU Smart UniLibrary ishga tushdi!",
                "title_ru": "ATMU Smart UniLibrary запущена!",
                "title_en": "ATMU Smart UniLibrary is launched!",
                "content_uz": "Hurmatli talabalar va o'qituvchilar! ATMU elektron kutubxona platformasi rasman ishga tushdi. Endi siz barcha darsliklar, ma'ruzalar va ilmiy materiallarni onlayn ko'rishingiz mumkin.",
                "content_ru": "Уважаемые студенты и преподаватели! Электронная библиотека ATMU официально запущена.",
                "content_en": "Dear students and teachers! ATMU e-library platform has officially launched.",
                "type": "announcement",
                "created_by": created_users["admin@atmu.uz"].id,
            },
            {
                "title_uz": "Yangi resurslar qo'shildi",
                "title_en": "New resources added",
                "content_uz": "Axborot texnologiyalari kafedrasi tomonidan 15 ta yangi material qo'shildi. Sun'iy intellekt va kiberxavfsizlik bo'yicha darsliklar mavjud.",
                "content_en": "15 new materials added by IT department. AI and cybersecurity textbooks available.",
                "type": "news",
                "created_by": created_users["admin@atmu.uz"].id,
            },
        ]
        for ad in announcements_data:
            existing = session.exec(
                select(Announcement).where(Announcement.title_uz == ad["title_uz"])
            ).first()
            if not existing:
                ann = Announcement(**ad)
                session.add(ann)
        session.commit()

        print("✅ Seed data created successfully!")
        print("📧 Test accounts:")
        print("   admin@atmu.uz / Admin123!")
        print("   student@atmu.uz / Student123!")
        print("   teacher@atmu.uz / Teacher123!")
        print("   librarian@atmu.uz / Librarian123!")
        print("   department@atmu.uz / Department123!")


if __name__ == "__main__":
    from app.core.database import create_db_and_tables
    create_db_and_tables()
    seed()
