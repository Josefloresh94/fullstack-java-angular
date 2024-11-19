package com.joseflores.microservicios_cursos.clients;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "microservicios-respuestas")
public interface IRespuestaFeignClient {

    @GetMapping("/alumno/{alumnoId}/examenes-respondidos")
    public Iterable<Long> obtenerExamenesIdsConRespuestasAlumnos(@PathVariable Long alumnoId);
}
