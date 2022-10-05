package com.inventario.jardin.manquemavida.backend.apirest.models.dao;

import org.springframework.data.repository.CrudRepository;

import com.inventario.jardin.manquemavida.backend.apirest.models.entity.Usuario;

public interface UsuarioDao extends CrudRepository<Usuario, Long> {

}
