DROP TABLE IF EXISTS profils CASCADE ;
CREATE TABLE profils (
profil_code VARCHAR(100) NOT NULL,
profil_shortname VARCHAR(100),
profil_pdf_path VARCHAR(255),
profil_free_comments VARCHAR(255),
profil_tag VARCHAR(50) NULL,
CONSTRAINT pk_profils PRIMARY KEY (profil_code)
);
