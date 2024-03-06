package com.demo.agricultural.Controller;

import com.demo.agricultural.Entity.Scheme;
import com.demo.agricultural.Service.SchemeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/schemes")
public class SchemeController {

    private final SchemeService schemeService;

    @Autowired
    public SchemeController(SchemeService schemeService) {
        this.schemeService = schemeService;
    }

    @GetMapping
    public ResponseEntity<List<Scheme>> getAllSchemes() {
        List<Scheme> schemes = schemeService.getAllSchemes();
        return new ResponseEntity<>(schemes, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Scheme> getSchemeById(@PathVariable Long id) {
        return schemeService.getSchemeById(id)
                .map(scheme -> new ResponseEntity<>(scheme, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<Scheme> saveScheme(@RequestBody Scheme scheme) {
        Scheme savedScheme = schemeService.saveScheme(scheme);
        return new ResponseEntity<>(savedScheme, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteScheme(@PathVariable Long id) {
        schemeService.deleteScheme(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
