package vn.com.vuong.converter;

import java.io.IOException;
import java.lang.reflect.Type;
import java.text.SimpleDateFormat;

import org.springframework.http.HttpInputMessage;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

public class MyMappingJacksonHttpMessageConverter extends MappingJackson2HttpMessageConverter {
	public MyMappingJacksonHttpMessageConverter() {
		super();
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("dd/MM/yyyy");
		ObjectMapper objectMapper = new ObjectMapper();
		objectMapper.setDateFormat(simpleDateFormat);
		objectMapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
		setObjectMapper(objectMapper);
	}
	
	@Override
	public Object read(Type type, Class<?> contextClass, HttpInputMessage inputMessage)
			throws IOException, HttpMessageNotReadableException {
		System.out.println("JSON Read Convert");
		return super.read(type, contextClass, inputMessage);
	}
}
