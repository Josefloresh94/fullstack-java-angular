package com.joseflores.microservicios_respuestas.services;

import com.joseflores.microservicios_respuestas.model.Respuesta;

public interface IRespuestaService {

    public Iterable<Respuesta> saveAll(Iterable<Respuesta> respuestas);

    public Iterable<Respuesta> findRespuestaByAlumnoByExamen(Long alumnoId, Long examenId);

    public Iterable<Long> findExamenesIdsConRespuestasByAlumno(Long alumnoId);

    public Iterable<Respuesta> findByAlumnoId(Long alumnoId);
}
