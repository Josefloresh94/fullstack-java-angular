package com.joseflores.microservicios_cursos.services;

import com.joseflores.commons_alumnos.entity.Alumno;
import com.joseflores.commons_microservicios.services.ICommonService;
import com.joseflores.microservicios_cursos.model.Curso;

import java.util.List;

public interface ICursoService extends ICommonService<Curso> {

    public Curso findCursoByAlumnoId(Long id);

    public Iterable<Long> obtenerExamenesIdsConRespuestasAlumnos(Long alumnoId);

    public Iterable<Alumno> obtenerAlumnosPorCurso(List<Long> ids);

    public void eliminarCursoAlumnoPorId(Long id);
}
