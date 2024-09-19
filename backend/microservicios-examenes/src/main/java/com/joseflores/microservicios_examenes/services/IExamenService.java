package com.joseflores.microservicios_examenes.services;

import com.joseflores.commons_examenes.model.Asignatura;
import com.joseflores.commons_examenes.model.Examen;
import com.joseflores.commons_microservicios.services.ICommonService;

import java.util.List;

public interface IExamenService extends ICommonService<Examen> {
    public List<Examen> findByNombre(String term);

    public Iterable<Asignatura> findAllAsignaturas();
}
