DROP TABLE IF EXISTS profils CASCADE ;
CREATE TABLE profils (
profil_code VARCHAR(100) NOT NULL,
profil_shortname VARCHAR(100),
profil_pdf_path VARCHAR(350),
profil_free_comments VARCHAR(255),
CONSTRAINT pk_profils PRIMARY KEY (profil_code)
);
