package com.fpt.csw.controller;

import com.fpt.csw.model.Employee;
import com.fpt.csw.service.EmployeeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/**
 * RESTful Web Service Controller exposing FPT Employee Management methods.
 */
@RestController
@RequestMapping("/api/employees")
@CrossOrigin(origins = "*")
@Tag(name = "Employee Web Service", description = "CSW Practical Test - FPT Employee Management Web Service")
public class EmployeeWebServiceController {

    private final EmployeeService employeeService;

    public EmployeeWebServiceController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    /**
     * Web Service Method 1: getEmployees - retrieve all employees in an array.
     */
    @GetMapping
    @Operation(summary = "getEmployees", description = "Retrieve all employees in an array")
    public Employee[] getEmployees() {
        return employeeService.getEmployees();
    }

    /**
     * Web Service Method 2: addEmployees(Employee e) - add a new employee record.
     */
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "addEmployees", description = "Add a new employee record")
    public Employee addEmployees(@Valid @RequestBody Employee e) {
        return employeeService.addEmployees(e);
    }

    /**
     * Web Service Method 3: updateEmployee(Employee e) - modify an existing employee record.
     */
    @PutMapping
    @Operation(summary = "updateEmployee", description = "Modify an existing employee record")
    public Employee updateEmployee(@Valid @RequestBody Employee e) {
        return employeeService.updateEmployee(e);
    }

    /**
     * RESTful convenience endpoint: PUT /api/employees/{id}.
     */
    @PutMapping("/{id}")
    @Operation(summary = "updateEmployeeById", description = "Modify an existing employee record by path ID")
    public Employee updateEmployeeById(@PathVariable Long id, @Valid @RequestBody Employee e) {
        e.setId(id);
        return employeeService.updateEmployee(e);
    }
}
