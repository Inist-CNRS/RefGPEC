DROP TABLE IF EXISTS profils CASCADE ;
CREATE TABLE profils (
profil_code VARCHAR(100) NOT NULL,
profil_shortname VARCHAR(100),
profil_pdf_path VARCHAR(255),
profil_free_comments VARCHAR(255),
tag_code VARCHAR(32) NULL,
CONSTRAINT pk_profils PRIMARY KEY (profil_code),
CONSTRAINT fk_profils_tag FOREIGN KEY (tag_code) REFERENCES tags(tag_code)
);
