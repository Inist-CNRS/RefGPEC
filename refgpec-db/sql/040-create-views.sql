
CREATE VIEW view_list_family_profil AS
select distinct f.family_id,f.family_name from family_skills_levels fs ,skills s,family f where fs.family_id= f.family_id and fs.skill_code=s.skill_code order by f.family_name;

CREATE VIEW view_profils_nb_skills AS
select pr.profil_code,pr.profil_shortname,pr.profil_pdf_path,pr.profil_free_comments,
sum(CASE WHEN st.st_code ='s' THEN 1 ELSE 0 END) as profilNbSkillsS,
sum(CASE WHEN st.st_code ='se'  THEN 1 ELSE 0 END) as profilNbSkillsSE,
sum(CASE WHEN st.st_code ='sf'  THEN 1 ELSE 0 END) as profilNbSkillsSF
from profils pr
LEFT JOIN  profils_skills_levels psl ON pr.profil_code = psl.profil_code
LEFT JOIN skills s  ON psl.skill_code = s.skill_code
LEFT JOIN skills_types st on st.st_code =s.st_code
group by pr.profil_code,pr.profil_shortname,pr.profil_pdf_path,pr.profil_free_comments
order by pr.profil_code ;

create view list_skills_attached_profils as
select psl.skill_code,skill_shortname,pr.profil_shortname,psl.profil_code
from profils pr, skills s, profils_skills_levels psl
where s.skill_code= psl.skill_code and pr.profil_code= psl.profil_code
group by psl.skill_code,skill_shortname, pr.profil_shortname,psl.profil_code;

create view list_levels_attached_profils as
select psl.level_code,level_shortname,psl.profil_code,pr.profil_shortname
from profils pr, levels l, profils_skills_levels psl
where l.level_code= psl.level_code and pr.profil_code= psl.profil_code
group by psl.level_code,level_shortname, psl.profil_code,pr.profil_shortname;

create view list_profils_attached_skills as
select psl.profil_code,skill_shortname,pr.profil_shortname
from profils pr, skills s, profils_skills_levels psl
where s.skill_code= psl.skill_code and pr.profil_code= psl.profil_code
group by psl.profil_code,skill_shortname,pr.profil_shortname;


create view list_familys_attached_skills as
select fsl.family_id,family_name,fsl.skill_code,s.skill_shortname
from skills s, family f, family_skills_levels fsl
where f.family_id= fsl.family_id and s.skill_code= fsl.skill_code
group by fsl.family_id,family_name, fsl.skill_code,s.skill_shortname;

create view list_skills_attached_familys as
select fsl.skill_code,skill_shortname,f.family_id,f.family_name
from family f, skills s, family_skills_levels fsl
where s.skill_code= fsl.skill_code and f.family_id= fsl.family_id
group by fsl.skill_code,skill_shortname,f.family_id,family_name
order by fsl.skill_code;

create view view_nb_skills_by_levels as
select l.level_code,profil_code,count(skill_code)
from levels l , profils_skills_levels psl
where l.level_code= psl.level_code
group by l.level_code,profil_code;


create view view_exportCSV_skills as
select skill_code as code,st_shortname as Type,skill_shortname as Nom,CASE WHEN skill_free_comments is null THEN '' ELSE skill_free_comments END as Commentaire,referens
from skills s, skills_types st
where s.st_code= st.st_code
order by type,skill_code;

create view view_exportcsv_profilsSkills as
select profil_code,Type,code, Nom,'0' as "Modulation_profil",'' as "Modulation_individuelle", CASE WHEN Commentaire is null THEN '' ELSE Commentaire END as "Commentaires" from view_exportcsv_skills cross join
profils where (code,Nom,profil_code  )not in (select psl.skill_code,skill_shortname,p.profil_code  from profils p , skills s , profils_skills_levels psl
                                                                               where s.skill_code = psl.skill_code and p.profil_code = psl.profil_code)
UNION
select p.profil_code,Type,code, Nom,level_number,'' as "Modulation_individuelle",CASE WHEN psl_free_comments is null THEN '' ELSE psl_free_comments END as "Commentaires" from profils p , view_exportcsv_skills s , profils_skills_levels psl,levels l
                                                                               where s.code = psl.skill_code and p.profil_code = psl.profil_code and l.level_code = psl.level_code;

