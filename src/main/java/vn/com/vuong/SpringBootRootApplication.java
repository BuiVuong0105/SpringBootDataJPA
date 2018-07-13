package vn.com.vuong;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;

import vn.com.vuong.filter.CORSFilter;

@SpringBootApplication
public class SpringBootRootApplication {
	public static void main(String[] args) {
		SpringApplication.run(SpringBootRootApplication.class, args);
	}
	@Bean
	public FilterRegistrationBean filterRegistrationBean() {
		FilterRegistrationBean registration = new FilterRegistrationBean(new CORSFilter());
		registration.addUrlPatterns("/*");
		registration.setOrder(1);
		return registration;
	}
}
