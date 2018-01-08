package spring.demo.springmvc.business.model;

import java.util.Date;

public class User {
    private Long pkid;

    private String userId;

    private String userName;

    private String password;

    private String realmId;

    private Long status;

    private Date validStart;

    private Date validEnd;

    private String valid;

    private Long addedBy;

    private String addedName;

    private Date addedTime;

    private Long lastModifiedBy;

    private String lastModifiedName;

    private Date lastModifiedTime;

    private String lastModifiedIp;

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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRealmId() {
        return realmId;
    }

    public void setRealmId(String realmId) {
        this.realmId = realmId;
    }

    public Long getStatus() {
        return status;
    }

    public void setStatus(Long status) {
        this.status = status;
    }

    public Date getValidStart() {
        return validStart;
    }

    public void setValidStart(Date validStart) {
        this.validStart = validStart;
    }

    public Date getValidEnd() {
        return validEnd;
    }

    public void setValidEnd(Date validEnd) {
        this.validEnd = validEnd;
    }

    public String getValid() {
        return valid;
    }

    public void setValid(String valid) {
        this.valid = valid;
    }

    public Long getAddedBy() {
        return addedBy;
    }

    public void setAddedBy(Long addedBy) {
        this.addedBy = addedBy;
    }

    public String getAddedName() {
        return addedName;
    }

    public void setAddedName(String addedName) {
        this.addedName = addedName;
    }

    public Date getAddedTime() {
        return addedTime;
    }

    public void setAddedTime(Date addedTime) {
        this.addedTime = addedTime;
    }

    public Long getLastModifiedBy() {
        return lastModifiedBy;
    }

    public void setLastModifiedBy(Long lastModifiedBy) {
        this.lastModifiedBy = lastModifiedBy;
    }

    public String getLastModifiedName() {
        return lastModifiedName;
    }

    public void setLastModifiedName(String lastModifiedName) {
        this.lastModifiedName = lastModifiedName;
    }

    public Date getLastModifiedTime() {
        return lastModifiedTime;
    }

    public void setLastModifiedTime(Date lastModifiedTime) {
        this.lastModifiedTime = lastModifiedTime;
    }

    public String getLastModifiedIp() {
        return lastModifiedIp;
    }

    public void setLastModifiedIp(String lastModifiedIp) {
        this.lastModifiedIp = lastModifiedIp;
    }
}