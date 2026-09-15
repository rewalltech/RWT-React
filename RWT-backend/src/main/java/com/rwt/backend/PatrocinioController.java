package com.rwt.backend;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/patrocinio")
public class PatrocinioController {

    private final PatrocinioRepository repository;

    public PatrocinioController(PatrocinioRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    public ResponseEntity<Patrocinio> criar(@Valid @RequestBody Patrocinio patrocinio) {
        Patrocinio salvo = repository.save(patrocinio);
        return ResponseEntity.status(HttpStatus.CREATED).body(salvo);
    }

    @GetMapping
    public List<Patrocinio> listar() {
        return repository.findAll();
    }
}
