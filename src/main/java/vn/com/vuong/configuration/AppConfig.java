package vn.com.vuong.configuration;

import java.util.List;
import java.util.Locale;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.springframework.beans.factory.config.PropertyPlaceholderConfigurer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ResourceBundleMessageSource;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;
import org.springframework.web.servlet.config.annotation.DefaultServletHandlerConfigurer;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewResolverRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.i18n.CookieLocaleResolver;
import org.springframework.web.servlet.i18n.LocaleChangeInterceptor;
import org.springframework.web.servlet.view.tiles3.TilesConfigurer;
import org.springframework.web.servlet.view.tiles3.TilesViewResolver;

import vn.com.vuong.converter.CustomFormHttpMessageConvert;
import vn.com.vuong.converter.CustomStringHttpMessageConvert;
import vn.com.vuong.converter.MyMappingJacksonHttpMessageConverter;

@Configuration
@EnableWebMvc
public class AppConfig extends WebMvcConfigurerAdapter {

	private Logger logger = Logger.getLogger("AppConfig");

	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		logger.log(Level.CONFIG, "Resources Handler");
		registry.addResourceHandler("/resources/**").addResourceLocations("/resources/");
	}
	
//	@Bean(name = "viewResolver")
//	public InternalResourceViewResolver viewResolver() {
//		logger.info("Init ViewResolve");
//		InternalResourceViewResolver viewResolver = new InternalResourceViewResolver();
//		viewResolver.setPrefix("/WEB-INF/pages/views/");
//		viewResolver.setSuffix(".jsp");
//		viewResolver.setOrder(1);
//		return viewResolver;
//	}

	@Bean
	public TilesConfigurer tilesConfigurer() {
		logger.info("Init TilesConfigurer");
		TilesConfigurer tilesConfigurer = new TilesConfigurer();
		tilesConfigurer.setDefinitions("/WEB-INF/pages/tiles.xml");
		tilesConfigurer.setCheckRefresh(true);
		return tilesConfigurer;
	}

	@Override
	public void configureViewResolvers(ViewResolverRegistry registry) {
		TilesViewResolver viewResolver = new TilesViewResolver();
		registry.viewResolver(viewResolver);
	}

	@Bean(name = "messageSource")
	public ResourceBundleMessageSource messageSource() {
		logger.info("Init ResourceBundle");
		ResourceBundleMessageSource messageSource = new ResourceBundleMessageSource();
		messageSource.setBasename("message");
		messageSource.setDefaultEncoding("UTF-8");
		return messageSource;
	}

	@Bean(name = "localeResolver")
	public CookieLocaleResolver localeResolver() {
		logger.info("Init Locale");
		CookieLocaleResolver localeResolver = new CookieLocaleResolver();
		localeResolver.setDefaultLocale(new Locale("vi"));
		localeResolver.setCookieName("myAppLocaleCookie");
		localeResolver.setCookieMaxAge(3600);
		return localeResolver;
	}

	@Bean(name = "multipartResolver")
	public CommonsMultipartResolver multipartResolver() {
		logger.info("Init Multipart");
		CommonsMultipartResolver multipartResolver = new CommonsMultipartResolver();
		multipartResolver.setMaxUploadSize(20971520);
		multipartResolver.setMaxInMemorySize(1048576);
		return multipartResolver;
	}

	@Bean(name = "propertyPlaceholderConfigurer")
	public PropertyPlaceholderConfigurer PlaceholderConfigurerSupport() {
		logger.info("Init PropertyPlaceholderConfigurer");
		PropertyPlaceholderConfigurer propertyPlaceholderConfigurer = new PropertyPlaceholderConfigurer();
		return propertyPlaceholderConfigurer;
	}

	// @Bean
	// public PropertySourcesPlaceholderConfigurer
	// propertySourcesPlaceholderConfigurer() {
	// logger.info("Init PropertyPlaceholderConfigurer");
	// PropertySourcesPlaceholderConfigurer placeholderConfigurer = new
	// PropertySourcesPlaceholderConfigurer();
	// return placeholderConfigurer;
	// }

	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		logger.info("Registry Interceptor");
		LocaleChangeInterceptor localeChangeInterceptor = new LocaleChangeInterceptor();
		localeChangeInterceptor.setParamName("lang");
		registry.addInterceptor(localeChangeInterceptor);
	}

	@Override
	public void configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer) {
		configurer.enable();
	}

	@Override
	public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
		converters.add(new MyMappingJacksonHttpMessageConverter());
		converters.add(new CustomStringHttpMessageConvert());
		converters.add(new CustomFormHttpMessageConvert());
	}
}
