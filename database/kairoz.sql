-- Create User Table
CREATE TABLE IF NOT EXISTS "user" (
    id_user SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Goal Table
CREATE TABLE IF NOT EXISTS goal (
    id_goal SERIAL PRIMARY KEY,
    id_user INT NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_user) REFERENCES "user"(id_user)
);

-- Create Question Table
CREATE TABLE IF NOT EXISTS question (
    id_question SERIAL PRIMARY KEY,
    id_goal INT NOT NULL,
    text TEXT NOT NULL,
    FOREIGN KEY (id_goal) REFERENCES goal(id_goal)
);

-- Create Answer Table
CREATE TABLE IF NOT EXISTS answer (
    id_answer SERIAL PRIMARY KEY,
    id_question INT NOT NULL,
    id_user INT NOT NULL,
    text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_question) REFERENCES question(id_question),
    FOREIGN KEY (id_user) REFERENCES "user"(id_user)
);

-- Create Recommendation Table
CREATE TABLE IF NOT EXISTS recommendation (
    id_recommendation SERIAL PRIMARY KEY,
    id_user INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    image TEXT,
    summary TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    link TEXT,
    FOREIGN KEY (id_user) REFERENCES "user"(id_user)
);

-- Create Calendar Table
CREATE TABLE IF NOT EXISTS calendar (
    id_calendar SERIAL PRIMARY KEY,
    id_user INT NOT NULL,
    color VARCHAR(50),
    symbol VARCHAR(50),
    start_date DATE,
    end_date DATE,
    FOREIGN KEY (id_user) REFERENCES "user"(id_user)
);

-- Create Filter Table
CREATE TABLE IF NOT EXISTS filter (
    id_filter SERIAL PRIMARY KEY,
    id_user INT NOT NULL,
    id_calendar INT NOT NULL,
    day INT,
    month INT,
    year INT,
    FOREIGN KEY (id_user) REFERENCES "user"(id_user),
    FOREIGN KEY (id_calendar) REFERENCES calendar(id_calendar)
);

-- Create Sprint Table
CREATE TABLE IF NOT EXISTS sprint (
    id_sprint SERIAL PRIMARY KEY,
    id_calendar INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    sprint_goal TEXT NOT NULL,
    FOREIGN KEY (id_calendar) REFERENCES calendar(id_calendar)
);

-- Create Task Table
CREATE TABLE IF NOT EXISTS task (
    id_task SERIAL PRIMARY KEY,
    id_sprint INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL,
    estimated_time INTEGER,
    date DATE,
    priority VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL CHECK (status IN ('to_do', 'in_progress', 'done')),
    FOREIGN KEY (id_sprint) REFERENCES sprint(id_sprint)
);

-- Create Note Table
CREATE TABLE IF NOT EXISTS note (
    id_note SERIAL PRIMARY KEY,
    id_task INT NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    difficulty_level INT NOT NULL,
    FOREIGN KEY (id_task) REFERENCES task(id_task)
);

-- Create Tag Table
CREATE TABLE IF NOT EXISTS tag (
    id_tag SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Create Tag_Note Table
CREATE TABLE IF NOT EXISTS tag_note (
    id_tag INT NOT NULL,
    id_note INT NOT NULL,
    PRIMARY KEY (id_tag, id_note),
    FOREIGN KEY (id_tag) REFERENCES tag(id_tag),
    FOREIGN KEY (id_note) REFERENCES note(id_note)
);

-- Create Flashcard Table
CREATE TABLE IF NOT EXISTS flashcard (
    id_flashcard SERIAL PRIMARY KEY,
    id_note INT NOT NULL,
    question TEXT NOT NULL,
    option1 TEXT NOT NULL,
    option2 TEXT NOT NULL,
    option3 TEXT NOT NULL,
    option4 TEXT NOT NULL,
    option5 TEXT NOT NULL,
    correct_answer INT NOT NULL,
    FOREIGN KEY (id_note) REFERENCES note(id_note)
);

-- Create Study_Time Table
CREATE TABLE IF NOT EXISTS study_time (
    id_time SERIAL PRIMARY KEY,
    id_task INT NOT NULL,
    start_time BIGINT,
    status_time VARCHAR(10) CHECK (status_time IN ('Paused', 'Resumed')),
    end_time BIGINT,
    total_time BIGINT,
    FOREIGN KEY (id_task) REFERENCES task(id_task)
);
-- Create Chart Table
CREATE TABLE IF NOT EXISTS chart (
    id_chart SERIAL PRIMARY KEY,
    id_time INT NOT NULL,
    id_task INT NOT NULL,
    type VARCHAR(50) NOT NULL,
    FOREIGN KEY (id_time) REFERENCES study_time(id_time),
    FOREIGN KEY (id_task) REFERENCES task(id_task)
);

-- Create Study Table
CREATE TABLE IF NOT EXISTS study (
    id_study SERIAL PRIMARY KEY,
    id_user INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    goal TEXT,
    progress INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_user) REFERENCES "user"(id_user)
);

CREATE OR REPLACE FUNCTION calculate_total_time() RETURNS TRIGGER AS $$
BEGIN
    NEW.total_time := NEW.end_time - NEW.start_time;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_calculate_total_time
BEFORE INSERT OR UPDATE ON study_time
FOR EACH ROW EXECUTE FUNCTION calculate_total_time();