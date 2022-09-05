CREATE TABLE korisnici (
    id VARCHAR(20) PRIMARY KEY,
    mejl VARCHAR(100) NOT NULL UNIQUE,
    ime TEXT NOT NULL,
    prezime TEXT NOT NULL,
    lozinka TEXT NOT NULL
);

CREATE TABLE odeljenja (
    id VARCHAR(20) PRIMARY KEY,
    naziv TEXT NOT NULL,
    godina INT NOT NULL,
    dani JSON NOT NULL,
    datumi JSON NOT NULL
);

CREATE TABLE korisnici_odeljenja (
    korisnik_id VARCHAR(20),
    odeljenje_id VARCHAR(20),
    PRIMARY KEY(korisnik_id, odeljenje_id)
);