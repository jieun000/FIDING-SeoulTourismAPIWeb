package com.seoul.fiding.vo;

import lombok.Data;

@Data
public class MemberVO {
	
	private String id;
	private String pw;
	private String username;
	private String nickname;
	private String phone;
	private String email;
	private int write_cnt;
	
}