SELECT * FROM Scrum.users;
SELECT * FROM Scrum.admins;
SELECT * FROM Scrum.CustomizationParametersConfiguration;
SELECT * FROM Scrum.PaperColorConfiguration;
SELECT * FROM Scrum.PaperTypeConfiguration;
SELECT * FROM Scrum.CoverColorConfiguration;
SELECT * FROM Scrum.CoverTextConfiguration;
SELECT * FROM Scrum.CustomerOrder;

INSERT INTO Scrum.admins VALUES ('abc', 'def', 'abc@def.com', '$2b$12$1oY4FP98TBjomqrARG5Wk.XYJJww/6nYFxRgEiv0yj62bZeo/3o/a', '2020-01-01');

delete from Scrum.CustomerOrder where id = 10;

ALTER TABLE Scrum.CustomerOrder
ADD COLUMN OrderDateTime DATETIME NOT NULL DEFAULT '2020-05-05';

SELECT o.Id, o.PaperColor, o.PaperType, o.CoverColor, o.CoverText, o.OrderDate, o.DeliveryOption, o.Comments, u.first_name, u.last_name, u.email FROM scrum.CustomerOrder o
INNER JOIN scrum.Users u on o.customerEmail = u.Email WHERE o.OrderDateTime > '2020-05-04';

delete from scrum.users where email like 'khulud@abc.com';
delete from scrum.admins where email like 'ali@chishti.com';

UPDATE Scrum.CustomerOrder SET Comments = 'I am satisfied with my product.' where id = 1;

ALTER TABLE Scrum.CustomerOrder CHANGE `CustomerId` `CustomerEmail` VARCHAR(150);
UPDATE Scrum.CustomerOrder SET CustomerEmail = 'ahsan@gmail.com' WHERE Id = 1;

ALTER TABLE Scrum.CustomerOrder ADD Comments VARCHAR(1000);

ALTER TABLE Scrum.users DROP COLUMN Id;

ALTER TABLE Scrum.users ADD Id INT;

UPDATE scrum.users SET Id = 1 where email like 'ahsan@gmail.com';
UPDATE scrum.users SET Id = 2 where email like 'ali@dalla.com';
UPDATE scrum.users SET Id = 3 where email like 'ammar@abc.com';
UPDATE scrum.users SET Id = 4 where email like 'nadeem.naz@abc.com';

ALTER TABLE Scrum.CustomerOrder CHANGE `CoverType` `CoverText` VARCHAR(150);

INSERT INTO Scrum.CustomizationParametersConfiguration VALUES (1, 'PaperColor');
INSERT INTO Scrum.CustomizationParametersConfiguration VALUES (2, 'PaperType');
INSERT INTO Scrum.CustomizationParametersConfiguration VALUES (3, 'CoverColor');
INSERT INTO Scrum.CustomizationParametersConfiguration VALUES (4, 'PaperColor');

INSERT INTO Scrum.PaperColorConfiguration VALUES (1, 1, 'Blue', 1);
INSERT INTO Scrum.PaperColorConfiguration VALUES (2, 1, 'Yellow', 1);
INSERT INTO Scrum.PaperColorConfiguration VALUES (3, 1, 'Orange', 1);

INSERT INTO Scrum.PaperTypeConfiguration VALUES (1, 2, 'Plain', 1);
INSERT INTO Scrum.PaperTypeConfiguration VALUES (2, 2, 'Dotted', 1);
INSERT INTO Scrum.PaperTypeConfiguration VALUES (3, 2, 'Lined', 1);

INSERT INTO Scrum.CoverColorConfiguration VALUES (1, 3, 'Red', 1);
INSERT INTO Scrum.CoverColorConfiguration VALUES (2, 3, 'Green', 1);
INSERT INTO Scrum.CoverColorConfiguration VALUES (3, 3, 'Black', 1);

INSERT INTO Scrum.CoverTextConfiguration VALUES (1, 4, 'Text', '1');

INSERT INTO scrum.users values ('Ammar', 'Nadeem', 'ammar@abc.com', 'samosa', '2020-01-01');
INSERT INTO scrum.admins values ('Admin', 'Admin', 'admin@abc.com', '$2b$12$ayhHEEpq8xbfMN.1nb/If.TG5WypvWkAlbFfGo4unYu8GgHWwkxSq', '2020-01-01');

INSERT INTO scrum.CustomerOrder VALUES (1, 1, 'Blue', 'Plain', 'Red', 'My Diary', '5/6/2020', 'Express');
