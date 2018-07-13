package vn.com.vuong.configuration;

import java.util.Properties;

import javax.naming.NamingException;
import javax.persistence.EntityManagerFactory;

import org.apache.commons.dbcp.BasicDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.JpaVendorAdapter;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;

import vn.com.vuong.ultils.AppUtil;

@Configuration
@EnableJpaRepositories(basePackages = "vn.com.vuong.dao", 
entityManagerFactoryRef = "entityManagerFactory", 
transactionManagerRef = "transactionManager")
public class JpaConfiguration {
	
	@Autowired
	private Environment environment;

	/*
	 * Configure BasicDataSource pooled DataSource.
	 */
	@Bean
	public BasicDataSource dataSource() {
		BasicDataSource dataSource = new BasicDataSource();
		dataSource.setDriverClassName(environment.getRequiredProperty("datasource.sampleapp.driverClassName"));
		dataSource.setUrl(environment.getRequiredProperty("datasource.sampleapp.url"));
		dataSource.setUsername(environment.getRequiredProperty("datasource.sampleapp.username"));
		dataSource.setPassword(environment.getRequiredProperty("datasource.sampleapp.password"));
		dataSource.setInitialSize(5);
		dataSource.setMaxActive(20);
		dataSource.setMaxIdle(20);
		dataSource.setMinIdle(0);
		dataSource.setMaxWait(60);
		dataSource.setValidationQuery("select 1");
		return dataSource;
	}
	
	/*
	 * Entity Manager Factory setup.
	 */
	@Bean
	public LocalContainerEntityManagerFactoryBean entityManagerFactory() throws NamingException {
		LocalContainerEntityManagerFactoryBean factoryBean = new LocalContainerEntityManagerFactoryBean();
		factoryBean.setDataSource(dataSource());
		factoryBean.setPackagesToScan(new String[] { "vn.com.vuong.entity" });
		factoryBean.setJpaVendorAdapter(jpaVendorAdapter());
		factoryBean.setJpaProperties(jpaProperties());
		return factoryBean;
	}
	
	/*
	 * Provider specific adapter.
	 */
	@Bean
	public JpaVendorAdapter jpaVendorAdapter() {
		HibernateJpaVendorAdapter hibernateJpaVendorAdapter = new HibernateJpaVendorAdapter();
		return hibernateJpaVendorAdapter;
	}
	
	/*
	 * Here you can specify any provider specific properties.
	 */
	private Properties jpaProperties() {
		Properties properties = new Properties();
		properties.put("hibernate.dialect", environment.getRequiredProperty("datasource.sampleapp.hibernate.dialect"));
		properties.put("hibernate.show_sql",environment.getRequiredProperty("datasource.sampleapp.hibernate.show_sql"));
		properties.put("hibernate.enable_lazy_load_no_trans",true);
		properties.put("hibernate.connection.useUnicode", true);
		properties.put("hibernate.connection.characterEncoding", "UTF-8");
		properties.put("hibernate.connection.charSet", "UTF-8");
		if (AppUtil.isStringNullOrEmpty(environment.getRequiredProperty("datasource.sampleapp.defaultSchema"))) {
			properties.put("hibernate.default_schema",environment.getRequiredProperty("datasource.sampleapp.defaultSchema"));
		}
		return properties;
	}

	@Bean
	public PlatformTransactionManager transactionManager(EntityManagerFactory emf) {
		JpaTransactionManager txManager = new JpaTransactionManager();
		txManager.setEntityManagerFactory(emf);
		return txManager;
	}
}
