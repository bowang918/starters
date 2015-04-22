package com.seven7.starter.repository;

import com.seven7.starter.domain.Customer;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Collection;


public interface CustomerRepository extends MongoRepository<Customer, String> {

    Customer findByFirstName(String firstName);

    Collection<Customer> findByLastName(String lastName);
}
