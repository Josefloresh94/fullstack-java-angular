package com.joseflores.microservicios_examenes.repository;

import com.joseflores.commons_examenes.model.Asignatura;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IAsignaturaRepository extends JpaRepository<Asignatura, Long> {
}
