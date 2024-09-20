package com.joseflores.microservicios_respuestas.repository;

import com.joseflores.microservicios_respuestas.model.Respuesta;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface IRespuestaRepository extends MongoRepository<Respuesta, String> {

    @Query("{'alumnoId': ?0, 'preguntaId': { $in: ?1} }")
    public Iterable<Respuesta> findRespuestaByAlumnoByPreguntaIds(Long alumnoId, Iterable<Long> preguntaIds);

    @Query("{'alumnoId': ?0}")
    public Iterable<Respuesta> findByAlumnoId(Long alumnoId);

}
