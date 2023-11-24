package com.seoul.fiding.vo;

import lombok.Data;

@Data
public class BoardVO {
	
	private String id;	
	private String nickname;
	private int BD_NO ;
	private int TL_NO ;
	private int like_cnt ;
	private String title;	
	private String content;
	private String tag;
	private String cat;
}