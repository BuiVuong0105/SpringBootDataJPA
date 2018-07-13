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
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@Entity
@Table(name = "menu_role")
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public class Menu_Role {

	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@JsonInclude(Include.NON_NULL)
	@JoinColumn(name = "menuid")
	@ManyToOne(fetch = FetchType.LAZY)
	private Menu menu;

	@JsonInclude(Include.NON_NULL)
	@JoinColumn(name = "roleid")
	@ManyToOne(fetch = FetchType.LAZY)
	private Role role;

	@Column(name = "right_")
	private Integer right;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Menu getMenu() {
		return menu;
	}

	public void setMenu(Menu menu) {
		this.menu = menu;
	}

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	public Integer getRight() {
		return right;
	}

	public void setRight(Integer right) {
		this.right = right;
	}

}
