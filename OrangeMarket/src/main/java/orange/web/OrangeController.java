package orange.web;

import java.net.InetAddress;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.servlet.ModelAndView;

import orange.service.DeptVO;
import orange.service.KeywordVO;
import orange.service.MemberService;
import orange.service.MemberVO;
import orange.service.MyKeywordVO;
import orange.service.MyPageService;
import orange.service.OrangeService;
import orange.service.ProductService;
import orange.service.ProductVO;

@Controller
public class OrangeController {

	@Resource(name = "orangeService")
	private OrangeService orangeService;

	@Resource(name = "productService")
	private ProductService productService;

	@Resource(name = "memberService")
	private MemberService memberService;

	@RequestMapping(value = "/deptList.do")
	public String deptlist(DeptVO vo, Model model) throws Exception {

		int deptno = 10;

		/*
		 * List<?> list = sampleService.selectDeptList(); model.addAttribute("list",
		 * list);
		 */
		vo = orangeService.selectDeptDetail(deptno);
		model.addAttribute("vo", vo);

		return "dept/deptList";
	}
	

	
	@RequestMapping(value="/main")
	public String showMainPage(ProductVO pvo, MemberVO mvo, Model model, HttpSession session) throws Exception {
		// 최근 제품 표시용 리스트
		List<?> recent_list = productService.selectProductList(pvo);
		List<?> like_list = productService.selectLikeProductList(pvo);
		
		// 세션 발생 시 동네 인증 여부 확인
		if( session.getAttribute("sessionId") != null ) { 
			int sessionId = (int) session.getAttribute("sessionId");
			pvo.setUserId(sessionId);
			
			// 멤버 테이블에서 주소 가져오기
			String addr = productService.selectMemberAddr(pvo);
			pvo.setAddr(addr);
			System.out.println(addr);
			
			//동네 인증 여부 가져오기
			mvo = productService.selectAddrPass(pvo);
			
			//등록된 판매 제품 목록 리스트
			recent_list = productService.selectProductList(pvo);
			like_list = productService.selectLikeProductList(pvo);
			
			int mykeyword_count = productService.selectMykeywrodCount(pvo);
			
			if(mykeyword_count != 0) {
				List<?> mykeyword_list = productService.selectMyKeywordList(pvo);
				model.addAttribute("myKeywordList", mykeyword_list);
			}
			System.out.println(mykeyword_count);
			model.addAttribute("mykeywordCount", mykeyword_count);
		}
		
		model.addAttribute("recentList", recent_list);
		model.addAttribute("likeList", like_list);
		model.addAttribute("addrPass", mvo.getAddrPass());
		
		return "main/main";
	}
	
	@RequestMapping(value = "/search-list")
	@ResponseBody
	public Map<String, Object> searchList(HttpSession session) throws Exception {

		MemberVO vo = new MemberVO();
		MyKeywordVO mykvo = new MyKeywordVO();
		KeywordVO keyVo = new KeywordVO(); 
		ProductVO proVo = new ProductVO();
				
		String userIp = getUserIp();
		keyVo.setSrchIp(userIp);
		
		Map<String, Object> searchObj = new HashMap<String, Object>();

		// 인기 검색어 가져오기 
		List<?> popularKeyword = orangeService.selectPopularKeywordList();
		searchObj.put("popkeyword", popularKeyword);

		// 최근 검색어 가져오기
		List<?> recentKeyword = orangeService.selectkeywordListByIp(keyVo);
		searchObj.put("reckeyword", recentKeyword);
		
		// 나의 관심 키워드 가져오기
		if( session.getAttribute("sessionId") != null ) { 
			int sessionId = (int) session.getAttribute("sessionId");
			vo.setUserId(sessionId);
			
			List<?> myKeyword = orangeService.selectMykeywordList(vo);
			searchObj.put("myKeyword", myKeyword);
			
		}

		return searchObj;
	}


	@RequestMapping(value = "/search-confirm")
	@ResponseBody
	public String searchConfirm(HttpSession session, KeywordVO vo) throws Exception {
		String msg = "err";
		String userIp = getUserIp();
		vo.setSrchIp(userIp);

		int isSearched = orangeService.selectKeywordByIp(vo);
		if (isSearched == 0) {
			int insertCnt = orangeService.insertKeyword(vo);
		} else {
			int updateCnt = orangeService.updateKeyword(vo);
		}

		msg = "ok";

		return msg;

	}

	public String getUserIp() throws Exception {

		String ip = null;
		HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes())
				.getRequest();

		ip = request.getHeader("X-Forwarded-For");

		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("Proxy-Client-IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("WL-Proxy-Client-IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("HTTP_CLIENT_IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("HTTP_X_FORWARDED_FOR");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("X-Real-IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("X-RealIP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("REMOTE_ADDR");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getRemoteAddr();
		}
		if (ip.equals("0:0:0:0:0:0:0:1") || ip.equals("127.0.0.1")) {
			ip = InetAddress.getLocalHost().getHostAddress();
		}

		return ip;
	}

}