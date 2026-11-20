# CSW Practical Test — FPT Employee Web Service (MySQL Laragon)

Dự án hoàn chỉnh theo đề thi **Practical Test – CSW – Creating Services for the Web (Aptech / FPT Education)**, cấu hình kết nối trực tiếp **MySQL (Laragon)**.


| Hạng mục đề thi | Điểm | Triển khai trong dự án |
| :--- | :---: | :--- |
| Tạo bảng CSDL MySQL (`employees`) | 1.0 | `database.sql`, `src/main/resources/schema.sql`, `data.sql` (tự tạo database `fpt_employees` & bảng `employees` trên MySQL Laragon) |
| Lớp `Employee` (`id`, `name`, `salary`) | 1.0 | `src/main/java/com/fpt/csw/model/Employee.java` |
| Method `getEmployees()` trả về mảng `Employee[]` | 2.0 | `GET /api/employees` (`EmployeeService.getEmployees()`) |
| Method `addEmployees(Employee e)` | 2.0 | `POST /api/employees` (`EmployeeService.addEmployees(Employee e)`) |
| Method `updateEmployee(Employee e)` | 2.0 | `PUT /api/employees` (`EmployeeService.updateEmployee(Employee e)`) |
| Ứng dụng Web test Web Service | 5.0 | `http://localhost:8088/` (`index.html`, `style.css`, `app.js`) kèm Swagger UI |
| Programming Style & Unit Tests | 2.0 | Layered Architecture, Bean Validation, `@RestControllerAdvice`, JUnit 5 + MockMvc |

## Cấu hình MySQL (Laragon)
- **Host**: `localhost:3306`
- **Database**: `fpt_employees` (tự động tạo khi khởi chạy nhờ `createDatabaseIfNotExist=true`)
- **Username**: `root`
- **Password**: *(trống — mặc định của Laragon)*

## Cách chạy dự án
1. Bật **MySQL** trên **Laragon** (cổng `3306`).
2. Chạy dự án:
```powershell
cd d:\CSW-FPT-Employee
.\mvnw.cmd spring-boot:run
```

## Đường dẫn truy cập
- **Web Application (Test Client)**: http://localhost:8088/
- **Swagger UI (API Docs)**: http://localhost:8088/swagger-ui.html
