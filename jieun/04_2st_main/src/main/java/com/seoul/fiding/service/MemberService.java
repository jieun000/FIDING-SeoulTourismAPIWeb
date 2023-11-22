package com.seoul.fiding.service;

import com.seoul.fiding.vo.MemberVO;

public interface MemberService {
	public void register(MemberVO vo);
	public MemberVO isSignup(String id);
}
