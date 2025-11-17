-- Создание таблицы пользователей
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('teacher', 'student')),
    full_name VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы задач
CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    grade INTEGER NOT NULL CHECK (grade IN (8, 9)),
    subject VARCHAR(20) NOT NULL CHECK (subject IN ('algebra', 'geometry')),
    chapter_id INTEGER NOT NULL,
    chapter_title VARCHAR(255) NOT NULL,
    title VARCHAR(500) NOT NULL,
    description TEXT NOT NULL,
    difficulty VARCHAR(20) CHECK (difficulty IN ('easy', 'medium', 'hard')),
    points INTEGER DEFAULT 10,
    external_link VARCHAR(500),
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы решений учеников
CREATE TABLE IF NOT EXISTS student_solutions (
    id SERIAL PRIMARY KEY,
    student_id INTEGER NOT NULL REFERENCES users(id),
    task_id INTEGER NOT NULL REFERENCES tasks(id),
    solution_text TEXT,
    is_correct BOOLEAN,
    points_earned INTEGER DEFAULT 0,
    teacher_comment TEXT,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    checked_at TIMESTAMP,
    checked_by INTEGER REFERENCES users(id)
);

-- Создание таблицы прогресса учеников
CREATE TABLE IF NOT EXISTS student_progress (
    id SERIAL PRIMARY KEY,
    student_id INTEGER NOT NULL REFERENCES users(id),
    grade INTEGER NOT NULL CHECK (grade IN (8, 9)),
    subject VARCHAR(20) NOT NULL CHECK (subject IN ('algebra', 'geometry')),
    chapter_id INTEGER NOT NULL,
    tasks_completed INTEGER DEFAULT 0,
    total_points INTEGER DEFAULT 0,
    last_activity TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(student_id, grade, subject, chapter_id)
);

-- Индексы для оптимизации запросов
CREATE INDEX IF NOT EXISTS idx_tasks_grade_subject ON tasks(grade, subject);
CREATE INDEX IF NOT EXISTS idx_tasks_chapter ON tasks(chapter_id);
CREATE INDEX IF NOT EXISTS idx_solutions_student ON student_solutions(student_id);
CREATE INDEX IF NOT EXISTS idx_solutions_task ON student_solutions(task_id);
CREATE INDEX IF NOT EXISTS idx_progress_student ON student_progress(student_id);