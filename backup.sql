--
-- PostgreSQL database dump
--

\restrict bElOntZQfuc9DPahZT8uLikWnp5buXW5T575oUbIRWhrMzCRUaUoRPTwX3L5hHA

-- Dumped from database version 18.3
-- Dumped by pg_dump version 18.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: application_application_status_enum; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.application_application_status_enum AS ENUM (
    'new',
    'cancelled',
    'completed'
);


--
-- Name: application_type_system_name_enum; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.application_type_system_name_enum AS ENUM (
    'LOCAL_LICENSE_SERVICE',
    'RENEW_LICENSE_SERVICE',
    'REPLACE_LOST_SERVICE',
    'REPLACE_DAMAGED_SERVICE',
    'RELEASE_DETAINED_SERVICE',
    'RETAKE_TEST_SERVICE',
    'INTERNATIONAL_LICENSE_SERVICE'
);


--
-- Name: license_class_system_name_enum; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.license_class_system_name_enum AS ENUM (
    'CLASS_1',
    'CLASS_2',
    'CLASS_3',
    'CLASS_4',
    'CLASS_5',
    'CLASS_6',
    'CLASS_7'
);


--
-- Name: license_issue_reason_enum; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.license_issue_reason_enum AS ENUM (
    'First Time',
    'Renew',
    'Replacement for Lost',
    'Replacement for Damaged'
);


--
-- Name: person_gender_enum; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.person_gender_enum AS ENUM (
    'M',
    'F'
);


--
-- Name: test_test_status_enum; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.test_test_status_enum AS ENUM (
    '0',
    '1'
);


--
-- Name: test_type_system_name_enum; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.test_type_system_name_enum AS ENUM (
    'VISION_TEST',
    'WRITTEN_TEST',
    'PRACTICAL_TEST'
);


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: application; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.application (
    id integer NOT NULL,
    application_status public.application_application_status_enum DEFAULT 'new'::public.application_application_status_enum NOT NULL,
    paid_fees numeric NOT NULL,
    last_status_date timestamp without time zone NOT NULL,
    application_date timestamp without time zone DEFAULT now() NOT NULL,
    person_id integer NOT NULL,
    type_id integer NOT NULL,
    created_by_user_id integer NOT NULL
);


--
-- Name: application_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.application_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: application_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.application_id_seq OWNED BY public.application.id;


--
-- Name: application_type; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.application_type (
    id integer CONSTRAINT application_type_id_not_null1 NOT NULL,
    system_name public.application_type_system_name_enum NOT NULL,
    type_name character varying NOT NULL,
    type_fees numeric NOT NULL,
    default_validity_length smallint
);


--
-- Name: application_type_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.application_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: application_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.application_type_id_seq OWNED BY public.application_type.id;


--
-- Name: country; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.country (
    id integer NOT NULL,
    country_name character varying NOT NULL
);


--
-- Name: country_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.country_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: country_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.country_id_seq OWNED BY public.country.id;


--
-- Name: detained_license; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.detained_license (
    id integer NOT NULL,
    detain_date timestamp without time zone NOT NULL,
    release_date timestamp without time zone,
    fine_fees numeric NOT NULL,
    license_id integer NOT NULL,
    created_by_user_id integer NOT NULL,
    released_by_user_id integer,
    release_application_id integer
);


--
-- Name: detained_license_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.detained_license_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: detained_license_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.detained_license_id_seq OWNED BY public.detained_license.id;


--
-- Name: driver; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.driver (
    id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    created_by_user_id integer NOT NULL,
    person_id integer NOT NULL
);


--
-- Name: driver_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.driver_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: driver_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.driver_id_seq OWNED BY public.driver.id;


--
-- Name: international_license; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.international_license (
    id integer NOT NULL,
    is_active boolean NOT NULL,
    issue_date timestamp without time zone NOT NULL,
    expiration_date timestamp without time zone NOT NULL,
    notes character varying,
    paid_fees numeric NOT NULL,
    local_license_id integer NOT NULL,
    application_id integer NOT NULL,
    driver_id integer NOT NULL,
    created_by_user_id integer NOT NULL
);


--
-- Name: international_license_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.international_license_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: international_license_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.international_license_id_seq OWNED BY public.international_license.id;


--
-- Name: license; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.license (
    id integer NOT NULL,
    is_active boolean NOT NULL,
    issue_date timestamp without time zone NOT NULL,
    expiration_date timestamp without time zone NOT NULL,
    notes character varying,
    issue_reason public.license_issue_reason_enum NOT NULL,
    paid_fees numeric NOT NULL,
    application_id integer NOT NULL,
    driver_id integer NOT NULL,
    license_class_id integer NOT NULL,
    created_by_user_id integer NOT NULL
);


