package vn.com.vuong.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import vn.com.vuong.dao.SchoolDAO;
import vn.com.vuong.entity.School;
import vn.com.vuong.service.SchoolService;

@Transactional
@Service("schoolService")
public class SchoolServiceImpl implements SchoolService {

	@Autowired
	private SchoolDAO schoolDAO;
	
	@Override
	public List<School> search(String name) {
		return schoolDAO.search(name);
	}
}
