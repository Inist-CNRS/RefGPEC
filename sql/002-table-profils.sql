DROP TABLE IF EXISTS profils CASCADE ;
CREATE TABLE profils (
profil_code VARCHAR(15) NOT NULL,
profil_shortname VARCHAR(100),
profil_pdf_path VARCHAR(255),
profil_free_comments VARCHAR(255),
orga_code VARCHAR(8),
CONSTRAINT pk_profils PRIMARY KEY (profil_code),
CONSTRAINT fk_profils_organigramme FOREIGN KEY (orga_code) REFERENCES organigramme(orga_code)
);