--
-- Name: license_class; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.license_class (
    id integer NOT NULL,
    class_name character varying NOT NULL,
    system_name public.license_class_system_name_enum NOT NULL,
    class_description character varying NOT NULL,
    class_fees numeric NOT NULL,
    minimum_allowed_age smallint NOT NULL,
    default_validity_length smallint NOT NULL
);


--
-- Name: license_class_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.license_class_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: license_class_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.license_class_id_seq OWNED BY public.license_class.id;


--
-- Name: license_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.license_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: license_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.license_id_seq OWNED BY public.license.id;


--
-- Name: local_driving_license_application; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.local_driving_license_application (
    id integer NOT NULL,
    application_id integer NOT NULL,
    "licenseClassId" integer
);


--
-- Name: local_driving_license_application_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.local_driving_license_application_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: local_driving_license_application_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.local_driving_license_application_id_seq OWNED BY public.local_driving_license_application.id;


--
-- Name: person; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.person (
    id integer NOT NULL,
    first_name character varying NOT NULL,
    second_name character varying NOT NULL,
    third_name character varying NOT NULL,
    last_name character varying NOT NULL,
    national_id character varying(4) NOT NULL,
    date_of_birth timestamp without time zone NOT NULL,
    gender public.person_gender_enum NOT NULL,
    address character varying NOT NULL,
    phone_number character varying(11) NOT NULL,
    email character varying,
    personal_photo character varying,
    country_id integer NOT NULL
);


--
-- Name: person_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.person_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: person_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.person_id_seq OWNED BY public.person.id;


--
-- Name: test; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.test (
    id integer NOT NULL,
    test_status public.test_test_status_enum NOT NULL,
    notes character varying,
    test_appointment_id integer NOT NULL,
    created_by_user_id integer NOT NULL
);


--
-- Name: test_appointment; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.test_appointment (
    id integer NOT NULL,
    appointment_date timestamp without time zone NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    paid_fees numeric NOT NULL,
    is_locked boolean NOT NULL,
    test_type_id integer NOT NULL,
    local_driving_license_application_id integer NOT NULL,
    created_by_user_id integer NOT NULL,
    retake_test_application_id integer
);


--
-- Name: test_appointment_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.test_appointment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: test_appointment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.test_appointment_id_seq OWNED BY public.test_appointment.id;


--
-- Name: test_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.test_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: test_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.test_id_seq OWNED BY public.test.id;


--
-- Name: test_type; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.test_type (
    id integer NOT NULL,
    sequence_order integer NOT NULL,
    system_name public.test_type_system_name_enum NOT NULL,
    type_name character varying NOT NULL,
    type_description character varying NOT NULL,
    type_fees numeric NOT NULL
);


--
-- Name: test_type_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.test_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: test_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.test_type_id_seq OWNED BY public.test_type.id;


--
-- Name: user; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    username character varying NOT NULL,
    password character varying NOT NULL,
    is_active boolean NOT NULL,
    person_id integer NOT NULL
);


--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- Name: application id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.application ALTER COLUMN id SET DEFAULT nextval('public.application_id_seq'::regclass);


--
-- Name: application_type id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.application_type ALTER COLUMN id SET DEFAULT nextval('public.application_type_id_seq'::regclass);


--
-- Name: country id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.country ALTER COLUMN id SET DEFAULT nextval('public.country_id_seq'::regclass);


--
-- Name: detained_license id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.detained_license ALTER COLUMN id SET DEFAULT nextval('public.detained_license_id_seq'::regclass);


--
-- Name: driver id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.driver ALTER COLUMN id SET DEFAULT nextval('public.driver_id_seq'::regclass);


--
-- Name: international_license id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.international_license ALTER COLUMN id SET DEFAULT nextval('public.international_license_id_seq'::regclass);


--
-- Name: license id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.license ALTER COLUMN id SET DEFAULT nextval('public.license_id_seq'::regclass);


--
-- Name: license_class id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.license_class ALTER COLUMN id SET DEFAULT nextval('public.license_class_id_seq'::regclass);


--
-- Name: local_driving_license_application id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.local_driving_license_application ALTER COLUMN id SET DEFAULT nextval('public.local_driving_license_application_id_seq'::regclass);


--
-- Name: person id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.person ALTER COLUMN id SET DEFAULT nextval('public.person_id_seq'::regclass);


--
-- Name: test id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.test ALTER COLUMN id SET DEFAULT nextval('public.test_id_seq'::regclass);


--
-- Name: test_appointment id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.test_appointment ALTER COLUMN id SET DEFAULT nextval('public.test_appointment_id_seq'::regclass);


