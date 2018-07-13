package vn.com.vuong.dao.impl;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;

import vn.com.vuong.dao.SchoolDAOCustom;
import vn.com.vuong.entity.School;

@Repository
public class SchoolDAOImpl implements SchoolDAOCustom {

	@PersistenceContext
	private EntityManager entityManager;

	public SchoolDAOImpl() {
	}

	// Query DB
	@Override
	public List<School> search() {
		return new ArrayList<>();
	}
}
