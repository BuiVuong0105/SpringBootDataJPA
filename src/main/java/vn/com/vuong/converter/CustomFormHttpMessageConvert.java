package vn.com.vuong.converter;

import java.io.IOException;

import org.springframework.http.HttpInputMessage;
import org.springframework.http.converter.FormHttpMessageConverter;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.util.MultiValueMap;

public class CustomFormHttpMessageConvert extends FormHttpMessageConverter {
	@Override
	public MultiValueMap<String, String> read(Class<? extends MultiValueMap<String, ?>> clazz,
			HttpInputMessage inputMessage) throws IOException, HttpMessageNotReadableException {
		System.out.println("Form Read Data !");
		return super.read(clazz, inputMessage);
	}
}
