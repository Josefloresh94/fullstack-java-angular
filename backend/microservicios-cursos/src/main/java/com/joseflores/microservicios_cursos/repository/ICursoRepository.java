package com.joseflores.microservicios_cursos.repository;

import com.joseflores.microservicios_cursos.model.Curso;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ICursoRepository extends JpaRepository<Curso, Long> {

    @Query("select c from Curso c join fetch c.alumnos a where a.id=?1")
    public Curso findCursoByAlumnoId(Long id);


}