--
-- Name: test_type id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.test_type ALTER COLUMN id SET DEFAULT nextval('public.test_type_id_seq'::regclass);


--
-- Name: user id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- Data for Name: application; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.application (id, application_status, paid_fees, last_status_date, application_date, person_id, type_id, created_by_user_id) FROM stdin;
1	completed	25	2026-04-16 00:00:00	2026-04-16 03:07:56.113525	8	1	1
3	completed	20	2026-04-16 00:00:00	2026-04-16 03:09:42.806203	2	6	1
2	completed	25	2026-04-16 00:00:00	2026-04-16 03:09:19.961317	2	1	1
4	completed	15	2026-04-16 00:00:00	2026-04-16 03:10:41.11291	2	4	1
5	completed	15	2026-04-16 00:00:00	2026-04-16 03:11:00.27121	8	4	1
6	completed	20	2026-04-16 00:00:00	2026-04-16 03:11:42.709485	2	5	1
7	completed	30	2026-04-16 00:00:00	2026-04-16 03:12:35.93496	8	7	1
\.


--
-- Data for Name: application_type; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.application_type (id, system_name, type_name, type_fees, default_validity_length) FROM stdin;
2	RENEW_LICENSE_SERVICE	Renew License Service	10	\N
1	LOCAL_LICENSE_SERVICE	New Local License Service	25	\N
5	RELEASE_DETAINED_SERVICE	Release Detained License	20	\N
6	RETAKE_TEST_SERVICE	Retake Test Service	20	\N
7	INTERNATIONAL_LICENSE_SERVICE	New International License Service	30	1
3	REPLACE_LOST_SERVICE	Replace Lost License Service	20	\N
4	REPLACE_DAMAGED_SERVICE	Replace Damage License Service	15	\N
\.


--
-- Data for Name: country; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.country (id, country_name) FROM stdin;
2	Albania
3	Algeria
4	American Samoa
5	Andorra
6	Angola
7	Anguilla
8	Antarctica
9	Antigua And Barbuda
10	Argentina
11	Armenia
12	Aruba
13	Australia
14	Austria
15	Azerbaijan
16	Bahamas
17	Bahrain
18	Bangladesh
19	Barbados
20	Belarus
21	Belgium
22	Belize
23	Benin
24	Bermuda
25	Bhutan
26	Bolivia
27	Bosnia And Herzegovina
28	Botswana
29	Bouvet Island
30	Brazil
31	British Indian Ocean Territory
32	Brunei Darussalam
33	Bulgaria
34	Burkina Faso
35	Burundi
36	Cambodia
37	Cameroon
38	Canada
39	Cape Verde
40	Cayman Islands
41	Central African Republic
42	Chad
43	Chile
44	China
45	Christmas Island
46	Cocos (keeling) Islands
47	Colombia
48	Comoros
49	Congo
50	Congo, The Democratic Republic Of The
51	Cook Islands
52	Costa Rica
53	Cote D'ivoire
54	Croatia
55	Cuba
56	Cyprus
57	Czech Republic
58	Denmark
59	Djibouti
60	Dominica
61	Dominican Republic
62	East Timor
63	Ecuador
64	Egypt
65	El Salvador
66	Equatorial Guinea
67	Eritrea
68	Estonia
69	Ethiopia
70	Falkland Islands (malvinas)
71	Faroe Islands
72	Fiji
73	Finland
74	France
75	French Guiana
76	French Polynesia
77	French Southern Territories
78	Gabon
79	Gambia
80	Georgia
81	Germany
82	Ghana
83	Gibraltar
84	Greece
85	Greenland
86	Grenada
87	Guadeloupe
88	Guam
89	Guatemala
90	Guinea
91	Guinea-bissau
92	Guyana
93	Haiti
94	Heard Island And Mcdonald Islands
95	Holy See (vatican City State)
96	Honduras
97	Hong Kong
98	Hungary
99	Iceland
100	India
101	Indonesia
102	Iran
103	Iraq
104	Ireland
105	Italy
106	Jamaica
107	Japan
108	Jordan
109	Kazakstan
110	Kenya
111	Kiribati
112	South Korea
113	North Korea
114	Kosovo
115	Kuwait
116	Kyrgyzstan
117	Lao People's Democratic Republic
118	Latvia
119	Lebanon
120	Lesotho
121	Liberia
122	Libya
123	Liechtenstein
124	Lithuania
125	Luxembourg
126	Macau
127	Macedonia
128	Madagascar
129	Malawi
130	Malaysia
131	Maldives
132	Mali
133	Malta
134	Marshall Islands
135	Martinique
136	Mauritania
137	Mauritius
138	Mayotte
139	Mexico
140	Micronesia, Federated States Of
141	Moldova, Republic Of
142	Monaco
143	Mongolia
144	Montserrat
145	Montenegro
146	Morocco
147	Mozambique
148	Myanmar
149	Namibia
150	Nauru
151	Nepal
152	Netherlands
153	Netherlands Antilles
154	New Caledonia
155	New Zealand
156	Nicaragua
157	Niger
158	Nigeria
159	Niue
160	Norfolk Island
161	Northern Mariana Islands
162	Norway
163	Oman
164	Pakistan
165	Palau
166	Palestine
167	Panama
168	Papua New Guinea
169	Paraguay
170	Peru
171	Philippines
172	Pitcairn
173	Poland
174	Portugal
175	Puerto Rico
176	Qatar
177	Reunion
178	Romania
179	Russian Federation
180	Rwanda
181	Saint Helena
182	Saint Kitts And Nevis
183	Saint Lucia
184	Saint Pierre And Miquelon
185	Saint Vincent And The Grenadines
186	Samoa
187	San Marino
188	Sao Tome And Principe
189	Saudi Arabia
190	Senegal
191	Serbia
192	Seychelles
193	Sierra Leone
194	Singapore
195	Slovakia
196	Slovenia
197	Solomon Islands
198	Somalia
199	South Africa
200	South Georgia And The South Sandwich Islands
201	Spain
202	Sri Lanka
203	Sudan
204	Suriname
205	Svalbard And Jan Mayen
206	Swaziland
207	Sweden
208	Switzerland
209	Syrian Arab Republic
210	Taiwan, Province Of China
211	Tajikistan
212	Tanzania, United Republic Of
213	Thailand
214	Togo
215	Tokelau
216	Tonga
217	Trinidad And Tobago
218	Tunisia
219	Turkey
220	Turkmenistan
221	Turks And Caicos Islands
222	Tuvalu
223	Uganda
224	Ukraine
225	United Arab Emirates
226	United Kingdom
227	United States
228	United States Minor Outlying Islands
229	Uruguay
230	Uzbekistan
231	Vanuatu
232	Venezuela
233	Viet Nam
234	Virgin Islands, British
235	Virgin Islands, U.s.
236	Wallis And Futuna
237	Yemen
238	Zambia
239	Zimbabwe
1	Afghanistan
\.


