package vn.com.vuong.entity;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "grade")
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public class Grade {
	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(name = "code")
	private String code;

	@Column(name = "name")
	private String name;

	@JsonIgnore
	@OneToMany(mappedBy = "grade", fetch = FetchType.LAZY)
	private List<GradeClazzIdentity> listGradeClazzIdentity;

	@JsonIgnore
	@OneToMany(mappedBy = "grade", fetch = FetchType.LAZY)
	private List<Subject> listSubject;

	public Grade() {
		super();
	}

	public Grade(String code, String name) {
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

	public List<GradeClazzIdentity> getListGradeClazzIdentity() {
		return listGradeClazzIdentity;
	}

	public void setListGradeClazzIdentity(List<GradeClazzIdentity> listGradeClazzIdentity) {
		this.listGradeClazzIdentity = listGradeClazzIdentity;
	}

	public List<Subject> getListSubject() {
		return listSubject;
	}

	public void setListSubject(List<Subject> listSubject) {
		this.listSubject = listSubject;
	}

}
