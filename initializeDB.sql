CREATE TABLE "favourites" ("v_id" INTEGER NOT NULL , "u_id" INTEGER NOT NULL , PRIMARY KEY ("v_id", "u_id"));
CREATE TABLE "friends" ("one_id" INTEGER NOT NULL , "two_id" INTEGER NOT NULL , PRIMARY KEY ("one_id", "two_id"));
CREATE TABLE "users" ("id" INTEGER PRIMARY KEY  NOT NULL , "firstname" TEXT, "lastname" TEXT, "username" TEXT NOT NULL UNIQUE , "password" TEXT NOT NULL, "email" TEXT UNIQUE, "admin" BOOL);
CREATE TABLE "videos" ("id" INTEGER PRIMARY KEY  NOT NULL , "u_id" INTEGER NOT NULL , "url" TEXT NOT NULL );

INSERT INTO "favourites" VALUES(0,1);
INSERT INTO "favourites" VALUES(0,0);
INSERT INTO "favourites" VALUES(1,0);

INSERT INTO "friends" VALUES(1,0);
INSERT INTO "friends" VALUES(0,1);
INSERT INTO "friends" VALUES(2,1);

INSERT INTO "users" VALUES(0,'Vilhjalmur','Hannesson','villi','villi','villi@gmail.com',1);
INSERT INTO "users" VALUES(1,'Hoskuldur','Agustsson','hossi','hossi','hossi@gmail.com',1);
INSERT INTO "users" VALUES(2,'Hjalti','Hannesson','hjalti','hjalti','hjalti@gmail.com',0);

INSERT INTO "videos" VALUES(0,0,'https://www.youtube.com/watch?v=T6ojAlXtzEQ');
INSERT INTO "videos" VALUES(1,1,'https://www.youtube.com/watch?v=OwgjaysrhzM');