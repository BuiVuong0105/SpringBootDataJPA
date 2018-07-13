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
@Table(name = "clazzidentity")
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public class ClazzIdentity {
	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(name = "code")
	private String code;

	@Column(name = "name")
	private String name;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "schoolid")
	private School school;

	@JsonIgnore
	@OneToMany(mappedBy = "clazzIdentity", fetch = FetchType.LAZY)
	private List<GradeClazzIdentity> listGradeClazzIndentity;

	public ClazzIdentity() {
		super();
	}

	public ClazzIdentity(String code, String name) {
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

	public School getSchool() {
		return school;
	}

	public void setSchool(School school) {
		this.school = school;
	}

	public List<GradeClazzIdentity> getListGradeClazzIndentity() {
		return listGradeClazzIndentity;
	}

	public void setListGradeClazzIndentity(List<GradeClazzIdentity> listGradeClazzIndentity) {
		this.listGradeClazzIndentity = listGradeClazzIndentity;
	}
}
