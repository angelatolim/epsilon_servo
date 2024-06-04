CREATE DATABASE servo;

CREATE TABLE stations
(
    id SERIAL PRIMARY KEY,
    FEATURETYPE text,
    DESCRIPTION text,
    CLASS text,
    FID text,
    NAME text,
    OPERATIONALSTATUS text,
    OWNER text,
    INDUSTRYID text,
    ADDRESS text,
    SUBURB text,
    STATE text,
    SPATIALCONFIDENCE text,
    REVISED text,
    COMMENT text,
    LATITUDE text,
    LONGITUDE text
);

-- drop FID and industry ID

select owner, count(id) from stations group by owner having count(id) > 1 order by count desc;