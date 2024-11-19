package com.joseflores.microservicio_usuario.repository;

import com.joseflores.commons_alumnos.entity.Alumno;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface IAlumnoRepository extends JpaRepository<Alumno, Long> {

    @Query("select a from Alumno a where upper(a.nombre) like upper(concat('%', ?1, '%')) or upper(a.apellido) like upper(concat('%', ?1, '%'))")
    public List<Alumno> findByNombreOrApellido(String term);
}
