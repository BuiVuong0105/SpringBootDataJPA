package vn.com.vuong.ultils;

import java.util.Collection;

public class AppUtil {

	public static boolean isCollectionNullOrEmpty(Collection<?> collection) {
		if (collection == null || collection.isEmpty()) {
			return true;
		}
		return false;
	}

	public static boolean isStringNullOrEmpty(String s) {
		if (s == null || s.trim().isEmpty()) {
			return true;
		}
		return false;
	}

	public static boolean isObjectNullOrEmpty(Object object) {
		if (object == null) {
			return true;
		} else if (object instanceof String) {
			if (((String) object).trim().length() == 0) {
				return true;
			}
		} else if (object instanceof Collection) {
			if (((Collection<?>) object).isEmpty()) {
				return true;
			}
		}
		return false;
	}
}
