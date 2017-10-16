create role web_anon nologin;
grant web_anon to refgpec;

GRANT SELECT ON ALL TABLES IN SCHEMA public TO web_anon;