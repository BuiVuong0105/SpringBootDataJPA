package vn.com.vuong.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

public class CORSFilter implements Filter {

	public CORSFilter() {
		System.out.println("Khoi Tao CROSS FILTER");
	}

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
		System.out.println("Init CORS !");
	}

	@Override
	public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
			throws IOException, ServletException {
		System.out.println("BEFORE: "+ ((HttpServletRequest)req).getRequestURI());
		chain.doFilter(req, res);
		System.out.println("AFTER: "+((HttpServletRequest)req).getRequestURI());
	}

	@Override
	public void destroy() {
	}
}
