
-- Table Definition ----------------------------------------------

CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    user_id integer NOT NULL REFERENCES "user"(id),
    task character varying(255) NOT NULL,
    due_date date NOT NULL,
    importance integer NOT NULL,
    completion_status boolean NOT NULL DEFAULT false,
    notes character varying(255),
    time_requirement integer NOT NULL
);

-- Indices -------------------------------------------------------

CREATE UNIQUE INDEX tasks_pkey ON tasks(id int4_ops);

-- Table Definition ----------------------------------------------

CREATE TABLE "user" (
    id SERIAL PRIMARY KEY,
    username character varying(255) NOT NULL UNIQUE,
    password character varying(255) NOT NULL,
    available_time integer
);

-- Indices -------------------------------------------------------

CREATE UNIQUE INDEX user_pkey ON "user"(id int4_ops);
CREATE UNIQUE INDEX user_username_key ON "user"(username text_ops);



