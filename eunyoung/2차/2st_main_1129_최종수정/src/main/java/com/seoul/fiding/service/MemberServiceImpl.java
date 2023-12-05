package com.seoul.fiding.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.seoul.fiding.mapper.MemberMapper;
import com.seoul.fiding.vo.BoardVO;
import com.seoul.fiding.vo.FavorVO;
import com.seoul.fiding.vo.LikeVO;
import com.seoul.fiding.vo.MemberVO;
import com.seoul.fiding.vo.SearchVO;
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
	public BoardVO selectOneBoard(int BD_NO) {
		BoardVO bvo = mapper.selectOneBoard(BD_NO);
		TourVO tvo = mapper.selectOneTour(bvo.getTL_NO());
		List<Integer> fbno=mapper.selectAllFavor().stream().map(FavorVO::getBD_NO)
				.collect(Collectors.toList());
		List<Integer> lbno=mapper.selectAllLike().stream().map(LikeVO::getBD_NO)
				.collect(Collectors.toList());
		bvo.setIsLike(lbno.contains(bvo.getBD_NO()));
		bvo.setIsFavor(fbno.contains(bvo.getBD_NO()));
		bvo.setAddress(tvo.getAddress());
		bvo.setUrl(tvo.getUrl());
		return mapper.selectOneBoard(BD_NO);
	}

	@Override
	public List<BoardVO> selectBoardPaging9(SearchVO vo) {
		List<BoardVO> bvoList=mapper.selectBoardPaging9(vo);
		String id=vo.getId();
		List<Integer> fbno=mapper.selectAllFavorByID(id).stream().map(FavorVO::getBD_NO)
				.collect(Collectors.toList());
		List<Integer> lbno=mapper.selectAllLikeByID(id).stream().map(LikeVO::getBD_NO)
				.collect(Collectors.toList());
		bvoList.forEach(bvo -> bvo.setIsLike(lbno.contains(bvo.getBD_NO())));
	    bvoList.forEach(bvo -> bvo.setIsFavor(fbno.contains(bvo.getBD_NO())));
		return bvoList;
	}

	@Override
	public List<BoardVO> selectBoardByIdPaging9(SearchVO vo) {
		List<BoardVO> bvoList=mapper.selectBoardByIdPaging9(vo);
		String id=vo.getId();
		List<Integer> fbno=mapper.selectAllFavorByID(id).stream().map(FavorVO::getBD_NO)
				.collect(Collectors.toList());
		List<Integer> lbno=mapper.selectAllLikeByID(id).stream().map(LikeVO::getBD_NO)
				.collect(Collectors.toList());
		bvoList.forEach(bvo -> bvo.setIsLike(lbno.contains(bvo.getBD_NO())));
	    bvoList.forEach(bvo -> bvo.setIsFavor(fbno.contains(bvo.getBD_NO())));
		return bvoList;
	}

	@Override
	public List<BoardVO> selectBoardBySearchPaging9(SearchVO vo) {
		List<BoardVO> bvoList=mapper.selectBoardBySearchPaging9(vo);
		String id=vo.getId();
		List<Integer> fbno=mapper.selectAllFavorByID(id).stream().map(FavorVO::getBD_NO)
				.collect(Collectors.toList());
		List<Integer> lbno=mapper.selectAllLikeByID(id).stream().map(LikeVO::getBD_NO)
				.collect(Collectors.toList());
		bvoList.forEach(bvo -> bvo.setIsLike(lbno.contains(bvo.getBD_NO())));
	    bvoList.forEach(bvo -> bvo.setIsFavor(fbno.contains(bvo.getBD_NO())));
		return bvoList;
	}

	@Override
	public List<BoardVO> selectBoardByCatPaging9(SearchVO vo) {
		List<BoardVO> bvoList=mapper.selectBoardByCatPaging9(vo);
		String id=vo.getId();
		List<Integer> fbno=mapper.selectAllFavorByID(id).stream().map(FavorVO::getBD_NO)
				.collect(Collectors.toList());
		List<Integer> lbno=mapper.selectAllLikeByID(id).stream().map(LikeVO::getBD_NO)
				.collect(Collectors.toList());
		bvoList.forEach(bvo -> bvo.setIsLike(lbno.contains(bvo.getBD_NO())));
	    bvoList.forEach(bvo -> bvo.setIsFavor(fbno.contains(bvo.getBD_NO())));
		return bvoList;
	}

	@Override
	public void deleteAllByBDNO(int BD_NO) {
		mapper.deleteAllFavorByBD_NO(BD_NO);
		mapper.deleteAllLikeByBD_NO(BD_NO);
		
	}

	@Override
	public void updateBoard(BoardVO vo) {
		mapper.updateBoard(vo);
		
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
	public int deleteABoard(int BD_NO) {
		System.out.println("여기 서비스에서 삭제됨 :" +BD_NO);
		return mapper.deleteABoard(BD_NO);
		
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
	public void deleteALike(int LL_NO) {
		// TODO Auto-generated method stub
		
	}



	@Override
	public void insertFavor(FavorVO vo) {
		// TODO Auto-generated method stub
		
	}



	@Override
	public void deleteAFavor(int LL_NO) {
		// TODO Auto-generated method stub
		
	}


	@Override
	public void insertTour(TourVO vo) {
		// TODO Auto-generated method stub
		
	}



	@Override
	public void searchUp(int TL_NO) {
		// TODO Auto-generated method stub
		
	}







};