--
-- Data for Name: detained_license; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.detained_license (id, detain_date, release_date, fine_fees, license_id, created_by_user_id, released_by_user_id, release_application_id) FROM stdin;
1	2026-04-16 00:00:00	2026-04-16 00:00:00	100	3	1	1	6
\.


--
-- Data for Name: driver; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.driver (id, created_at, created_by_user_id, person_id) FROM stdin;
1	2026-04-16 03:09:03.909916	1	8
2	2026-04-16 03:10:25.074336	1	2
\.


--
-- Data for Name: international_license; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.international_license (id, is_active, issue_date, expiration_date, notes, paid_fees, local_license_id, application_id, driver_id, created_by_user_id) FROM stdin;
1	t	2026-04-16 00:00:00	2027-04-16 00:00:00	\N	30	4	7	1	1
\.


--
-- Data for Name: license; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.license (id, is_active, issue_date, expiration_date, notes, issue_reason, paid_fees, application_id, driver_id, license_class_id, created_by_user_id) FROM stdin;
2	f	2026-04-16 00:00:00	2031-04-16 00:00:00		First Time	30	2	2	3	1
3	t	2026-04-16 00:00:00	2031-04-16 00:00:00		Replacement for Damaged	30	4	2	3	1
1	f	2026-04-16 00:00:00	2036-04-16 00:00:00	Good driver	First Time	20	1	1	4	1
4	t	2026-04-16 00:00:00	2036-04-16 00:00:00		Replacement for Damaged	20	5	1	4	1
\.


--
-- Data for Name: license_class; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.license_class (id, class_name, system_name, class_description, class_fees, minimum_allowed_age, default_validity_length) FROM stdin;
1	Small Motorcycle	CLASS_1	A license for small motorcycles and similar vehicles.	15	18	5
3	Heavy Motorcycle	CLASS_2	A license for heavy motorcycles and similar vehicles.	30	21	5
4	Ordinary Car	CLASS_3	A license for ordinary cars and likewise vehicles.	20	18	10
6	Commercial	CLASS_4	A license for commercial vehicles (taxi / limousine)	100	21	10
7	Agricultural	CLASS_5	A license for agricultural and work vehicles.	50	21	10
8	Small And Medium Bus	CLASS_6	A license for small and medium commericial busses.	150	21	10
9	Truck And Heavy	CLASS_7	A license for trucks and heavy vehicles.	200	21	10
\.


