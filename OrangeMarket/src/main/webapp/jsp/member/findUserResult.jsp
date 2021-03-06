<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!-- 헤더 -->
<jsp:include page="/include/header.jsp" flush="false">
	<jsp:param name="cssName" value="member" />
</jsp:include>
<!-- 헤더 -->

<article class="pg-wrap pg-find-info pg-find-result">
	<article class="cont-article">
		<div class="cont-inner">

			<header class="sub-page-head">
				<div class="cont-inner">
					<h2 class="sub-page-title">마켓계정 찾기</h2>
				</div>
			</header>

			<h3 class="find-result-tit txt-c">
				회원님의 계정은<br /> ${userEmail} 입니다.
			</h3>

			<div class="btn-group">
				<a href="login" class="btn btn-solid-point btn-f">로그인하러 가기</a>
				<a href="find-pw" class="btn btn-solid btn-f">비밀번호 찾기</a>
			</div>

		</div>
	</article>
</article>


<!-- 푸터 -->
<jsp:include page="/include/footer.jsp" flush="false" />
<!-- 푸터 -->