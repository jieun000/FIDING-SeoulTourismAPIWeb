package com.seoul.fiding.mapper;

import java.util.List;

import com.seoul.fiding.vo.BoardVO;
import com.seoul.fiding.vo.FavorVO;
import com.seoul.fiding.vo.LikeVO;
import com.seoul.fiding.vo.MemberVO;
import com.seoul.fiding.vo.TourVO;
import com.seoul.fiding.vo.SearchVO;

public interface MemberMapper {
	
	public void register(MemberVO vo);
	public MemberVO isSignup(String id);

	public void writeBoard(BoardVO vo);
	public BoardVO selectOneBoard(int BD_NO);
	public List<BoardVO> selectBoardPaging9(SearchVO vo);
	public List<BoardVO> selectBoardByIdPaging9(SearchVO vo);
	public List<BoardVO> selectBoardBySearchPaging9(SearchVO vo);
	public List<BoardVO> selectBoardByCatPaging9(SearchVO vo);
	public void updateBoard(BoardVO vo);
	public void likeUp(int BD_NO);
	public void likeDown(int BD_NO);
	public int deleteABoard(int BD_NO);
	public void deleteAllBoardByID(String id);
	
	public void insertLike(LikeVO vo);
	public List<LikeVO> selectAllLikeByID(String id);
	public List<LikeVO> selectAllLike();
	public void deleteALike(int LL_NO);
	public void deleteAllLikeByBD_NO(int BN_NO);
	
	public void insertFavor(FavorVO vo);
	public List<FavorVO> selectAllFavorByID(String id);
	public List<FavorVO> selectAllFavor();
	public void deleteAFavor(int LL_NO);
	public void deleteAllFavorByBD_NO(int BN_NO);
	
	public void insertTour(TourVO vo);
	public List<TourVO> selectAllTour();
	public TourVO selectOneTour(int TL_NO);
	public void searchUp(int TL_NO);
	
}
