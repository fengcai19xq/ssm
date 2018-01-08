package spring.demo.springmvc.business.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ResponseDto {

	public static final String SUCCESS = "000000" ;

	public static final String ERROR   = "100000" ;

    private String resCode ;
    private String resMsg ;
    
    public ResponseDto() {
        super();
        // TODO Auto-generated constructor stub
    }


	public String getResCode() {
		return resCode;
	}


	public void setResCode(String resCode) {
		this.resCode = resCode;
	}


	public String getResMsg() {
		return resMsg;
	}


	public void setResMsg(String resMsg) {
		this.resMsg = resMsg;
	}

}