--
-- Data for Name: local_driving_license_application; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.local_driving_license_application (id, application_id, "licenseClassId") FROM stdin;
1	1	4
2	2	3
\.


--
-- Data for Name: person; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.person (id, first_name, second_name, third_name, last_name, national_id, date_of_birth, gender, address, phone_number, email, personal_photo, country_id) FROM stdin;
8	Mariam	Ammar	Ali	Elmesaly	9999	2008-01-01 00:00:00	F	My Darling Non-Existent Daughter! Welcome to the club	04047785674	mariam.ammar@gmail.com	\N	189
2	Ammar	Ali	Abdelhamid	Elmesaly	1234	2000-12-09 00:00:00	M		01011111122	noreply@test.com	5b66b342d85fe9a5f1b4efaacacc113f	64
9	Abc	Def	Ghi	Jkl	5555	2005-05-05 00:00:00	M		01055555555	\N	\N	16
\.


--
-- Data for Name: test; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.test (id, test_status, notes, test_appointment_id, created_by_user_id) FROM stdin;
1	1	Excellent Vision	1	1
2	1		2	1
3	1		3	1
4	0	Person can't see without glasses	4	1
5	1		5	1
6	1		6	1
7	1	A little bit fast a driver	7	1
\.


--
-- Data for Name: test_appointment; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.test_appointment (id, appointment_date, created_at, paid_fees, is_locked, test_type_id, local_driving_license_application_id, created_by_user_id, retake_test_application_id) FROM stdin;
1	2026-04-16 00:00:00	2026-04-16 03:08:08.897052	10	t	1	1	1	\N
2	2026-04-16 00:00:00	2026-04-16 03:08:32.352647	20	t	2	1	1	\N
3	2026-04-16 00:00:00	2026-04-16 03:08:43.662511	30	t	3	1	1	\N
4	2026-04-16 00:00:00	2026-04-16 03:09:27.940935	10	t	1	2	1	\N
5	2026-04-16 00:00:00	2026-04-16 03:09:42.806203	30	t	1	2	1	3
6	2026-04-16 00:00:00	2026-04-16 03:09:55.221687	20	t	2	2	1	\N
7	2026-04-16 00:00:00	2026-04-16 03:10:06.26295	30	t	3	2	1	\N
\.


--
-- Data for Name: test_type; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.test_type (id, sequence_order, system_name, type_name, type_description, type_fees) FROM stdin;
1	1	VISION_TEST	Vision Test	This test assesses the applicant visual ability to ensure driver safety.	10
2	2	WRITTEN_TEST	Written Test	This test assesses the theoritical information of the driver.	20
3	3	PRACTICAL_TEST	Practical Test	This test assesses the driver skills and how he/she maneuvers the road.	30
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."user" (id, username, password, is_active, person_id) FROM stdin;
1	ammar	$2b$15$ixL39jGJtuAnuQyjRteTzuv3VQ/RosFn1.jRKNoG5LCjzzPpYeOEq	t	2
5	mariam	$2b$12$Qk9o93UFdc7J8OgL4iKDtuHvIOiME4fzoWRt204BrFJ6prSpUvM6a	t	8
\.


--
-- Name: application_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.application_id_seq', 7, true);


--
-- Name: application_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.application_type_id_seq', 7, true);


--
-- Name: country_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.country_id_seq', 1, false);


--
-- Name: detained_license_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.detained_license_id_seq', 1, true);


--
-- Name: driver_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.driver_id_seq', 2, true);


--
-- Name: international_license_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.international_license_id_seq', 1, true);


--
-- Name: license_class_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.license_class_id_seq', 9, true);


--
-- Name: license_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.license_id_seq', 4, true);


--
-- Name: local_driving_license_application_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.local_driving_license_application_id_seq', 2, true);


--
-- Name: person_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.person_id_seq', 9, true);


--
-- Name: test_appointment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.test_appointment_id_seq', 7, true);


--
-- Name: test_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.test_id_seq', 7, true);


--
-- Name: test_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.test_type_id_seq', 3, true);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.user_id_seq', 5, true);


--
-- Name: local_driving_license_application PK_03dc085b4bf01b9a9228d1ee4de; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.local_driving_license_application
    ADD CONSTRAINT "PK_03dc085b4bf01b9a9228d1ee4de" PRIMARY KEY (id);


--
-- Name: test PK_5417af0062cf987495b611b59c7; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.test
    ADD CONSTRAINT "PK_5417af0062cf987495b611b59c7" PRIMARY KEY (id);


