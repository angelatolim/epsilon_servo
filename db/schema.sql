CREATE DATABASE servo;

CREATE TABLE stations
(
    id SERIAL PRIMARY KEY,
    FID text,
    NAME text,
    OWNER text,
    ADDRESS text,
    SUBURB text,
    STATE text,
    LATITUDE FLOAT,
    LONGITUDE FLOAT
);

-- drop FID and industry ID

select owner, count(id) from stations group by owner having count(id) > 1 order by count desc;


ALTER TABLE stations ALTER COLUMN latitude TYPE FLOAT USING (latitude::float),
ALTER COLUMN longitude TYPE FLOAT USING (longitude::float);


-36.144624

144.730636



-36.757109

145.568083


SELECT * 
    FROM stations 
    WHERE latitude 
    BETWEEN -36.757109 AND -36.144624
    AND longitude
    BETWEEN 144.730636 AND 145.568083
    ;

SELECT * 
    FROM stations 
    WHERE latitude 
    BETWEEN -36.757109 AND -36.144624
    AND longitude 
    BETWEEN  
    ;
