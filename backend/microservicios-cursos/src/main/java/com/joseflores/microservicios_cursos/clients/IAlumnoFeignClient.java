package com.joseflores.microservicios_cursos.clients;

import com.joseflores.commons_alumnos.entity.Alumno;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@FeignClient(name = "microservicio-usuarios")
public interface IAlumnoFeignClient {

    @GetMapping("/alumnos-por-curso")
    public Iterable<Alumno> obtenerAlumnosPorCurso(@RequestParam List<Long> ids);
}
