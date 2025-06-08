-- CreateTable
CREATE TABLE `Especialidad` (
    `CodEspec` INTEGER NOT NULL AUTO_INCREMENT,
    `descripcionEsp` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`CodEspec`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TipoMedic` (
    `CodTipoMed` INTEGER NOT NULL AUTO_INCREMENT,
    `descripcion` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`CodTipoMed`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Medicamento` (
    `CodMedicamento` INTEGER NOT NULL AUTO_INCREMENT,
    `descripcionMed` VARCHAR(191) NOT NULL,
    `fechaFabricacion` DATETIME(3) NOT NULL,
    `fechaVencimiento` DATETIME(3) NOT NULL,
    `Presentacion` VARCHAR(191) NOT NULL,
    `stock` INTEGER NOT NULL,
    `precioVentaUni` DOUBLE NOT NULL,
    `precioVentaPres` DOUBLE NOT NULL,
    `Marca` VARCHAR(191) NOT NULL,
    `CodTipoMed` INTEGER NOT NULL,
    `CodEspec` INTEGER NOT NULL,

    PRIMARY KEY (`CodMedicamento`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Medicamento` ADD CONSTRAINT `Medicamento_CodTipoMed_fkey` FOREIGN KEY (`CodTipoMed`) REFERENCES `TipoMedic`(`CodTipoMed`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Medicamento` ADD CONSTRAINT `Medicamento_CodEspec_fkey` FOREIGN KEY (`CodEspec`) REFERENCES `Especialidad`(`CodEspec`) ON DELETE RESTRICT ON UPDATE CASCADE;
