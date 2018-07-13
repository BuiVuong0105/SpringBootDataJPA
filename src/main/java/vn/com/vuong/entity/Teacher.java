package vn.com.vuong.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "teacher")
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public class Teacher {
	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(name = "code")
	private String code;

	@Column(name = "name")
	private String name;

	@Column(name = "dob")
	private Date dob;

	@Column(name = "gender")
	private Boolean gender;

	@Column(name = "address")
	private String address;

	@Column(name = "email")
	private String email;

	@Column(name = "phonenumer")
	private String phonenumber;

	@Column(name = "yearprofession")
	private Integer yearProfession;

	@Column(name = "partymember")
	private Boolean partyMember = false;

	@Column(name = "position")
	private String position;

	@Column(name = "level")
	private String level;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "schoolid")
	private School school;

	@JsonIgnore
	@OneToOne(fetch = FetchType.LAZY, mappedBy = "teacher")
	private User user;

	public Teacher() {
		super();
	}

	public Teacher(String code, String name, Date dob, Boolean gender, String address, String email, String phonenumber,
			Integer yearProfession, Boolean partyMember) {
		super();
		this.code = code;
		this.name = name;
		this.dob = dob;
		this.gender = gender;
		this.address = address;
		this.email = email;
		this.phonenumber = phonenumber;
		this.yearProfession = yearProfession;
		this.partyMember = partyMember;
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

	public Date getDob() {
		return dob;
	}

	public void setDob(Date dob) {
		this.dob = dob;
	}

	public Boolean getGender() {
		return gender;
	}

	public void setGender(Boolean gender) {
		if(gender == null) {
			this.gender = false;
		}else {
			this.gender = gender;
		}
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

	public String getPhonenumber() {
		return phonenumber;
	}

	public void setPhonenumber(String phonenumber) {
		this.phonenumber = phonenumber;
	}

	public Integer getYearProfession() {
		return yearProfession;
	}

	public void setYearProfession(Integer yearProfession) {
		this.yearProfession = yearProfession;
	}

	public Boolean getPartyMember() {
		return partyMember;
	}

	public void setPartyMember(Boolean partyMember) {
		if(partyMember == null) {
			this.partyMember = false;
		}else {
			this.partyMember = partyMember;
		}
	}

	public String getPosition() {
		return position;
	}

	public void setPosition(String position) {
		this.position = position;
	}

	public String getLevel() {
		return level;
	}

	public void setLevel(String level) {
		this.level = level;
	}

	public School getSchool() {
		return school;
	}

	public void setSchool(School school) {
		this.school = school;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
}
