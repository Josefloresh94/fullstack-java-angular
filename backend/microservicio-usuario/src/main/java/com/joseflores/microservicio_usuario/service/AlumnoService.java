package com.joseflores.microservicio_usuario.service;

import com.joseflores.commons_alumnos.entity.Alumno;
import com.joseflores.commons_microservicios.services.CommonService;
import com.joseflores.microservicio_usuario.client.ICursoFeignClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.joseflores.microservicio_usuario.repository.IAlumnoRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class AlumnoService extends CommonService<Alumno, IAlumnoRepository> implements IAlumnoService {

    @Autowired
    private ICursoFeignClient clientCurso;

    @Override
    @Transactional(readOnly = true)
    public List<Alumno> findByNombreOrApellido(String term) {
        return repository.findByNombreOrApellido(term);
    }

    @Override
    @Transactional(readOnly = true)
    public Iterable<Alumno> findAllById(Iterable<Long> ids) {
        return repository.findAllById(ids);
    }

    @Override
    public void eliminarCursoAlumnoPorId(Long id) {
        clientCurso.eliminarCursoAlumnoPorId(id);
    }

    @Override
    @Transactional
    public void deleteById(Long id) {
        super.deleteById(id);
        this.eliminarCursoAlumnoPorId(id);
    }
}
