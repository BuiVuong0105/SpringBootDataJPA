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
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@Entity
@Table(name = "menu")
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public class Menu {

	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(name = "name")
	private String name;

	@Column(name = "url")
	private String url;

	@Column(name = "icon")
	private String icon;

	@Transient
	private Integer right;

	@JsonInclude(Include.NON_NULL)
	@JoinColumn(name = "parentid")
	@ManyToOne(fetch = FetchType.LAZY)
	private Menu parentMenu;

	@JsonIgnore
	@OneToMany(mappedBy = "parentMenu", fetch = FetchType.LAZY)
	private List<Menu> listChildMenu;

	@JsonIgnore
	@OneToMany(mappedBy = "menu", fetch = FetchType.LAZY)
	private List<Menu_Role> listMenu_Role;

	@Transient
	@JsonInclude(Include.NON_NULL)
	private List<Menu> childMenus;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public Integer getRight() {
		return right;
	}

	public void setRight(Integer right) {
		this.right = right;
	}

	public Menu getParentMenu() {
		return parentMenu;
	}

	public void setParentMenu(Menu parentMenu) {
		this.parentMenu = parentMenu;
	}

	public List<Menu> getListChildMenu() {
		return listChildMenu;
	}

	public void setListChildMenu(List<Menu> listChildMenu) {
		this.listChildMenu = listChildMenu;
	}

	public List<Menu_Role> getListMenu_Role() {
		return listMenu_Role;
	}

	public void setListMenu_Role(List<Menu_Role> listMenu_Role) {
		this.listMenu_Role = listMenu_Role;
	}

	public List<Menu> getChildMenus() {
		return childMenus;
	}

	public void setChildMenus(List<Menu> childMenus) {
		this.childMenus = childMenus;
	}

	public String getIcon() {
		return icon;
	}

	public void setIcon(String icon) {
		this.icon = icon;
	}

}
