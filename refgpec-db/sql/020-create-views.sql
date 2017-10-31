CREATE VIEW view_list_orga_profils AS
select distinct orga_code from profils order by orga_code;

CREATE VIEW view_list_domains_profil AS
select distinct s.sd_code,sd_shortname from skills_domains sd,skills s where s.sd_code= sd.sd_code order by sd_shortname;