package com.joseflores.microservicio_usuario.service;

import com.joseflores.commons_alumnos.entity.Alumno;
import com.joseflores.commons_microservicios.services.CommonService;
import org.springframework.stereotype.Service;

import com.joseflores.microservicio_usuario.repository.IAlumnoRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class AlumnoService extends CommonService<Alumno, IAlumnoRepository> implements IAlumnoService {

    @Override
    @Transactional(readOnly = true)
    public List<Alumno> findByNombreOrApellido(String term) {
        return repository.findByNombreOrApellido(term);
    }
}