--
-- Name: application PK_569e0c3e863ebdf5f2408ee1670; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.application
    ADD CONSTRAINT "PK_569e0c3e863ebdf5f2408ee1670" PRIMARY KEY (id);


--
-- Name: person PK_5fdaf670315c4b7e70cce85daa3; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.person
    ADD CONSTRAINT "PK_5fdaf670315c4b7e70cce85daa3" PRIMARY KEY (id);


--
-- Name: driver PK_61de71a8d217d585ecd5ee3d065; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.driver
    ADD CONSTRAINT "PK_61de71a8d217d585ecd5ee3d065" PRIMARY KEY (id);


--
-- Name: license_class PK_63b096b54b3c60dd8f84c7027e8; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.license_class
    ADD CONSTRAINT "PK_63b096b54b3c60dd8f84c7027e8" PRIMARY KEY (id);


--
-- Name: test_type PK_6d292e606d0adead3808dc7a378; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.test_type
    ADD CONSTRAINT "PK_6d292e606d0adead3808dc7a378" PRIMARY KEY (id);


--
-- Name: detained_license PK_7b431ad9e76ce990ccfc810306f; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.detained_license
    ADD CONSTRAINT "PK_7b431ad9e76ce990ccfc810306f" PRIMARY KEY (id);


--
-- Name: international_license PK_adfcd3e4b6749f98044d102a7b9; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.international_license
    ADD CONSTRAINT "PK_adfcd3e4b6749f98044d102a7b9" PRIMARY KEY (id);


--
-- Name: test_appointment PK_b1a9d933ce9d9e1816a1bef67c4; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.test_appointment
    ADD CONSTRAINT "PK_b1a9d933ce9d9e1816a1bef67c4" PRIMARY KEY (id);


--
-- Name: country PK_bf6e37c231c4f4ea56dcd887269; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.country
    ADD CONSTRAINT "PK_bf6e37c231c4f4ea56dcd887269" PRIMARY KEY (id);


--
-- Name: user PK_cace4a159ff9f2512dd42373760; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id);


--
-- Name: application_type PK_d0df6488786bebbf22e34194f73; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.application_type
    ADD CONSTRAINT "PK_d0df6488786bebbf22e34194f73" PRIMARY KEY (id);


--
-- Name: license PK_f168ac1ca5ba87286d03b2ef905; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.license
    ADD CONSTRAINT "PK_f168ac1ca5ba87286d03b2ef905" PRIMARY KEY (id);


--
-- Name: international_license REL_052cf86d00203f6b7e742af6d8; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.international_license
    ADD CONSTRAINT "REL_052cf86d00203f6b7e742af6d8" UNIQUE (application_id);


--
-- Name: local_driving_license_application REL_6df4a34d05be18bc08f56a379e; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.local_driving_license_application
    ADD CONSTRAINT "REL_6df4a34d05be18bc08f56a379e" UNIQUE (application_id);


--
-- Name: test_appointment REL_93f2115aac2255019dc7edd689; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.test_appointment
    ADD CONSTRAINT "REL_93f2115aac2255019dc7edd689" UNIQUE (retake_test_application_id);


--
-- Name: detained_license REL_981ecad3067ad9b8aed8bf2c7a; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.detained_license
    ADD CONSTRAINT "REL_981ecad3067ad9b8aed8bf2c7a" UNIQUE (release_application_id);


--
-- Name: driver REL_a1433f8f059b533957aa5b0646; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.driver
    ADD CONSTRAINT "REL_a1433f8f059b533957aa5b0646" UNIQUE (person_id);


--
-- Name: user REL_a4cee7e601d219733b064431fb; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "REL_a4cee7e601d219733b064431fb" UNIQUE (person_id);


--
-- Name: license REL_bb33189688db3f061bcf9d920d; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.license
    ADD CONSTRAINT "REL_bb33189688db3f061bcf9d920d" UNIQUE (application_id);


--
-- Name: international_license REL_df24e7a90999416750158e5235; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.international_license
    ADD CONSTRAINT "REL_df24e7a90999416750158e5235" UNIQUE (driver_id);


--
-- Name: test REL_e90184e613bf9388e6429b0ca9; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.test
    ADD CONSTRAINT "REL_e90184e613bf9388e6429b0ca9" UNIQUE (test_appointment_id);


--
-- Name: international_license REL_f04970008e8a5ea3e2b34d19a0; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.international_license
    ADD CONSTRAINT "REL_f04970008e8a5ea3e2b34d19a0" UNIQUE (local_license_id);


