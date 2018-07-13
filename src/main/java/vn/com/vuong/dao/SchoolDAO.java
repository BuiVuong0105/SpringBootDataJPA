package vn.com.vuong.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import vn.com.vuong.entity.School;

@Repository("schoolDAO")
public interface SchoolDAO extends JpaRepository<School, Integer>, SchoolDAOCustom {
	
}
