create database gestion_event;
USE gestion_event;

create table utilisateur(
    id int auto_increment,
    nom varchar(50),
    prenom varchar(70),
    email varchar(100) unique,
    password varchar(255),
    constraint user_pk primary key(id)
);

create table administrateur(
    idAdmin int auto_increment,
    constraint admin_pk primary key(idAdmin),
    constraint admin_fk1 foreign key(idAdmin) references utilisateur(id)
);


create table organisateur(
    idOrg int auto_increment,
    constraint org_pk primary key(idOrg),
    constraint org_fk1 foreign key(idOrg) references utilisateur(id)
);

create table participant(
    idPar int auto_increment,
    constraint par_pk primary key(idPar),
    constraint par_fk1 foreign key(idPar) references utilisateur(id)
);

create table categorie(
    codeC int auto_increment,
    nomCat varchar(50),
    constraint cat_pk primary key(codeC)
);

create table evenement(
    idEvent int auto_increment,
    titre varchar(100),
    descriptions varchar(100),
    date_E date,
    lieu varchar(100),
    statut varchar(20),
    codeC int,
    idOrg int,
    idAdmin int,
    constraint event_pk primary key(idEvent),
    constraint event_fk1 foreign key(idOrg) references organisateur(idOrg),
    constraint event_fk2 foreign key(idAdmin) references administrateur(idAdmin),
    constraint event_fk3 foreign key(codeC) references categorie(codeC)
);

create table reservation(
    codeR int auto_increment,
    dateR date,
    nbPlace int,
    billetN varchar(100),
    prixB int,
    qte int,
    status_R varchar(20),
    idPar int,
    idEvent int,
    constraint resv_pk primary key(codeR),
    constraint resv_fk1 foreign key(idPar) references participant(idPar),
    constraint resv_fk2 foreign key(idEvent) references evenement(idEvent)
);

create table commentaire(
    idEvent int auto_increment,
    idPar int auto_increment,
    contenu varchar(100),
    dateC date,
    constraint comm_pk primary key(idEvent,idPar),
    constraint comm_fk1 foreign key(idEvent) references evenement(idEvent),
    constraint comm_fk2 foreign key(idPar) references participant(idPar)
);