--
-- Name: person UQ_0956bce9971d7f1953c39ef97ba; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.person
    ADD CONSTRAINT "UQ_0956bce9971d7f1953c39ef97ba" UNIQUE (national_id);


--
-- Name: person UQ_14092a0ddb4f4b457f1d05b0fc6; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.person
    ADD CONSTRAINT "UQ_14092a0ddb4f4b457f1d05b0fc6" UNIQUE (phone_number);


--
-- Name: country UQ_5397304ae6a7d7a1faa13267893; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.country
    ADD CONSTRAINT "UQ_5397304ae6a7d7a1faa13267893" UNIQUE (country_name);


--
-- Name: user UQ_78a916df40e02a9deb1c4b75edb; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE (username);


--
-- Name: test_type UQ_b831fe7b498428bbfac551857b7; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.test_type
    ADD CONSTRAINT "UQ_b831fe7b498428bbfac551857b7" UNIQUE (sequence_order);


--
-- Name: person UQ_d2d717efd90709ebd3cb26b936c; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.person
    ADD CONSTRAINT "UQ_d2d717efd90709ebd3cb26b936c" UNIQUE (email);


--
-- Name: person UQ_full_name; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.person
    ADD CONSTRAINT "UQ_full_name" UNIQUE (first_name, second_name, third_name, last_name);


--
-- Name: IDX_4be01791e9e288cf5c9456f3cb; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "IDX_4be01791e9e288cf5c9456f3cb" ON public.license USING btree (driver_id, license_class_id) WHERE (is_active = true);


--
-- Name: UQ_active_driver_license; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "UQ_active_driver_license" ON public.international_license USING btree (driver_id) WHERE (is_active = true);


--
-- Name: international_license FK_052cf86d00203f6b7e742af6d87; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.international_license
    ADD CONSTRAINT "FK_052cf86d00203f6b7e742af6d87" FOREIGN KEY (application_id) REFERENCES public.application(id) ON DELETE CASCADE;


--
-- Name: test FK_072238154f5180ae5492954669f; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.test
    ADD CONSTRAINT "FK_072238154f5180ae5492954669f" FOREIGN KEY (created_by_user_id) REFERENCES public."user"(id) ON DELETE CASCADE;


--
-- Name: application FK_14fb4cafbba335ebb2f4920de56; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.application
    ADD CONSTRAINT "FK_14fb4cafbba335ebb2f4920de56" FOREIGN KEY (created_by_user_id) REFERENCES public."user"(id) ON DELETE CASCADE;


--
-- Name: local_driving_license_application FK_1ed71a6b38ad1c4b91ddc90d025; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.local_driving_license_application
    ADD CONSTRAINT "FK_1ed71a6b38ad1c4b91ddc90d025" FOREIGN KEY ("licenseClassId") REFERENCES public.license_class(id) ON DELETE RESTRICT;


--
-- Name: international_license FK_2de5a318c05944481724b028e51; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.international_license
    ADD CONSTRAINT "FK_2de5a318c05944481724b028e51" FOREIGN KEY (created_by_user_id) REFERENCES public."user"(id);


--
-- Name: test_appointment FK_3cdb6042b7861232e4d7afec5a9; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.test_appointment
    ADD CONSTRAINT "FK_3cdb6042b7861232e4d7afec5a9" FOREIGN KEY (test_type_id) REFERENCES public.test_type(id) ON DELETE RESTRICT;


--
-- Name: detained_license FK_444ac86de65a73193139e844e7f; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.detained_license
    ADD CONSTRAINT "FK_444ac86de65a73193139e844e7f" FOREIGN KEY (license_id) REFERENCES public.license(id) ON DELETE CASCADE;


--
-- Name: license FK_45a8056f49c1c5a12bb265f686b; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.license
    ADD CONSTRAINT "FK_45a8056f49c1c5a12bb265f686b" FOREIGN KEY (driver_id) REFERENCES public.driver(id) ON DELETE CASCADE;


--
-- Name: detained_license FK_46ec0a4b6747714017e2f4d0586; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.detained_license
    ADD CONSTRAINT "FK_46ec0a4b6747714017e2f4d0586" FOREIGN KEY (released_by_user_id) REFERENCES public."user"(id);


--
-- Name: test_appointment FK_46f2d26ddf0ea8c02f026574af2; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.test_appointment
    ADD CONSTRAINT "FK_46f2d26ddf0ea8c02f026574af2" FOREIGN KEY (local_driving_license_application_id) REFERENCES public.local_driving_license_application(id) ON DELETE CASCADE;


--
-- Name: license FK_4f4cf137c2e8189a1223f3d750c; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.license
    ADD CONSTRAINT "FK_4f4cf137c2e8189a1223f3d750c" FOREIGN KEY (created_by_user_id) REFERENCES public."user"(id);


