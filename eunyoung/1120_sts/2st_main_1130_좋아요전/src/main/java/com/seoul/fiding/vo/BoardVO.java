package com.seoul.fiding.vo;

import lombok.Data;

@Data
public class BoardVO {

	private int BD_NO ;
	private int TL_NO ;
	private String id;	
	private String nickname;
	private String title;	
	private String content;
	private int like_cnt ;
	private String tag;
	private String cat;
	private Boolean isLike;
	private Boolean isFavor;
	private String address;
	private String url;
	private int length ;
	
	
	
}