create view view_exportCSV_profils as
select profil_code as code,profil_shortname  as Nom ,CASE WHEN profil_free_comments is null THEN '' ELSE profil_free_comments END as Commentaire,profil_pdf_path as lien_du_PDF
from profils p
order by profil_code;

create view list_profils_attached_familys as
select count(psl.skill_code), profil_code,fsl.family_id,family_name,table2.nb_comp_necessaire
from profils_skills_levels psl,family f,family_skills_levels fsl INNER join (select fsl.family_id,count(skill_code) as nb_comp_necessaire from family_skills_levels fsl group by fsl.family_id order by family_id) table2 on fsl.family_id=table2.family_id
where psl.skill_code=fsl.skill_code and psl.level_code>=fsl.level_code
and f.family_id=fsl.family_id
group by profil_code,fsl.family_id,family_name,table2.nb_comp_necessaire
having count(psl.skill_code)>=table2.nb_comp_necessaire
order by profil_code,family_id;

create view list_profils_attached_familys_proches as
select count(psl.skill_code) as nb_competence, profil_code,fsl.family_id,family_name
from profils_skills_levels psl,family f,family_skills_levels fsl
where psl.skill_code=fsl.skill_code
and f.family_id=fsl.family_id
group by profil_code,fsl.family_id,family_name
order by profil_code,family_id;

create view list_profils_attached_familys_complet as
select count(psl.skill_code) as nb_competence, profil_code,fsl.family_id,family_name
from profils_skills_levels psl,family f,family_skills_levels fsl
where psl.skill_code=fsl.skill_code
and f.family_id=fsl.family_id
group by profil_code,fsl.family_id,family_name
UNION
select distinct 0,profil_code,fsl.family_id,family_name
from profils_skills_levels psl,family f,family_skills_levels fsl
where f.family_id=fsl.family_id and  (profil_code,fsl.family_id,family_name) not in(select profil_code,family_id,family_name from list_profils_attached_familys_proches)
order by profil_code,family_id;

create view list_skills_profils_familys_levels as
select skill_shortname, psl.profil_code,profil_shortname,fsl.family_id,family_name,l.level_number as modulation_profil,l2.level_number as modulation_famille
from profils_skills_levels psl,family f,family_skills_levels fsl,levels l,skills s,profils p,levels l2
where psl.skill_code=fsl.skill_code and l.level_code=psl.level_code and s.skill_code=fsl.skill_code and p.profil_code=psl.profil_code and l2.level_code=fsl.level_code
and f.family_id=fsl.family_id
group by skill_shortname,psl.profil_code,profil_shortname,fsl.family_id,family_name,l.level_number,l2.level_number
UNION
select skill_shortname,psl.profil_code,profil_shortname,fsl.family_id,family_name,0 as modulation_profil,level_number as modulation_famille
from profils_skills_levels psl,family f,family_skills_levels fsl,skills s,profils p,levels l
where f.family_id=fsl.family_id and s.skill_code=fsl.skill_code and p.profil_code=psl.profil_code and l.level_code=fsl.level_code
and (skill_shortname, psl.profil_code,profil_shortname,fsl.family_id,family_name) not in (select skill_shortname, psl.profil_code,profil_shortname,fsl.family_id,family_name
from profils_skills_levels psl,family f,family_skills_levels fsl,levels l,skills s,profils p
where psl.skill_code=fsl.skill_code and l.level_code=psl.level_code and s.skill_code=fsl.skill_code and p.profil_code=psl.profil_code
and f.family_id=fsl.family_id
group by skill_shortname,psl.profil_code,profil_shortname,fsl.family_id,family_name,level_number)
order by profil_code,family_id ;

create view comparatif_profil_famille as
select nb_competence, lpafc.profil_code,lpafc.family_id,lpafc.family_name,nb_comp_necessaire
from list_profils_attached_familys_complet lpafc,list_profils_attached_familys lpaf
where lpafc.family_id=lpaf.family_id
group by   nb_competence, lpafc.profil_code,lpafc.family_id,lpafc.family_name,nb_comp_necessaire
order by lpafc.profil_code,lpafc.family_id;

create view count_profil_famille as
select count(profil_code) as nb_profil,family_id,family_name
from list_profils_attached_familys
group by family_id,family_name
order by nb_profil DESC,family_id,family_name