-- ============================================================
-- Practical Test - CSW - Creating Services for the Web
-- MySQL (Laragon) Database Script for FPT Employee Management
-- ============================================================

CREATE DATABASE IF NOT EXISTS fpt_employees
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE fpt_employees;

CREATE TABLE IF NOT EXISTS employees (
    id      BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name    VARCHAR(100) NOT NULL,
    salary  DOUBLE NOT NULL
);

INSERT INTO employees (name, salary) VALUES
    ('Nguyen Van An', 18500000),
    ('Tran Thi Bich', 22000000),
    ('Le Hoang Cuong', 15000000),
    ('Pham Minh Duc', 31000000),
    ('Vo Thi Em', 19500000);
