use a;
drop table afr_tbl;
create table afr_tbl (
	date_day date, 
    total_cases int,
    total_deaths int, 
    people_vaccinated int
);

select * from afr_tbl order by date_day desc;
select count(*) from afr_tbl;
select * from afr_tbl;