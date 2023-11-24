package com.seoul.fiding.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.seoul.fiding.mapper.MemberMapper;
import com.seoul.fiding.vo.BoardVO;
import com.seoul.fiding.vo.FavorVO;
import com.seoul.fiding.vo.LikeVO;
import com.seoul.fiding.vo.MemberVO;
import com.seoul.fiding.vo.TourVO;

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

	@Override
	public void writeBoard(BoardVO vo) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public MemberVO selectBoard(int BD_NO) {
		// TODO Auto-generated method stub
		return mapper.selectBoard(BD_NO);
	}

	@Override
	public List<MemberVO> selectAllBoard() {
		// TODO Auto-generated method stub
		return mapper.selectAllBoard();
	}

	@Override
	public void updateBoard(BoardVO vo) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void likeUp(int BD_NO) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void likeDown(int BD_NO) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void deleteABoard(int BD_NO) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void deleteAllBoardByID(String id) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void insertLike(LikeVO vo) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<LikeVO> selectAllLike() {
		// TODO Auto-generated method stub
		return mapper.selectAllLike();
	}

	@Override
	public void deleteALike(int LL_NO) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void deleteAllLikeByUserID(String id) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void deleteAllLikeByWriterID(String id) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void insertFavor(FavorVO vo) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<FavorVO> selectAllFavor() {
		// TODO Auto-generated method stub
		return mapper.selectAllFavor();
	}

	@Override
	public void deleteAFavor(int LL_NO) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void deleteAllFavorByUserID(String id) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void deleteAllFavorByWriterID(String id) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void insertTour(TourVO vo) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<TourVO> selectAllTour() {
		// TODO Auto-generated method stub
		return mapper.selectAllTour();
	}

	@Override
	public void searchUp(int TL_NO) {
		// TODO Auto-generated method stub
		
	}

	
}
