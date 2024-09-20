package com.joseflores.microservicios_examenes.services;

import com.joseflores.commons_examenes.model.Asignatura;
import com.joseflores.commons_examenes.model.Examen;
import com.joseflores.commons_microservicios.services.CommonService;
import com.joseflores.microservicios_examenes.repository.IAsignaturaRepository;
import com.joseflores.microservicios_examenes.repository.IExamenRespository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ExamenService extends CommonService<Examen, IExamenRespository> implements IExamenService {

    @Autowired
    private IAsignaturaRepository asignaturaRepository;

    @Override
    @Transactional(readOnly = true)
    public List<Examen> findByNombre(String term) {
        return repository.findByNombre(term);
    }

    @Override
    @Transactional(readOnly = true)
    public Iterable<Asignatura> findAllAsignaturas() {
        return asignaturaRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Iterable<Long> findExamenesIdsConRespuestasByPreguntaIds(Iterable<Long> preguntaIds) {
        return repository.findExamenesIdsConRespuestasByPreguntaIds(preguntaIds);
    }
}
