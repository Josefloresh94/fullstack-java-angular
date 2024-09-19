package com.joseflores.microservicio_usuario.service;

import com.joseflores.commons_alumnos.entity.Alumno;
import com.joseflores.commons_microservicios.services.ICommonService;

import java.util.List;

public interface IAlumnoService extends ICommonService<Alumno> {

    public List<Alumno> findByNombreOrApellido(String term);

    public Iterable<Alumno> findAllById(Iterable<Long> ids);

    public void eliminarCursoAlumnoPorId(Long id);

}
