//package vn.com.vuong.configuration;
//
//import java.util.Properties;
//import java.util.logging.Level;
//import java.util.logging.Logger;
//
//import org.apache.commons.dbcp.BasicDataSource;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
//import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
//import org.springframework.boot.autoconfigure.jdbc.DataSourceTransactionManagerAutoConfiguration;
//import org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.core.env.Environment;
//import org.springframework.orm.hibernate5.HibernateTemplate;
//import org.springframework.orm.hibernate5.HibernateTransactionManager;
//import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
//import org.springframework.transaction.annotation.EnableTransactionManagement;
//
//@Configuration
//@EnableTransactionManagement
//@EnableAutoConfiguration(exclude = { 
//		DataSourceAutoConfiguration.class,
//		DataSourceTransactionManagerAutoConfiguration.class, 
//		HibernateJpaAutoConfiguration.class })
//public class HibernateConfig {
//
//	private Logger logger = Logger.getLogger("HibernateConfig");
//
//	@Autowired
//	private Environment enviroment;
//
//	@Bean
//	public BasicDataSource dataSource() {
//		logger.log(Level.INFO, "Khoi Tao DataSource");
//		BasicDataSource dataSource = new BasicDataSource();
//		dataSource.setDriverClassName(enviroment.getRequiredProperty("datasource.sampleapp.driverClassName"));
//		dataSource.setUrl(enviroment.getRequiredProperty("datasource.sampleapp.url"));
//		dataSource.setUsername(enviroment.getRequiredProperty("datasource.sampleapp.username"));
//		dataSource.setPassword(enviroment.getRequiredProperty("datasource.sampleapp.password"));
//		dataSource.setInitialSize(2);
//		dataSource.setMaxActive(2);
//		dataSource.setMaxIdle(1);
//		dataSource.setMinIdle(0);
//		dataSource.setMaxWait(50000);
//		dataSource.setValidationQuery("select 1");
//		return dataSource;
//	}
//
//	@Bean(name = "sessionFactory")
//	public LocalSessionFactoryBean sessionFactory(BasicDataSource dataSource) {
//		logger.log(Level.INFO, "KHOI TAO SESSIONFACTORY");
//		LocalSessionFactoryBean sessionFactoryBean = new LocalSessionFactoryBean();
//		sessionFactoryBean.setDataSource(dataSource);
//		sessionFactoryBean.setPackagesToScan("vn.com.vuong.entity");
//		Properties properties = new Properties();
//		properties.put("hibernate.dialect", enviroment.getRequiredProperty("datasource.sampleapp.hibernate.dialect"));
//		properties.put("hibernate.enable_lazy_load_no_trans", true);
//		properties.put("hibernate.show_sql", true);
//		sessionFactoryBean.setHibernateProperties(properties);
//		return sessionFactoryBean;
//	}
//
//	@Bean(name = "hibernateTransactionManager")
//	public HibernateTransactionManager hibernateTransactionManager(LocalSessionFactoryBean sessionFactory) {
//		logger.log(Level.INFO, "KHOI TAO TRANSACTION");
//		HibernateTransactionManager hibernateTransactionManager = new HibernateTransactionManager();
//		hibernateTransactionManager.setSessionFactory(sessionFactory.getObject());
//		return hibernateTransactionManager;
//	}
//
//	@Bean(name = "hibernateTemplate")
//	public HibernateTemplate hibernateTemplate(LocalSessionFactoryBean sessionFactory) {
//		logger.log(Level.INFO, "KHOI TAO HIBERNATE TEMPLATE");
//		HibernateTemplate hibernateTemplate = new HibernateTemplate();
//		hibernateTemplate.setSessionFactory(sessionFactory.getObject());
//		return hibernateTemplate;
//	}
//}
