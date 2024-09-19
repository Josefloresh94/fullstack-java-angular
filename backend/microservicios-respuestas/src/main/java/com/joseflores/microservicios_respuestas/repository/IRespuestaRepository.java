package com.joseflores.microservicios_respuestas.repository;

import com.joseflores.microservicios_respuestas.model.Respuesta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface IRespuestaRepository extends JpaRepository<Respuesta, Long> {

    @Query("select r from Respuesta r join fetch r.pregunta p join fetch p.examen e where r.alumnoId=?1 and e.id=?2")
    public Iterable<Respuesta> findRespuestaByAlumnoByExamen(Long alumnoId, Long examenId);

    @Query("select e.id from Respuesta r join r.pregunta p join p.examen e where r.alumnoId=?1 group by e.id")
    public Iterable<Long> findExamenesIdsConRespuestasByAlumno(Long alumnoId);

}
