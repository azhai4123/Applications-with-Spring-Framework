package com.fpt.csw.service;

import com.fpt.csw.exception.ResourceNotFoundException;
import com.fpt.csw.model.Employee;
import com.fpt.csw.repository.EmployeeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Business service implementing the required web service methods:
 * 1. getEmployees() -> retrieve all employees in an array
 * 2. addEmployees(Employee e) -> add a new employee record
 * 3. updateEmployee(Employee e) -> modify an existing employee record
 */
@Service
public class EmployeeService {

    private static final Logger log = LoggerFactory.getLogger(EmployeeService.class);

    private final EmployeeRepository employeeRepository;

    public EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    /**
     * Retrieve all employees from the database as an array.
     *
     * @return Employee[] array containing all employee records
     */
    @Transactional(readOnly = true)
    public Employee[] getEmployees() {
        List<Employee> list = employeeRepository.findAll(Sort.by(Sort.Direction.ASC, "id"));
        log.info("Retrieved {} employees", list.size());
        return list.toArray(new Employee[0]);
    }

    /**
     * Add a new employee record to the database.
     *
     * @param e the employee to create
     * @return the persisted Employee with generated id
     */
    @Transactional
    public Employee addEmployees(Employee e) {
        Employee toSave = new Employee(e.getName().trim(), e.getSalary());
        Employee saved = employeeRepository.save(toSave);
        log.info("Added new employee: {}", saved);
        return saved;
    }

    /**
     * Modify an existing employee record in the database.
     *
     * @param e the employee containing id and updated fields
     * @return the updated Employee
     */
    @Transactional
    public Employee updateEmployee(Employee e) {
        if (e.getId() == null) {
            throw new IllegalArgumentException("Employee id is required for update");
        }
        Employee existing = employeeRepository.findById(e.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + e.getId()));
        existing.setName(e.getName().trim());
        existing.setSalary(e.getSalary());
        Employee updated = employeeRepository.save(existing);
        log.info("Updated employee: {}", updated);
        return updated;
    }
}
