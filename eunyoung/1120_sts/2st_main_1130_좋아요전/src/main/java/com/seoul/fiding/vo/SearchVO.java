package com.seoul.fiding.vo;

import lombok.Data;

@Data
public class SearchVO {

	private int page_num ;
	private String search;
	private String id;
	private String cat;
	private int BD_NO ;
	
}