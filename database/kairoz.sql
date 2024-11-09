DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'repeat_type') THEN
        CREATE TYPE repeat_type AS ENUM ('daily', 'weekly', 'monthly', 'yearly', 'none');
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'category_type') THEN
        CREATE TYPE category_type AS ENUM ('study', 'work', 'health', 'leisure');
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'priority_type') THEN
        CREATE TYPE priority_type AS ENUM ('low', 'medium', 'high');
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'status_type') THEN
        CREATE TYPE status_type AS ENUM ('pending', 'in-progress', 'completed');
    END IF;
END $$;

CREATE TABLE IF NOT EXISTS "user" (
    id_user SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS goal (
    id_goal SERIAL PRIMARY KEY,
    id_user INTEGER NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_user) REFERENCES "user"(id_user)
);

CREATE TABLE IF NOT EXISTS question (
    id_question SERIAL PRIMARY KEY,
    id_goal INTEGER NOT NULL,
    text TEXT NOT NULL,
    FOREIGN KEY (id_goal) REFERENCES goal(id_goal)
);

CREATE TABLE IF NOT EXISTS answer (
    id_answer SERIAL PRIMARY KEY,
    id_question INTEGER NOT NULL,
    id_user INTEGER NOT NULL,
    text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_question) REFERENCES question(id_question),
    FOREIGN KEY (id_user) REFERENCES "user"(id_user)
);

CREATE TABLE IF NOT EXISTS recommendation (
    id_recommendation SERIAL PRIMARY KEY,
    id_user INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    image TEXT,
    summary TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    link TEXT,
    FOREIGN KEY (id_user) REFERENCES "user"(id_user)
);

CREATE TABLE IF NOT EXISTS calendar (
    id_calendar SERIAL PRIMARY KEY,
    id_user INTEGER NOT NULL,
    color VARCHAR(50),
    symbol VARCHAR(50),
    start_date DATE,
    end_date DATE,
    FOREIGN KEY (id_user) REFERENCES "user"(id_user)
);

CREATE TABLE IF NOT EXISTS filter (
    id_filter SERIAL PRIMARY KEY,
    id_user INTEGER NOT NULL,
    id_calendar INTEGER NOT NULL,
    day INTEGER,
    month INTEGER,
    year INTEGER,
    FOREIGN KEY (id_user) REFERENCES "user"(id_user),
    FOREIGN KEY (id_calendar) REFERENCES calendar(id_calendar)
);

CREATE TABLE IF NOT EXISTS tasks (
    id_task SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    parentId INTEGER,
    repeat repeat_type DEFAULT 'none',
    category category_type NOT NULL,
    priority priority_type DEFAULT 'medium',
    status status_type DEFAULT 'pending',
    dueDate TIMESTAMP,
    reminder TIMESTAMP,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (parentId) REFERENCES tasks(id_task) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS note (
    id_note SERIAL PRIMARY KEY,
    id_task INTEGER NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    difficulty_level INTEGER NOT NULL,
    FOREIGN KEY (id_task) REFERENCES tasks(id_task)
);

CREATE TABLE IF NOT EXISTS tag (
    id_tag SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS tag_note (
    id_tag INTEGER NOT NULL,
    id_note INTEGER NOT NULL,
    PRIMARY KEY (id_tag, id_note),
    FOREIGN KEY (id_tag) REFERENCES tag(id_tag),
    FOREIGN KEY (id_note) REFERENCES note(id_note)
);

CREATE TABLE IF NOT EXISTS flashcard (
    id_flashcard SERIAL PRIMARY KEY,
    id_cards SERIAL PRIMARY KEY,
    id_note INTEGER NOT NULL,
    question TEXT NOT NULL,
    option1 TEXT NOT NULL,
    option2 TEXT NOT NULL,
    option3 TEXT NOT NULL,
    option4 TEXT NOT NULL,
    option5 TEXT NOT NULL,
    correct_answer INTEGER NOT NULL,
    FOREIGN KEY (id_note) REFERENCES note(id_note)
);

CREATE TABLE IF NOT EXISTS study_time (
    id_time SERIAL PRIMARY KEY,
    id_task INT NOT NULL,
    start_time BIGINT,
    status_time VARCHAR (10) CHECK (status_time IN ('Paused', 'Resumed')),
    end_time BIGINT,
    total_time BIGINT,
    FOREIGN KEY (id_task) REFERENCES task(id_task)
);

CREATE TABLE IF NOT EXISTS chart (
    id_chart SERIAL PRIMARY KEY,
    id_time INTEGER,
    id_task INTEGER,
    type VARCHAR(50) NOT NULL,
    FOREIGN KEY (id_time) REFERENCES study_time(id_time),
    FOREIGN KEY (id_task) REFERENCES tasks(id_task)
);

CREATE TABLE IF NOT EXISTS study (
    id_study SERIAL PRIMARY KEY,
    id_user INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    goal TEXT,
    progress INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_user) REFERENCES "user"(id_user)
);

CREATE TYPE alarm_day_enum AS ENUM (
  '0',  -- Domingo
  '1',  -- Segunda-feira
  '2',  -- Terça-feira
  '3',  -- Quarta-feira
  '4',  -- Quinta-feira
  '5',  -- Sexta-feira
  '6',  -- Sábado
  'none'
);

CREATE TABLE IF NOT EXISTS alarm (
  id_alarm SERIAL PRIMARY KEY,
  alarm_time TIME NOT NULL,
  alarm_day alarm_day_enum[] DEFAULT ARRAY['none'::alarm_day_enum],
  message VARCHAR(200),
  executed BOOLEAN DEFAULT FALSE,
  id_user INT NOT NULL,
  FOREIGN KEY (id_user) REFERENCES "user"(id_user)
);

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at := CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_updated_at
BEFORE UPDATE ON tasks
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

SELECT
    id_task,
    total_time
    CONCAT(
        LPAD((total_time / 3600000)::text, 2, '0'), ':',
        LPAD(((total_time % 3600000) / 60000)::text, 2, '0'), ':',
        LPAD((((total_time % 3600000) % 60000) / 1000)::text, 2, '0')
    ) AS total_time
FROM study_time;
