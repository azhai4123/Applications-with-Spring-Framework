INSERT INTO employees (name, salary)
SELECT 'Nguyen Van An', 18500000 FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM employees);

INSERT INTO employees (name, salary)
SELECT 'Tran Thi Bich', 22000000 FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM employees WHERE name = 'Tran Thi Bich');

INSERT INTO employees (name, salary)
SELECT 'Le Hoang Cuong', 15000000 FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM employees WHERE name = 'Le Hoang Cuong');

INSERT INTO employees (name, salary)
SELECT 'Pham Minh Duc', 31000000 FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM employees WHERE name = 'Pham Minh Duc');

INSERT INTO employees (name, salary)
SELECT 'Vo Thi Em', 19500000 FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM employees WHERE name = 'Vo Thi Em');