--
-- Name: license FK_64c9beb79dd44551450018d7bd4; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.license
    ADD CONSTRAINT "FK_64c9beb79dd44551450018d7bd4" FOREIGN KEY (license_class_id) REFERENCES public.license_class(id) ON DELETE RESTRICT;


--
-- Name: application FK_6b894394b2ff381bb7f6f95d09a; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.application
    ADD CONSTRAINT "FK_6b894394b2ff381bb7f6f95d09a" FOREIGN KEY (person_id) REFERENCES public.person(id) ON DELETE CASCADE;


--
-- Name: local_driving_license_application FK_6df4a34d05be18bc08f56a379e9; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.local_driving_license_application
    ADD CONSTRAINT "FK_6df4a34d05be18bc08f56a379e9" FOREIGN KEY (application_id) REFERENCES public.application(id) ON DELETE CASCADE;


--
-- Name: test_appointment FK_93f2115aac2255019dc7edd689e; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.test_appointment
    ADD CONSTRAINT "FK_93f2115aac2255019dc7edd689e" FOREIGN KEY (retake_test_application_id) REFERENCES public.application(id) ON DELETE CASCADE;


--
-- Name: detained_license FK_981ecad3067ad9b8aed8bf2c7ae; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.detained_license
    ADD CONSTRAINT "FK_981ecad3067ad9b8aed8bf2c7ae" FOREIGN KEY (release_application_id) REFERENCES public.application(id);


--
-- Name: driver FK_a1433f8f059b533957aa5b0646f; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.driver
    ADD CONSTRAINT "FK_a1433f8f059b533957aa5b0646f" FOREIGN KEY (person_id) REFERENCES public.person(id) ON DELETE CASCADE;


--
-- Name: user FK_a4cee7e601d219733b064431fba; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "FK_a4cee7e601d219733b064431fba" FOREIGN KEY (person_id) REFERENCES public.person(id) ON DELETE CASCADE;


--
-- Name: detained_license FK_a753afa70aa7fbee605a3838e26; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.detained_license
    ADD CONSTRAINT "FK_a753afa70aa7fbee605a3838e26" FOREIGN KEY (created_by_user_id) REFERENCES public."user"(id);


--
-- Name: license FK_bb33189688db3f061bcf9d920da; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.license
    ADD CONSTRAINT "FK_bb33189688db3f061bcf9d920da" FOREIGN KEY (application_id) REFERENCES public.application(id) ON DELETE CASCADE;


--
-- Name: driver FK_bf4384b8dd8f9bf43710f007528; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.driver
    ADD CONSTRAINT "FK_bf4384b8dd8f9bf43710f007528" FOREIGN KEY (created_by_user_id) REFERENCES public."user"(id);


--
-- Name: person FK_ca614efc0d0301f25b4cea8a608; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.person
    ADD CONSTRAINT "FK_ca614efc0d0301f25b4cea8a608" FOREIGN KEY (country_id) REFERENCES public.country(id) ON DELETE RESTRICT;


--
-- Name: application FK_d0df6488786bebbf22e34194f73; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.application
    ADD CONSTRAINT "FK_d0df6488786bebbf22e34194f73" FOREIGN KEY (type_id) REFERENCES public.application_type(id) ON DELETE RESTRICT;


--
-- Name: international_license FK_df24e7a90999416750158e52357; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.international_license
    ADD CONSTRAINT "FK_df24e7a90999416750158e52357" FOREIGN KEY (driver_id) REFERENCES public.driver(id) ON DELETE CASCADE;


--
-- Name: test FK_e90184e613bf9388e6429b0ca9d; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.test
    ADD CONSTRAINT "FK_e90184e613bf9388e6429b0ca9d" FOREIGN KEY (test_appointment_id) REFERENCES public.test_appointment(id) ON DELETE CASCADE;


--
-- Name: international_license FK_f04970008e8a5ea3e2b34d19a05; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.international_license
    ADD CONSTRAINT "FK_f04970008e8a5ea3e2b34d19a05" FOREIGN KEY (local_license_id) REFERENCES public.license(id);


--
-- Name: test_appointment FK_f2b45feb9d4a4acad3e13be44de; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.test_appointment
    ADD CONSTRAINT "FK_f2b45feb9d4a4acad3e13be44de" FOREIGN KEY (created_by_user_id) REFERENCES public."user"(id);


--
-- PostgreSQL database dump complete
--

\unrestrict bElOntZQfuc9DPahZT8uLikWnp5buXW5T575oUbIRWhrMzCRUaUoRPTwX3L5hHA

