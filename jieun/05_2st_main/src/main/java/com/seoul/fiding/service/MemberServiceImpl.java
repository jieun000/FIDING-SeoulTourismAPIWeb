package com.seoul.fiding.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.seoul.fiding.mapper.MemberMapper;
import com.seoul.fiding.vo.MemberVO;

import lombok.Setter;

@Service
public class MemberServiceImpl  implements MemberService{
	
	@Setter(onMethod_=@Autowired)
	private MemberMapper mapper;

	@Override
	public void register(MemberVO vo) {
		System.out.println("여기는 서비스 회원 가입 : " + vo);
		mapper.register(vo);
	}

	@Override
	public MemberVO isSignup(String id) {
		System.out.println("여기는 서비스 회원가입 목록 확인 ");
		return mapper.isSignup(id);
	}

}
