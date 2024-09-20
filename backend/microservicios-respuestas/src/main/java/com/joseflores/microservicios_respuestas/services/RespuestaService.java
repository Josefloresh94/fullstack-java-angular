package com.joseflores.microservicios_respuestas.services;

import com.joseflores.commons_examenes.model.Examen;
import com.joseflores.commons_examenes.model.Pregunta;
import com.joseflores.microservicios_respuestas.clients.IExamenFeignClient;
import com.joseflores.microservicios_respuestas.model.Respuesta;
import com.joseflores.microservicios_respuestas.repository.IRespuestaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RespuestaService implements IRespuestaService{

    @Autowired
    private IRespuestaRepository repository;

    @Autowired
    private IExamenFeignClient examenFeign;

    @Override
    public Iterable<Respuesta> saveAll(Iterable<Respuesta> respuestas) {
        return repository.saveAll(respuestas);
    }

    @Override
    public Iterable<Respuesta> findRespuestaByAlumnoByExamen(Long alumnoId, Long examenId) {
        Examen examen = examenFeign.obtenerExamenPorId(examenId);
        List<Pregunta> preguntas = examen.getPreguntas();
        List<Long> preguntaIds = preguntas.stream().map(p -> p.getId()).collect(Collectors.toList());
        List<Respuesta> respuestas = (List<Respuesta>) repository.findRespuestaByAlumnoByPreguntaIds(alumnoId, preguntaIds);
        respuestas = respuestas.stream().map(r ->{
            preguntas.forEach(p ->{
                if(p.getId() == r.getPreguntaId()) {
                    r.setPregunta(p);
                }
            });
            return r;
        }).collect(Collectors.toList());

        return respuestas;
    }

    @Override
    public Iterable<Long> findExamenesIdsConRespuestasByAlumno(Long alumnoId) {
        List<Respuesta> respuestasAlumno = (List<Respuesta>) repository.findByAlumnoId(alumnoId);
        List<Long> examenIds = Collections.emptyList();

        if(!respuestasAlumno.isEmpty()) {
            List<Long> preguntaIds = respuestasAlumno.stream().map(r -> r.getPreguntaId()).collect(Collectors.toList());
            examenIds = examenFeign.obtenerExamenesIdsPorPreguntasIdRespondidas(preguntaIds);
        }

        return examenIds;
    }

    @Override
    public Iterable<Respuesta> findByAlumnoId(Long alumnoId) {
        return repository.findByAlumnoId(alumnoId);
    }
}
