package com.demo.agricultural.Repository;

import com.demo.agricultural.Entity.Scheme;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SchemeRepo extends JpaRepository<Scheme, Long> {
    // You can add custom query methods here if needed
}
