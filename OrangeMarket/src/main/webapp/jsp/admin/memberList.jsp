<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>OrangeMarket 관리자 페이지</title>
<script src="https://code.jquery.com/jquery-3.6.0.js"></script>
<script src="https://code.jquery.com/ui/1.13.0/jquery-ui.js"></script>
<link rel="stylesheet" href="/css/admin_main.css">

<script src="/js/admin.js"></script>
        
</head>
<body>
	<%@include file="/include/admin_header.jsp" %>
	<%@include file="/include/admin_nav.jsp" %>
	
    <section id="section">
    	<div class="section-inner">
    		<div class="section-title">회원정보목록</div>
    		<div class="section-content">
    			<div class="section-search">
		    		<select name="">
						<option value="">아이디</option>	    		
						<option value="">닉네임</option>	    		
		    		</select>
		    		<input type="text" name="" value="" placeholder="검색하실 내용을 입력하세요.">
		    		<button type="submit" onclick=""><img src="/images/admin/search_w.png"></button>
    			</div>
				<div class="section-main">
					<table>
						<colgroup>
							<col width="5%">
							<col width="35%">
							<col width="20%">
							<col width="30%">
							<col width="10%">
						</colgroup>
						<tr>
							<th></th>
							<th>아이디</th>
							<th>닉네임</th>
							<th>가입일</th>
							<th>상세</th>
						</tr>
						<!-- 반복문 사용 예정 -->
						<tr>
							<td>4</td>
							<td>123@123.com</td>
							<td>홍길동</td>
							<td>2021-01-01</td>
							<td><img class="detail-btn" src="/images/admin/icon_down.png"></td>
						</tr>
						<tr style="display:none; font-size:14px;">
							<td></td>
							
							<td>연락처 : 010-0000-0000</td>
							<td>주소 : 서울특별시 강남구</td>
							<td>최근접속일 : 2021/01/01</td>
							<td><button type="button" class="section-btn" value="unq">계정정지</button></td>
						</tr>
					</table>
					<div style="width:1000px; margin-top:50px; text-align:center;">《 1 2 3 4 5 》</div>
				</div>    		
    		</div>
    	</div>
    </section>
</body>
</html>