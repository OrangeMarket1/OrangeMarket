package orange.service.impl;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import orange.service.AdminVO;
import orange.service.InquiryVO;
import orange.service.PagingVO;
import orange.service.ReportVO;

@Mapper("adminMapper")
public interface AdminMapper {
	
	int confirmAdminId(AdminVO vo);
	int confirmAdminPass(AdminVO vo);
	
	int totalMemberList(PagingVO vo);
	List<?> selectMemberList(PagingVO vo);
	
	int updateMemberState(int userId);
	int updateMemberDate(int userId);
	
	int totalSuspendList(PagingVO vo);
	List<?> selectSuspendList(PagingVO vo);
	
	int updateUnlock(int userId);
	
	int totalWithdrawal(PagingVO vo);
	List<?> selectWithdrawal(PagingVO vo);
	
	int updateRestore(int userId);
	
	int totalAdminInquiry(PagingVO vo);
	List<?> selectAdminInquiry(PagingVO vo);
	
	InquiryVO adminInquiryInfo(InquiryVO vo);
	
	int responseInquiry(InquiryVO vo);
	
	int totalAdminReport(PagingVO vo);
	List<?> selectAdminReport(PagingVO vo);
	
	ReportVO adminReportInfo(ReportVO vo);
	
	int updateReportCount(ReportVO vo);
	int responseReport(ReportVO vo);
	
	int countReport(ReportVO vo);
	
	int overCountSuspend(ReportVO vo);
}
