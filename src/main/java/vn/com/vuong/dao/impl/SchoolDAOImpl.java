package vn.com.vuong.dao.impl;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

import org.springframework.stereotype.Repository;

import vn.com.vuong.dao.SchoolDAOCustom;
import vn.com.vuong.entity.School;

@Repository
public class SchoolDAOImpl implements SchoolDAOCustom {

	@PersistenceContext
	private EntityManager entityManager;

	@Override
	public List<School> search(String name) {
		 CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
		 CriteriaQuery criteriaQuery = criteriaBuilder.createQuery();
		 Root root = criteriaQuery.from(School.class);
		 if(name != null && !name.isEmpty()) {
			 criteriaQuery.where(criteriaBuilder.like(root.get("name"), "%" + name + "%"));
		 }
		 criteriaQuery.select(root);
		 return entityManager.createQuery(criteriaQuery).getResultList();
	}
}
