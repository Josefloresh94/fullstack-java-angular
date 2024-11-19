package com.joseflores.microservicios_examenes.repository;

import com.joseflores.commons_examenes.model.Examen;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface IExamenRespository extends JpaRepository<Examen, Long> {

    @Query("select e from Examen e where e.nombre like %?1%")
    public List<Examen> findByNombre(String term);

    @Query("select e.id from Pregunta p join p.examen e where p.id in ?1 group by e.id")
    public Iterable<Long> findExamenesIdsConRespuestasByPreguntaIds(Iterable<Long> preguntaIds);

}
