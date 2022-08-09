-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema protecnotura
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema protecnotura
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `protecnotura` ;

-- -----------------------------------------------------
-- Table `protecnotura`.`client`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `protecnotura`.`client` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `surname` VARCHAR(45) NOT NULL,
  `lastname` VARCHAR(45) NOT NULL,
  `age` INT NULL,
  `address` VARCHAR(45) NOT NULL,
  `phone` VARCHAR(45) NOT NULL,
  `extension` INT NULL,
  `email` VARCHAR(45) NOT NULL,
  `company` VARCHAR(45) NULL,
  `facebook` VARCHAR(45) NULL,
  `tiktok` VARCHAR(45) NULL,
  `instagram` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `protecnotura`.`pedido`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `protecnotura`.`pedido` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `pedido` VARCHAR(45) NOT NULL,
  `elaboro` VARCHAR(45) NOT NULL,
  `dateSolicitud` VARCHAR(45) NOT NULL,
  `datePago` VARCHAR(45) NULL,
  `dateEntrega` VARCHAR(45) NULL,
  `timeLlegada` VARCHAR(45) NULL,
  `companyTransporte` VARCHAR(45) NULL,
  `nameOperador` VARCHAR(45) NULL,
  `seIdentifico` VARCHAR(45) NULL,
  `numPlacas` VARCHAR(45) NULL,
  `tipoTransporte` VARCHAR(45) NULL,
  `descripCarga` VARCHAR(200) NULL,
  `observations` VARCHAR(100) NULL,
  `dateSalida` VARCHAR(45) NULL,
  `status` BIGINT(2) NULL,
  `client_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_pedido_client1_idx` (`client_id` ASC),
  CONSTRAINT `fk_pedido_client1`
    FOREIGN KEY (`client_id`)
    REFERENCES `protecnotura`.`client` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `protecnotura`.`product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `protecnotura`.`product` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `codeBarras` VARCHAR(45) NOT NULL,
  `gramaje` VARCHAR(45) NOT NULL,
  `stock` INT NOT NULL,
  `price` DOUBLE NOT NULL,
  `dateRegister` VARCHAR(45) NOT NULL,
  `description` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `protecnotura`.`materiaPrima`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `protecnotura`.`materiaPrima` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nameM` VARCHAR(45) NOT NULL,
  `pricePublic` DOUBLE NOT NULL,
  `stock` DOUBLE NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `protecnotura`.`harina`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `protecnotura`.`harina` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nameH` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `protecnotura`.`registerCompra`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `protecnotura`.`registerCompra` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `lote` VARCHAR(45) NOT NULL,
  `cantidad` DOUBLE NOT NULL,
  `nameProveedor` VARCHAR(45) NOT NULL,
  `claveProductor` VARCHAR(45) NOT NULL,
  `dateCompra` VARCHAR(45) NOT NULL,
  `costales` INT NOT NULL,
  `claveCostales` VARCHAR(45) NOT NULL,
  `quienEntrego` VARCHAR(45) NOT NULL,
  `quienRecibio` VARCHAR(45) NOT NULL,
  `materiaPrima_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_registerCompra_materiaPrima1_idx` (`materiaPrima_id` ASC),
  CONSTRAINT `fk_registerCompra_materiaPrima1`
    FOREIGN KEY (`materiaPrima_id`)
    REFERENCES `protecnotura`.`materiaPrima` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `protecnotura`.`amarantoReventado`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `protecnotura`.`amarantoReventado` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `cantMateriaPrima` DOUBLE NOT NULL,
  `cantidadAmarantoRev` DOUBLE NOT NULL,
  `dateElaboracion` VARCHAR(45) NOT NULL,
  `materiaPrima_id` INT NOT NULL,
  `registerCompra_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_amarantoReventado_materiaPrima1_idx` (`materiaPrima_id` ASC),
  INDEX `fk_amarantoReventado_registerCompra1_idx` (`registerCompra_id` ASC),
  CONSTRAINT `fk_amarantoReventado_materiaPrima1`
    FOREIGN KEY (`materiaPrima_id`)
    REFERENCES `protecnotura`.`materiaPrima` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_amarantoReventado_registerCompra1`
    FOREIGN KEY (`registerCompra_id`)
    REFERENCES `protecnotura`.`registerCompra` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `protecnotura`.`amarantoUsar`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `protecnotura`.`amarantoUsar` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `cantidadAmaranto` DOUBLE NOT NULL,
  `dateRegistro` VARCHAR(45) NOT NULL,
  `amarantoReventado_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_amarantoUsar_amarantoReventado1_idx` (`amarantoReventado_id` ASC),
  CONSTRAINT `fk_amarantoUsar_amarantoReventado1`
    FOREIGN KEY (`amarantoReventado_id`)
    REFERENCES `protecnotura`.`amarantoReventado` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `protecnotura`.`mezcla`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `protecnotura`.`mezcla` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `cantChia` DOUBLE NOT NULL,
  `cantAmaranto` DOUBLE NOT NULL,
  `cantAjonjoli` DOUBLE NOT NULL,
  `mezclaTotal` DOUBLE NOT NULL,
  `dateElaboracion` VARCHAR(45) NOT NULL,
  `materiaPrima_id` INT NOT NULL,
  `registerCompra_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_mezcla_materiaPrima1_idx` (`materiaPrima_id` ASC),
  INDEX `fk_mezcla_registerCompra1_idx` (`registerCompra_id` ASC),
  CONSTRAINT `fk_mezcla_materiaPrima1`
    FOREIGN KEY (`materiaPrima_id`)
    REFERENCES `protecnotura`.`materiaPrima` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_mezcla_registerCompra1`
    FOREIGN KEY (`registerCompra_id`)
    REFERENCES `protecnotura`.`registerCompra` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `protecnotura`.`mezclaUsar`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `protecnotura`.`mezclaUsar` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `cantidadMezcla` VARCHAR(45) NOT NULL,
  `dateRegistro` VARCHAR(45) NOT NULL,
  `mezcla_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_mezclaUsar_mezcla1_idx` (`mezcla_id` ASC),
  CONSTRAINT `fk_mezclaUsar_mezcla1`
    FOREIGN KEY (`mezcla_id`)
    REFERENCES `protecnotura`.`mezcla` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `protecnotura`.`detallesPedidoG`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `protecnotura`.`detallesPedidoG` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `cantidad` DOUBLE NOT NULL,
  `precioTotal` DOUBLE NOT NULL,
  `total` DOUBLE NOT NULL,
  `pedido_id` INT NOT NULL,
  `materiaPrima_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_detallesPedidoG_pedido1_idx` (`pedido_id` ASC),
  INDEX `fk_detallesPedidoG_materiaPrima1_idx` (`materiaPrima_id` ASC),
  CONSTRAINT `fk_detallesPedidoG_pedido1`
    FOREIGN KEY (`pedido_id`)
    REFERENCES `protecnotura`.`pedido` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_detallesPedidoG_materiaPrima1`
    FOREIGN KEY (`materiaPrima_id`)
    REFERENCES `protecnotura`.`materiaPrima` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `protecnotura`.`seguimientoCliente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `protecnotura`.`seguimientoCliente` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `representante` VARCHAR(60) NOT NULL,
  `date` VARCHAR(45) NOT NULL,
  `identificador` VARCHAR(45) NOT NULL,
  `asunto` VARCHAR(45) NOT NULL,
  `acuerdo` VARCHAR(45) NOT NULL,
  `client_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_seguimientoCliente_client1_idx` (`client_id` ASC),
  CONSTRAINT `fk_seguimientoCliente_client1`
    FOREIGN KEY (`client_id`)
    REFERENCES `protecnotura`.`client` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `protecnotura`.`materialPro`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `protecnotura`.`materialPro` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `cantidad` DOUBLE NOT NULL,
  `cantidadHarina` DOUBLE NOT NULL,
  `dateRegistro` VARCHAR(45) NOT NULL,
  `harina_id` INT NOT NULL,
  `materiaPrima_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_materialPro_harina1_idx` (`harina_id` ASC),
  INDEX `fk_materialPro_materiaPrima1_idx` (`materiaPrima_id` ASC),
  CONSTRAINT `fk_materialPro_harina1`
    FOREIGN KEY (`harina_id`)
    REFERENCES `protecnotura`.`harina` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_materialPro_materiaPrima1`
    FOREIGN KEY (`materiaPrima_id`)
    REFERENCES `protecnotura`.`materiaPrima` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `protecnotura`.`detallesPedidoP`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `protecnotura`.`detallesPedidoP` (
  `pedido_id` INT NOT NULL,
  `product_id` INT NOT NULL,
  `cantUnidades` INT NOT NULL,
  `precioTotal` DOUBLE NULL,
  `total` DOUBLE NULL,
  PRIMARY KEY (`pedido_id`, `product_id`),
  INDEX `fk_pedido_has_product_product1_idx` (`product_id` ASC),
  INDEX `fk_pedido_has_product_pedido1_idx` (`pedido_id` ASC),
  CONSTRAINT `fk_pedido_has_product_pedido1`
    FOREIGN KEY (`pedido_id`)
    REFERENCES `protecnotura`.`pedido` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_pedido_has_product_product1`
    FOREIGN KEY (`product_id`)
    REFERENCES `protecnotura`.`product` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;