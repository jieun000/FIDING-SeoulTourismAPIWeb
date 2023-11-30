package com.seoul.fiding.vo;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class MemberVO {
	
	private String id;
	private String pw;
	private String username;
	private String nickname;
	private String phone;
	private String email;
	private int write_cnt;
	
}