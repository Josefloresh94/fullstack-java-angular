package com.joseflores.microservicios_respuestas.controller;

import com.joseflores.microservicios_respuestas.model.Respuesta;
import com.joseflores.microservicios_respuestas.services.IRespuestaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
public class RespuestaController {

    @Autowired
    private IRespuestaService service;

    @PostMapping
    public ResponseEntity<?> crear(@RequestBody Iterable<Respuesta> respuestas){
        respuestas = ((List<Respuesta>)respuestas).stream().map(r -> {
            r.setAlumnoId(r.getAlumno().getId());
            r.setPreguntaId(r.getPregunta().getId());
            return r;
        }).collect(Collectors.toList());
        Iterable<Respuesta> respuestasDb = service.saveAll(respuestas);
        return ResponseEntity.status(HttpStatus.CREATED).body(respuestasDb);
    }

    @GetMapping("/alumno/{alumnoId}/examen/{examenId}")
    public ResponseEntity<?> obtenerRespuestasPorAlumnoPorExamen(@PathVariable Long alumnoId, @PathVariable Long examenId){
        Iterable<Respuesta> respuestas = service.findRespuestaByAlumnoByExamen(alumnoId, examenId);
        return ResponseEntity.ok(respuestas);
    }

    @GetMapping("/alumno/{alumnoId}/examenes-respondidos")
    public ResponseEntity<?> obtenerExamenesIdsConRespuestasAlumno(@PathVariable Long alumnoId){
        Iterable<Long> examenesIds = service.findExamenesIdsConRespuestasByAlumno(alumnoId);
        return ResponseEntity.ok(examenesIds);
    }
}
