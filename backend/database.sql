-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=1;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=1;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema emaus
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema emaus
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `emaus` DEFAULT CHARACTER SET utf8 ;
USE `emaus` ;

-- -----------------------------------------------------
-- Table `emaus`.`address`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `emaus`.`address` (
  `id` INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `emaus`.`center`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `emaus`.`center` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `address_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_center_address1_idx` (`address_id` ASC) VISIBLE,
  CONSTRAINT `fk_center_address1`
    FOREIGN KEY (`address_id`)
    REFERENCES `emaus`.`address` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `emaus`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `emaus`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `center_id` INT NOT NULL,
  `address_id` INT NOT NULL,
  `email` VARCHAR(255) UNIQUE NOT NULL,
  PRIMARY KEY (`id`, `center_id`),
  INDEX `fk_user_center1_idx` (`center_id` ASC) VISIBLE,
  INDEX `fk_user_address1_idx` (`address_id` ASC) VISIBLE,
  CONSTRAINT `fk_user_center1`
    FOREIGN KEY (`center_id`)
    REFERENCES `emaus`.`center` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_address1`
    FOREIGN KEY (`address_id`)
    REFERENCES `emaus`.`address` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,  
  CONSTRAINT `email_format_check`
    CHECK (email REGEXP '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$')
)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `emaus`.`status`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `emaus`.`status` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`, `user_id`),
  INDEX `fk_status_user1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_status_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `emaus`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;
-- -----------------------------------------------------
-- Table `emaus`.`category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `emaus`.`category` (
  `id` INT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `emaus`.`phone`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `emaus`.`phone` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `center_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `status_id` INT NOT NULL,
  `category_id` INT NOT NULL,
  `imei` VARCHAR(255) UNIQUE NOT NULL,
  PRIMARY KEY (`id`, `center_id`, `user_id`, `status_id`),
  INDEX `fk_phone_center_idx` (`center_id` ASC) VISIBLE,
  INDEX `fk_phone_user1_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_phone_status1_idx` (`status_id` ASC) VISIBLE,
  INDEX `fk_phone_category1_idx` (`category_id` ASC) VISIBLE,
  CONSTRAINT `fk_phone_center`
    FOREIGN KEY (`center_id`)
    REFERENCES `emaus`.`center` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_phone_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `emaus`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_phone_status1`
    FOREIGN KEY (`status_id`)
    REFERENCES `emaus`.`status` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_phone_category1`
    FOREIGN KEY (`category_id`)
    REFERENCES `emaus`.`category` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `imei_format_check`
    CHECK (imei REGEXP '^[0-9]{15}$'))
ENGINE = InnoDB;


USE `emaus` ;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Table `emaus`.`User`
-- -----------------------------------------------------
ALTER TABLE `emaus`.`user`
  ADD COLUMN `password` VARCHAR(100) NOT NULL,
  ADD COLUMN `firstname` VARCHAR(100) NOT NULL,
  ADD COLUMN `lastname` VARCHAR(100) NOT NULL,
  ADD COLUMN `phone_number` VARCHAR(20) NOT NULL,
  ADD COLUMN `role` VARCHAR(50) NOT NULL;

-- -----------------------------------------------------
-- Table `emaus`.`Phone`
-- -----------------------------------------------------
ALTER TABLE `emaus`.`phone`
  ADD COLUMN `brand` VARCHAR(100) NOT NULL,
  ADD COLUMN `model` VARCHAR(100) NOT NULL,
  ADD COLUMN `memory` VARCHAR(50) NOT NULL,
  ADD COLUMN `storage` VARCHAR(50) NOT NULL,
  ADD COLUMN `network` VARCHAR(50) NOT NULL,
  ADD COLUMN `service_date` DATE NOT NULL,
  ADD COLUMN `addition_date` DATETIME NOT NULL,
  ADD COLUMN `phone_condition` ENUM('Dee', 'Réparable', 'Bloqué', 'Reconditionnable', 'Reconditionné') NOT NULL,
  ADD COLUMN `image1` VARCHAR(100),
  ADD COLUMN `image2` VARCHAR(100),
  ADD COLUMN `image3` VARCHAR(100),
  ADD COLUMN `price` VARCHAR(50) NOT NULL;
  
-- -----------------------------------------------------
-- Table `emaus`.`address`
-- -----------------------------------------------------
ALTER TABLE `emaus`.`address`
  ADD COLUMN `city` VARCHAR(100) NOT NULL,
  ADD COLUMN `department` VARCHAR(100) NOT NULL,
  ADD COLUMN `district` VARCHAR(100) NOT NULL,
  ADD COLUMN `postal_code` VARCHAR(20) NOT NULL,
  ADD COLUMN `street_number` VARCHAR(50) NOT NULL,
  ADD COLUMN `street_type` VARCHAR(50) NOT NULL;

-- -----------------------------------------------------
-- Table `emaus`.`status`
-- -----------------------------------------------------
ALTER TABLE `emaus`.`status`
  ADD COLUMN `update_date` DATETIME NOT NULL,
  ADD COLUMN `disponibility` BOOLEAN NOT NULL DEFAULT TRUE;
  
-- -----------------------------------------------------
-- Table `emaus`.`category`
-- -----------------------------------------------------
ALTER TABLE `emaus`.`category`
  ADD COLUMN `classification` VARCHAR(50) NOT NULL;
  
-- -----------------------------------------------------
-- Table `emaus`.`center`
-- -----------------------------------------------------
ALTER TABLE `emaus`.`center`
  ADD COLUMN `phone_number` VARCHAR(20) NOT NULL,
  ADD COLUMN `contact_email` VARCHAR(100) NOT NULL;

-- Insert random data into address table
INSERT INTO `emaus`.`address` (`city`, `department`, `district`, `postal_code`, `street_number`, `street_type`)
VALUES
  ('Lille', 'Nord', 'l abbe Pierre', '59000', '83', 'rue'),
  ('Paris', 'Ile de France', 'de la banque', '75000', '8', 'rue'),
  ('Lyon', 'Auvergne Rhone Alpes', 'de Vienne', '69000', '104', 'route'),
  ('Marseille', 'Provence Alpes Côte d Azur', 'Nationale', '98765', '10', 'boulevard'),
  ('Strasbourg', 'Grand Est', 'Kageneck', '67000', '33', 'rue');
-- Add more rows as needed;

-- Insert random data into center table
INSERT INTO `emaus`.`center` (`address_id`, `phone_number`, `contact_email`)
VALUES
  (1, '180059880', 'lille@emaus-connect.org'),
  (2, '180059880', 'paris@emaus-connect.org'),
  (3, '180059880', 'lyon@emaus-connect.org'),
  (4, '180059880', 'marseille@emaus-connect.org'),
  (5, '180059880', 'strasbourg@emaus-connect.org');
-- Add more rows as needed;

-- Insert random data into user table
INSERT INTO `emaus`.`user` (`center_id`, `address_id`, `email`, `password`, `firstname`, `lastname`, `phone_number`, `role`)
VALUES
  (1, 1, 'jocelyn@emaus-connect.org', 'password1', 'Jocelyn', 'Deloose', '987654321', 'benevole'),
  (2, 2, 'mohamed@emaus-connect.org', 'password2', 'Mohamed', 'Ait Amar', '123456789', 'benevole'),
  (3, 3, 'sacha@emaus-connect.org', 'password3', 'Sacha', 'Loumachi', '456789123', 'benevole'),
  (4, 4, 'romain@emaus-connect.org', 'password4', 'Romain', 'Constant', '789123456', 'directeur'),
  (5, 5, 'alexandre@emaus-connect.org', 'password5', 'alexandre', 'Rouziere', '321654987', 'benevole');
-- Add more rows as needed;

-- Insert random data into status table
INSERT INTO `emaus`.`status` (`user_id`, `update_date`, `disponibility`)
VALUES
  (1, NOW(), 1),
  (2, NOW(), 0),
  (3, NOW(), 1),
  (4, NOW(), 0),
  (5, NOW(), 1),
  (1, NOW(), 1),
  (2, NOW(), 0),
  (3, NOW(), 1),
  (4, NOW(), 0),
  (5, NOW(), 1),
  (1, NOW(), 1),
  (2, NOW(), 0);
 
  
-- Add more rows as needed;

-- Insert predefined data into category table
INSERT INTO `emaus`.`category` (`id`, `classification`)
VALUES
  (1, 'HC'),
  (2, 'C'),
  (3, 'B'),
  (4, 'A'),
  (5, 'Premium');

-- Insert random data into phone table
INSERT INTO `emaus`.`phone` (`center_id`, `user_id`, `status_id`, `category_id`, `imei`, `brand`, `model`, `memory`, `storage`, `network`, `service_date`, `addition_date`, `phone_condition`, `image1`, `image2`, `image3`, `price`)
VALUES
  (1, 1, 1, 1, '123456789012345', 'Apple', 'iPhone 12', '4GB', '64GB', '4G', CURDATE(), NOW(), 'Dee', 'image1.jpg', 'image2.jpg', 'image3.jpg', 100),
  (2, 2, 2, 2, '987654321098765', 'Samsung', 'Galaxy S21', '8GB', '128GB', '5G', CURDATE(), NOW(), 'Réparable', 'image4.jpg', 'image5.jpg', 'image6.jpg', 200),
  (3, 3, 3, 3, '543216789012345', 'Apple', 'iPhone 11', '16GB', '256GB', '4G', CURDATE(), NOW(), 'Bloqué', 'image7.jpg', 'image8.jpg', 'image9.jpg', 300),
  (4, 4, 4, 4, '987654321012345', 'Samsung', 'Galaxy Note 20', '32GB', '512GB', '5G', CURDATE(), NOW(), 'Reconditionnable', 'image10.jpg', 'image11.jpg', 'image12.jpg', 400),
  (5, 5, 5, 5, '543216789098765', 'Apple', 'iPhone SE', '64GB', '1TB', '5G', CURDATE(), NOW(), 'Reconditionné', 'image13.jpg', 'image14.jpg', 'image15.jpg', 500),
  (4, 4, 6, 4, '543216789098766', 'Samsung', 'Galaxy A52', '128GB', '256GB', '4G', CURDATE(), NOW(), 'Réparable', 'image16.jpg', 'image17.jpg', 'image18.jpg', 600),
  (3, 3, 7, 3, '543216789098767', 'Apple', 'iPhone XR', '32GB', '512GB', '5G', CURDATE(), NOW(), 'Reconditionnable', 'image19.jpg', 'image20.jpg', 'image21.jpg', 700),
  (2, 2, 8, 2, '543216789098768', 'Samsung', 'Galaxy S20 FE', '64GB', '1TB', '5G', CURDATE(), NOW(), 'Reconditionné', 'image22.jpg', 'image23.jpg', 'image24.jpg', 800),
  (1, 1, 9, 1, '543216789098769', 'Apple', 'iPhone XS', '64GB', '1TB', '5G', CURDATE(), NOW(), 'Reconditionné', 'image25.jpg', 'image26.jpg', 'image27.jpg', 900),
  (5, 5, 10, 5, '543216789098770', 'Samsung', 'Galaxy S10', '128GB', '256GB', '4G', CURDATE(), NOW(), 'Réparable', 'image28.jpg', 'image29.jpg', 'image30.jpg', 1000),
  (4, 4, 11, 4, '543216789098771', 'Apple', 'iPhone 8', '32GB', '512GB', '5G', CURDATE(), NOW(), 'Reconditionnable', 'image31.jpg', 'image32.jpg', 'image33.jpg', 1100),
  (3, 3, 12, 3, '543216789098772', 'Samsung', 'Galaxy A71', '64GB', '1TB', '5G', CURDATE(), NOW(), 'Reconditionné', 'image34.jpg', 'image35.jpg', 'image36.jpg', 1200);


-- Add more rows as needed;

-- Insert more random data into other tables as needed