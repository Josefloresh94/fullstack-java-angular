package com.joseflores.microservicios_cursos.services;

import com.joseflores.commons_microservicios.services.CommonService;
import com.joseflores.microservicios_cursos.clients.IRespuestaFeignClient;
import com.joseflores.microservicios_cursos.model.Curso;
import com.joseflores.microservicios_cursos.repository.ICursoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CursoService extends CommonService<Curso, ICursoRepository> implements ICursoService {

    @Autowired
    private IRespuestaFeignClient client;

    @Override
    @Transactional(readOnly = true)
    public Curso findCursoByAlumnoId(Long id) {
        return repository.findCursoByAlumnoId(id);
    }

    @Override
    public Iterable<Long> obtenerExamenesIdsConRespuestasAlumnos(Long alumnoId) {
        return client.obtenerExamenesIdsConRespuestasAlumnos(alumnoId);
    }
}
