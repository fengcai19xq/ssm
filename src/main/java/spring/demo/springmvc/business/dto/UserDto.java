package spring.demo.springmvc.business.dto;


public class UserDto {

	    private Long pkid ;
	    
	    private String userId;

	    private String userName;
	    
	    private Long status;

	    private String validStart;

	    private String validEnd;
	    
		public Long getPkid() {
			return pkid;
		}

		public void setPkid(Long pkid) {
			this.pkid = pkid;
		}

		public String getUserId() {
			return userId;
		}

		public void setUserId(String userId) {
			this.userId = userId;
		}

		public String getUserName() {
			return userName;
		}

		public void setUserName(String userName) {
			this.userName = userName;
		}

		public Long getStatus() {
			return status;
		}

		public void setStatus(Long status) {
			this.status = status;
		}

		public String getValidStart() {
			return validStart;
		}

		public void setValidStart(String validStart) {
			this.validStart = validStart;
		}

		public String getValidEnd() {
			return validEnd;
		}

		public void setValidEnd(String validEnd) {
			this.validEnd = validEnd;
		}
	    
	    

}
