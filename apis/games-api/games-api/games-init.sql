--
-- PostgreSQL database dump
--

-- Dumped from database version 16.4 (Ubuntu 16.4-0ubuntu0.24.04.2)
-- Dumped by pg_dump version 16.4 (Ubuntu 16.4-0ubuntu0.24.04.2)

-- Started on 2024-09-26 15:09:28 EDT

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 6 (class 2615 OID 25317)
-- Name: games; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA games;


--
-- TOC entry 3495 (class 0 OID 0)
-- Dependencies: 6
-- Name: SCHEMA games; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA games IS 'games-api schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 234 (class 1259 OID 25325)
-- Name: active_game_state; Type: TABLE; Schema: games; Owner: -
--

CREATE TABLE games.active_game_state (
    game_id text NOT NULL,
    players_array json[] NOT NULL,
    player_in_turn smallint NOT NULL,
    special_space_values smallint[] NOT NULL,
    special_space_dump_values smallint[] NOT NULL
);


--
-- TOC entry 233 (class 1259 OID 25318)
-- Name: instance_time_map; Type: TABLE; Schema: games; Owner: -
--

CREATE TABLE games.instance_time_map (
    minute_of_day smallint NOT NULL,
    games_in_minute text[]
);


--
-- TOC entry 235 (class 1259 OID 25340)
-- Name: users; Type: TABLE; Schema: games; Owner: -
--

CREATE TABLE games.users (
    id character varying(6) NOT NULL,
    first_name character varying(255) NOT NULL,
    last_name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    created_on date NOT NULL,
    password character varying(255) NOT NULL,
    player_name character varying(255) NOT NULL,
    active_games character varying(255)[],
    friends character varying(255)[],
    role character varying(8) NOT NULL,
    thumbnail character varying(255)
);


--
-- TOC entry 3340 (class 2606 OID 25331)
-- Name: active_game_state active_game_state_pkey; Type: CONSTRAINT; Schema: games; Owner: -
--

ALTER TABLE ONLY games.active_game_state
    ADD CONSTRAINT active_game_state_pkey PRIMARY KEY (game_id);


--
-- TOC entry 3342 (class 2606 OID 25356)
-- Name: users email; Type: CONSTRAINT; Schema: games; Owner: -
--

ALTER TABLE ONLY games.users
    ADD CONSTRAINT email UNIQUE (email);


--
-- TOC entry 3344 (class 2606 OID 25348)
-- Name: users games_pkey; Type: CONSTRAINT; Schema: games; Owner: -
--

ALTER TABLE ONLY games.users
    ADD CONSTRAINT games_pkey PRIMARY KEY (id);


--
-- TOC entry 3338 (class 2606 OID 25324)
-- Name: instance_time_map instance_time_map_pkey; Type: CONSTRAINT; Schema: games; Owner: -
--

ALTER TABLE ONLY games.instance_time_map
    ADD CONSTRAINT instance_time_map_pkey PRIMARY KEY (minute_of_day);


--
-- TOC entry 3346 (class 2606 OID 25358)
-- Name: users thumbnail; Type: CONSTRAINT; Schema: games; Owner: -
--

ALTER TABLE ONLY games.users
    ADD CONSTRAINT thumbnail UNIQUE (thumbnail);


INSERT INTO games.users(
	id, first_name, last_name, email, created_on, password, player_name, active_games, friends, role, thumbnail)
	VALUES ('Id1234','DONT', 'DELETE', 'DONT@DELETE.COM', '3000-01-01', 'PASSWORD', 'PLAYER', '{GAME-ID}', '{FRIEND 1}', 'USER', 'http://address-to-gcp-public-bucket.com');

-- Completed on 2024-09-26 15:09:28 EDT

--
-- PostgreSQL database dump complete
--

