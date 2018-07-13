package vn.com.vuong.dao.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import vn.com.vuong.dao.SchoolDAOCustom;
import vn.com.vuong.entity.School;

@Repository
public class SchoolDAOImpl implements SchoolDAOCustom {
	public SchoolDAOImpl() {
		System.out.println("Khoi Tao SchoolDAOIMPL");
	}
	@Override
	public List<School> search() {
		System.out.println("search x");
		return new ArrayList<>();
	}
}
