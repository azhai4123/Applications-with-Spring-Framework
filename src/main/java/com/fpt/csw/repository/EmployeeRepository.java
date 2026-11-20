package com.fpt.csw.repository;

import com.fpt.csw.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for Employee database operations.
 */
@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
}
