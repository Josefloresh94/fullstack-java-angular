package com.joseflores.microservicios_cursos.services;

import com.joseflores.commons_microservicios.services.ICommonService;
import com.joseflores.microservicios_cursos.model.Curso;

public interface ICursoService extends ICommonService<Curso> {
    public Curso findCursoByAlumnoId(Long id);
    public Iterable<Long> obtenerExamenesIdsConRespuestasAlumnos(Long alumnoId);
}
