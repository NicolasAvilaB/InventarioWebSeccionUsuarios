package com.inventario.jardin.manquemavida.backend.apirest.models.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.inventario.jardin.manquemavida.backend.apirest.models.dao.UsuarioDao;
import com.inventario.jardin.manquemavida.backend.apirest.models.entity.Usuario;

@Service
public class UsuarioServiceImpl implements UsuarioService{
	
	@Autowired
	private UsuarioDao usuarioDao;
	
	@Override
	@Transactional(readOnly=true)
	public List<Usuario> findAll() {
		return (List<Usuario>) usuarioDao.findAll();
	}

	@Override
	@Transactional(readOnly=true)
	public Usuario findById(Long id) {
		return usuarioDao.findById(id).orElse(null);
	}

	@Override
	@Transactional
	public Usuario save(Usuario usuario) {
		return usuarioDao.save(usuario);
	}

	@Override
	@Transactional
	public void delete(Long id) {
		usuarioDao.deleteById(id);		
	}

}
