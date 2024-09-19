package com.joseflores.microservicio_usuario.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "microservicios-cursos")
public interface ICursoFeignClient {

    @DeleteMapping("/eliminar-alumno/{id}")
    public void eliminarCursoAlumnoPorId(@PathVariable Long id);
}
