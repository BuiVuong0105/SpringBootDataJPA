package vn.com.vuong.entity;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "gradeclazzidentity")
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public class GradeClazzIdentity {
	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(name = "code")
	private String code;

	@Column(name = "name")
	private String name;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "gradeid")
	private Grade grade;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "clazzidentityid")
	private ClazzIdentity clazzIdentity;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "schoolid")
	private School school;

	@JsonIgnore
	@OneToMany(mappedBy = "gradeClazzIdentity", fetch = FetchType.LAZY)
	private List<Clazz> listClazz;

	public GradeClazzIdentity() {
		super();
	}

	public GradeClazzIdentity(String code, String name) {
		super();
		this.code = code;
		this.name = name;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Grade getGrade() {
		return grade;
	}

	public void setGrade(Grade grade) {
		this.grade = grade;
	}

	public ClazzIdentity getClazzIdentity() {
		return clazzIdentity;
	}

	public void setClazzIdentity(ClazzIdentity clazzIdentity) {
		this.clazzIdentity = clazzIdentity;
	}

	public School getSchool() {
		return school;
	}

	public void setSchool(School school) {
		this.school = school;
	}

	public List<Clazz> getListClazz() {
		return listClazz;
	}

	public void setListClazz(List<Clazz> listClazz) {
		this.listClazz = listClazz;
	}
}
