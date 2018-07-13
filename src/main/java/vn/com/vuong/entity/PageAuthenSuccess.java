package vn.com.vuong.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@Entity
@Table(name = "page_authen_success")
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public class PageAuthenSuccess {

	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@JsonInclude(Include.NON_NULL)
	@JoinColumn(name = "menuid")
	@OneToOne(fetch = FetchType.LAZY)
	private Menu menu;

	@JsonInclude(Include.NON_NULL)
	@JoinColumn(name = "roleid")
	@OneToOne(fetch = FetchType.LAZY)
	private Role role;

}
