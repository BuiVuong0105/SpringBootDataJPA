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
@Table(name = "school")
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public class School {
	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(name = "code")
	private String code;

	@Column(name = "name")
	private String name;

	@Column(name = "address")
	private String address;

	@Column(name = "email")
	private String email;

	@Column(name = "phonenumber")
	private String phoneNumber;

	@Column(name = "website")
	private String website;

	@Column(name = "principal")
	private String principal;

	@Column(name = "type")
	private Integer type;

	@Column(name = "schooltype")
	private Integer schoolType;

	@JsonIgnore
	@OneToMany(mappedBy = "school", fetch = FetchType.LAZY)
	private List<Teacher> listTeacher;

	@JsonIgnore
	@OneToMany(mappedBy = "school", fetch = FetchType.LAZY)
	private List<Student> listStudent;

	@JsonIgnore
	@OneToMany(mappedBy = "school", fetch = FetchType.LAZY)
	private List<Year> listYear;

	@JsonIgnore
	@OneToMany(mappedBy = "school", fetch = FetchType.LAZY)
	private List<ClazzIdentity> listClazzIndentity;

	@JsonIgnore
	@OneToMany(mappedBy = "school", fetch = FetchType.LAZY)
	private List<Subject> listSubject;

	public School() {
		super();
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

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public String getWebsite() {
		return website;
	}

	public void setWebsite(String website) {
		this.website = website;
	}

	public String getPrincipal() {
		return principal;
	}

	public void setPrincipal(String principal) {
		this.principal = principal;
	}

	public Integer getType() {
		return type;
	}

	public void setType(Integer type) {
		this.type = type;
	}

	public Integer getSchoolType() {
		return schoolType;
	}

	public void setSchoolType(Integer schoolType) {
		this.schoolType = schoolType;
	}

	public List<Teacher> getListTeacher() {
		return listTeacher;
	}

	public void setListTeacher(List<Teacher> listTeacher) {
		this.listTeacher = listTeacher;
	}

	public List<Student> getListStudent() {
		return listStudent;
	}

	public void setListStudent(List<Student> listStudent) {
		this.listStudent = listStudent;
	}

	public List<Year> getListYear() {
		return listYear;
	}

	public void setListYear(List<Year> listYear) {
		this.listYear = listYear;
	}

	public List<ClazzIdentity> getListClazzIndentity() {
		return listClazzIndentity;
	}

	public void setListClazzIndentity(List<ClazzIdentity> listClazzIndentity) {
		this.listClazzIndentity = listClazzIndentity;
	}

	public List<Subject> getListSubject() {
		return listSubject;
	}

	public void setListSubject(List<Subject> listSubject) {
		this.listSubject = listSubject;
	}

}
