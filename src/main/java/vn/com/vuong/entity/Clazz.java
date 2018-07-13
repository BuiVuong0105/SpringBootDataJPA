package vn.com.vuong.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "clazz")
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public class Clazz {
	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "gradeclazzidentityid")
	private GradeClazzIdentity gradeClazzIdentity;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "yearid")
	private Year year;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "schoolid")
	private School school;

	public Clazz() {
		super();
	}

	public Clazz(Integer id) {
		this.id = id;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public GradeClazzIdentity getGradeClazzIdentity() {
		return gradeClazzIdentity;
	}

	public void setGradeClazzIdentity(GradeClazzIdentity gradeClazzIdentity) {
		this.gradeClazzIdentity = gradeClazzIdentity;
	}

	public Year getYear() {
		return year;
	}

	public void setYear(Year year) {
		this.year = year;
	}

	public School getSchool() {
		return school;
	}

	public void setSchool(School school) {
		this.school = school;
	}

}
